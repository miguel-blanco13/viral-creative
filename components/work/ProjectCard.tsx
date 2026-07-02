'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { ProjectVM } from '@/lib/content-types'

interface ProjectCardProps {
  project: ProjectVM
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
  const href = `/${locale}/work/${project.slug}`
  const hasImage = Boolean(project.thumbnailUrl)

  return (
    <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
      <motion.article
        layoutId={project.slug}
        className="portfolio-card"
        style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      >
        {/* Corner brackets HUD — mismo lenguaje visual que el Hero (lock-on) */}
        <span className="portfolio-card__corner portfolio-card__corner--tl" aria-hidden="true" />
        <span className="portfolio-card__corner portfolio-card__corner--tr" aria-hidden="true" />

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
          {/* Imagen real del CMS (cover). Si no hay, se usa el placeholder. */}
          {hasImage && (
            <Image
              src={project.thumbnailUrl as string}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          )}
          {/* Grid técnico de fondo — refuerza el lenguaje "futurista" */}
          <div className="portfolio-card__grid" aria-hidden="true" />
          {/* Accent glow overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${project.accent}22 0%, transparent 65%)`,
          }} />
          {/* Barrido de escaneo — solo en hover, sin tracking de cursor */}
          <div className="portfolio-card__scanline" aria-hidden="true" />
          {/* Número del proyecto — solo como placeholder cuando no hay imagen */}
          {!hasImage && (
            <span
              className="portfolio-card__num"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(4.5rem, 13vw, 10rem)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.14)',
                letterSpacing: '-.04em',
                userSelect: 'none',
                position: 'relative',
                zIndex: 1,
                opacity: 0.55,
              }}
            >
              {project.n}
            </span>
          )}
          {/* Etiqueta de placeholder — solo sin imagen real */}
          {!hasImage && (
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
          )}
        </motion.div>

        {/* Info */}
        <div style={{ padding: '22px 24px 26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '.72rem',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                color: 'var(--accent)',
                border: '1px solid rgba(74,141,255,0.28)',
                padding: '4px 10px 4px 8px',
                borderRadius: 'var(--radius-full)',
                width: 'fit-content',
              }}>
                <span className="portfolio-card__dot" aria-hidden="true" />
                {project.category}
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
            <span className="portfolio-card__arrow" style={{
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
