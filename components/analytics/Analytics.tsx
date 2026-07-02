'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'

type Consent = 'granted' | 'denied'
const STORAGE_KEY = 'vc-consent'

interface AnalyticsProps {
  gaId?: string
  pixelId?: string
  locale: string
}

// Copys del banner co-localizados (microcopy de UI, no contenido de negocio).
const COPY = {
  es: {
    text: 'Usamos cookies para medir el tráfico y mejorar el sitio. Puedes aceptarlas o rechazarlas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
  },
  en: {
    text: 'We use cookies to measure traffic and improve the site. You can accept or reject them.',
    accept: 'Accept',
    reject: 'Reject',
  },
} as const

/**
 * Analytics + banner de consentimiento.
 *
 * Los scripts de GA4 y Meta Pixel solo se cargan tras un "Aceptar" explícito
 * (opt-in), nunca antes. La decisión se persiste en localStorage. Sin IDs
 * configurados en el entorno, no se renderiza nada (ni banner).
 */
export function Analytics({ gaId, pixelId, locale }: AnalyticsProps) {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'granted' || stored === 'denied') setConsent(stored)
  }, [])

  const decide = (value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
  }

  // Sin herramientas configuradas → no hay nada que consentir.
  if (!gaId && !pixelId) return null

  const t = COPY[locale === 'es' ? 'es' : 'en']
  const granted = consent === 'granted'

  return (
    <>
      {granted && gaId && <GoogleAnalytics gaId={gaId} />}

      {granted && pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {mounted && consent === null && (
        <div role="dialog" aria-label="Cookies" className="vc-consent">
          <p className="vc-consent__text">{t.text}</p>
          <div className="vc-consent__actions">
            <button
              type="button"
              className="vc-consent__btn vc-consent__btn--ghost"
              onClick={() => decide('denied')}
            >
              {t.reject}
            </button>
            <button
              type="button"
              className="vc-consent__btn vc-consent__btn--solid"
              onClick={() => decide('granted')}
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
