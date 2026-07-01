import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/home/Hero'
import { SocialProof } from '@/components/home/SocialProof'
import { Problem } from '@/components/home/Problem'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { PortfolioPreview } from '@/components/home/PortfolioPreview'
import { Process } from '@/components/home/Process'
import { Testimonials } from '@/components/home/Testimonials'
import { Faq } from '@/components/home/Faq'
import { CtaFinal } from '@/components/home/CtaFinal'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573000000000'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tNav, tHero, tSP, tProb, tSrv, tPF, tProc, tTst, tFaq, tCta, tFooter, tFab] =
    await Promise.all([
      getTranslations('nav'),
      getTranslations('hero'),
      getTranslations('socialProof'),
      getTranslations('problem'),
      getTranslations('services'),
      getTranslations('portfolio'),
      getTranslations('process'),
      getTranslations('testimonials'),
      getTranslations('faq'),
      getTranslations('cta'),
      getTranslations('footer'),
      getTranslations('fab'),
    ])

  return (
    <div className="vc-root" id="hero">
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

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero
          t={{
            eyebrow: tHero('eyebrow'),
            headline: tHero('headline'),
            subhead: tHero('subhead'),
            scroll: tHero('scroll'),
            cta: tHero('cta'),
          }}
          waNumber={WA_NUMBER}
        />

        <SocialProof
          t={{
            label: tSP('label'),
            stat1: tSP('stat1'),
            stat2: tSP('stat2'),
            stat3: tSP('stat3'),
            note: tSP('note'),
          }}
        />

        <Problem
          t={{
            eyebrow: tProb('eyebrow'),
            title: tProb('title'),
            body: tProb('body'),
            pivot: tProb('pivot'),
          }}
        />

        <ServicesPreview
          locale={locale}
          t={{
            label: tSrv('label'),
            title: tSrv('title'),
            sub: tSrv('sub'),
            cta: tSrv('cta'),
            viewAll: tSrv('viewAll'),
          }}
          waNumber={WA_NUMBER}
        />

        <PortfolioPreview
          locale={locale}
          t={{
            label: tPF('label'),
            title: tPF('title'),
            sub: tPF('sub'),
            view: tPF('view'),
            img: tPF('img'),
            viewAll: tPF('viewAll'),
          }}
        />

        <Process
          locale={locale}
          t={{ label: tProc('label'), title: tProc('title') }}
        />

        <Testimonials
          locale={locale}
          t={{
            label: tTst('label'),
            title: tTst('title'),
            note: tTst('note'),
            stat1: tSP('stat1'),
            stat2: tSP('stat2'),
            stat3: tSP('stat3'),
          }}
        />

        <Faq locale={locale} t={{ label: tFaq('label'), title: tFaq('title') }} />

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
      </div>

      <WhatsAppFab
        waNumber={WA_NUMBER}
        labelText={tFab('label')}
        tipText={tFab('tip')}
      />
    </div>
  )
}
