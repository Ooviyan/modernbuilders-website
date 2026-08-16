import type { Metadata } from 'next'
import Link from 'next/link'
import { ProjectCard } from '@/components/ProjectCard'
import { sanityFetch } from '@/sanity/fetch'
import { projectsQuery } from '@/sanity/queries'
import { placeholderProjects } from '@/lib/placeholder-data'
import type { Project, ProjectKind } from '@/lib/types'

export const metadata: Metadata = { title: 'Projects & Properties' }

const FILTERS: { label: string; value: ProjectKind | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Client Projects', value: 'client' },
  { label: 'For Rent', value: 'rental' },
]

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>
}) {
  const { kind } = await searchParams
  const activeFilter: ProjectKind | 'all' =
    kind === 'client' || kind === 'rental' ? kind : 'all'

  const fetched = await sanityFetch<Project[]>(projectsQuery)
  const allProjects = fetched?.length ? fetched : placeholderProjects
  const projects =
    activeFilter === 'all' ? allProjects : allProjects.filter((p) => p.kind === activeFilter)

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
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const href = f.value === 'all' ? '/projects' : `/projects?kind=${f.value}`
            const active = f.value === activeFilter
            return (
              <Link
                key={f.value}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? 'bg-navy text-white' : 'bg-surface text-navy-light hover:bg-border'
                }`}
              >
                {f.label}
              </Link>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-10 text-navy-light">No entries in this category yet.</p>
        )}
      </section>
    </>
  )
}
