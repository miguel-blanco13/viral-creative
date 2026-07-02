'use client'

import { useState } from 'react'
import type { FaqVM } from '@/lib/content-types'

interface FaqProps {
  faqs: FaqVM[]
  t: {
    label: string
    title: string
  }
}

export function Faq({ faqs, t }: FaqProps) {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section data-nav-theme="light" style={{ position: 'relative', background: 'var(--light-bg)', borderRadius: '40px 40px 0 0', padding: '128px 40px', color: 'var(--light-text)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)', fontWeight: 500, marginBottom: '20px' }}>
          {t.label}
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-h1)', lineHeight: 1.02, letterSpacing: '-.02em', color: 'var(--light-text)' }}>
          {t.title}
        </h2>

        <div style={{ marginTop: '48px', borderTop: '1px solid var(--border)' }}>
          {faqs.map((f, i) => (
            <div key={f.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '22px 0', textAlign: 'left', color: 'var(--light-text)' }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-lg)' }}>
                  {f.question}
                </span>
                <svg
                  width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"
                  style={{ flexShrink: 0, transition: 'transform .25s', transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div style={{ maxHeight: open === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height .25s ease' }}>
                <p style={{ color: '#5B6577', fontSize: 'var(--text-base)', lineHeight: 1.6, paddingBottom: '22px', maxWidth: '62ch' }}>
                  {f.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
