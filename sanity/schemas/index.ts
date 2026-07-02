import type { SchemaTypeDefinition } from 'sanity'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { teamMember } from './teamMember'
import { siteSettings } from './siteSettings'

// Registro único de todos los tipos del esquema.
// Los objetos localizados van primero (los documentos los referencian).
export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  project,
  service,
  testimonial,
  faq,
  teamMember,
  siteSettings,
]
