import { groq } from 'next-sanity'

// Tags de revalidación ISR — deben coincidir con app/api/revalidate.
export const SANITY_TAGS = {
  project: 'project',
  service: 'service',
  testimonial: 'testimonial',
  faq: 'faq',
  teamMember: 'teamMember',
  siteSettings: 'siteSettings',
} as const

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    result,
    thumbnail,
    images
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    result,
    thumbnail,
    images
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id, name, category, description, waMessage
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id, quote, author, role, initials
  }
`

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc, _createdAt asc) {
    _id, question, answer
  }
`

export const teamQuery = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id, name, role, bio, photo, tags
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    whatsappNumber, email, instagramUrl, tiktokUrl,
    heroEyebrow, heroHeadline, heroSubhead
  }
`
