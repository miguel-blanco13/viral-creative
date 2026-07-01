'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface RevealProps {
  children: React.ReactNode
  /** Delay antes de animar (segundos). Útil para staggers manuales entre hermanos. */
  delay?: number
  /** Dirección de entrada: 'up' (default) | 'left' | 'right' | 'none' */
  from?: 'up' | 'left' | 'right' | 'none'
  /** Distancia en px del desplazamiento inicial */
  distance?: number
  /** Duración de la animación (segundos) */
  duration?: number
  /** Punto de inicio del ScrollTrigger. Default: 'top 88%' */
  start?: string
  /** Tag HTML del wrapper. Default: 'div' */
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

/**
 * Reveal — Wrapper de entrada al scroll con GSAP ScrollTrigger.
 *
 * Principio de diseño: cada sección arranca invisible (opacity 0 + offset),
 * y anima a su estado natural al entrar al viewport. El efecto es sutil —
 * 40px de movimiento, no 120px. La percepción de "premium" viene de la
 * curva (power3.out) y del timing, no de la distancia.
 *
 * Uso básico:
 *   <Reveal><h2>Título</h2></Reveal>
 *
 * Stagger manual entre cards:
 *   {items.map((item, i) => (
 *     <Reveal key={item.id} delay={i * 0.1}>
 *       <Card item={item} />
 *     </Reveal>
 *   ))}
 *
 * Limpieza: ScrollTrigger.kill() en cleanup para no acumular instancias
 * entre navegaciones (problema conocido con Next.js App Router).
 */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  distance = 40,
  duration = 0.8,
  start = 'top 88%',
  as: Tag = 'div',
  className,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || shouldReduce) return

    const fromVars: gsap.TweenVars = { opacity: 0 }
    if (from === 'up') fromVars.y = distance
    if (from === 'left') fromVars.x = -distance
    if (from === 'right') fromVars.x = distance

    // Separar set inicial del tween con ScrollTrigger.
    // gsap.set() aplica el estado inicial síncronamente (el elemento arranca
    // invisible). gsap.to() con ScrollTrigger anima al estado final cuando
    // el trigger dispara — incluyendo elementos ya en el viewport al cargar.
    gsap.set(el, fromVars)

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [shouldReduce, delay, from, distance, duration, start])

  const Component = Tag as React.ElementType
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Component ref={ref as any} className={className} style={style}>
      {children}
    </Component>
  )
}

/**
 * RevealGroup — Aplica stagger automático a una lista de children.
 *
 * Cada child directo recibe un Reveal con delay incremental.
 * Evita tener que escribir el delay manualmente en cada item.
 *
 * Uso:
 *   <RevealGroup stagger={0.12}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </RevealGroup>
 */
export function RevealGroup({
  children,
  stagger = 0.1,
  from = 'up',
  start = 'top 85%',
}: {
  children: React.ReactNode
  stagger?: number
  from?: RevealProps['from']
  start?: string
}) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <>
      {items.map((child, i) => (
        <Reveal key={i} delay={i * stagger} from={from} start={start}>
          {child}
        </Reveal>
      ))}
    </>
  )
}
