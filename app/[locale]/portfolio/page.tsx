import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Portfolio } from '@/components/home/Portfolio'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573000000000'

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tNav, tPF, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('portfolio'),
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

      {/* isPage=true: elimina border-radius superior y aumenta paddingTop */}
      <Portfolio
        locale={locale}
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
