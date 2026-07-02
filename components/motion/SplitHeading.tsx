'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap, SplitText } from '@/lib/gsap'

interface SplitHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  splitBy?: 'chars' | 'words' | 'lines'
  stagger?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export function SplitHeading({
  children,
  as: Tag = 'h2',
  splitBy = 'chars',
  stagger = 0.03,
  delay = 0,
  className,
  style,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || shouldReduce) return

    // Variables declaradas fuera del rAF para que el cleanup las alcance
    let split: InstanceType<typeof SplitText> | null = null
    let tween: gsap.core.Tween | null = null
    // requestAnimationFrame garantiza que el navegador pintó el layout y
    // las fuentes están disponibles — sin necesidad de .then() asíncrono.
    // Esto hace que el cleanup sea síncrono y React Strict Mode funcione.
    const raf = requestAnimationFrame(() => {
      if (!ref.current) return

      split = new SplitText(el, { type: splitBy })

      const targets =
        splitBy === 'chars'
          ? split.chars
          : splitBy === 'words'
            ? split.words
            : split.lines

      // gsap.set antes del tween: el texto arranca invisible SIN usar
      // visibility:hidden — así el SSR lo muestra y hydration no lo oculta.
      gsap.set(targets, {
        opacity: 0,
        y: splitBy === 'lines' ? 48 : 24,
        rotateX: splitBy === 'chars' ? -40 : 0,
        transformOrigin: '50% 50% -30px',
      })

      tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: splitBy === 'chars' ? 0.65 : 0.75,
        delay,
        stagger,
        ease: 'power3.out',
      })
    })

    // Cleanup correcto: React sí puede llamar esta función al desmontar
    return () => {
      cancelAnimationFrame(raf)
      tween?.kill()
      split?.revert()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReduce, splitBy, stagger, delay])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
