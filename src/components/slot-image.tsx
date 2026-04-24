'use client'

import { useState } from 'react'

interface SlotImageProps {
  slot: string
  fallbackSrc: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
  type?: string
}

/**
 * Image component that checks /generated/{slot}.webp first,
 * then falls back to the provided placeholder src.
 */
export function SlotImage({ slot, fallbackSrc, alt, className, width, height, loading = 'lazy', type }: SlotImageProps) {
  const [src, setSrc] = useState(`/generated/${slot}.webp`)
  const [triedGenerated, setTriedGenerated] = useState(false)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      data-image-slot={slot}
      data-image-type={type}
      onError={() => {
        if (!triedGenerated) {
          setTriedGenerated(true)
          setSrc(fallbackSrc)
        }
      }}
    />
  )
}
