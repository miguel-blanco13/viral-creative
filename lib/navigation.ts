// Wrapper de next-intl/navigation.
// Exportar siempre desde aquí — nunca importar Link o useRouter
// directamente de next/navigation en componentes que necesiten rutas localizadas.
import { createNavigation } from 'next-intl/navigation'
import { routing } from '@/i18n/routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
