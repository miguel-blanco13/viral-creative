import type { Metadata } from 'next'

// Root layout propio para el segmento /studio (fuera de [locale]).
// El Studio de Sanity trae su propio <html> visual, pero Next exige que cada
// rama de nivel superior aporte html/body. No debe indexarse en buscadores.
export const metadata: Metadata = {
  title: 'VIRAL CREATIVE — Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
