import { defineField, defineType } from 'sanity'

// Categorías canónicas del portafolio. El `value` se guarda en el documento;
// el filtro del sitio mapea estos valores a etiquetas visibles por locale.
export const PROJECT_CATEGORIES = [
  { title: 'Web', value: 'web' },
  { title: 'Branding', value: 'branding' },
  { title: 'Contenido', value: 'contenido' },
  { title: 'Fotografía', value: 'foto' },
] as const

export const project = defineType({
  name: 'project',
  title: 'Proyecto (Portafolio)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Se genera desde el título en inglés. Único por proyecto.',
      options: {
        source: (doc) =>
          (doc.title as { en?: string; es?: string })?.en ||
          (doc.title as { es?: string })?.es ||
          '',
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: { list: [...PROJECT_CATEGORIES], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Se muestra en la tarjeta y como cabecera del detalle.',
    }),
    defineField({
      name: 'images',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'result',
      title: 'Resultado',
      type: 'localeString',
      description: 'Frase de impacto (ej. "+40% en tasa de conversión").',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Menor número aparece primero.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'category', media: 'thumbnail' },
  },
})
