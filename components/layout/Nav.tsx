'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Link, usePathname, useRouter } from '@/lib/navigation'
import { CtaButton } from '@/components/ui/CtaButton'

interface NavProps {
  locale: string
  t: {
    services: string
    work: string
    about: string
    cta: string
  }
  waNumber: string
}

// Rutas canónicas — next-intl traduce automáticamente según locale:
// /services → /es/servicios  |  /portfolio → /es/portafolio  |  /about → /es/nosotros
const NAV_LINKS = [
  { href: '/services' as const, key: 'services' as const },
  { href: '/portfolio' as const, key: 'work' as const },
  { href: '/about' as const, key: 'about' as const },
]

export function Nav({ locale, t, waNumber }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onScroll()
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const waHref = `https://wa.me/${waNumber}?text=Hola!+Quiero+cotizar+con+Viral+Creative`
  const closeMenu = () => setMenuOpen(false)

  // next-intl usePathname devuelve la ruta canónica (sin prefijo de locale).
  // useRouter de @/lib/navigation entiende pathnames y locale.
  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 40px',
          background: 'rgba(5,5,7,0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          transition: 'border-color .3s ease',
        }}
      >
        <Link href="/" aria-label="VIRAL CREATIVE — Inicio" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/logo-blanco.png"
            alt="VIRAL CREATIVE"
            width={90}
            height={40}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                  transition: 'color .15s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--muted)')}
              >
                {t[link.key]}
              </Link>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {!isMobile && (
            <CtaButton href={waHref} size="sm">
              {t.cta}
            </CtaButton>
          )}
          {isMobile && (
            <button
              aria-label="Menú"
              onClick={() => setMenuOpen(true)}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          background: 'rgba(5,5,7,0.96)',
          backdropFilter: 'blur(20px)',
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '88px 28px 40px',
          gap: '8px',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity .3s ease',
        }}
      >
        <button
          aria-label="Cerrar"
          onClick={closeMenu}
          style={{
            position: 'absolute',
            top: '18px',
            right: '22px',
            width: '44px',
            height: '44px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '-.01em',
              color: '#fff',
              padding: '14px 0',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {t[link.key]}
          </Link>
        ))}

        <CtaButton href={waHref} size="lg" block onClick={closeMenu} style={{ marginTop: '24px' }}>
          {t.cta}
        </CtaButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '32px', fontSize: 'var(--text-sm)' }}>
          <button
            onClick={() => { switchLocale('es'); closeMenu() }}
            style={{ color: locale === 'es' ? '#fff' : 'var(--muted)', fontWeight: locale === 'es' ? 500 : 400 }}
          >
            ES
          </button>
          <span style={{ color: 'var(--border)' }}>|</span>
          <button
            onClick={() => { switchLocale('en'); closeMenu() }}
            style={{ color: locale === 'en' ? '#fff' : 'var(--muted)', fontWeight: locale === 'en' ? 500 : 400 }}
          >
            EN
          </button>
        </div>
      </div>
    </>
  )
}
