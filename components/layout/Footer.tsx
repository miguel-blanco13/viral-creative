'use client'

import { Link } from '@/lib/navigation'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'

interface FooterProps {
  locale: string
  t: {
    legal: string
    tag: string
    services: string
    work: string
    about: string
    contact: string
  }
  waNumber: string
}

export function Footer({ locale, t, waNumber }: FooterProps) {
  const waHref = `https://wa.me/${waNumber}?text=Hola!+Quiero+cotizar+con+Viral+Creative`

  return (
    <footer style={{ position: 'relative', background: 'var(--void)', borderTop: '1px solid var(--border)', padding: '48px 40px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <a href="mailto:teamviralcreative@gmail.com" style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
          teamviralcreative@gmail.com
        </a>

        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          <Link href="/services" style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', transition: 'color .15s' }}>
            {t.services}
          </Link>
          <Link href="/portfolio" style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', transition: 'color .15s' }}>
            {t.work}
          </Link>
          <Link href="/about" style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', transition: 'color .15s' }}>
            {t.about}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', transition: 'color .15s' }}
          >
            {t.contact}
          </a>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          <SocialLink href="https://www.instagram.com/viralcreative_/" label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.tiktok.com/@viralcreative.co" label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" />
            </svg>
          </SocialLink>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '32px auto 0', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{t.legal}</span>
        <LocaleSwitcher locale={locale} />
      </div>

    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      style={{ width: '40px', height: '40px', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', transition: 'color .2s,border-color .2s' }}
    >
      {children}
    </a>
  )
}
