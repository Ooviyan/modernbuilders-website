import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { ServiceCard } from '@/components/ServiceCard'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { sanityFetch } from '@/sanity/fetch'
import { featuredProjectsQuery, servicesQuery, siteSettingsQuery } from '@/sanity/queries'
import {
  placeholderProjects,
  placeholderServices,
  placeholderSiteSettings,
} from '@/lib/placeholder-data'
import type { Project, Service, SiteSettings } from '@/lib/types'

export default async function HomePage() {
  const [settingsRes, services, projects] = await Promise.all([
    sanityFetch<Partial<SiteSettings>>(siteSettingsQuery),
    sanityFetch<Service[]>(servicesQuery),
    sanityFetch<Project[]>(featuredProjectsQuery),
  ])

  const settings: SiteSettings = { ...placeholderSiteSettings, ...settingsRes }
  const featuredServices = (services?.length ? services : placeholderServices).slice(0, 4)
  const featuredProjects = (projects?.length ? projects : placeholderProjects).slice(0, 3)

  return (
    <>
      <Hero
        heading={settings.heroHeading}
        subheading={settings.heroSubheading}
        image={settings.heroImage}
      />

      <StatsBar stats={settings.stats} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
              What We Do
            </p>
            <h2 className="mt-2 text-3xl font-bold text-navy">Our Services</h2>
          </div>
          <Link href="/services" className="hidden text-sm font-semibold text-navy hover:text-gold-dark sm:block">
            View all services →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
                Our Work
              </p>
              <h2 className="mt-2 text-3xl font-bold text-navy">Featured Projects & Properties</h2>
            </div>
            <Link href="/projects" className="hidden text-sm font-semibold text-navy hover:text-gold-dark sm:block">
              View all →
            </Link>
          </div>
          <FeaturedProjects projects={featuredProjects} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-navy">Ready to start your project?</h2>
        <p className="mx-auto mt-4 max-w-xl text-navy-light">
          Tell us about your project and we&apos;ll get back to you with a free estimate.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-md bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
        >
          Get a Free Quote
        </Link>
      </section>
    </>
  )
}
