import type { Metadata } from 'next'
import { getPathname } from '@/lib/navigation'
import { routing } from '@/i18n/routing'
import type { Locale } from '@/lib/content-types'

// URL base del sitio en producción. Configurable por si cambia el dominio.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://viralcreative.com'
).replace(/\/$/, '')

// Rutas canónicas localizables (claves de routing.pathnames).
type CanonPath = '/' | '/services' | '/portfolio' | '/about'

interface PageMetaArgs {
  locale: Locale
  path: CanonPath
  description: string
  /** Si se omite, hereda el título por defecto del layout (marca). */
  title?: string
}

/**
 * Construye Metadata coherente para una página: canonical + hreflang
 * (alternates por locale) + OpenGraph. Centraliza el patrón para todas
 * las páginas y evita duplicar la lógica de rutas localizadas.
 */
export function pageMetadata({ locale, path, description, title }: PageMetaArgs): Metadata {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = SITE_URL + getPathname({ href: path, locale: l })
  }
  const canonical = SITE_URL + getPathname({ href: path, locale })

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': languages[routing.defaultLocale] },
    },
    openGraph: {
      type: 'website',
      siteName: 'VIRAL CREATIVE',
      title: title ?? 'VIRAL CREATIVE — Agencia creativa digital',
      description,
      url: canonical,
      locale,
      images: ['/images/logo.png'],
    },
  }
}
