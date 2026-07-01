'use client'

import { useEffect, useRef, useState } from 'react'

interface WhatsAppFabProps {
  waNumber: string
  labelText: string
  tipText: string
}

export function WhatsAppFab({ waNumber, labelText, tipText }: WhatsAppFabProps) {
  const fabRef = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const waHref = `https://wa.me/${waNumber}?text=Hola!+Quiero+cotizar+con+Viral+Creative`

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => setVisible(true), reduced ? 0 : 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {!isMobile && showTip && visible && (
        <span
          style={{ position: 'fixed', bottom: '42px', right: '96px', zIndex: 200, background: 'var(--surface)', color: 'var(--text)', fontSize: 'var(--text-sm)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', whiteSpace: 'nowrap', pointerEvents: 'none', transition: 'opacity .2s,transform .2s', opacity: showTip ? 1 : 0, transform: showTip ? 'translateX(0)' : 'translateX(8px)' }}
        >
          {tipText}
        </span>
      )}
      <a
        ref={fabRef}
        href={waHref}
        target="_blank"
        rel="noopener"
        aria-label="Solicitar cotización por WhatsApp"
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 200,
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#25D366', color: '#fff',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
          padding: isMobile ? '0 20px' : '0',
          width: isMobile ? 'auto' : '56px',
          height: isMobile ? '52px' : '56px',
          justifyContent: 'center',
          transform: visible ? 'scale(1)' : 'scale(0)',
          transition: visible ? 'transform .4s cubic-bezier(0.175,0.885,0.32,1.275)' : 'none',
        }}
        onMouseEnter={() => { if (!isMobile) setShowTip(true) }}
        onMouseLeave={() => setShowTip(false)}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        {isMobile && (
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-sm)', whiteSpace: 'nowrap', paddingRight: '6px' }}>
            {labelText}
          </span>
        )}
      </a>
    </>
  )
}
