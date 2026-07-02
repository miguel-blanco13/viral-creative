import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

interface CtaButtonProps {
  href: string
  children: ReactNode
  /** sm → nav (desktop/mobile) · md → hero · lg → CTA final / menú móvil */
  size?: 'sm' | 'md' | 'lg'
  /** Anillos de pulso (sonar) alrededor del botón — reservado para contextos de baja frecuencia (CTA final), no para el nav. */
  withPulse?: boolean
  /** Ancho completo, centrado — usado en el menú móvil. */
  block?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  style?: CSSProperties
}

// Sin 'use client': todo el hover (lift + shimmer) vive en CSS (globals.css),
// no requiere estado ni handlers de React. Se puede montar tanto desde
// componentes server como client sin costear un boundary extra.
export function CtaButton({ href, children, size = 'sm', withPulse = false, block = false, onClick, style }: CtaButtonProps) {
  const anchor = (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      className={`cta-btn cta-btn--${size}${block ? ' cta-btn--block' : ''}`}
      style={style}
    >
      <span className="cta-btn__shimmer" aria-hidden="true" />
      {children}
    </a>
  )

  if (!withPulse) return anchor

  return (
    <div className="cta-btn__pulse-wrap">
      <span className="cta-btn__pulse" />
      <span className="cta-btn__pulse" style={{ animationDelay: '1.1s' }} />
      {anchor}
    </div>
  )
}
