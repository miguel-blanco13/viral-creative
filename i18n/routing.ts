import { defineRouting } from 'next-intl/routing'

// next-intl v4 — definición de rutas i18n.
// EN por defecto + ES, con prefijo SIEMPRE visible: /en/... y /es/...
// pathnames: clave canónica (carpeta en file system) → URL por locale.
// El middleware reescribe /es/servicios → /es/services internamente.
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      es: '/servicios',
    },
    '/portfolio': {
      en: '/portfolio',
      es: '/portafolio',
    },
    '/about': {
      en: '/about',
      es: '/nosotros',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
