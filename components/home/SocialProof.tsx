'use client'

import { Reveal } from '@/components/motion/Reveal'
import { CountUp } from '@/components/motion/CountUp'

interface SocialProofProps {
  t: {
    label: string
    stat1: string
    stat2: string
    stat3: string
    note: string
  }
}

const CLIENTS = ['CLIENTE 1', 'CLIENTE 2', 'CLIENTE 3', 'CLIENTE 4', 'CLIENTE 5']

const STATS = [
  { target: 120, suffix: '+', key: 'stat1' as const },
  { target: 90, suffix: '%', key: 'stat2' as const },
  { target: 2, suffix: '', key: 'stat3' as const },
]

export function SocialProof({ t }: SocialProofProps) {
  return (
    <section style={{ position: 'relative', background: 'var(--void)', padding: '80px 40px', borderBottom: '1px solid var(--border)' }}>
      <Reveal from="up" delay={0}>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '36px' }}>
          {t.label}
        </p>
      </Reveal>

      {/* Logos de clientes con stagger */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center', alignItems: 'center', maxWidth: '900px', margin: '0 auto 64px' }}>
        {CLIENTS.map((c, i) => (
          <Reveal key={c} from="up" delay={i * 0.07} start="top 90%">
            <div
              style={{ width: '120px', height: '40px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '.72rem', letterSpacing: '.1em', opacity: .5, transition: 'opacity .2s,border-color .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '.5'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {c}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Stats con CountUp */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', maxWidth: '840px', margin: '0 auto' }}>
        {STATS.map((stat, i) => (
          <div key={stat.key} style={{ display: 'flex', alignItems: 'flex-start' }}>
            {i > 0 && <div style={{ width: '1px', height: '48px', background: 'var(--border)', alignSelf: 'center' }} />}
            <Reveal from="up" delay={i * 0.12} start="top 88%">
              <div style={{ flex: 1, minWidth: '180px', textAlign: 'center', padding: '0 24px' }}>
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    color: 'var(--primary)', fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1,
                    display: 'block',
                  }}
                />
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                  {t[stat.key]}
                </p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

    </section>
  )
}
