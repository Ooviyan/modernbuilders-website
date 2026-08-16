import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'heroImage',
      title: 'Home Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'heroHeading', title: 'Home Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Home Hero Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'foundedYear', title: 'Founded Year', type: 'number' }),
    defineField({ name: 'founderName', title: 'Founder Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone / WhatsApp', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
    defineField({
      name: 'stats',
      title: 'Stats (e.g. Years Experience, Projects Completed, Clients)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
