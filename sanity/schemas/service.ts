import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'waMessage',
      title: 'Mensaje de WhatsApp',
      type: 'string',
      description:
        'Texto que se prellenará al pedir cotización de este servicio (texto plano, sin codificar).',
      initialValue: 'Hola! Quiero cotizar este servicio',
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
    select: { title: 'name.es', subtitle: 'category.es' },
  },
})
