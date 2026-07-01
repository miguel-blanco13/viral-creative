'use client'

import { SERVICES } from './data'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Link } from '@/lib/navigation'

// Índices de los 4 servicios que representan los pilares: Marca · Contenido · Web · Automatización
// Coincide exactamente con el subhead del Hero para coherencia de mensaje.
const PREVIEW_INDICES = [0, 2, 4, 5]

interface ServicesPreviewProps {
  locale: string
  t: {
    label: string
    title: string
    sub: string
    cta: string
    viewAll: string
  }
  waNumber: string
}

export function ServicesPreview({ locale, t, waNumber }: ServicesPreviewProps) {
  const es = locale === 'es'
  const previewServices = PREVIEW_INDICES.map((i) => SERVICES[i])

  return (
    <section
      id="servicios"
      style={{
        position: 'relative',
        background: 'var(--light-bg)',
        borderRadius: '40px 40px 0 0',
        padding: '128px 40px',
        color: 'var(--light-text)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
        <Reveal from="up" delay={0}>
          <p style={{
            color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em',
            fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '20px',
          }}>
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

        {/* 4 cards de los pilares estratégicos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '56px' }}>
          {previewServices.map((s, i) => {
            const waHref = `https://wa.me/${waNumber}?text=${s.wa}`
            return (
              <Reveal key={s.n} from="up" delay={i * 0.08} start="top 90%">
                <div
                  style={{
                    display: 'flex', gap: '24px', alignItems: 'flex-start',
                    background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 'var(--radius-lg)', padding: '28px',
                    transition: 'transform .2s,box-shadow .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(2rem,4vw,3.25rem)', color: 'rgba(10,132,255,0.18)',
                    lineHeight: 1, flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--font-body-vc)', fontSize: '.74rem', textTransform: 'uppercase',
                      letterSpacing: '.08em', color: 'var(--primary)', background: 'rgba(10,132,255,0.12)',
                      padding: '5px 12px', borderRadius: 'var(--radius-full)',
                    }}>
                      {es ? s.catEs : s.catEn}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3)',
                      color: 'var(--light-text)', lineHeight: 1.1,
                    }}>
                      {es ? s.nameEs : s.nameEn}
                    </h3>
                    <p style={{ fontSize: 'var(--text-base)', color: '#5B6577', lineHeight: 1.5 }}>
                      {es ? s.descEs : s.descEn}
                    </p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener"
                      style={{
                        marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px',
                        border: '1.5px solid var(--primary)', color: 'var(--primary)',
                        fontFamily: 'var(--font-display)', fontWeight: 500, textTransform: 'uppercase',
                        letterSpacing: '.06em', fontSize: 'var(--text-sm)', padding: '10px 22px',
                        borderRadius: 'var(--radius-full)', transition: 'background .2s,color .2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary)'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--primary)'
                      }}
                    >
                      {t.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* CTA → página completa de servicios */}
        <Reveal from="up" delay={0.1} start="top 95%">
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
            <Link
              href="/services"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 500, textTransform: 'uppercase',
                letterSpacing: '.08em', fontSize: 'var(--text-sm)',
                color: 'var(--light-text)', borderBottom: '1.5px solid var(--primary)',
                paddingBottom: '4px', transition: 'opacity .2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '.7' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              {t.viewAll}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
