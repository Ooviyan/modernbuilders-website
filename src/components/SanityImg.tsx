import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { ImageRef } from '@/lib/types'

interface SanityImgProps {
  image?: ImageRef
  alt: string
  className?: string
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
}

/**
 * Renders an image from Sanity, a local /public path, or — if neither is
 * set — a plain light-gray placeholder block so pages still look
 * intentional pre-content.
 */
export function SanityImg({ image, alt, className = '', sizes, fill, width, height }: SanityImgProps) {
  const isLocalPath = typeof image === 'string'
  const hasSanityAsset = !isLocalPath && Boolean(image?.asset)

  if (!isLocalPath && !hasSanityAsset) {
    return (
      <div
        className={`flex items-center justify-center bg-surface text-navy-light/50 ${className}`}
        aria-label={alt}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  const src = isLocalPath ? image : urlFor(image!).url()

  if (fill) {
    return <Image src={src} alt={alt} fill sizes={sizes} className={className} />
  }

  return <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} className={className} />
}
