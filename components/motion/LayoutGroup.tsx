'use client'

import { LayoutGroup as MotionLayoutGroup } from 'motion/react'

/**
 * LayoutGroup — thin wrapper para poder usar LayoutGroup de Motion
 * dentro de un Server Component (layout.tsx).
 *
 * El id 'portfolio' asegura que los layoutId de ProjectCard y ProjectModal
 * estén en el mismo grupo y Motion pueda sincronizar el morph entre rutas.
 */
export function LayoutGroup({
  children,
  id,
}: {
  children: React.ReactNode
  id?: string
}) {
  return <MotionLayoutGroup id={id}>{children}</MotionLayoutGroup>
}
