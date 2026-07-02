// Estado de carga del segmento [locale]. Server component simple.
export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="vc-loader" aria-label="Cargando" role="status" />
    </div>
  )
}
