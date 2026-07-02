import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Nav } from '@/components/layout/Nav'
import { Team } from '@/components/about/Team'
import { Process } from '@/components/home/Process'
import { CtaFinal } from '@/components/home/CtaFinal'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/ui/WhatsAppFab'
import type { Locale, TeamMemberVM } from '@/lib/content-types'
import { getTeam, getSiteSettings } from '@/lib/content'
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
    path: '/about',
    title: es ? 'Nosotros' : 'About',
    description: es
      ? 'Quiénes somos: el equipo detrás de VIRAL CREATIVE y cómo trabajamos.'
      : 'Who we are: the team behind VIRAL CREATIVE and how we work.',
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  const [tNav, tAbout, tTeam, tProc, tCta, tFooter, tFab] = await Promise.all([
    getTranslations('nav'),
    getTranslations('aboutPage'),
    getTranslations('team'),
    getTranslations('process'),
    getTranslations('cta'),
    getTranslations('footer'),
    getTranslations('fab'),
  ])

  const [settings, cmsTeam] = await Promise.all([
    getSiteSettings(loc),
    getTeam(loc),
  ])
  const waNumber = settings.whatsappNumber

  // Equipo desde el CMS; si aún no hay miembros, se usan los textos de i18n.
  const members: TeamMemberVM[] =
    cmsTeam.length > 0
      ? cmsTeam
      : [
          {
            id: 'member1',
            name: tTeam('member1.name'),
            role: tTeam('member1.role'),
            bio: tTeam('member1.bio'),
            tags: tTeam.raw('member1.tags') as string[],
            photoUrl: null,
          },
          {
            id: 'member2',
            name: tTeam('member2.name'),
            role: tTeam('member2.role'),
            bio: tTeam('member2.bio'),
            tags: tTeam.raw('member2.tags') as string[],
            photoUrl: null,
          },
        ]

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

      {/* Equipo — desde el CMS (o textos de i18n como fallback) */}
      <Team
        members={members}
        t={{
          label: tTeam('label'),
          title: tTeam('title'),
          sub: tTeam('sub'),
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
