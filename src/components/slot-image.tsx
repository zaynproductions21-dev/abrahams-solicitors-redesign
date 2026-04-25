'use client'

import { useState, useEffect } from 'react'

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
 * Starts with fallback on SSR to avoid broken images before hydration.
 */
export function SlotImage({ slot, fallbackSrc, alt, className, width, height, loading = 'lazy', type }: SlotImageProps) {
  const [src, setSrc] = useState(fallbackSrc)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked) return
    const generatedUrl = `/generated/${slot}.webp`
    const img = new Image()
    img.onload = () => { setSrc(generatedUrl); setChecked(true) }
    img.onerror = () => { setChecked(true) }
    img.src = generatedUrl
  }, [slot, checked])

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
    />
  )
}
