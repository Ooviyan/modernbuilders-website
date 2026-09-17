import type { Metadata } from 'next'
import { BrochureCard } from '@/components/BrochureCard'
import { sanityFetch } from '@/sanity/fetch'
import { brochuresQuery } from '@/sanity/queries'
import { placeholderBrochures } from '@/lib/placeholder-data'
import type { Brochure } from '@/lib/types'

export const metadata: Metadata = { title: 'Brochures' }

export default async function BrochuresPage() {
  const fetched = await sanityFetch<Brochure[]>(brochuresQuery)
  const brochures = fetched?.length ? fetched : placeholderBrochures

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Catalogues</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">Brochures</h1>
          <p className="mt-4 max-w-2xl text-navy-light">
            Browse our design catalogues in detail, or download a copy to share. More are on the
            way as each is finished.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brochures.map((brochure) => (
            <BrochureCard key={brochure._id} brochure={brochure} />
          ))}
        </div>
      </section>
    </>
  )
}
