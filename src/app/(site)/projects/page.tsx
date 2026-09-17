import type { Metadata } from 'next'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { sanityFetch } from '@/sanity/fetch'
import { projectsQuery } from '@/sanity/queries'
import { placeholderProjects } from '@/lib/placeholder-data'
import type { Project } from '@/lib/types'

export const metadata: Metadata = { title: 'Projects & Properties' }

export default async function ProjectsPage() {
  const fetched = await sanityFetch<Project[]>(projectsQuery)
  const projects = fetched?.length ? fetched : placeholderProjects

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our Work</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">Projects & Properties</h1>
          <p className="mt-4 max-w-2xl text-navy-light">
            A look at the homes and buildings we&apos;ve delivered for clients, plus our own
            properties currently available for rent.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  )
}
