'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import type { Project } from '@/components/home/data'
import { lenisStore } from '@/lib/lenis'

interface ProjectModalProps {
  project: Project
  locale: string
  t: { back: string; result: string; img: string }
}

/**
 * ProjectModal — Overlay estilo obys.agency con Motion layoutId.
 *
 * Los layoutId `{slug}`, `{slug}-image` y `{slug}-title` deben coincidir
 * exactamente con los de ProjectCard para que Motion haga el morph.
 *
 * El overlay se monta desde la intercepting route @modal/(.)work/[slug].
 * Al hacer dismiss, router.back() restaura la página anterior sin reload.
 *
 * AnimatePresence maneja el exit animation cuando se cierra.
 */
export function ProjectModal({ project, locale, t }: ProjectModalProps) {
  const router = useRouter()
  const es = locale === 'es'
  const panelRef = useRef<HTMLDivElement>(null)

  const dismiss = () => router.back()

  useEffect(() => {
    // 1. Detener Lenis para que no mueva la página de fondo.
    lenisStore.stop()

    const panel = panelRef.current
    if (!panel) return

    // 2. Lenis llama preventDefault() en todos los eventos wheel a nivel window
    //    (aunque esté "stopped"). stopPropagation() en el panel impide que el
    //    evento llegue al listener de Lenis en window, devolviendo el scroll
    //    nativo al panel del modal.
    const trap = (e: WheelEvent) => e.stopPropagation()
    panel.addEventListener('wheel', trap, { passive: true })

    return () => {
      panel.removeEventListener('wheel', trap)
      lenisStore.start()
    }
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(5,5,7,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal panel — usa los mismos layoutId que ProjectCard */}
      <motion.div
        key="modal"
        ref={panelRef}
        layoutId={project.slug}
        style={{
          position: 'fixed',
          inset: '4vh 5vw',
          zIndex: 210,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border)',
          overflowY: 'auto',
          overflowX: 'hidden',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Botón cerrar */}
        <button
          aria-label="Cerrar"
          onClick={dismiss}
          style={{
            position: 'sticky',
            top: '18px',
            float: 'right',
            margin: '18px 22px 0 0',
            zIndex: 220,
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Hero image — morph desde la miniatura */}
        <motion.div
          layoutId={`${project.slug}-image`}
          style={{
            width: '100%',
            aspectRatio: '21/9',
            background: `linear-gradient(135deg, ${project.colorA} 0%, ${project.colorB} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${project.accent}33 0%, transparent 65%)`,
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            color: 'rgba(255,255,255,0.05)',
            letterSpacing: '-.04em',
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            {project.n}
          </span>
        </motion.div>

        {/* Contenido */}
        <div style={{ padding: '48px 56px 80px', maxWidth: '860px' }}>
          <span style={{
            fontSize: '.74rem',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            color: 'var(--accent)',
            background: 'var(--accent-glow)',
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            display: 'inline-block',
            marginBottom: '18px',
          }}>
            {es ? project.catEs : project.catEn}
          </span>

          {/* Título — morph desde la card */}
          <motion.h2
            layoutId={`${project.slug}-title`}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'var(--text-h1)',
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-.02em',
              marginBottom: '24px',
            }}
          >
            {project.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              color: 'var(--muted)',
              fontSize: 'var(--text-lg)',
              lineHeight: 1.7,
              maxWidth: '58ch',
              marginBottom: '48px',
            }}
          >
            {es ? project.descEs : project.descEn}
          </motion.p>

          {/* Grid de imágenes placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            {[0, 1].map((j) => (
              <div
                key={j}
                style={{
                  background: `linear-gradient(135deg, ${project.colorA}cc 0%, ${project.colorB}cc 100%)`,
                  borderRadius: 'var(--radius-md)',
                  minHeight: '200px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}
              >
                {t.img}
              </div>
            ))}
          </motion.div>

          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5 }}
            style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}
          >
            <span style={{
              fontSize: '.74rem',
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: 'var(--primary)',
              fontFamily: 'var(--font-display)',
            }}>
              {t.result}
            </span>
            <p style={{
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'var(--text-h3)',
              marginTop: '10px',
            }}>
              {es ? project.resultEs : project.resultEn}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
