import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'localeString',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localeText',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'localeString' }],
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
    select: { title: 'name', subtitle: 'role.es', media: 'photo' },
  },
})
