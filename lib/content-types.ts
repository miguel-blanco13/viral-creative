// View-models que consumen los componentes. Ya vienen resueltos por locale
// (los componentes no vuelven a elegir idioma). Sin dependencias de servidor,
// para que los componentes cliente puedan importar estos tipos con seguridad.

export type Locale = 'es' | 'en'

export interface ServiceVM {
  id: string
  n: string
  category: string
  name: string
  description: string
  /** Texto plano para prellenar WhatsApp (el componente lo codifica). */
  waText: string
}

export interface ProjectVM {
  id: string
  n: string
  slug: string
  /** Clave de filtro: 'Web' | 'Branding' | 'Contenido' | 'Fotografía'. */
  cat: string
  /** Etiqueta de categoría ya localizada. */
  category: string
  name: string
  description: string
  result: string
  colorA: string
  colorB: string
  accent: string
  thumbnailUrl: string | null
  imageUrls: string[]
}

export interface TestimonialVM {
  id: string
  quote: string
  author: string
  role: string
  initials: string
}

export interface FaqVM {
  id: string
  question: string
  answer: string
}

export interface TeamMemberVM {
  id: string
  name: string
  role: string
  bio: string
  tags: string[]
  photoUrl: string | null
}

export interface SiteSettings {
  whatsappNumber: string
  email: string
  instagramUrl: string
  tiktokUrl: string
  hero: { eyebrow?: string; headline?: string; subhead?: string }
}
