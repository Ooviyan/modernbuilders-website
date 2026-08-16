import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'
import { SanityImg } from '@/components/SanityImg'
import { sanityFetch } from '@/sanity/fetch'
import { aboutPageQuery } from '@/sanity/queries'
import { placeholderAboutPage, placeholderAboutStory } from '@/lib/placeholder-data'
import type { AboutPage } from '@/lib/types'

export const metadata: Metadata = { title: 'About' }

export default async function AboutUsPage() {
  const fetched = await sanityFetch<Partial<AboutPage>>(aboutPageQuery)
  const about: AboutPage = { ...placeholderAboutPage, ...fetched }

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Who We Are</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">{about.heading}</h1>
          <p className="mt-4 max-w-2xl text-navy-light">{about.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
        <div className="relative aspect-[3/2] w-full self-center overflow-hidden rounded-lg">
          <SanityImg image={about.image} alt={about.heading} fill className="h-full w-full object-cover" />
        </div>
        <div className="prose prose-neutral max-w-none space-y-4">
          {about.story ? (
            <PortableText value={about.story} />
          ) : (
            placeholderAboutStory.map((para, i) => (
              <p key={i} className="text-navy-light">
                {para}
              </p>
            ))
          )}
        </div>
      </section>

      {!!about.values?.length && (
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-bold text-navy">What We Stand For</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {about.values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-lg font-semibold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm text-navy-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
