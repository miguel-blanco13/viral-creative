import { defineField, defineType } from 'sanity'
import { SUPPORTED_LANGUAGES } from './localeString'

// Variante multilínea de localeString para descripciones y párrafos.
export const localeText = defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN)',
  type: 'object',
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'text',
      rows: 3,
    }),
  ),
})
