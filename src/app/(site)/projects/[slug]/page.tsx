import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { SanityImg } from '@/components/SanityImg'
import { sanityFetch } from '@/sanity/fetch'
import { projectBySlugQuery } from '@/sanity/queries'
import { placeholderProjects } from '@/lib/placeholder-data'
import type { Project, ProjectStatus } from '@/lib/types'

const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  available: 'Available for Rent',
  rented: 'Rented',
  ready: 'Ready to Move',
}

// Shown when a project doesn't have a real description yet in Sanity, so
// the page never just stops dead after the meta row.
function fallbackDescription(project: Project): string {
  const place = project.location ? ` in ${project.location}` : ''
  if (project.kind === 'rental') {
    return `${project.title} is one of MODERN BUILDERS' own properties${place}, built to the same standard we bring to every client project. Get in touch for availability and terms.`
  }
  const category = project.category ? project.category.toLowerCase() : 'building'
  const verb = project.status === 'ongoing' ? 'is being delivered' : 'was designed and delivered'
  return `This ${category} project${place} ${verb} by MODERN BUILDERS — from design and approvals through construction and handover, with the same transparent, itemised estimates we bring to every job.`
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const fetched = await sanityFetch<Project>(projectBySlugQuery, { slug })
  const project = fetched ?? placeholderProjects.find((p) => p.slug === slug)

  if (!project) notFound()

  const metaItems = [
    project.location && { label: 'Location', value: project.location },
    project.kind === 'client' && project.client && { label: 'Client', value: project.client },
    project.kind === 'rental' && project.rentAmount && { label: 'Rent', value: project.rentAmount },
    project.completionDate && {
      label: project.kind === 'rental' ? 'Built' : 'Completed',
      value: new Date(project.completionDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
      }),
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  const isAvailableRental =
    project.kind === 'rental' && (project.status === 'available' || project.status === 'ready')

  return (
    <article>
      <div className="relative aspect-[3/2] w-full">
        <SanityImg
          image={project.coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/projects"
          className="text-sm font-semibold text-navy-light underline underline-offset-4 transition-colors hover:text-navy"
        >
          ← All Projects
        </Link>

        {(project.category || project.status) && (
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gold">
            {[project.category, project.status ? STATUS_LABEL[project.status] : null]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">{project.title}</h1>

        {metaItems.length > 0 && (
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-6">
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-wide text-navy-light">{item.label}</dt>
                <dd className="mt-1 font-medium text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="prose prose-neutral mt-10 max-w-none">
          {project.description ? (
            <PortableText value={project.description} />
          ) : (
            <p className="text-navy-light">{fallbackDescription(project)}</p>
          )}
        </div>

        {!!project.gallery?.length && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div key={i} className="relative aspect-[3/2] w-full overflow-hidden">
                <SanityImg image={img} alt={`${project.title} photo ${i + 1}`} fill className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border border-border p-6">
          <p className="font-semibold text-navy">
            {isAvailableRental ? 'Interested in this property?' : 'Planning something similar?'}
          </p>
          <p className="mt-1 text-sm text-navy-light">
            {isAvailableRental
              ? "Get in touch and we'll walk you through availability and terms."
              : "Tell us about your project and we'll get back to you with a free estimate."}
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            {isAvailableRental ? 'Enquire Now' : 'Get a Free Quote'}
          </Link>
        </div>
      </div>
    </article>
  )
}
