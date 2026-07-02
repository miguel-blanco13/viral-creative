'use client'

import { ProjectCard } from '@/components/work/ProjectCard'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from '@/lib/navigation'
import type { ProjectVM } from '@/lib/content-types'

// Solo los 3 primeros proyectos, sin filtros ni AnimatePresence.
// La interactividad completa vive en Portfolio.tsx (página /portafolio).

interface PortfolioPreviewProps {
  locale: string
  projects: ProjectVM[]
  t: {
    label: string
    title: string
    sub: string
    view: string
    img: string
    viewAll: string
  }
}

export function PortfolioPreview({ locale, projects, t }: PortfolioPreviewProps) {
  const preview = projects.slice(0, 3)

  return (
    <section
      id="portafolio"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        borderRadius: '40px 40px 0 0',
        paddingTop: '128px',
        paddingBottom: '128px',
        overflow: 'hidden',
      }}
    >
      {/* Grid técnico de fondo — refuerza el tono futurista sin competir con el contenido */}
      <div className="portfolio-grid-bg" aria-hidden="true" />

      <div style={{ padding: '0 40px', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <Reveal from="up" delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '20px' }}>
            <p style={{
              color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
              whiteSpace: 'nowrap',
            }}>
              {t.label}
            </p>
            <span aria-hidden="true" style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border), transparent)' }} />
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--muted)',
              letterSpacing: '.06em', whiteSpace: 'nowrap',
            }}>
              N&deg; 0{preview.length}
            </span>
          </div>
        </Reveal>

        <Reveal from="up" delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-.02em', lineHeight: '.95', fontSize: 'var(--text-display)',
            background: 'linear-gradient(180deg,#C7D2E0 0%,#F5F7FA 60%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {t.title}
          </h2>
        </Reveal>

        <Reveal from="up" delay={0.2}>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginTop: '24px', maxWidth: '46ch' }}>
            {t.sub}
          </p>
        </Reveal>

        {/* Grid estático — sin filtros */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
          marginTop: '48px',
        }}>
          {preview.map((project, i) => (
            <Reveal key={project.slug} from="up" delay={i * 0.08} start="top 90%">
              <ProjectCard
                project={project}
                locale={locale}
                t={{ view: t.view, img: t.img }}
                index={i}
              />
            </Reveal>
          ))}
        </div>

        {/* CTA → página completa de portafolio */}
        <Reveal from="up" delay={0.1} start="top 95%">
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
            <Link href="/portfolio" className="portfolio-more-btn">
              {t.viewAll}
              <span className="portfolio-more-btn__arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
