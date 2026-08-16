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
      <Header companyName={settings.companyName} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
