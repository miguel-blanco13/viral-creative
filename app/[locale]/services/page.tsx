import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Services } from '@/components/home/Services'
import { CtaFinal } from '@/components/home/CtaFinal'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'
import type { Locale } from '@/lib/content-types'
import { getServices, getSiteSettings } from '@/lib/content'
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
    path: '/services',
    title: es ? 'Servicios' : 'Services',
    description: es
      ? 'Branding, fotografía, contenido, gestión de redes, desarrollo web, automatización y publicidad digital.'
      : 'Branding, photography, content, social media, web development, automation and digital advertising.',
  })
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const [tNav, tSrv, tCta, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('services'),
    getTranslations('cta'),
    getTranslations('footer'),
    getTranslations('fab'),
  ])

  const [settings, services] = await Promise.all([
    getSiteSettings(loc),
    getServices(loc),
  ])
  const waNumber = settings.whatsappNumber

  return (
    <div className="vc-root">
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

      {/* isPage=true: elimina border-radius superior y aumenta paddingTop para la nav */}
      <Services
        services={services}
        t={{
          label: tSrv('label'),
          title: tSrv('title'),
          sub: tSrv('sub'),
          cta: tSrv('cta'),
        }}
        waNumber={waNumber}
        isPage
      />

      <CtaFinal
        t={{
          eyebrow: tCta('eyebrow'),
          title: tCta('title'),
          sub: tCta('sub'),
          button: tCta('button'),
          micro: tCta('micro'),
        }}
        waNumber={waNumber}
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
