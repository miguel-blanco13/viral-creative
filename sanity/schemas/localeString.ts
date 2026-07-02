import { defineField, defineType } from 'sanity'

// Idiomas soportados por el contenido del CMS.
// El sitio usa next-intl (EN por defecto + ES); el contenido editable
// replica esos dos idiomas con objetos localizados a nivel de campo.
// Se eligió localización por campo (en vez del plugin document-i18n) porque
// con solo 2 idiomas es más simple para el editor: ve ambos valores juntos,
// sin duplicar documentos ni sincronizar referencias.
export const SUPPORTED_LANGUAGES = [
  { id: 'es', title: 'Español' },
  { id: 'en', title: 'English' },
] as const

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto corto (ES/EN)',
  type: 'object',
  // options.collapsible mantiene el formulario compacto en documentos con
  // muchos campos localizados.
  options: { collapsible: false },
  fields: SUPPORTED_LANGUAGES.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'string',
    }),
  ),
})
