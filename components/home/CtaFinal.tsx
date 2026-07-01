'use client'

import { Reveal } from '@/components/motion/Reveal'

interface CtaFinalProps {
  t: {
    eyebrow: string
    title: string
    sub: string
    button: string
    micro: string
  }
  waNumber: string
}

export function CtaFinal({ t, waNumber }: CtaFinalProps) {
  const waHref = `https://wa.me/${waNumber}?text=Hola!+Quiero+cotizar+con+Viral+Creative`

  return (
    <section style={{ position: 'relative', padding: '160px 40px', textAlign: 'center', overflow: 'hidden', background: '#050507' }}>

      {/* ── Video de fondo ─────────────────────────────────────────────────── */}
      <video
        src="/videos/cta.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // opacity baja para que el video sea textura, no protagonista.
          // El contenido (texto + CTA) debe tener máximo contraste.
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      />

      {/* Overlay de gradiente: oscurece bordes, preserva legibilidad central */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(5,5,7,0.3) 0%, rgba(5,5,7,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Blob glow del diseño original — encima del video */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(circle,var(--accent-glow) 0%,transparent 70%)',
        filter: 'blur(60px)',
        animation: 'vc-blob 18s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── Contenido ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
        <Reveal from="up" delay={0}>
          <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
            {t.eyebrow}
          </p>
        </Reveal>

        <Reveal from="up" delay={0.1}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-.02em', lineHeight: '.98', fontSize: 'var(--text-display)',
            background: 'linear-gradient(180deg,#C7D2E0 0%,#F5F7FA 60%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            maxWidth: '18ch', textAlign: 'center',
          }}>
            {t.title}
          </h2>
        </Reveal>

        <Reveal from="up" delay={0.2}>
          <p style={{ color: 'rgba(245,247,250,0.6)', fontSize: 'var(--text-lg)', maxWidth: '40ch', textAlign: 'center' }}>
            {t.sub}
          </p>
        </Reveal>

        <Reveal from="up" delay={0.32}>
          <div style={{ position: 'relative', display: 'inline-flex', padding: '10px', marginTop: '8px' }}>
            <span style={{ position: 'absolute', inset: 0, border: '1.5px solid var(--primary)', borderRadius: 'var(--radius-full)', opacity: .4, animation: 'vc-ring 2.5s linear infinite' }} />
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 'var(--text-base)', padding: '18px 48px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-glow)', transition: 'background .2s,transform .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'none' }}
            >
              {t.button}
            </a>
          </div>
        </Reveal>

        <Reveal from="up" delay={0.44}>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginTop: '8px' }}>
            {t.micro}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
