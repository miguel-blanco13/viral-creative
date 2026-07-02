'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

// El Studio de Sanity es una app de cliente (usa React.createContext). Debe ser
// un Client Component para no entrar en el grafo de React Server Components,
// que rompería al evaluar `sanity.config`. La metadata (incl. noindex) vive en
// el layout del segmento /studio.
export default function StudioPage() {
  return <NextStudio config={config} />
}
