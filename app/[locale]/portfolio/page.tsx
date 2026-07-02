import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Portfolio } from '@/components/home/Portfolio'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'
import type { Locale } from '@/lib/content-types'
import { getProjects, getSiteSettings } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === 'es'
  return pageMetadata({
    locale: locale as Locale,
    path: '/portfolio',
    title: es ? 'Portafolio' : 'Portfolio',
    description: es
      ? 'Proyectos de branding, web y contenido. Casos reales con resultados concretos.'
      : 'Branding, web and content projects. Real cases with concrete results.',
  })
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const [tNav, tPF, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('portfolio'),
    getTranslations('footer'),
    getTranslations('fab'),
  ])

  const [settings, projects] = await Promise.all([
    getSiteSettings(loc),
    getProjects(loc),
  ])
  const waNumber = settings.whatsappNumber

  return (
    <div className="vc-root" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Nav
        locale={locale}
        t={{
          services: tNav('services'),
          work: tNav('work'),
          about: tNav('about'),
          cta: tNav('cta'),
        }}
        waNumber={waNumber}
      />

      {/* isPage=true: elimina border-radius superior y aumenta paddingTop */}
      <Portfolio
        locale={locale}
        projects={projects}
        t={{
          label: tPF('label'),
          title: tPF('title'),
          sub: tPF('sub'),
          view: tPF('view'),
          img: tPF('img'),
          back: tPF('back'),
          result: tPF('result'),
          all: tPF('all'),
        }}
        isPage
      />

      <Footer
        locale={locale}
        t={{
          legal: tFooter('legal'),
          tag: tFooter('tag'),
        }}
        waNumber={waNumber}
        email={settings.email}
        instagramUrl={settings.instagramUrl}
        tiktokUrl={settings.tiktokUrl}
      />

      <WhatsAppFab
        waNumber={waNumber}
        labelText={tFab('label')}
        tipText={tFab('tip')}
      />
    </div>
  )
}
