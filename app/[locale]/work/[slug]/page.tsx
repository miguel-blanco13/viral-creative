import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ProjectModal } from '@/components/work/ProjectModal'
import type { Locale } from '@/lib/content-types'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'
import { SITE_URL } from '@/lib/seo'

interface WorkPageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Permite renderizar bajo demanda slugs añadidos en el CMS después del build.
export const dynamicParams = true

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const project = await getProjectBySlug(slug, locale as Locale)
  if (!project) return {}

  const url = `${SITE_URL}/${locale}/work/${slug}`
  const description = project.description || undefined
  return {
    title: project.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: project.name,
      description,
      url,
      images: [project.thumbnailUrl ?? '/images/logo.png'],
    },
  }
}

/**
 * /[locale]/work/[slug] — Página directa del proyecto.
 *
 * Se usa cuando el usuario accede al link directamente (SEO, compartir).
 * Renderiza el ProjectModal sobre un fondo oscuro, sin el overlay de la
 * intercepting route. Cuando se accede desde la galería, la intercepting
 * route toma el control y este componente no se renderiza.
 */
export async function generateStaticParams() {
  // Slugs desde Sanity (o fallback a los datos por defecto) × locales.
  const slugs = await getProjectSlugs()
  const locales = ['es', 'en']
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = await getProjectBySlug(slug, locale as Locale)
  if (!project) notFound()

  const tPF = await getTranslations('portfolio')

  return (
    // Fondo oscuro para acceso directo por URL
    <div style={{ minHeight: '100vh', background: 'var(--void)', position: 'relative' }}>
      <ProjectModal
        project={project}
        locale={locale}
        t={{
          back: tPF('back'),
          result: tPF('result'),
          img: tPF('img'),
        }}
      />
    </div>
  )
}
