import Image from 'next/image'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo.png" alt={settings.companyName} width={160} height={54} className="h-10 w-auto" />
          <p className="mt-4 text-lg font-bold">{settings.companyName}</p>
          <p className="mt-2 text-sm text-white/60">{settings.tagline}</p>
          {settings.foundedYear && (
            <p className="mt-4 text-xs text-white/40">Since {settings.foundedYear}</p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['Services', '/services'],
              ['Projects', '/projects'],
              ['Brochures', '/brochures'],
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-white/80 hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-gold">
                {settings.phone} (Phone / WhatsApp)
              </a>
            </li>
            {settings.email && <li>{settings.email}</li>}
            <li className="whitespace-pre-line">{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        © {year} {settings.companyName}. All rights reserved.
      </div>
    </footer>
  )
}
