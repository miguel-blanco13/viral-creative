'use client'

import { useEffect, useRef } from 'react'
interface HeroProps {
  t: {
    eyebrow: string
    headline: string
    subhead: string
    scroll: string
    cta: string
  }
  waNumber: string
}

export function Hero({ t, waNumber }: HeroProps) {
  const sceneRef = useRef<HTMLCanvasElement>(null)
  const particleRef = useRef<HTMLCanvasElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const loaderBarRef = useRef<HTMLDivElement>(null)
  const heroInnerRef = useRef<HTMLDivElement>(null)
  const heroScrollRef = useRef<HTMLDivElement>(null)
  const heroPinRef = useRef<HTMLDivElement>(null)
  const sceneProgressRef = useRef(0)
  const prafRef = useRef<number>(0)
  const srafRef = useRef<number>(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  const waHref = `https://wa.me/${waNumber}?text=Hola!+Quiero+cotizar+con+Viral+Creative`

  useEffect(() => {
    const cv = sceneRef.current
    const pcv = particleRef.current
    const loader = loaderRef.current
    const bar = loaderBarRef.current
    if (!cv || !pcv) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ctx = cv.getContext('2d')!
    const pctx = pcv.getContext('2d')!
    let w = 0, h = 0
    const mobile = window.innerWidth < 768
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Particle canvas (ambient dots) ──────────────────────────
    type Dot = { x: number; y: number; vx: number; vy: number; a: number; r: number }
    let dots: Dot[] = []

    const resizeParticles = () => {
      w = window.innerWidth
      h = window.innerHeight
      pcv.width = w * dpr
      pcv.height = h * dpr
      pctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      let count = Math.floor((w * h) / 14000)
      if (mobile || coarse) count = Math.floor(count / 2)
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        a: 0.05 + Math.random() * 0.35, r: Math.random() * 1.4 + 0.4,
      }))
    }
    resizeParticles()

    const loopParticles = () => {
      pctx.clearRect(0, 0, w, h)
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x += w; if (p.x > w) p.x -= w
        if (p.y < 0) p.y += h; if (p.y > h) p.y -= h
        pctx.beginPath(); pctx.arc(p.x, p.y, p.r, 0, 6.283)
        // Azul eléctrico en vez de blanco — no compite con el texto
        pctx.fillStyle = `rgba(74,141,255,${p.a * 0.55})`; pctx.fill()
      }
      prafRef.current = requestAnimationFrame(loopParticles)
    }
    if (!reduced) loopParticles()

    // ── Scene canvas (particle morph) ───────────────────────────
    const sampleShape = (drawFn: (o: CanvasRenderingContext2D) => void, gap: number) => {
      const oc = document.createElement('canvas')
      oc.width = Math.floor(sw); oc.height = Math.floor(sh)
      const o = oc.getContext('2d')!
      o.clearRect(0, 0, sw, sh); o.fillStyle = '#fff'; o.strokeStyle = '#fff'
      drawFn(o)
      const data = o.getImageData(0, 0, oc.width, oc.height).data
      const pts: { x: number; y: number }[] = []
      for (let y = 0; y < oc.height; y += gap) {
        for (let x = 0; x < oc.width; x += gap) {
          if (data[(y * oc.width + x) * 4 + 3] > 128) pts.push({ x, y })
        }
      }
      return pts
    }
    let sw = 0, sh = 0

    const drawIcons = (o: CanvasRenderingContext2D) => {
      // Propuesta A: cámara en columna izquierda, computador en columna derecha.
      // Los iconos flanquean el texto del headline en lugar de quedar detrás.
      const s = Math.min(sw, sh) * (mobile ? 0.11 : 0.13)
      o.lineWidth = Math.max(2.5, s * 0.07)

      // ── Cámara (izquierda) ─────────────────────────────────────
      const mx = mobile ? sw * 0.22 : sw * 0.17
      const my = sh * 0.5
      o.strokeRect(mx - s * 0.9, my - s * 0.62, s * 1.8, s * 1.2)
      o.fillRect(mx - s * 0.22, my + s * 0.6, s * 0.44, s * 0.34)
      o.fillRect(mx - s * 0.55, my + s * 0.92, s * 1.1, s * 0.16)

      // ── Computador (derecha) ───────────────────────────────────
      const kx = mobile ? sw * 0.78 : sw * 0.83
      const ky = sh * 0.5
      o.strokeRect(kx - s * 0.95, ky - s * 0.55, s * 1.9, s * 1.25)
      o.fillRect(kx - s * 0.35, ky - s * 0.85, s * 0.7, s * 0.32)
      o.beginPath(); o.arc(kx, ky + s * 0.08, s * 0.42, 0, 6.283)
      o.lineWidth = Math.max(2.5, s * 0.09); o.stroke()
      o.beginPath(); o.arc(kx, ky + s * 0.08, s * 0.18, 0, 6.283); o.fill()
    }

    const drawWord = (o: CanvasRenderingContext2D) => {
      o.textAlign = 'center'; o.textBaseline = 'middle'
      const fs = Math.min(sw * 0.13, sh * 0.3)
      o.font = `700 ${fs}px 'Space Grotesk', sans-serif`
      o.fillText('VIRAL CREATIVE', sw / 2, sh / 2)
    }

    type Part = { ax: number; ay: number; bx: number; by: number; cx: number; cy: number; ph: number; sp: number; sz: number }
    let A: { x: number; y: number }[] = []
    let C: { x: number; y: number }[] = []
    let parts: Part[] = []
    const N = () => (mobile || coarse ? 500 : 1100)

    const build = () => {
      const gapI = Math.max(4, Math.floor(Math.min(sw, sh) / 150))
      A = sampleShape(drawIcons, gapI)
      C = sampleShape(drawWord, Math.max(4, gapI - 1))
      const n = N()
      parts = Array.from({ length: n }, (_, i) => {
        const a = A.length ? A[Math.floor((i / n) * A.length)] : { x: sw / 2, y: sh / 2 }
        const c = C.length ? C[Math.floor((i / n) * C.length)] : { x: sw / 2, y: sh / 2 }
        return {
          ax: a.x + (Math.random() - 0.5) * 4, ay: a.y + (Math.random() - 0.5) * 4,
          cx: c.x, cy: c.y,
          bx: Math.random() * sw, by: Math.random() * sh,
          ph: Math.random() * 6.283, sp: 0.4 + Math.random() * 0.8, sz: Math.random() * 1.6 + 0.6,
        }
      })
    }

    const resize = () => {
      sw = window.innerWidth; sh = window.innerHeight
      cv.width = sw * dpr; cv.height = sh * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const ez = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    let tprev = performance.now()

    const draw = () => {
      const now = performance.now(); const dt = (now - tprev) / 1000; tprev = now
      ctx.clearRect(0, 0, sw, sh)
      const p = sceneProgressRef.current
      let phase: 'AB' | 'B' | 'BC', t: number
      if (p < 0.22) { phase = 'AB'; t = ez(p / 0.22) }
      else if (p < 0.32) { phase = 'B'; t = 0 }
      // Clampear el INPUT de ez (no el output): ez no está definida para t>1
      // y devuelve valores negativos, causando que las partículas retrocedan.
      // BC completa en p=0.70 → del 70% al 100% t=1, texto estático.
      else { phase = 'BC'; t = ez(Math.min(1, (p - 0.32) / 0.38)) }

      for (const q of parts) {
        let x: number, y: number, alpha: number
        if (phase === 'AB') { x = q.ax + (q.bx - q.ax) * t; y = q.ay + (q.by - q.ay) * t; alpha = 0.85 - 0.45 * t }
        else if (phase === 'B') { q.ph += dt * q.sp; x = q.bx + Math.sin(q.ph) * 8; y = q.by + Math.cos(q.ph * 0.8) * 8; alpha = 0.4 }
        else { x = q.bx + (q.cx - q.bx) * t; y = q.by + (q.cy - q.by) * t; alpha = 0.4 + 0.55 * t }

        ctx.beginPath(); ctx.arc(x, y, q.sz, 0, 6.283)
        if (phase === 'BC') {
          // Morph de azul medio a azul eléctrico brillante — sin blanco
          ctx.fillStyle = `rgba(${Math.round(10 + 64 * t)},${Math.round(84 + 57 * t)},255,${alpha})`
        } else {
          // AB y B: azul eléctrico, más opaco que antes
          ctx.fillStyle = `rgba(74,141,255,${alpha * 0.75})`
        }
        ctx.fill()
        // ↑ Eliminado: segundo fill blanco que causaba el conflicto de contraste
      }
      srafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', () => {
      resizeParticles()
      resize()
    })

    // loader
    let lp = 0
    const li = setInterval(() => {
      lp = Math.min(lp + 12 + Math.random() * 16, 100)
      if (bar) bar.style.width = lp + '%'
      if (lp >= 100) {
        clearInterval(li)
        setTimeout(() => {
          if (loader) {
            loader.style.opacity = '0'
            setTimeout(() => { if (loader) loader.style.display = 'none' }, 600)
          }
        }, 150)
      }
    }, 90)

    if (!reduced) {
      draw()
    } else {
      // static icons only
      for (const q of parts) {
        ctx.beginPath(); ctx.arc(q.ax, q.ay, q.sz, 0, 6.283)
        ctx.fillStyle = 'rgba(74,141,255,0.5)'; ctx.fill()
        ctx.fillStyle = 'rgba(245,247,250,0.4)'; ctx.fill()
      }
    }

    // GSAP scroll tie-in — importa desde @/lib/gsap (registro centralizado)
    const initGsap = async () => {
      if (typeof window === 'undefined') return
      const { gsap, ScrollTrigger } = await import('@/lib/gsap')
      const heroInner = heroInnerRef.current
      const heroScroll = heroScrollRef.current
      const heroPin = heroPinRef.current
      if (!heroPin) return
      const st = ScrollTrigger.create({
        trigger: heroPin,
        start: 'top top',
        end: '+=180%',
        scrub: 1,
        pin: '#hero-section',
        pinSpacing: true,
        onUpdate: (self) => {
          sceneProgressRef.current = self.progress
          const f = Math.min(self.progress / 0.25, 1)
          if (heroInner) { heroInner.style.opacity = String(1 - f); heroInner.style.transform = `translateY(${-f * 40}px)` }
          if (heroScroll) heroScroll.style.opacity = String(self.progress < 0.05 ? 1 : Math.max(0, 1 - self.progress * 6))
          // El overlay debe desvanecerse junto con el texto para no cubrir
          // las secciones siguientes (está en position:fixed como los canvas)
          if (overlayRef.current) overlayRef.current.style.opacity = String(1 - f)
        },
      })
      return () => st.kill()
    }
    initGsap()

    return () => {
      cancelAnimationFrame(prafRef.current)
      cancelAnimationFrame(srafRef.current)
      clearInterval(li)
    }
  }, [])

  return (
    <>
      {/* Scene canvas */}
      <canvas
        ref={sceneRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, display: 'block' }}
      />
      {/* Particle canvas */}
      <canvas
        ref={particleRef}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none', display: 'block' }}
      />

      {/* Loader */}
      <div
        ref={loaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 300, background: 'var(--void)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '20px', transition: 'opacity .6s ease',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-sm)', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          VIRAL CREATIVE
        </span>
        <div style={{ width: '180px', height: '1.5px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
          <div ref={loaderBarRef} style={{ width: '0%', height: '100%', background: 'var(--primary)', boxShadow: 'var(--shadow-glow)', transition: 'width .1s linear' }} />
        </div>
      </div>

      {/* Hero pin wrapper */}
      <div ref={heroPinRef} style={{ position: 'relative', height: '100vh' }}>
        {/* Overlay: oscurece el centro donde vive el texto, deja las
            partículas visibles en los bordes. zIndex 3 = encima de ambos
            canvas (0 y 2) pero debajo del texto (zIndex 4). */}
        {/* Overlay mínimo: solo protege la legibilidad del texto central.
            Mucho más sutil que antes — los iconos ya no están detrás del texto. */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 36% 52% at 50% 48%, rgba(5,5,7,0.5) 0%, rgba(5,5,7,0.12) 60%, transparent 85%)',
          }}
        />

        <section
          id="hero-section"
          style={{
            position: 'relative', height: '100vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 24px',
            zIndex: 4, // encima del overlay
          }}
        >
          <div
            ref={heroInnerRef}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', maxWidth: '1000px', willChange: 'opacity,transform' }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '-.02em', lineHeight: '.95', fontSize: 'var(--text-display)', maxWidth: '16ch',
                background: 'linear-gradient(180deg,#C7D2E0 0%,#F5F7FA 60%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            >
              {t.headline}
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 300, color: 'rgba(245,247,250,0.6)', maxWidth: '34ch', margin: '12px 0' }}>
              {t.subhead}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)',
                  fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 'var(--text-sm)',
                  padding: '14px 32px', borderRadius: 'var(--radius-full)',
                  transition: 'background .2s,transform .2s,box-shadow .2s',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'var(--primary-hover)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = 'var(--shadow-glow)' }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'var(--primary)'; el.style.transform = 'none'; el.style.boxShadow = '' }}
              >
                {t.cta}
              </a>
            </div>
          </div>

          <div
            ref={heroScrollRef}
            style={{ position: 'absolute', bottom: '34px', left: '50%', transform: 'translateX(-50%)', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'opacity .4s' }}
          >
            <span style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.16em' }}>{t.scroll}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: 'vc-chevron 1.8s ease-in-out infinite' }}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </section>
      </div>
    </>
  )
}
