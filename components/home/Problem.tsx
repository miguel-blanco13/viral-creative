'use client'

import { Reveal } from '@/components/motion/Reveal'
import { SplitHeading } from '@/components/motion/SplitHeading'

interface ProblemProps {
  t: {
    eyebrow: string
    title: string
    body: string
    pivot: string
  }
}

export function Problem({ t }: ProblemProps) {
  return (
    <section style={{ position: 'relative', background: 'var(--void)', padding: '160px 40px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <Reveal from="up" delay={0}>
        <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '24px' }}>
          {t.eyebrow}
        </p>
      </Reveal>

      <SplitHeading
        as="h2"
        splitBy="words"
        stagger={0.08}
        delay={0.1}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)',
          lineHeight: 1.05, letterSpacing: '-.02em', color: '#fff',
          maxWidth: '18ch', margin: '0 auto', perspective: '600px',
        }}
      >
        {t.title}
      </SplitHeading>

      <Reveal from="up" delay={0.2} start="top 85%">
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', lineHeight: 1.7, maxWidth: '620px', margin: '32px auto 0' }}>
          {t.body}
        </p>
      </Reveal>

      <Reveal from="up" delay={0.35} start="top 85%">
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-h3)', color: '#fff', marginTop: '48px' }}>
          {t.pivot}
        </p>
      </Reveal>
    </section>
  )
}
