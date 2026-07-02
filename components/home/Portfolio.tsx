'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FILTERS } from './data'
import { ProjectCard } from '@/components/work/ProjectCard'
import { Reveal } from '@/components/motion/Reveal'
import type { ProjectVM } from '@/lib/content-types'

interface PortfolioProps {
  locale: string
  projects: ProjectVM[]
  t: {
    label: string
    title: string
    sub: string
    view: string
    img: string
    back: string
    result: string
    all: string
  }
  /** true → sin border-radius superior, paddingTop para la nav fija */
  isPage?: boolean
}

/**
 * Portfolio — Galería con filtros y tarjetas animadas.
 *
 * Cada ProjectCard usa layoutId de Motion (via slug del proyecto).
 * Al hacer clic en una card, Next.js navega a /[locale]/work/[slug] y la
 * intercepting route @modal/(.)work/[slug] monta el overlay con el morph.
 *
 * AnimatePresence en el grid gestiona las transiciones de filtrado:
 * cuando un proyecto se filtra, sale con opacity 0 + scale; cuando entra,
 * hace el recorrido inverso. LayoutGroup sincroniza los layout animations.
 */
export function Portfolio({ locale, projects, t, isPage = false }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const es = locale === 'es'

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.cat === activeFilter
  )

  return (
    <section
      id="portafolio"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        borderRadius: isPage ? '0' : '40px 40px 0 0',
        paddingTop: isPage ? '160px' : '128px',
        paddingBottom: '128px',
        overflow: 'hidden',
        // isPage: ocupa el espacio restante del flex column de vc-root,
        // así el footer queda pegado al fondo aunque el filtro deje
        // pocos (o ningún) proyecto visible.
        ...(isPage ? { flex: 1 } : {}),
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

        {/* Filtros */}
        <Reveal from="up" delay={0.28}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '40px' }}>
            {FILTERS.map((f) => {
              const on = activeFilter === f.key
              return (
                <motion.button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  layout
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-sm)',
                    textTransform: 'uppercase', letterSpacing: '.06em', padding: '9px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: `1.5px solid ${on ? 'var(--primary)' : 'var(--border)'}`,
                    color: on ? '#fff' : 'var(--muted)',
                    background: on ? 'var(--primary)' : 'transparent',
                    transition: 'all .2s',
                    cursor: 'pointer',
                  }}
                >
                  {f.key === 'all' ? t.all : (es ? f.es : f.en)}
                </motion.button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid de proyectos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
          marginTop: '48px',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  t={{ view: t.view, img: t.img }}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
