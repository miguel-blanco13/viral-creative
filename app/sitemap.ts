import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getPathname } from '@/lib/navigation'
import { getProjectSlugs } from '@/lib/content'
import { SITE_URL } from '@/lib/seo'

const CANON_PATHS = ['/', '/services', '/portfolio', '/about'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Páginas estáticas × locales (con su URL localizada).
  for (const path of CANON_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: SITE_URL + getPathname({ href: path, locale }),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '/' ? 1 : 0.8,
      })
    }
  }

  // Proyectos del portafolio × locales.
  const slugs = await getProjectSlugs()
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/work/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
