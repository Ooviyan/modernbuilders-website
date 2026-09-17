import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { sanityFetch } from '@/sanity/fetch'
import { siteSettingsQuery } from '@/sanity/queries'
import { placeholderSiteSettings } from '@/lib/placeholder-data'
import type { SiteSettings } from '@/lib/types'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const fetched = await sanityFetch<Partial<SiteSettings>>(siteSettingsQuery)
  const settings: SiteSettings = { ...placeholderSiteSettings, ...fetched }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-navy focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
      >
        Skip to content
      </a>
      <Header companyName={settings.companyName} />
      <main id="main-content" className="flex-1 scroll-mt-4">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  )
}
