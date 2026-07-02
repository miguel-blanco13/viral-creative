'use client'

import { Reveal } from '@/components/motion/Reveal'
import type { TestimonialVM } from '@/lib/content-types'

interface TestimonialsProps {
  testimonials: TestimonialVM[]
  t: {
    label: string
    title: string
    note: string
    stat1: string
    stat2: string
    stat3: string
  }
}

export function Testimonials({ testimonials, t }: TestimonialsProps) {

  return (
    <section style={{ position: 'relative', background: 'var(--bg)', borderRadius: '40px 40px 0 0', padding: '128px 40px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', width: '520px', height: '320px', background: 'radial-gradient(circle,var(--accent-glow) 0%,transparent 70%)', filter: 'blur(40px)', animation: 'vc-blob 16s ease-in-out infinite', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <Reveal from="up" delay={0}>
          <p style={{ textAlign: 'center', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '20px' }}>
            {t.label}
          </p>
        </Reveal>

        <Reveal from="up" delay={0.1}>
          <h2 style={{
            textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '-.02em', lineHeight: '.98',
            fontSize: 'var(--text-display)',
            background: 'linear-gradient(180deg,#C7D2E0 0%,#F5F7FA 60%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            maxWidth: '18ch', margin: '0 auto',
          }}>
            {t.title}
          </h2>
        </Reveal>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', maxWidth: '760px', margin: '56px auto 0' }}>
          {[
            { key: 'stat1', target: '120+' }, { key: 'stat2', target: '90%' }, { key: 'stat3', target: '2' }
          ].map(({ key, target }, i) => (
            <div key={key} style={{ display: 'flex', alignItems: 'flex-start' }}>
              {i > 0 && <div style={{ width: '1px', height: '44px', background: 'var(--border)', alignSelf: 'center' }} />}
              <Reveal from="up" delay={i * 0.1} start="top 88%">
                <div style={{ flex: 1, minWidth: '160px', textAlign: 'center', padding: '0 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 'clamp(2.25rem,4.5vw,3.5rem)', lineHeight: 1 }}>
                    {target}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                    {t[key as keyof typeof t]}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Cards con stagger */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginTop: '64px' }}>
          {testimonials.map((tst, i) => (
            <Reveal key={tst.id} from="up" delay={i * 0.12} start="top 88%">
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3rem', lineHeight: '.6', color: 'var(--primary)' }}>&ldquo;</span>
                <p style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'rgba(245,247,250,0.85)', lineHeight: 1.5, flex: 1 }}>
                  &ldquo;{tst.quote}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '.85rem', flexShrink: 0 }}>
                    {tst.initials}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#fff', fontSize: 'var(--text-base)' }}>{tst.author}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{tst.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
