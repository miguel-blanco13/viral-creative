// Store de la instancia global de Lenis.
// SmoothScroll registra la instancia al montarse.
// Cualquier componente que necesite pausar/reanudar el smooth scroll
// (ej: modales, drawers) importa stop/start desde aquí.

import type Lenis from 'lenis'

let _lenis: Lenis | null = null

export const lenisStore = {
  set(l: Lenis) {
    _lenis = l
  },
  stop() {
    _lenis?.stop()
  },
  start() {
    _lenis?.start()
  },
  destroy() {
    _lenis?.destroy()
    _lenis = null
  },
}
