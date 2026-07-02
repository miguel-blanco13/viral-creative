// Módulo server-only por convención (usa sanityFetch/urlFor). No lo importes
// desde componentes cliente: pásales el resultado por props.
import { SERVICES, PROJECTS, TESTIMONIALS, FAQ } from '@/components/home/data'
import { sanityFetch } from '@/lib/sanity/fetch'
import { urlFor } from '@/lib/sanity/image'
import {
  servicesQuery,
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  testimonialsQuery,
  faqsQuery,
  teamQuery,
  siteSettingsQuery,
  SANITY_TAGS,
} from '@/lib/sanity/queries'
import type {
  LocaleString,
  SanityProject,
  SanityService,
  SanityTestimonial,
  SanityFaq,
  SanityTeamMember,
  SanitySiteSettings,
} from '@/lib/sanity/types'
import type {
  Locale,
  ServiceVM,
  ProjectVM,
  TestimonialVM,
  FaqVM,
  TeamMemberVM,
  SiteSettings,
} from '@/lib/content-types'

// ─────────────────────────── helpers ───────────────────────────

const pick = (value: LocaleString | undefined, locale: Locale): string =>
  value?.[locale] ?? value?.en ?? value?.es ?? ''

const pad = (n: number) => String(n).padStart(2, '0')

const initialsFrom = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('') || '·'

// Etiquetas por categoría del portafolio + clave de filtro del sitio.
const CATEGORY_META: Record<
  SanityProject['category'],
  { filter: string; es: string; en: string }
> = {
  web: { filter: 'Web', es: 'Desarrollo web', en: 'Web' },
  branding: { filter: 'Branding', es: 'Branding', en: 'Branding' },
  contenido: { filter: 'Contenido', es: 'Contenido digital', en: 'Content' },
  foto: { filter: 'Fotografía', es: 'Fotografía', en: 'Photography' },
}

// Paleta de respaldo para proyectos sin imagen (placeholder con gradiente).
const PALETTE = [
  { colorA: '#1A2744', colorB: '#0B1026', accent: '#0A84FF' },
  { colorA: '#1A1A2E', colorB: '#16213E', accent: '#4A8DFF' },
  { colorA: '#0D1B2A', colorB: '#1B263B', accent: '#3A7BD5' },
]

// ─────────────────────────── servicios ───────────────────────────

export async function getServices(locale: Locale): Promise<ServiceVM[]> {
  const data = await sanityFetch<SanityService[]>({
    query: servicesQuery,
    tags: [SANITY_TAGS.service],
  })

  if (data && data.length > 0) {
    return data.map((s, i) => ({
      id: s._id,
      n: pad(i + 1),
      category: pick(s.category, locale),
      name: pick(s.name, locale),
      description: pick(s.description, locale),
      waText: s.waMessage?.trim() || `Quiero cotizar ${pick(s.name, locale)}`,
    }))
  }

  const es = locale === 'es'
  return SERVICES.map((s) => ({
    id: s.n,
    n: s.n,
    category: es ? s.catEs : s.catEn,
    name: es ? s.nameEs : s.nameEn,
    description: es ? s.descEs : s.descEn,
    // data.ts guarda el mensaje codificado con '+'; lo devolvemos como texto plano.
    waText: decodeURIComponent(s.wa.replace(/\+/g, ' ')),
  }))
}

// ─────────────────────────── proyectos ───────────────────────────

function mapSanityProject(p: SanityProject, i: number, locale: Locale): ProjectVM {
  const meta = CATEGORY_META[p.category]
  const palette = PALETTE[i % PALETTE.length]
  return {
    id: p._id,
    n: pad(i + 1),
    slug: p.slug,
    cat: meta?.filter ?? 'Web',
    category: locale === 'es' ? (meta?.es ?? '') : (meta?.en ?? ''),
    name: pick(p.title, locale),
    description: pick(p.description, locale),
    result: pick(p.result, locale),
    ...palette,
    thumbnailUrl: p.thumbnail
      ? urlFor(p.thumbnail).width(1200).height(750).fit('crop').auto('format').url()
      : null,
    imageUrls: (p.images ?? []).map((img) =>
      urlFor(img).width(1400).fit('max').auto('format').url(),
    ),
  }
}

function fallbackProjects(locale: Locale): ProjectVM[] {
  const es = locale === 'es'
  return PROJECTS.map((p) => ({
    id: p.slug,
    n: p.n,
    slug: p.slug,
    cat: p.cat,
    category: es ? p.catEs : p.catEn,
    name: p.name,
    description: es ? p.descEs : p.descEn,
    result: es ? p.resultEs : p.resultEn,
    colorA: p.colorA,
    colorB: p.colorB,
    accent: p.accent,
    thumbnailUrl: null,
    imageUrls: [],
  }))
}

