import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PROJECTS } from '@/components/home/data'
import { ProjectModal } from '@/components/work/ProjectModal'

interface WorkPageProps {
  params: Promise<{ locale: string; slug: string }>
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
  // Pre-render de todas las combinaciones locale × slug para SSG.
  // Cuando se integre Sanity, traer slugs dinámicos aquí con generateStaticParams.
  const locales = ['es', 'en']
  return locales.flatMap((locale) =>
    PROJECTS.map((p) => ({ locale, slug: p.slug }))
  )
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = PROJECTS.find((p) => p.slug === slug)
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
