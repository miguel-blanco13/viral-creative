'use client'

import type { MouseEvent } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface MemberT {
  name: string
  role: string
  bio: string
  tags: string[]
}

interface TeamPanelProps {
  member: MemberT
  avatarSrc: string
  index: number
  ref?: React.Ref<HTMLDivElement>
}

// Rango de tilt limitado a ±6° — más que eso deja de leerse "premium" y
// empieza a leerse "gimmick". Ver agent_docs/animation_system.md.
const TILT_RANGE = 12

/**
 * TeamPanel — card individual de "Nuestro equipo".
 *
 * El tilt 3D (rotateX/rotateY) se aplica solo a la capa de imagen, nunca al
 * texto — así el hover se siente "vivo" sin sacrificar la legibilidad del
 * nombre/bio, que permanecen estáticos.
 *
 * El wrapper con [data-avatar-clip] es el target del curtain-reveal que
 * anima Team.tsx vía GSAP ScrollTrigger — se mantiene separado del anillo
 * de glow (que sí es visible desde el inicio) para que el efecto de scroll
 * revele la foto, no el glow ambiental de fondo.
 */
export function TeamPanel({ member, avatarSrc, index, ref }: TeamPanelProps) {
  const shouldReduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.4 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.4 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * TILT_RANGE)
    rotateX.set(py * -TILT_RANGE)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div ref={ref} className="team-panel">
      <div
        className="team-panel__avatar-wrap"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="team-panel__ring" aria-hidden="true" />

        <div data-avatar-clip style={{ position: 'absolute', inset: 0 }}>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 800,
            }}
          >
            <Image
              src={avatarSrc}
              alt={`${member.name} — ${member.role}`}
              fill
              sizes="(min-width: 860px) 50vw, 100vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </motion.div>
        </div>
      </div>

      <div className="team-panel__body">
        <h3
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'var(--text-h3)', color: 'var(--light-text)', lineHeight: 1.1,
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'var(--text-sm)', color: 'var(--primary)',
            textTransform: 'uppercase', letterSpacing: '.06em', marginTop: '6px',
          }}
        >
          {member.role}
        </p>

        <p style={{ fontSize: 'var(--text-base)', color: '#5B6577', lineHeight: 1.6, marginTop: '14px' }}>
          {member.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
          {member.tags.map((tag) => (
            <span key={tag} className="team-panel__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
