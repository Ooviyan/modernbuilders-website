import Link from 'next/link'

interface HeroProps {
  heading: string
  subheading: string
}

export function Hero({ heading, subheading }: HeroProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          For Your Generation
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-navy sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-navy-light">{subheading}</p>
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
    </section>
  )
}
