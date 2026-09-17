import Link from 'next/link'
import { SanityImg } from './SanityImg'
import { SpecularFrame } from './effects/SpecularFrame'
import type { Service } from '@/lib/types'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <SpecularFrame>
      <Link
        href={`/services#${service.slug}`}
        className="group block h-full overflow-hidden bg-background transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <SanityImg
            image={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="line-clamp-2 text-lg font-semibold text-navy">{service.title}</h3>
          <p className="mt-2 text-sm text-navy-light">{service.summary}</p>
        </div>
      </Link>
    </SpecularFrame>
  )
}
