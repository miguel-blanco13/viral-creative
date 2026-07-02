'use client'

import { useEffect } from 'react'

// Error boundary del segmento [locale]. Debe ser client component.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
        gap: '18px',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-h2)',
          color: '#fff',
        }}
      >
        Algo salió mal · Something went wrong
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-base)', maxWidth: '46ch' }}>
        Tuvimos un problema al cargar esta sección. Puedes reintentar.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: '8px',
          background: 'var(--primary)',
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          fontSize: 'var(--text-sm)',
          padding: '12px 26px',
          borderRadius: 'var(--radius-full)',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        Reintentar · Retry
      </button>
    </div>
  )
}
