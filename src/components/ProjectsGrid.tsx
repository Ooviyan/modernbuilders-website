'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs } from '@/components/ui/vercel-tabs'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project, ProjectKind } from '@/lib/types'

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client Projects' },
  { id: 'rental', label: 'For Rent' },
]

function isValidFilter(value: string | null): value is ProjectKind | 'all' {
  return value === 'all' || value === 'client' || value === 'rental'
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const kindParam = searchParams.get('kind')
  const filter: ProjectKind | 'all' = isValidFilter(kindParam) ? kindParam : 'all'

  const setFilter = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (id === 'all') params.delete('kind')
      else params.set('kind', id)
      const query = params.toString()
      router.replace(query ? `/projects?${query}` : '/projects', { scroll: false })
    },
    [router, searchParams]
  )

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.kind === filter)

  return (
    <>
      <Tabs tabs={FILTER_TABS} activeTab={filter} onTabChange={setFilter} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-navy-light">No entries in this category yet.</p>
      )}
    </>
  )
}
