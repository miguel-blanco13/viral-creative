import Link from 'next/link'

// 404 dentro del segmento [locale]. No recibe params, por eso el texto es
// neutral (ES + EN). El link a "/" lo reescribe el middleware al locale actual.
export default function NotFound() {
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
        gap: '20px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(4rem, 16vw, 9rem)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1.5px var(--primary)',
          letterSpacing: '-.04em',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'var(--text-h3)',
          color: '#fff',
        }}
      >
        Página no encontrada · Page not found
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-base)', maxWidth: '44ch' }}>
        El enlace no existe o se movió. Volvamos a un lugar seguro.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--primary)',
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          fontSize: 'var(--text-sm)',
          padding: '12px 26px',
          borderRadius: 'var(--radius-full)',
        }}
      >
        Volver al inicio · Back home
      </Link>
    </div>
  )
}
