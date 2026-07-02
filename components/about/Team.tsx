'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { TeamPanel } from './TeamPanel'
import type { TeamMemberVM } from '@/lib/content-types'

interface TeamProps {
  members: TeamMemberVM[]
  t: {
    label: string
    title: string
    sub: string
  }
}

// Avatares por defecto (cuando el miembro no tiene foto en el CMS).
// PNG fuente 1024x1024; next/image los sirve como WebP/AVIF en runtime.
const AVATAR_FALLBACK = ['/team/estrategia-digital.png', '/team/desarrollo-web.png']

export function Team({ members, t }: TeamProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    // Reduced motion: los avatares se quedan sin clip-path (visibles al
    // 100% desde el primer render) — nunca se ejecuta gsap.set.
    if (shouldReduce) return

    const clips = panelRefs.current
      .filter((el): el is HTMLDivElement => el !== null)
      .map((el) => el.querySelector<HTMLDivElement>('[data-avatar-clip]'))
      .filter((el): el is HTMLDivElement => el !== null)

    if (clips.length === 0) return

    gsap.set(clips, { clipPath: 'inset(0% 0% 100% 0%)' })

    // Reveal disparado una sola vez al entrar al viewport — mismo contrato
    // que Reveal.tsx (start 'top 85%', toggleActions play-once). Se
    // descartó el pin+scrub original: exigía scroll sostenido para un
    // cambio apenas perceptible al inicio y se leía como un fallo de
    // carga, no como un efecto intencional.
    const tweens = clips.map((clip, i) =>
      gsap.to(clip, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        delay: i * 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: clip,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }),
    )

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    }
  }, [shouldReduce])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--light-bg)',
        padding: '128px 40px',
        color: 'var(--light-text)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal from="up" delay={0}>
          <p
            style={{
              color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500,
              marginBottom: '20px',
            }}
          >
            {t.label}
          </p>
        </Reveal>

        <SplitHeading
          as="h2"
          splitBy="words"
          stagger={0.07}
          delay={0.1}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-.02em', lineHeight: '.98', fontSize: 'var(--text-display)',
            color: 'var(--light-text)', maxWidth: '16ch', perspective: '600px',
          }}
        >
          {t.title}
        </SplitHeading>

        <Reveal from="up" delay={0.2}>
          <p style={{ color: '#5B6577', fontSize: 'var(--text-lg)', marginTop: '24px', maxWidth: '48ch' }}>
            {t.sub}
          </p>
        </Reveal>

        {/* Paneles de miembros */}
        <div className="team-panels" style={{ marginTop: '64px' }}>
          {members.map((member, i) => (
            <Reveal key={member.id} from="up" delay={i * 0.12} start="top 88%">
              <TeamPanel
                ref={(el) => { panelRefs.current[i] = el }}
                member={member}
                avatarSrc={member.photoUrl ?? AVATAR_FALLBACK[i] ?? AVATAR_FALLBACK[0]}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