export async function getProjects(locale: Locale): Promise<ProjectVM[]> {
  const data = await sanityFetch<SanityProject[]>({
    query: projectsQuery,
    tags: [SANITY_TAGS.project],
  })
  if (data && data.length > 0) {
    return data.map((p, i) => mapSanityProject(p, i, locale))
  }
  return fallbackProjects(locale)
}

export async function getProjectSlugs(): Promise<string[]> {
  const data = await sanityFetch<string[]>({
    query: projectSlugsQuery,
    tags: [SANITY_TAGS.project],
  })
  if (data && data.length > 0) return data
  return PROJECTS.map((p) => p.slug)
}

export async function getProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<ProjectVM | null> {
  const doc = await sanityFetch<SanityProject | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [SANITY_TAGS.project],
  })
  if (doc) return mapSanityProject(doc, 0, locale)

  // Fallback: buscar en data.ts preservando el índice para número/paleta.
  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  if (idx === -1) return null
  return fallbackProjects(locale)[idx]
}

// ─────────────────────────── testimonios ───────────────────────────

export async function getTestimonials(locale: Locale): Promise<TestimonialVM[]> {
  const data = await sanityFetch<SanityTestimonial[]>({
    query: testimonialsQuery,
    tags: [SANITY_TAGS.testimonial],
  })
  if (data && data.length > 0) {
    return data.map((t) => ({
      id: t._id,
      quote: pick(t.quote, locale),
      author: t.author,
      role: pick(t.role, locale),
      initials: t.initials?.trim() || initialsFrom(t.author),
    }))
  }
  const es = locale === 'es'
  return TESTIMONIALS.map((t) => ({
    id: t.ini,
    quote: es ? t.qEs : t.qEn,
    author: t.name,
    role: es ? t.roleEs : t.roleEn,
    initials: t.ini,
  }))
}

// ─────────────────────────── FAQ ───────────────────────────

export async function getFaqs(locale: Locale): Promise<FaqVM[]> {
  const data = await sanityFetch<SanityFaq[]>({
    query: faqsQuery,
    tags: [SANITY_TAGS.faq],
  })
  if (data && data.length > 0) {
    return data.map((f) => ({
      id: f._id,
      question: pick(f.question, locale),
      answer: pick(f.answer, locale),
    }))
  }
  const es = locale === 'es'
  return FAQ.map((f, i) => ({
    id: String(i),
    question: es ? f.qEs : f.qEn,
    answer: es ? f.aEs : f.aEn,
  }))
}

// ─────────────────────────── equipo ───────────────────────────
// Sin fallback aquí: si no hay CMS, la página de "nosotros" usa los textos
// de i18n (messages) como respaldo.

export async function getTeam(locale: Locale): Promise<TeamMemberVM[]> {
  const data = await sanityFetch<SanityTeamMember[]>({
    query: teamQuery,
    tags: [SANITY_TAGS.teamMember],
  })
  if (!data) return []
  return data.map((m) => ({
    id: m._id,
    name: m.name,
    role: pick(m.role, locale),
    bio: pick(m.bio, locale),
    tags: (m.tags ?? []).map((tag) => pick(tag, locale)).filter(Boolean),
    photoUrl: m.photo
      ? urlFor(m.photo).width(900).height(900).fit('crop').auto('format').url()
      : null,
  }))
}

// ─────────────────────────── ajustes del sitio ───────────────────────────

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573000000000',
  email: 'teamviralcreative@gmail.com',
  instagramUrl: 'https://www.instagram.com/viralcreative_/',
  tiktokUrl: 'https://www.tiktok.com/@viralcreative.co',
  hero: {},
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySiteSettings | null>({
    query: siteSettingsQuery,
    tags: [SANITY_TAGS.siteSettings],
  })
  if (!data) return DEFAULT_SETTINGS

  return {
    whatsappNumber: data.whatsappNumber?.trim() || DEFAULT_SETTINGS.whatsappNumber,
    email: data.email?.trim() || DEFAULT_SETTINGS.email,
    instagramUrl: data.instagramUrl?.trim() || DEFAULT_SETTINGS.instagramUrl,
    tiktokUrl: data.tiktokUrl?.trim() || DEFAULT_SETTINGS.tiktokUrl,
    hero: {
      eyebrow: pick(data.heroEyebrow, locale) || undefined,
      headline: pick(data.heroHeadline, locale) || undefined,
      subhead: pick(data.heroSubhead, locale) || undefined,
    },
  }
}
