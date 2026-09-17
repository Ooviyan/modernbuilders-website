import Link from 'next/link'
import { SanityImg } from './SanityImg'
import type { ImageRef } from '@/lib/types'

interface HeroProps {
  heading: string
  subheading: string
  image?: ImageRef
}

export function Hero({ heading, subheading, image }: HeroProps) {
  return (
    // Pulled up by the header's own height (-mt) so the background image
    // extends behind the sticky header instead of starting below it —
    // otherwise "transparent" just shows the plain page background there.
    <section className="relative -mt-[69px] border-b border-border">
      <div className="absolute inset-0">
        <SanityImg image={image} alt="" fill sizes="100vw" className="h-full w-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pt-[calc(69px+8rem)] pb-32 sm:pt-[calc(69px+11rem)] sm:pb-44 lg:pt-[calc(69px+14rem)] lg:pb-56">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            For Your Generation
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-6 text-lg text-navy-light">{subheading}</p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Request a Quote
            </Link>
            <Link
              href="/projects"
              className="text-sm font-semibold text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
