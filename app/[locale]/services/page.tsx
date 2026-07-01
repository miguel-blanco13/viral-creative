import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Services } from '@/components/home/Services'
import { CtaFinal } from '@/components/home/CtaFinal'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573000000000'

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tNav, tSrv, tCta, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('services'),
    getTranslations('cta'),
    getTranslations('footer'),
    getTranslations('fab'),
  ])

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
        waNumber={WA_NUMBER}
      />

      {/* isPage=true: elimina border-radius superior y aumenta paddingTop para la nav */}
      <Services
        locale={locale}
        t={{
          label: tSrv('label'),
          title: tSrv('title'),
          sub: tSrv('sub'),
          cta: tSrv('cta'),
        }}
        waNumber={WA_NUMBER}
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
        waNumber={WA_NUMBER}
      />

      <Footer
        locale={locale}
        t={{
          legal: tFooter('legal'),
          tag: tFooter('tag'),
          services: tNav('services'),
          work: tNav('work'),
          about: tNav('about'),
          contact: tNav('contact'),
        }}
        waNumber={WA_NUMBER}
      />

      <WhatsAppFab
        waNumber={WA_NUMBER}
        labelText={tFab('label')}
        tipText={tFab('tip')}
      />
    </div>
  )
}
