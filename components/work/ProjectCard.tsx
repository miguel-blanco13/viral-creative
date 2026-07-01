'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import type { Project } from '@/components/home/data'

interface ProjectCardProps {
  project: Project
  locale: string
  t: { view: string; img: string }
  index: number
}

/**
 * ProjectCard — Tarjeta del portafolio con Motion layoutId.
 *
 * El layoutId compartido con el overlay (@modal) hace que Motion anime
 * automáticamente el morph entre miniatura y modal al navegar.
 * Cada proyecto tiene IDs únicos: `{slug}`, `{slug}-image`, `{slug}-title`.
 *
 * La tarjeta usa un placeholder de color (colorA/colorB del proyecto) hasta
 * que haya assets reales. Reemplazar el bloque de placeholder con <Image />.
 */
export function ProjectCard({ project, locale, t, index }: ProjectCardProps) {
  const es = locale === 'es'
  const href = `/${locale}/work/${project.slug}`

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
      <motion.article
        layoutId={project.slug}
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      >
        {/* Imagen principal — placeholder hasta tener assets */}
        <motion.div
          layoutId={`${project.slug}-image`}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: `linear-gradient(135deg, ${project.colorA} 0%, ${project.colorB} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Accent glow overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${project.accent}22 0%, transparent 65%)`,
          }} />
          {/* Número del proyecto como watermark */}
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            color: 'rgba(255,255,255,0.06)',
            letterSpacing: '-.04em',
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            {project.n}
          </span>
          {/* Placeholder label — remover cuando haya imagen real */}
          <span style={{
            position: 'absolute',
            bottom: '14px',
            left: '18px',
            fontSize: '.68rem',
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            color: 'rgba(255,255,255,0.25)',
            fontFamily: 'var(--font-display)',
          }}>
            {t.img}
          </span>
        </motion.div>

        {/* Info */}
        <div style={{ padding: '22px 24px 26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{
                fontSize: '.72rem',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                color: 'var(--accent)',
                background: 'var(--accent-glow)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
              }}>
                {es ? project.catEs : project.catEn}
              </span>
              <motion.h3
                layoutId={`${project.slug}-title`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'var(--text-h3)',
                  color: '#fff',
                  lineHeight: 1.1,
                }}
              >
                {project.name}
              </motion.h3>
            </div>
            <span style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              flexShrink: 0,
              marginTop: '4px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
