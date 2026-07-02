import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Pregunta frecuente',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'localeText',
      validation: (r) => r.required(),
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
    select: { title: 'question.es' },
  },
})
