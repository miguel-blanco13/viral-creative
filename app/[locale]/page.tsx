import type { Metadata } from 'next'
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
import type { Locale } from '@/lib/content-types'
import {
  getServices,
  getProjects,
  getTestimonials,
  getFaqs,
  getSiteSettings,
} from '@/lib/content'
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
    path: '/',
    description: es
      ? 'Agencia creativa digital: branding, contenido, desarrollo web y automatización. Pide tu cotización por WhatsApp.'
      : 'Digital creative agency: branding, content, web development and automation. Request your quote on WhatsApp.',
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

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

  // Contenido editable desde el CMS (con fallback a los datos por defecto).
  const [settings, services, projects, testimonials, faqs] = await Promise.all([
    getSiteSettings(loc),
    getServices(loc),
    getProjects(loc),
    getTestimonials(loc),
    getFaqs(loc),
  ])
  const waNumber = settings.whatsappNumber

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
        waNumber={waNumber}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero
          t={{
            eyebrow: settings.hero.eyebrow ?? tHero('eyebrow'),
            headline: settings.hero.headline ?? tHero('headline'),
            subhead: settings.hero.subhead ?? tHero('subhead'),
            scroll: tHero('scroll'),
            cta: tHero('cta'),
          }}
          waNumber={waNumber}
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
          services={services}
          t={{
            label: tSrv('label'),
            title: tSrv('title'),
            sub: tSrv('sub'),
            cta: tSrv('cta'),
            viewAll: tSrv('viewAll'),
          }}
          waNumber={waNumber}
        />

        <PortfolioPreview
          locale={locale}
          projects={projects}
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
          testimonials={testimonials}
          t={{
            label: tTst('label'),
            title: tTst('title'),
            note: tTst('note'),
            stat1: tSP('stat1'),
            stat2: tSP('stat2'),
            stat3: tSP('stat3'),
          }}
        />

        <Faq faqs={faqs} t={{ label: tFaq('label'), title: tFaq('title') }} />

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
      </div>

      <WhatsAppFab
        waNumber={waNumber}
        labelText={tFab('label')}
        tipText={tFab('tip')}
      />
    </div>
  )
}
