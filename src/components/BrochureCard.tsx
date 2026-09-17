import { SanityImg } from './SanityImg'
import { SpecularFrame } from './effects/SpecularFrame'
import type { Brochure } from '@/lib/types'

export function BrochureCard({ brochure }: { brochure: Brochure }) {
  return (
    <SpecularFrame>
      <div className="h-full overflow-hidden bg-background">
        <a
          href={brochure.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border">
            <SanityImg
              image={brochure.coverImage}
              alt={`${brochure.title} catalogue cover`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </a>
        <div className="p-6">
          {brochure.pageCount && (
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {brochure.pageCount} Pages
            </p>
          )}
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-navy">{brochure.title}</h3>
          {brochure.summary && <p className="mt-1 text-sm text-navy-light">{brochure.summary}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <a
              href={brochure.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Preview Catalogue
            </a>
            <a
              href={brochure.pdfUrl}
              download
              className="text-sm font-semibold text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </SpecularFrame>
  )
}
