'use client'

import { useEffect, useRef } from 'react'
import { STEPS } from './data'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'

interface ProcessProps {
  locale: string
  t: {
    label: string
    title: string
  }
}

// % de la línea en que se activa cada nodo (centrado en cada cuarto)
const NODE_THRESHOLDS = [10, 35, 60, 85]

export function Process({ locale, t }: ProcessProps) {
  const fillRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs  = useRef<(HTMLSpanElement | null)[]>([])
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activated = useRef([false, false, false, false])
  const es = locale === 'es'

  useEffect(() => {
    const initGsap = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap')
      const fill = fillRef.current
      const wrap = wrapRef.current
      if (!fill || !wrap) return

      gsap.set(fill, { width: '0%' })

      const activateNode = (i: number) => {
        const dot  = dotRefs.current[i]
        const ring = ringRefs.current[i]
        if (!dot || !ring) return

        // Rellena el nodo interno
        dot.style.background    = 'var(--primary)'
        dot.style.borderColor   = 'var(--primary)'
        dot.style.boxShadow     = '0 0 0 4px rgba(10,132,255,0.18)'

        // Anillo exterior: pulso continuo tipo sonar
        gsap.fromTo(
          ring,
          { scale: 1, opacity: 0.7 },
          { scale: 2.6, opacity: 0, duration: 1.4, ease: 'power2.out', repeat: -1 }
        )
      }

      const deactivateNode = (i: number) => {
        const dot  = dotRefs.current[i]
        const ring = ringRefs.current[i]
        if (!dot || !ring) return
        dot.style.background  = 'rgba(10,132,255,0.12)'
        dot.style.borderColor = 'rgba(10,132,255,0.25)'
        dot.style.boxShadow   = 'none'
        gsap.killTweensOf(ring)
        gsap.set(ring, { scale: 1, opacity: 0 })
      }

      gsap.to(fill, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          // Problema 1 resuelto: el efecto inicia antes de que la sección
          // haya terminado de entrar al viewport.
          start: 'top 95%',
          end: 'bottom 65%',
          scrub: 1,
          onUpdate(self) {
            const pct = self.progress * 100
            NODE_THRESHOLDS.forEach((threshold, i) => {
              if (pct >= threshold && !activated.current[i]) {
                activated.current[i] = true
                activateNode(i)
              }
              if (pct < threshold && activated.current[i]) {
                activated.current[i] = false
                deactivateNode(i)
              }
            })
          },
        },
      })
    }
    initGsap()
  }, [])

  return (
    <section id="proceso" style={{ position: 'relative', background: 'var(--void)', padding: '128px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal from="up" delay={0}>
          <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '20px' }}>
            {t.label}
          </p>
        </Reveal>

        <SplitHeading
          as="h2"
          splitBy="words"
          stagger={0.07}
          delay={0.1}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)',
            lineHeight: 1.02, letterSpacing: '-.02em', color: '#fff', maxWidth: '16ch',
            perspective: '600px',
          }}
        >
          {t.title}
        </SplitHeading>

        <div ref={wrapRef} style={{ position: 'relative', marginTop: '72px' }}>

          {/* ── Línea de progreso (Opción A: simple, sin pulse dot) ─ */}
          <div style={{ position: 'relative', height: '2px', background: 'rgba(210,215,226,0.1)', borderRadius: '2px', marginBottom: '28px' }}>
            <div
              ref={fillRef}
              style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '0%', background: 'var(--primary)', borderRadius: '2px' }}
            />
          </div>

          {/* ── Grid de pasos ─────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '28px', position: 'relative' }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} from="up" delay={i * 0.1} start="top 92%">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>

                  {/* Nodo: anillo exterior (sonar) + punto interior */}
                  <div style={{ position: 'relative', width: '16px', height: '16px', marginBottom: '14px', flexShrink: 0 }}>
                    {/* Anillo exterior pulsante — activado por GSAP */}
                    <span
                      ref={el => { ringRefs.current[i] = el }}
                      style={{
                        position: 'absolute', inset: '-1px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        opacity: 0,
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Punto interior */}
                    <span
                      ref={el => { dotRefs.current[i] = el }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        background: 'rgba(10,132,255,0.12)',
                        border: '2px solid rgba(10,132,255,0.25)',
                        transition: 'background .4s ease, border-color .4s ease, box-shadow .4s ease',
                        display: 'block',
                      }}
                    />
                  </div>

                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)', color: 'var(--primary)', lineHeight: 1 }}>
                    {s.n}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3)', color: '#fff' }}>
                    {es ? s.es : s.en}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: 'var(--text-base)', lineHeight: 1.5 }}>
                    {es ? s.dEs : s.dEn}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
