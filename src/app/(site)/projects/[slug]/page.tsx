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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const fetched = await sanityFetch<Project>(projectBySlugQuery, { slug })
  const project = fetched ?? placeholderProjects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <article>
      <div className="relative h-[50vh] w-full">
        <SanityImg
          image={project.coverImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16">
        {(project.category || project.status) && (
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            {[project.category, project.status ? STATUS_LABEL[project.status] : null]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">{project.title}</h1>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-6 sm:grid-cols-3">
          {project.location && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-light">Location</dt>
              <dd className="mt-1 font-medium text-navy">{project.location}</dd>
            </div>
          )}
          {project.kind === 'client' && project.client && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-light">Client</dt>
              <dd className="mt-1 font-medium text-navy">{project.client}</dd>
            </div>
          )}
          {project.kind === 'rental' && project.rentAmount && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-light">Rent</dt>
              <dd className="mt-1 font-medium text-navy">{project.rentAmount}</dd>
            </div>
          )}
          {project.completionDate && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-navy-light">
                {project.kind === 'rental' ? 'Built' : 'Completed'}
              </dt>
              <dd className="mt-1 font-medium text-navy">
                {new Date(project.completionDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                })}
              </dd>
            </div>
          )}
        </dl>

        {project.description && (
          <div className="prose prose-neutral mt-10 max-w-none">
            <PortableText value={project.description} />
          </div>
        )}

        {!!project.gallery?.length && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <div key={i} className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                <SanityImg image={img} alt={`${project.title} photo ${i + 1}`} fill className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {project.kind === 'rental' && (project.status === 'available' || project.status === 'ready') && (
          <div className="mt-10 rounded-lg border border-border bg-surface p-6">
            <p className="font-semibold text-navy">Interested in this property?</p>
            <p className="mt-1 text-sm text-navy-light">
              Get in touch and we&apos;ll walk you through availability and terms.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Enquire Now
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
