import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'localeText',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Empresa',
      type: 'localeString',
    }),
    defineField({
      name: 'initials',
      title: 'Iniciales (avatar)',
      type: 'string',
      description: 'Opcional. Si se deja vacío, se derivan del nombre.',
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'author', subtitle: 'role.es' },
  },
})
