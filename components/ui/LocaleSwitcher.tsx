'use client'

import { useRouter, usePathname } from 'next/navigation'

export function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchTo = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-sm)' }}>
      {['es', 'en'].map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {i > 0 && <span style={{ color: 'var(--border)' }}>|</span>}
          <button
            onClick={() => switchTo(l)}
            style={{ color: locale === l ? '#fff' : 'var(--muted)', fontWeight: locale === l ? 500 : 400, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
