'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenisStore } from '@/lib/lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScroll — Lenis sincronizado con GSAP ScrollTrigger sobre un único
 * ticker (requestAnimationFrame). Esto da el scroll "mantequilla" premium.
 * Respeta prefers-reduced-motion: si está activo, NO inicializa el smooth scroll.
 *
 * La instancia se registra en lenisStore para que modales y overlays puedan
 * llamar stop()/start() sin prop drilling.
 *
 * Envuelve los children en el layout raíz: <SmoothScroll>{children}</SmoothScroll>
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisStore.set(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenisStore.destroy()
    }
  }, [])

  return <>{children}</>
}
