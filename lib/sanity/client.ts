import { createClient } from 'next-sanity'
import { apiVersion, dataset, safeProjectId } from '@/sanity/env'

export { sanityConfigured } from '@/sanity/env'

// Cliente de lectura. useCdn=true para latencia baja en producción; la
// frescura del contenido editado se garantiza por revalidación por tag
// (ver lib/sanity/fetch.ts + app/api/revalidate), no por bypass del CDN.
export const client = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})
