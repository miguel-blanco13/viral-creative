import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

// urlFor(source).width(800).url() — genera URLs del CDN de Sanity.
// next/image se encarga de convertir a WebP/AVIF en runtime.
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
