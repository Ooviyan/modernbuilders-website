import { defineField, defineType } from 'sanity'

// Combined model: covers both client-commissioned construction work and
// MODERN BUILDERS' own properties available for rent, distinguished by `kind`.
export const project = defineType({
  name: 'project',
  title: 'Project / Property',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Client Project', value: 'client' },
          { title: 'Own Rental Property', value: 'rental' },
        ],
        layout: 'radio',
      },
      initialValue: 'client',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        // Matches the Service categories (Residential / Commercial / Interiors / Industrial)
        list: ['Residential', 'Commercial', 'Interiors', 'Industrial'],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          // Client project statuses
          { title: 'Completed', value: 'completed' },
          { title: 'Ongoing', value: 'ongoing' },
          // Rental property statuses
          { title: 'Available for Rent', value: 'available' },
          { title: 'Rented', value: 'rented' },
          { title: 'Ready to Move', value: 'ready' },
        ],
      },
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Only relevant for Client Project entries',
      hidden: ({ document }) => document?.kind !== 'client',
    }),
    defineField({
      name: 'rentAmount',
      title: 'Rent (per month)',
      type: 'string',
      description: 'Only relevant for Own Rental Property entries',
      hidden: ({ document }) => document?.kind !== 'rental',
    }),
    defineField({ name: 'completionDate', title: 'Completion Date', type: 'date' }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'featured', title: 'Featured on Home Page', type: 'boolean' }),
  ],
  preview: {
    select: { title: 'title', kind: 'kind', category: 'category', media: 'coverImage' },
    prepare({ title, kind, category, media }) {
      return {
        title,
        subtitle: [kind === 'rental' ? 'Rental' : 'Client', category].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
