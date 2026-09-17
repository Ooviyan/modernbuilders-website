'use client'

import { useState } from 'react'
import { Tabs } from '@/components/ui/vercel-tabs'
import { ProjectCard } from '@/components/ProjectCard'
import type { Project, ProjectKind } from '@/lib/types'

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client Projects' },
  { id: 'rental', label: 'For Rent' },
]

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.kind === filter)

  return (
    <>
      <Tabs
        tabs={FILTER_TABS}
        activeTab={filter}
        onTabChange={(id) => setFilter(id as ProjectKind | 'all')}
      />

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
