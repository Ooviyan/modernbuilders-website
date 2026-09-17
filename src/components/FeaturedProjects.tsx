import Link from 'next/link'
import { SanityImg } from './SanityImg'
import type { Project } from '@/lib/types'

// Asymmetric strip (after Snøhetta's project grid) rather than a uniform
// card grid — one oversized featured project, smaller flanking ones,
// captioned directly beneath with no card border or background.
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const [lead, ...rest] = projects
  if (!lead) return null

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
      <FeaturedItem project={lead} aspect="aspect-[4/3]" titleClass="text-2xl" />

      {rest.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((project) => (
            <FeaturedItem
              key={project._id}
              project={project}
              aspect="aspect-[3/2]"
              titleClass="text-lg"
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FeaturedItem({
  project,
  aspect,
  titleClass,
}: {
  project: Project
  aspect: string
  titleClass: string
}) {
  const meta = [project.category, project.location].filter(Boolean).join(' · ')

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className={`relative ${aspect} w-full overflow-hidden`}>
        <SanityImg
          image={project.coverImage}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {meta && <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">{meta}</p>}
      <h3 className={`mt-1 line-clamp-2 font-semibold text-navy ${titleClass}`}>{project.title}</h3>
    </Link>
  )
}
