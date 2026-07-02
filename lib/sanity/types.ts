import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Tipos crudos tal como vuelven de las queries GROQ (antes de mapear a los
// view-models que consumen los componentes).
export type LocaleString = { es?: string; en?: string }
export type LocaleText = LocaleString

export interface SanityProject {
  _id: string
  title: LocaleString
  slug: string
  category: 'web' | 'branding' | 'contenido' | 'foto'
  description?: LocaleText
  result?: LocaleString
  thumbnail?: SanityImageSource
  images?: SanityImageSource[]
}

export interface SanityService {
  _id: string
  name: LocaleString
  category?: LocaleString
  description?: LocaleText
  waMessage?: string
}

export interface SanityTestimonial {
  _id: string
  quote: LocaleText
  author: string
  role?: LocaleString
  initials?: string
}

export interface SanityFaq {
  _id: string
  question: LocaleString
  answer: LocaleText
}

export interface SanityTeamMember {
  _id: string
  name: string
  role?: LocaleString
  bio?: LocaleText
  photo?: SanityImageSource
  tags?: LocaleString[]
}

export interface SanitySiteSettings {
  whatsappNumber?: string
  email?: string
  instagramUrl?: string
  tiktokUrl?: string
  heroEyebrow?: LocaleString
  heroHeadline?: LocaleString
  heroSubhead?: LocaleText
}
