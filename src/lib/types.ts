import type { PortableTextBlock } from 'next-sanity'

export interface SanityImage {
  asset?: { _ref: string; _type: 'reference' }
  [key: string]: unknown
}

// An image can come from Sanity (once connected) or be a plain path into
// /public (e.g. "/projects/example-residence/cover.jpg") for content added
// directly to the codebase before Sanity is wired up.
export type ImageRef = SanityImage | string

export interface SiteSettings {
  companyName: string
  tagline: string
  logo?: ImageRef
  heroImage?: ImageRef
  heroHeading: string
  heroSubheading: string
  foundedYear?: number
  founderName?: string
  phone: string
  email?: string
  address: string
  stats: { label: string; value: string }[]
}

export interface Service {
  _id: string
  title: string
  slug: string
  summary: string
  description?: PortableTextBlock[]
  image?: ImageRef
  order?: number
}

export type ProjectKind = 'client' | 'rental'
export type ProjectStatus = 'completed' | 'ongoing' | 'available' | 'rented' | 'ready'

export interface Project {
  _id: string
  title: string
  slug: string
  kind: ProjectKind
  category?: string
  status?: ProjectStatus
  location?: string
  client?: string
  rentAmount?: string
  completionDate?: string
  coverImage: ImageRef
  gallery?: ImageRef[]
  description?: PortableTextBlock[]
  featured?: boolean
}

export interface AboutPage {
  heading: string
  intro: string
  story?: PortableTextBlock[]
  image?: ImageRef
  values: { title: string; description: string }[]
}

export interface Brochure {
  _id: string
  title: string
  slug: string
  summary?: string
  coverImage: ImageRef
  // Local path (string) or a Sanity file asset's resolved URL.
  pdfUrl: string
  pageCount?: number
  order?: number
}
