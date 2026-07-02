// Variables de entorno de Sanity, centralizadas.
// projectId/dataset son públicos (NEXT_PUBLIC_) porque el cliente y el Studio
// se ejecutan en el navegador. El token de lectura es server-only.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Puede estar vacío hasta que se cree el proyecto en sanity.io.
// El sitio degrada con gracia a los datos por defecto cuando no está definido.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

// true cuando hay un proyecto real configurado.
export const sanityConfigured = projectId.length > 0

// `defineConfig`/`createClient` exigen un projectId con formato válido.
// Cuando aún no hay uno real, usamos un placeholder inofensivo para que el
// build no falle (el Studio solo se conecta de verdad en el navegador).
export const safeProjectId = projectId || 'placeholder'
