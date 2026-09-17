import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { SanityImg } from '@/components/SanityImg'
import { sanityFetch } from '@/sanity/fetch'
import { aboutPageQuery, siteSettingsQuery } from '@/sanity/queries'
import { placeholderAboutPage, placeholderAboutStory, placeholderSiteSettings } from '@/lib/placeholder-data'
import type { AboutPage, SiteSettings } from '@/lib/types'

export const metadata: Metadata = { title: 'About' }

export default async function AboutUsPage() {
  const [fetchedAbout, fetchedSettings] = await Promise.all([
    sanityFetch<Partial<AboutPage>>(aboutPageQuery),
    sanityFetch<Partial<SiteSettings>>(siteSettingsQuery),
  ])
  const about: AboutPage = { ...placeholderAboutPage, ...fetchedAbout }
  const settings: SiteSettings = { ...placeholderSiteSettings, ...fetchedSettings }

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Who We Are</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">{about.heading}</h1>
          <p className="mt-4 max-w-2xl text-navy-light">{about.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
        <div>
          <div className="relative aspect-square w-full overflow-hidden">
            <SanityImg
              image={about.founderImage}
              alt={settings.founderName ?? 'Founder'}
              fill
              sizes="(min-width: 768px) 280px, 60vw"
              className="h-full w-full object-cover"
            />
          </div>
          {settings.founderName && (
            <div className="mt-4">
              <p className="font-semibold text-navy">{settings.founderName}</p>
              <p className="text-sm text-navy-light">Founder{settings.foundedYear ? `, est. ${settings.foundedYear}` : ''}</p>
            </div>
          )}
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
