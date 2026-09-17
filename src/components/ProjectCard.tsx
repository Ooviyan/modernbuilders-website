import Link from 'next/link'
import { SanityImg } from './SanityImg'
import { SpecularFrame } from './effects/SpecularFrame'
import type { Project, ProjectStatus } from '@/lib/types'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  available: 'Available for Rent',
  rented: 'Rented',
  ready: 'Ready to Move',
}

export function ProjectCard({ project }: { project: Project }) {
  const meta = [project.category, project.status ? STATUS_LABEL[project.status] : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <SpecularFrame>
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full overflow-hidden bg-background"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <SanityImg
            image={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          {meta && (
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{meta}</p>
          )}
          <h3 className="mt-2 text-lg font-semibold text-navy">{project.title}</h3>
          <p className="mt-1 text-sm text-navy-light">
            {project.location}
            {project.kind === 'rental' && ' · For Rent'}
          </p>
        </div>
      </Link>
    </SpecularFrame>
  )
}
