import { client, sanityConfigured } from './client'

interface FetchArgs {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}

/**
 * Wrapper de client.fetch con degradación segura.
 *
 * - Si no hay projectId configurado → devuelve null sin llamar a la red.
 * - Si la petición falla → loguea y devuelve null (nunca rompe el render).
 *
 * Las páginas usan este resultado con `?? fallback`, de modo que el sitio
 * funciona idéntico con o sin CMS conectado. La revalidación es por tag
 * (revalidateTag desde el webhook), con un `revalidate` de respaldo por
 * tiempo para no depender solo del webhook.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: FetchArgs): Promise<T | null> {
  if (!sanityConfigured) return null

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 3600, tags },
    })
  } catch (error) {
    console.error('[sanity] fetch falló, usando fallback:', error)
    return null
  }
}
