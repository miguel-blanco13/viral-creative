'use client'

import { useEffect, useRef } from 'react'
import { CtaButton } from '@/components/ui/CtaButton'
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

    // ── Ruido simplex 2D (sin dependencias) — trayectorias orgánicas ──
    // Alternativa a Math.random puro: las partículas dispersan en una nube
    // coherente y flotan con movimiento continuo en lugar de temblar al azar.
    const makeNoise = () => {
      const p = Array.from({ length: 256 }, (_, i) => i)
      for (let i = 255; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const tmp = p[i]; p[i] = p[j]; p[j] = tmp }
      const perm = new Uint8Array(512)
      for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
      const grad = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
      const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6
      return (xin: number, yin: number) => {
        const s = (xin + yin) * F2
        const i = Math.floor(xin + s), j = Math.floor(yin + s)
        const t0 = (i + j) * G2
        const x0 = xin - (i - t0), y0 = yin - (j - t0)
        const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1
        const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2
        const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2
        const ii = i & 255, jj = j & 255
        const g0 = grad[perm[ii + perm[jj]] & 7]
        const g1 = grad[perm[ii + i1 + perm[jj + j1]] & 7]
        const g2 = grad[perm[ii + 1 + perm[jj + 1]] & 7]
        let n0 = 0, n1 = 0, n2 = 0, tt = 0
        tt = 0.5 - x0 * x0 - y0 * y0; if (tt > 0) { tt *= tt; n0 = tt * tt * (g0[0] * x0 + g0[1] * y0) }
        tt = 0.5 - x1 * x1 - y1 * y1; if (tt > 0) { tt *= tt; n1 = tt * tt * (g1[0] * x1 + g1[1] * y1) }
        tt = 0.5 - x2 * x2 - y2 * y2; if (tt > 0) { tt *= tt; n2 = tt * tt * (g2[0] * x2 + g2[1] * y2) }
        return 70 * (n0 + n1 + n2)
      }
    }
    const noise = makeNoise()

    // ── Sprite de brillo radial pre-renderizado — glow por partícula barato ──
    // Un drawImage escalado es mucho más económico que shadowBlur por arco.
    const glow = document.createElement('canvas'); glow.width = glow.height = 32
    const ggx = glow.getContext('2d')!
    const gGrad = ggx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gGrad.addColorStop(0, 'rgba(198,222,255,0.95)')
    gGrad.addColorStop(0.4, 'rgba(74,141,255,0.45)')
    gGrad.addColorStop(1, 'rgba(74,141,255,0)')
    ggx.fillStyle = gGrad; ggx.fillRect(0, 0, 32, 32)

    // ── Layout compartido: MISMAS coords para partículas y capa vectorial ──
    // Single source of truth de posición/escala: garantiza que las líneas HUD
    // nítidas caigan exactamente bajo la silueta de partículas.
    type Layout = { s: number; mx: number; my: number; kx: number; ky: number }
    let L: Layout = { s: 0, mx: 0, my: 0, kx: 0, ky: 0 }
    const computeLayout = () => {
      const s = Math.min(sw, sh) * (mobile ? 0.11 : 0.13)
      L = { s, mx: mobile ? sw * 0.22 : sw * 0.17, my: sh * 0.5, kx: mobile ? sw * 0.78 : sw * 0.83, ky: sh * 0.5 }
    }

    // ── Utilidades HUD ──
    const chamfer = (o: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: number) => {
      o.beginPath()
      o.moveTo(x + c, y); o.lineTo(x + w - c, y); o.lineTo(x + w, y + c)
      o.lineTo(x + w, y + h - c); o.lineTo(x + w - c, y + h); o.lineTo(x + c, y + h)
      o.lineTo(x, y + h - c); o.lineTo(x, y + c); o.closePath()
    }
    const corner = (o: CanvasRenderingContext2D, x: number, y: number, len: number, sx: number, sy: number) => {
      o.beginPath(); o.moveTo(x + len * sx, y); o.lineTo(x, y); o.lineTo(x, y + len * sy); o.stroke()
    }

    // ── Silueta muestreada por las partículas (drawIcons) ───────────────
    // Geometría angular tipo FUI: chaflanes, doble marco, anillos de lente.
    // Cuanto más rica la silueta, más definida la nube de partículas.
    const drawIcons = (o: CanvasRenderingContext2D) => {
      const { s, mx, my, kx, ky } = L

      // ── Cámara cinematográfica futurista (izquierda) ──
      const cw = s * 2.1, ch = s * 1.3
      o.lineWidth = Math.max(2.5, s * 0.08)
      chamfer(o, mx - cw / 2, my - ch / 2, cw, ch, s * 0.2); o.stroke()
      o.beginPath(); o.moveTo(mx - cw * 0.3, my - ch / 2); o.lineTo(mx - cw * 0.22, my - ch / 2 - s * 0.28)
      o.lineTo(mx + cw * 0.05, my - ch / 2 - s * 0.28); o.lineTo(mx + cw * 0.12, my - ch / 2); o.stroke()
      const lx = mx + s * 0.15, ly = my + s * 0.05
      o.lineWidth = Math.max(2.5, s * 0.09)
      o.beginPath(); o.arc(lx, ly, s * 0.62, 0, 6.283); o.stroke()
      o.beginPath(); o.arc(lx, ly, s * 0.46, 0, 6.283); o.stroke()
      o.beginPath(); o.arc(lx, ly, s * 0.3, 0, 6.283); o.stroke()
      o.beginPath(); o.arc(lx, ly, s * 0.12, 0, 6.283); o.fill()
      o.lineWidth = Math.max(2, s * 0.05)
      o.strokeRect(mx - cw / 2 + s * 0.14, my + ch / 2 - s * 0.34, s * 0.4, s * 0.18)

      // ── Monitor profesional del futuro (derecha) ──
      const mw = s * 2.0, mh = s * 1.35, mxx = kx - mw / 2, myy = ky - mh / 2 - s * 0.1
      o.lineWidth = Math.max(2.5, s * 0.07)
      chamfer(o, mxx, myy, mw, mh, s * 0.18); o.stroke()
      chamfer(o, mxx + s * 0.12, myy + s * 0.12, mw - s * 0.24, mh - s * 0.24, s * 0.12); o.stroke()
      o.lineWidth = Math.max(2, s * 0.04)
      for (let i = 1; i <= 4; i++) { const yl = myy + (mh / 5) * i; o.beginPath(); o.moveTo(mxx + s * 0.3, yl); o.lineTo(mxx + mw * (0.35 + (i % 2) * 0.2), yl); o.stroke() }
      o.lineWidth = Math.max(2.5, s * 0.06)
      o.beginPath(); o.moveTo(kx - s * 0.16, myy + mh); o.lineTo(kx - s * 0.22, myy + mh + s * 0.32)
      o.lineTo(kx + s * 0.22, myy + mh + s * 0.32); o.lineTo(kx + s * 0.16, myy + mh); o.stroke()
      o.beginPath(); o.moveTo(kx - s * 0.5, myy + mh + s * 0.34); o.lineTo(kx + s * 0.5, myy + mh + s * 0.34); o.stroke()
    }

    // ── Capa vectorial HUD nítida (con glow) — pre-renderizada una vez ──
    const BLUE = '#4A8DFF', HOT = '#BFD8FF', DEEP = '#0A84FF'
    const drawComputerVector = (o: CanvasRenderingContext2D) => {
      const { kx: cx, ky: cy, s } = L
      const w = s * 2.0, h = s * 1.35, x = cx - w / 2, y = cy - h / 2 - s * 0.1
      o.save()
      o.shadowColor = DEEP; o.shadowBlur = s * 0.5
      o.strokeStyle = BLUE; o.lineWidth = Math.max(1.5, s * 0.05)
      chamfer(o, x, y, w, h, s * 0.18); o.stroke()
      o.lineWidth = Math.max(1, s * 0.03)
      chamfer(o, x + s * 0.1, y + s * 0.1, w - s * 0.2, h - s * 0.2, s * 0.13); o.stroke()
      const px = x + s * 0.22, py = y + s * 0.22, pw = w - s * 0.44, ph = h - s * 0.44
      o.shadowBlur = s * 0.25
      o.strokeStyle = 'rgba(74,141,255,0.7)'; o.lineWidth = Math.max(0.8, s * 0.02)
      for (let i = 1; i <= 5; i++) { const yl = py + (ph / 6) * i; o.beginPath(); o.moveTo(px + s * 0.1, yl); o.lineTo(px + pw * (0.3 + (i % 3) * 0.18), yl); o.stroke() }
      o.strokeRect(px + pw * 0.62, py + s * 0.12, pw * 0.28, ph * 0.22)
      o.strokeRect(px + pw * 0.62, py + ph * 0.42, pw * 0.28, ph * 0.3)
      o.strokeStyle = HOT; o.lineWidth = Math.max(1, s * 0.03); o.shadowColor = BLUE; o.shadowBlur = s * 0.4
      o.beginPath(); o.moveTo(px + s * 0.1, py + ph * 0.5); o.lineTo(px + pw * 0.45, py + ph * 0.5); o.stroke()
      o.lineWidth = Math.max(1, s * 0.035)
      const b = s * 0.22
      corner(o, px, py, b, 1, 1); corner(o, px + pw, py, b, -1, 1)
      corner(o, px, py + ph, b, 1, -1); corner(o, px + pw, py + ph, b, -1, -1)
      o.strokeStyle = BLUE; o.lineWidth = Math.max(1.5, s * 0.05); o.shadowBlur = s * 0.3
      o.beginPath(); o.moveTo(cx - s * 0.14, y + h); o.lineTo(cx - s * 0.2, y + h + s * 0.32)
      o.lineTo(cx + s * 0.2, y + h + s * 0.32); o.lineTo(cx + s * 0.14, y + h); o.stroke()
      o.beginPath(); o.moveTo(cx - s * 0.5, y + h + s * 0.34); o.lineTo(cx + s * 0.5, y + h + s * 0.34); o.stroke()
      o.strokeStyle = HOT; o.lineWidth = Math.max(1, s * 0.03)
      o.beginPath(); o.moveTo(cx - s * 0.3, y); o.lineTo(cx - s * 0.2, y - s * 0.1); o.lineTo(cx + s * 0.2, y - s * 0.1); o.lineTo(cx + s * 0.3, y); o.stroke()
      o.restore()
    }
    const drawCameraVector = (o: CanvasRenderingContext2D) => {
      const { mx: cx, my: cy, s } = L
      const w = s * 2.1, h = s * 1.3, x = cx - w / 2, y = cy - h / 2
      o.save()
      o.shadowColor = DEEP; o.shadowBlur = s * 0.5
      o.strokeStyle = BLUE; o.lineWidth = Math.max(1.5, s * 0.05)
      chamfer(o, x, y, w, h, s * 0.2); o.stroke()
      o.beginPath(); o.moveTo(x + w * 0.2, y); o.lineTo(x + w * 0.28, y - s * 0.28)
      o.lineTo(x + w * 0.55, y - s * 0.28); o.lineTo(x + w * 0.62, y); o.stroke()
      o.lineWidth = Math.max(1, s * 0.03)
      o.strokeRect(x + w * 0.7, y - s * 0.18, w * 0.22, s * 0.14)
      const lx = cx + s * 0.15, ly = cy + s * 0.05, R = s * 0.62
      o.shadowBlur = s * 0.5; o.shadowColor = BLUE
      o.strokeStyle = BLUE; o.lineWidth = Math.max(1.5, s * 0.06)
      o.beginPath(); o.arc(lx, ly, R, 0, 6.283); o.stroke()
      o.lineWidth = Math.max(1, s * 0.035)
      o.beginPath(); o.arc(lx, ly, R * 0.76, 0, 6.283); o.stroke()
      o.strokeStyle = HOT; o.lineWidth = Math.max(1, s * 0.03)
      o.beginPath(); o.arc(lx, ly, R * 0.52, 0, 6.283); o.stroke()
      o.fillStyle = 'rgba(10,132,255,0.35)'; o.beginPath(); o.arc(lx, ly, R * 0.34, 0, 6.283); o.fill()
      o.fillStyle = HOT; o.shadowColor = HOT; o.shadowBlur = s * 0.6
      o.beginPath(); o.arc(lx, ly, R * 0.16, 0, 6.283); o.fill()
      o.strokeStyle = 'rgba(191,216,255,0.8)'; o.lineWidth = Math.max(0.8, s * 0.02); o.shadowBlur = s * 0.2
      for (let a = 0; a < 24; a++) { const an = (a / 24) * 6.283; const r1 = R * 0.86, r2 = R * (a % 2 ? 0.93 : 0.98); o.beginPath(); o.moveTo(lx + Math.cos(an) * r1, ly + Math.sin(an) * r1); o.lineTo(lx + Math.cos(an) * r2, ly + Math.sin(an) * r2); o.stroke() }
      o.strokeStyle = BLUE; o.lineWidth = Math.max(1, s * 0.025); o.shadowBlur = s * 0.15
      o.strokeRect(x + s * 0.14, y + h - s * 0.34, s * 0.4, s * 0.18)
      o.beginPath(); o.arc(x + s * 0.26, y + s * 0.26, s * 0.08, 0, 6.283); o.stroke()
      o.strokeStyle = HOT
      o.beginPath(); o.moveTo(x + w - s * 0.5, y + s * 0.2); o.lineTo(x + w - s * 0.16, y + s * 0.2); o.stroke()
      o.restore()
    }
    let deviceLayer: HTMLCanvasElement | null = null
    const buildDeviceLayer = () => {
      const c = document.createElement('canvas')
      c.width = Math.max(1, Math.floor(sw * dpr)); c.height = Math.max(1, Math.floor(sh * dpr))
      const o = c.getContext('2d')!
      o.setTransform(dpr, 0, 0, dpr, 0, 0)
      o.lineJoin = 'round'; o.lineCap = 'round'
      drawCameraVector(o); drawComputerVector(o)
      deviceLayer = c
    }

    // ── Bounding box del wordmark (mismo font/posición que drawWord) ──
    type WordBox = { cx: number; cy: number; w: number; h: number; fs: number }
    let W: WordBox = { cx: 0, cy: 0, w: 0, h: 0, fs: 0 }
    const measureWord = () => {
      const fs = wordFontSize()
      ctx.save(); ctx.font = `700 ${fs}px 'Space Grotesk', sans-serif`
      const m = ctx.measureText('VIRAL CREATIVE'); ctx.restore()
      W = { cx: sw / 2, cy: sh / 2, w: m.width, h: fs * 0.72, fs }
    }

    // ── Chrome HUD del wordmark — mismo lenguaje que los dispositivos ──
    // Se pre-renderiza la parte estática (corchetes, rieles, barra, ticks).
    let wordLayer: HTMLCanvasElement | null = null
    const buildWordLayer = () => {
      const c = document.createElement('canvas')
      c.width = Math.max(1, Math.floor(sw * dpr)); c.height = Math.max(1, Math.floor(sh * dpr))
      const o = c.getContext('2d')!
      o.setTransform(dpr, 0, 0, dpr, 0, 0)
      o.lineJoin = 'round'; o.lineCap = 'round'
      const pad = W.fs * 0.42
      const bx = W.cx - W.w / 2 - pad, by = W.cy - W.h / 2 - pad * 0.5
      const bw = W.w + pad * 2, bh = W.h + pad
      const g = W.fs * 0.4
      const lw = Math.max(1.5, W.fs * 0.02)
      o.save()
      o.shadowColor = DEEP; o.shadowBlur = W.fs * 0.3
      // Corchetes de esquina (lock-on)
      o.strokeStyle = HOT; o.lineWidth = lw * 1.4
      corner(o, bx, by, g, 1, 1); corner(o, bx + bw, by, g, -1, 1)
      corner(o, bx, by + bh, g, 1, -1); corner(o, bx + bw, by + bh, g, -1, -1)
      // Rieles laterales
      o.strokeStyle = BLUE; o.lineWidth = lw
      o.beginPath(); o.moveTo(bx, W.cy - g * 0.4); o.lineTo(bx, W.cy + g * 0.4); o.stroke()
      o.beginPath(); o.moveTo(bx + bw, W.cy - g * 0.4); o.lineTo(bx + bw, W.cy + g * 0.4); o.stroke()
      // Barra de energía inferior + segmento brillante
      const baseY = by + bh + pad * 0.35
      o.strokeStyle = 'rgba(74,141,255,0.55)'; o.lineWidth = lw
      o.beginPath(); o.moveTo(bx, baseY); o.lineTo(bx + bw, baseY); o.stroke()
      o.strokeStyle = HOT; o.lineWidth = lw * 1.2; o.shadowBlur = W.fs * 0.25
      o.beginPath(); o.moveTo(bx, baseY); o.lineTo(bx + bw * 0.32, baseY); o.stroke()
      // Ticks de medición
      o.strokeStyle = 'rgba(191,216,255,0.7)'; o.lineWidth = Math.max(1, W.fs * 0.012); o.shadowBlur = 0
      const ticks = 28
      for (let i = 0; i <= ticks; i++) { const tx = bx + (bw / ticks) * i; const th = i % 4 === 0 ? W.fs * 0.12 : W.fs * 0.06; o.beginPath(); o.moveTo(tx, baseY + W.fs * 0.05); o.lineTo(tx, baseY + W.fs * 0.05 + th); o.stroke() }
      o.restore()
      wordLayer = c
    }

    // Ajusta el tamaño para que wordmark + chrome quepan al ~90% del ancho.
    // Evita que "VIRAL CREATIVE" y sus corchetes se corten en pantallas anchas.
    const wordFontSize = () => {
      const fs0 = Math.min(sw * 0.13, sh * 0.3)
      ctx.save(); ctx.font = `700 ${fs0}px 'Space Grotesk', sans-serif`
      const w0 = ctx.measureText('VIRAL CREATIVE').width; ctx.restore()
      return fs0 * Math.min(1, (sw * 0.9) / (w0 + 0.84 * fs0))
    }
    const drawWord = (o: CanvasRenderingContext2D) => {
      o.textAlign = 'center'; o.textBaseline = 'middle'
      const fs = wordFontSize()
      o.font = `700 ${fs}px 'Space Grotesk', sans-serif`
      o.fillText('VIRAL CREATIVE', sw / 2, sh / 2)
    }

    // dz = profundidad Z [0..1] → modula tamaño, brillo y parallax
    // nx/ny = coordenadas de muestreo de ruido propias de cada partícula
    type Part = { ax: number; ay: number; bx: number; by: number; cx: number; cy: number; ph: number; sp: number; sz: number; dz: number; nx: number; ny: number }
    let A: { x: number; y: number }[] = []
    let C: { x: number; y: number }[] = []
    let parts: Part[] = []
    let links: [number, number][] = []
    const N = () => (mobile || coarse ? 800 : 2000)

    const build = () => {
      computeLayout()
      const gapI = Math.max(3, Math.floor(Math.min(sw, sh) / 200))
      A = sampleShape(drawIcons, gapI)
      C = sampleShape(drawWord, Math.max(3, gapI - 1))
      const n = N()
      const minWH = Math.min(sw, sh)
      parts = Array.from({ length: n }, (_, i) => {
        const a = A.length ? A[Math.floor((i / n) * A.length)] : { x: sw / 2, y: sh / 2 }
        const c = C.length ? C[Math.floor((i / n) * C.length)] : { x: sw / 2, y: sh / 2 }
        const dz = Math.random()
        // Dispersión coherente: el destino "B" se decide por el ruido en la
        // posición de origen, no por random puro → nube inteligente, no ruido.
        const ang = noise(a.x * 0.0035, a.y * 0.0035) * Math.PI * 2
        const rad = (0.28 + Math.random() * 0.5) * minWH
        return {
          ax: a.x + (Math.random() - 0.5) * 4, ay: a.y + (Math.random() - 0.5) * 4,
          cx: c.x, cy: c.y,
          bx: Math.min(sw, Math.max(0, sw / 2 + Math.cos(ang) * rad)),
          by: Math.min(sh, Math.max(0, sh / 2 + Math.sin(ang) * rad * 0.7)),
          ph: Math.random() * 6.283, sp: 0.4 + Math.random() * 0.8,
          sz: (Math.random() * 1.5 + 0.5) * (0.7 + dz * 0.7), dz,
          nx: Math.random() * 100, ny: Math.random() * 100,
        }
      })
      // Enlaces de constelación entre partículas vecinas EN EL DISPOSITIVO.
      // Precomputado con hashing espacial (O(n)) para evitar O(n²) por frame.
      links = []
      const cell = Math.max(12, minWH / 40)
      const grid = new Map<string, number[]>()
      parts.forEach((q, idx) => {
        const k = `${(q.ax / cell) | 0},${(q.ay / cell) | 0}`
        let arr = grid.get(k); if (!arr) { arr = []; grid.set(k, arr) }
        arr.push(idx)
      })
      const maxLinks = Math.floor(n * 0.45)
      for (let i = 0; i < parts.length && links.length < maxLinks; i++) {
        const q = parts[i]; const gx = (q.ax / cell) | 0, gy = (q.ay / cell) | 0
        let best = -1, bd = cell * cell
        for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
          const arr = grid.get(`${gx + ox},${gy + oy}`); if (!arr) continue
          for (const j of arr) {
            if (j <= i) continue
            const dx = parts[j].ax - q.ax, dy = parts[j].ay - q.ay; const d = dx * dx + dy * dy
            if (d < bd) { bd = d; best = j }
          }
        }
        if (best >= 0) links.push([i, best])
      }
    }

    const resize = () => {
      sw = window.innerWidth; sh = window.innerHeight
      cv.width = sw * dpr; cv.height = sh * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      buildDeviceLayer()
      measureWord()
      buildWordLayer()
    }

    const ez = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    let tprev = performance.now()
    let tsec = 0

    const draw = () => {
      const now = performance.now(); const dt = Math.min(0.05, (now - tprev) / 1000); tprev = now; tsec += dt
      ctx.clearRect(0, 0, sw, sh)
      const p = sceneProgressRef.current
      let phase: 'AB' | 'B' | 'BC', t: number
      // Umbrales de fase y timing SIN CAMBIOS respecto al original.
      if (p < 0.22) { phase = 'AB'; t = ez(p / 0.22) }
      else if (p < 0.32) { phase = 'B'; t = 0 }
      // Clampear el INPUT de ez (no el output): ez no está definida para t>1
      // y devuelve valores negativos, causando que las partículas retrocedan.
      // BC completa en p=0.70 → del 70% al 100% t=1, texto estático.
      else { phase = 'BC'; t = ez(Math.min(1, (p - 0.32) / 0.38)) }

      // Visibilidad del dispositivo sólido: presente en reposo, se desintegra al dispersar.
      const vis = Math.max(0, 1 - p / 0.16)

      // ── Capa vectorial HUD + micro-efectos (solo mientras el dispositivo existe) ──
      if (vis > 0.01 && deviceLayer) {
        const breath = 0.82 + 0.18 * Math.sin(tsec * 1.6) // respiración luminosa
        ctx.save()
        ctx.globalAlpha = vis * (reduced ? 1 : breath)
        ctx.drawImage(deviceLayer, 0, 0, sw, sh)
        ctx.restore()

        if (!reduced) {
          const boxes = [
            { x: L.mx - L.s * 1.15, y: L.my - L.s * 0.95, w: L.s * 2.3, h: L.s * 2.0 },
            { x: L.kx - L.s * 1.1, y: L.ky - L.s * 1.05, w: L.s * 2.2, h: L.s * 1.9 },
          ]
          ctx.save()
          ctx.globalCompositeOperation = 'lighter'
          for (const bx of boxes) {
            // scan line vertical recorriendo el dispositivo
            const sy = bx.y + ((tsec * 0.16) % 1) * bx.h
            const g = ctx.createLinearGradient(0, sy - L.s * 0.5, 0, sy + L.s * 0.5)
            g.addColorStop(0, 'rgba(74,141,255,0)')
            g.addColorStop(0.5, `rgba(150,195,255,${0.14 * vis})`)
            g.addColorStop(1, 'rgba(74,141,255,0)')
            ctx.fillStyle = g; ctx.fillRect(bx.x, sy - L.s * 0.5, bx.w, L.s)
            // pulso de energía: anillo tenue que se expande
            const pulse = (tsec * 0.4) % 1
            ctx.strokeStyle = `rgba(120,180,255,${(1 - pulse) * 0.1 * vis})`; ctx.lineWidth = 1.5
            ctx.beginPath(); ctx.ellipse(bx.x + bx.w / 2, bx.y + bx.h / 2, bx.w * 0.5 * pulse, bx.h * 0.4 * pulse, 0, 0, 6.283); ctx.stroke()
          }
          ctx.restore()

          // glitch muy sutil: desplazamiento horizontal ocasional de una banda fina
          if (Math.random() < 0.012) {
            const gy = Math.max(0, L.my - L.s + Math.random() * L.s * 2)
            const gh = 2 + Math.random() * 4
            const sx = Math.max(0, (L.mx - L.s))
            try {
              const band = ctx.getImageData(sx * dpr, gy * dpr, Math.min(sw - sx, L.s * 2) * dpr, gh * dpr)
              ctx.putImageData(band, sx * dpr + (Math.random() - 0.5) * 10 * dpr, gy * dpr)
            } catch { /* getImageData puede fallar por seguridad; ignorar */ }
          }
        }
      }

      // ── Chrome HUD del wordmark — aparece a medida que el texto se ensambla (fase BC) ──
      const wordVis = phase === 'BC' ? t : 0
      if (wordVis > 0.01 && wordLayer) {
        const breath = 0.85 + 0.15 * Math.sin(tsec * 1.6)
        // resplandor de respiración detrás del texto
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const rg = ctx.createRadialGradient(W.cx, W.cy, 0, W.cx, W.cy, W.w * 0.6)
        rg.addColorStop(0, `rgba(74,141,255,${0.12 * wordVis * (reduced ? 1 : breath)})`)
        rg.addColorStop(1, 'rgba(74,141,255,0)')
        ctx.fillStyle = rg; ctx.fillRect(W.cx - W.w * 0.7, W.cy - W.h * 1.4, W.w * 1.4, W.h * 2.8)
        ctx.restore()
        // capa vectorial (corchetes, rieles, barra, ticks)
        ctx.save(); ctx.globalAlpha = wordVis; ctx.drawImage(wordLayer, 0, 0, sw, sh); ctx.restore()
        // Letras neón: halo azul difuso + núcleo brillante → tubo de neón.
        // Las partículas (dibujadas después) rellenan el interior de cada letra.
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.globalAlpha = wordVis
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'
        ctx.font = `700 ${W.fs}px 'Space Grotesk', sans-serif`
        ctx.strokeStyle = `rgba(74,141,255,${0.5 * (reduced ? 1 : breath)})`
        ctx.lineWidth = Math.max(2, W.fs * 0.05)
        ctx.shadowColor = '#4A8DFF'; ctx.shadowBlur = W.fs * (reduced ? 0.25 : 0.35 * breath)
        ctx.strokeText('VIRAL CREATIVE', W.cx, W.cy)
        ctx.strokeStyle = 'rgba(198,222,255,0.9)'
        ctx.lineWidth = Math.max(1, W.fs * 0.014)
        ctx.shadowBlur = W.fs * 0.15
        ctx.strokeText('VIRAL CREATIVE', W.cx, W.cy)
        ctx.restore()
        // scan line recorriendo el wordmark
        if (!reduced) {
          const boxH = W.h + W.fs * 0.84
          const top = W.cy - W.h / 2 - W.fs * 0.42
          const sy = top + ((tsec * 0.14) % 1) * boxH
          ctx.save(); ctx.globalCompositeOperation = 'lighter'
          const g = ctx.createLinearGradient(0, sy - W.fs * 0.3, 0, sy + W.fs * 0.3)
          g.addColorStop(0, 'rgba(74,141,255,0)')
          g.addColorStop(0.5, `rgba(150,195,255,${0.1 * wordVis})`)
          g.addColorStop(1, 'rgba(74,141,255,0)')
          ctx.fillStyle = g; ctx.fillRect(W.cx - W.w / 2 - W.fs * 0.42, sy - W.fs * 0.3, W.w + W.fs * 0.84, W.fs * 0.6)
          ctx.restore()
        }
      }

      // ── Líneas de conexión (constelación) — visibles con el dispositivo, se desvanecen al dispersar ──
      if (phase === 'AB' && t < 0.6 && links.length) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.strokeStyle = `rgba(74,141,255,${0.16 * (1 - t / 0.6)})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        for (const [i, j] of links) {
          const a = parts[i], b = parts[j]
          ctx.moveTo(a.ax + (a.bx - a.ax) * t, a.ay + (a.by - a.ay) * t)
          ctx.lineTo(b.ax + (b.bx - b.ax) * t, b.ay + (b.by - b.ay) * t)
        }
        ctx.stroke()
        ctx.restore()
      }

      // ── Partículas (blending aditivo → glow natural sobre el fondo void) ──
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (const q of parts) {
        let x: number, y: number, alpha: number
        if (phase === 'AB') {
          x = q.ax + (q.bx - q.ax) * t; y = q.ay + (q.by - q.ay) * t
          // curvatura orgánica (ruido) máxima a mitad del trayecto, cero en extremos
          const amp = Math.sin(t * Math.PI) * L.s * 0.55
          x += noise(q.nx + tsec * 0.05, q.ny) * amp
          y += noise(q.nx, q.ny + tsec * 0.05) * amp
          alpha = 0.85 - 0.4 * t
        } else if (phase === 'B') {
          // flotación con ruido continuo en vez de sin/cos → movimiento orgánico
          x = q.bx + noise(q.nx + tsec * 0.08, q.ny) * 16
          y = q.by + noise(q.nx, q.ny + tsec * 0.08) * 16
          alpha = 0.42
        } else {
          x = q.bx + (q.cx - q.bx) * t; y = q.by + (q.cy - q.by) * t; alpha = 0.4 + 0.55 * t
        }

        const sz = q.sz * (0.8 + q.dz * 0.4)
        // Glow por sprite solo para partículas "cercanas" (dz alto): bloom selectivo.
        if (q.dz > 0.55) {
          const gs = sz * 6
          ctx.globalAlpha = alpha * 0.45 * (q.dz - 0.4)
          ctx.drawImage(glow, x - gs / 2, y - gs / 2, gs, gs)
        }
        ctx.globalAlpha = alpha
        ctx.beginPath(); ctx.arc(x, y, sz, 0, 6.283)
        ctx.fillStyle = phase === 'BC'
          ? `rgb(${Math.round(10 + 64 * t)},${Math.round(84 + 57 * t)},255)`
          : 'rgb(74,141,255)'
        ctx.fill()
      }
      ctx.restore()
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
      // Reduced motion: dispositivos vectoriales nítidos + partículas en reposo, sin animar.
      if (deviceLayer) ctx.drawImage(deviceLayer, 0, 0, sw, sh)
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = 'rgb(74,141,255)'
      for (const q of parts) {
        ctx.globalAlpha = 0.55
        ctx.beginPath(); ctx.arc(q.ax, q.ay, q.sz * (0.8 + q.dz * 0.4), 0, 6.283); ctx.fill()
      }
      ctx.restore()
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
              <CtaButton href={waHref} size="md">
                {t.cta}
              </CtaButton>
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
