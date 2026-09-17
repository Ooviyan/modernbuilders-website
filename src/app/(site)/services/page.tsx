import type { Metadata } from 'next'
import Link from 'next/link'
import { SanityImg } from '@/components/SanityImg'
import { sanityFetch } from '@/sanity/fetch'
import { servicesQuery } from '@/sanity/queries'
import { placeholderServices } from '@/lib/placeholder-data'
import type { Service } from '@/lib/types'

export const metadata: Metadata = { title: 'Services' }

export default async function ServicesPage() {
  const fetched = await sanityFetch<Service[]>(servicesQuery)
  const services = fetched?.length ? fetched : placeholderServices

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">What We Do</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">Our Services</h1>
          <p className="mt-4 max-w-2xl text-navy-light">
            From design and approvals through construction and handover — we handle it end-to-end,
            with transparent, itemised estimates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-16">
          {services.map((service, i) => (
            <div
              key={service._id}
              id={service.slug}
              className={`grid scroll-mt-24 items-center gap-10 md:grid-cols-2 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <SanityImg
                  image={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy">{service.title}</h2>
                <p className="mt-4 text-navy-light">{service.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
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
        </div>
      </section>
    </>
  )
}
