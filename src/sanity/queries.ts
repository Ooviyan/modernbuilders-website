import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const servicesQuery = groq`*[_type == "service"] | order(order asc, title asc){
  ..., "slug": slug.current
}`

export const projectsQuery = groq`*[_type == "project"] | order(completionDate desc){
  ..., "slug": slug.current
}`

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(completionDate desc){
  ..., "slug": slug.current
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ..., "slug": slug.current
}`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`
