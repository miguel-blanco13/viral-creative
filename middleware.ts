import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// next-intl v4 — el middleware consume el objeto routing.
export default createMiddleware(routing)

export const config = {
  // Excluir API, el Studio de Sanity, internos de Next y archivos estáticos
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
}
