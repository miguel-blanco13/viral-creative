'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface CountUpProps {
  /** Valor numérico final */
  target: number
  /** Sufijo a mostrar ('+', '%', 'k', etc.) */
  suffix?: string
  /** Prefijo a mostrar ('$', etc.) */
  prefix?: string
  /** Duración de la animación en segundos */
  duration?: number
  /** Punto de inicio del ScrollTrigger */
  start?: string
  /** Estilos inline para el contenedor del número */
  style?: React.CSSProperties
  className?: string
}

/**
 * CountUp — Anima un número del 0 al valor objetivo cuando entra al viewport.
 *
 * Usa GSAP ScrollTrigger (no IntersectionObserver) para mantenerse sincronizado
 * con el ticker de Lenis. La animación usa ease 'power2.out' para desacelerarse
 * al llegar al número final — más natural que una curva lineal.
 *
 * Respeta prefers-reduced-motion: muestra el valor final directamente.
 */
export function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 1.8,
  start = 'top 85%',
  style,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (shouldReduce) {
      el.textContent = `${prefix}${target}${suffix}`
      return
    }

    // GSAP anima un objeto proxy {val: 0} y actualiza el DOM en onUpdate.
    // Esto evita parseFloat en cada frame — más eficiente que animar textContent.
    const proxy = { val: 0 }

    const tween = gsap.to(proxy, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
      onUpdate() {
        if (el) el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`
      },
      onComplete() {
        // Valor exacto al terminar (evita redondeo en el último frame)
        if (el) el.textContent = `${prefix}${target}${suffix}`
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [shouldReduce, target, suffix, prefix, duration, start])

  return (
    <span ref={ref} className={className} style={style}>
      {/* Valor inicial visible antes de que GSAP tome control — evita layout shift */}
      {shouldReduce ? `${prefix}${target}${suffix}` : `${prefix}0${suffix}`}
    </span>
  )
}
