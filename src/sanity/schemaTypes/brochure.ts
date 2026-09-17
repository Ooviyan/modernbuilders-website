import { defineField, defineType } from 'sanity'

// A downloadable/previewable catalogue (Interiors, and more as they're
// ready). Upload a new PDF + cover photo here whenever one is finished —
// no code changes needed.
export const brochure = defineType({
  name: 'brochure',
  title: 'Brochure',
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
    defineField({ name: 'summary', title: 'Short Summary', type: 'text', rows: 2 }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'pageCount', title: 'Page Count', type: 'number' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
