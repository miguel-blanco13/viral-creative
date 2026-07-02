'use client'

import { useCallback, useEffect, useId, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import type { ProjectVM } from '@/lib/content-types'
import { lenisStore } from '@/lib/lenis'

interface ProjectModalProps {
  project: ProjectVM
  locale: string
  t: { back: string; result: string; img: string }
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

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
export function ProjectModal({ project, t }: ProjectModalProps) {
  const router = useRouter()
  const hasHeroImage = Boolean(project.thumbnailUrl)
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = useId()

  const dismiss = useCallback(() => router.back(), [router])

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

  // Accesibilidad de diálogo: Escape para cerrar, focus trap dentro del
  // panel, foco inicial al montar y restauración del foco previo al
  // desmontar (vuelve a la ProjectCard que disparó la navegación).
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const getFocusable = () => {
      const panel = panelRef.current
      if (!panel) return [] as HTMLElement[]
      return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        dismiss()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [dismiss])

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
        className="portfolio-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
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
          className="portfolio-modal__close"
          style={{
            position: 'sticky',
            top: '18px',
            float: 'right',
            margin: '18px 22px 0 0',
            zIndex: 220,
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
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
          {/* Imagen real del CMS (cover). Si no hay, placeholder con número. */}
          {hasHeroImage && (
            <Image
              src={project.thumbnailUrl as string}
              alt={project.name}
              fill
              sizes="90vw"
              priority
              style={{ objectFit: 'cover' }}
            />
          )}
          {/* Grid técnico — mismo tratamiento que ProjectCard */}
          <div className="portfolio-card__grid" aria-hidden="true" />
          {/* Frame HUD — visible desde el montaje, sin gate de hover */}
          <span className="portfolio-modal__corner portfolio-modal__corner--tl" aria-hidden="true" />
          <span className="portfolio-modal__corner portfolio-modal__corner--tr" aria-hidden="true" />
          <span className="portfolio-modal__corner portfolio-modal__corner--bl" aria-hidden="true" />
          <span className="portfolio-modal__corner portfolio-modal__corner--br" aria-hidden="true" />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${project.accent}33 0%, transparent 65%)`,
          }} />
          {/* Número — contorno blueprint, solo como placeholder sin imagen */}
          {!hasHeroImage && (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(5rem, 15vw, 12rem)',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.14)',
              letterSpacing: '-.04em',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1,
              opacity: 0.6,
            }}>
              {project.n}
            </span>
          )}
        </motion.div>

        {/* Contenido */}
        <div style={{ padding: '48px 56px 80px', maxWidth: '860px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '.74rem',
            textTransform: 'uppercase',
            letterSpacing: '.08em',
            color: 'var(--accent)',
            border: '1px solid rgba(74,141,255,0.28)',
            padding: '5px 12px 5px 10px',
            borderRadius: 'var(--radius-full)',
            width: 'fit-content',
            marginBottom: '18px',
          }}>
            <span className="portfolio-card__dot" aria-hidden="true" />
            {project.category}
          </span>

          {/* Título — morph desde la card */}
          <motion.h2
            id={titleId}
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
            {project.description}
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
            {project.imageUrls.length > 0
              ? project.imageUrls.map((url, j) => (
                  <div
                    key={j}
                    style={{
                      position: 'relative',
                      minHeight: '240px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={url}
                      alt={`${project.name} — ${j + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))
              : [0, 1].map((j) => (
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
              {project.result}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
