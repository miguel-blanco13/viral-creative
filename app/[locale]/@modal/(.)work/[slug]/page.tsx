import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PROJECTS } from '@/components/home/data'
import { ProjectModal } from '@/components/work/ProjectModal'

interface ModalPageProps {
  params: Promise<{ locale: string; slug: string }>
}

/**
 * @modal/(.)work/[slug] — Intercepting route del portafolio.
 *
 * Next.js intercepta la navegación a /[locale]/work/[slug] cuando viene
 * desde la misma origin (clic en ProjectCard). En ese caso, monta este
 * componente en el slot @modal del layout, sin abandonar la página actual.
 *
 * Motion hace el morph entre ProjectCard y ProjectModal gracias a los
 * layoutId compartidos: `{slug}`, `{slug}-image`, `{slug}-title`.
 *
 * La URL cambia a /es/work/[slug] → SEO válido + el link se puede compartir.
 * Si alguien abre ese link directamente, Next.js sirve la WorkPage completa.
 */
export default async function ModalPage({ params }: ModalPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const project = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  const tPF = await getTranslations('portfolio')

  return (
    <ProjectModal
      project={project}
      locale={locale}
      t={{
        back: tPF('back'),
        result: tPF('result'),
        img: tPF('img'),
      }}
    />
  )
}
