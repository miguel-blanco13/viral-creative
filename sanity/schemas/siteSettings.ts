import { defineField, defineType } from 'sanity'

// Documento singleton: solo existe una instancia (id fijo "siteSettings").
// La estructura del Studio lo fija como entrada única, no como lista.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ajustes del sitio',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contacto y redes', default: true },
    { name: 'hero', title: 'Hero (portada)' },
  ],
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Con código de país, solo dígitos. Ej: 573000000000',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL de Instagram',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'URL de TikTok',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow del hero',
      type: 'localeString',
      description: 'Texto pequeño sobre el titular. Opcional (usa el default si se deja vacío).',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Titular del hero',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubhead',
      title: 'Subtítulo del hero',
      type: 'localeText',
      group: 'hero',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Ajustes del sitio' }),
  },
})
