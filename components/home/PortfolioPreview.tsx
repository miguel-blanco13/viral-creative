'use client'

import { PROJECTS } from './data'
import { ProjectCard } from '@/components/work/ProjectCard'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from '@/lib/navigation'

// Solo los 3 primeros proyectos, sin filtros ni AnimatePresence.
// La interactividad completa vive en Portfolio.tsx (página /portafolio).

interface PortfolioPreviewProps {
  locale: string
  t: {
    label: string
    title: string
    sub: string
    view: string
    img: string
    viewAll: string
  }
}

export function PortfolioPreview({ locale, t }: PortfolioPreviewProps) {
  const preview = PROJECTS.slice(0, 3)

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
      <div style={{ padding: '0 40px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal from="up" delay={0}>
          <p style={{
            color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
            fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '20px',
          }}>
            {t.label}
          </p>
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
            <Link
              href="/portfolio"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '.08em', fontSize: 'var(--text-sm)',
                color: '#fff', borderBottom: '1.5px solid var(--primary)',
                paddingBottom: '4px', transition: 'opacity .2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '.7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              {t.viewAll}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
