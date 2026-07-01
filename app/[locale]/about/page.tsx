import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Team } from '@/components/about/Team'
import { Process } from '@/components/home/Process'
import { CtaFinal } from '@/components/home/CtaFinal'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573000000000'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tNav, tAbout, tTeam, tProc, tCta, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('aboutPage'),
    getTranslations('team'),
    getTranslations('process'),
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

      {/* Hero de la página */}
      <section
        style={{
          position: 'relative',
          background: 'var(--bg)',
          paddingTop: '160px',
          paddingBottom: '96px',
          paddingLeft: '40px',
          paddingRight: '40px',
          overflow: 'hidden',
        }}
      >
        {/* Blob de fondo */}
        <div
          style={{
            position: 'absolute', top: '40%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(circle,var(--accent-glow) 0%,transparent 70%)',
            filter: 'blur(60px)',
            animation: 'vc-blob 18s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
          <p
            style={{
              color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
              marginBottom: '20px',
            }}
          >
            {tAbout('label')}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '-.02em', lineHeight: '.96', fontSize: 'var(--text-display)',
              background: 'linear-gradient(180deg,#C7D2E0 0%,#F5F7FA 60%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              maxWidth: '16ch',
            }}
          >
            {tAbout('title')}
          </h1>
          <p
            style={{
              color: 'var(--muted)', fontSize: 'var(--text-lg)', marginTop: '24px', maxWidth: '48ch',
            }}
          >
            {tAbout('sub')}
          </p>
        </div>
      </section>

      {/* Equipo */}
      {/* tTeam.raw() devuelve el valor crudo del JSON — necesario para arrays */}
      <Team
        t={{
          label: tTeam('label'),
          title: tTeam('title'),
          sub: tTeam('sub'),
          member1: {
            name: tTeam('member1.name'),
            role: tTeam('member1.role'),
            bio: tTeam('member1.bio'),
            tags: tTeam.raw('member1.tags') as string[],
          },
          member2: {
            name: tTeam('member2.name'),
            role: tTeam('member2.role'),
            bio: tTeam('member2.bio'),
            tags: tTeam.raw('member2.tags') as string[],
          },
        }}
      />

      {/* Proceso — reutilizado, con fondo oscuro ya incorporado */}
      <Process
        locale={locale}
        t={{ label: tProc('label'), title: tProc('title') }}
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
