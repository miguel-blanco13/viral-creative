import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// next-intl v4 — carga de mensajes por request.
// Reemplaza al antiguo i18n.ts (ese archivo se puede ELIMINAR).
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
