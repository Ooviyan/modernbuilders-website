import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { sanityFetch } from '@/sanity/fetch'
import { siteSettingsQuery } from '@/sanity/queries'
import { placeholderSiteSettings } from '@/lib/placeholder-data'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const fetched = await sanityFetch<Partial<SiteSettings>>(siteSettingsQuery)
  const settings: SiteSettings = { ...placeholderSiteSettings, ...fetched }

  const whatsappDigits = settings.phone.replace(/\D/g, '')
  const whatsappHref = `https://wa.me/${whatsappDigits}`

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Get In Touch</p>
          <h1 className="mt-2 text-4xl font-semibold text-navy">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-navy-light">
            Tell us about your project — or ask about renting one of our properties — and
            we&apos;ll follow up with next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-navy-light">
              Phone / WhatsApp
            </p>
            <p className="mt-1 text-lg font-medium text-navy">
              <a href={`tel:${whatsappDigits}`} className="hover:text-gold-dark">
                {settings.phone}
              </a>
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-md border border-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-surface"
            >
              Chat on WhatsApp
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-navy-light">Office</p>
            <p className="mt-1 whitespace-pre-line text-lg font-medium text-navy">{settings.address}</p>
          </div>
        </div>
      </section>
    </>
  )
}
