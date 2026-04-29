'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const POSTHOG_KEY = 'phc_rJmyyFtKADpwEYUz9ufrd9cREaaoDq37ZeUrAyek5fnM'
const POSTHOG_HOST = 'https://eu.i.posthog.com'

if (typeof window !== 'undefined' && !posthog.__loaded) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // We capture manually for SPA route changes
    capture_pageleave: true,
    autocapture: true, // Auto-capture clicks, form submissions, etc.
    person_profiles: 'identified_only',
  })

  // Tag all events with site identifier for multi-site filtering
  posthog.register({
    site: 'abrahams',
    site_name: 'Abrahams Solicitors',
    site_domain: 'abrahamssolicitors.co.uk',
  })
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + '?' + searchParams.toString()
      }

      // Detect service area from URL
      let serviceArea = 'general'
      if (pathname.includes('immigration') || pathname.includes('visa') || pathname.includes('asylum') || pathname.includes('citizenship')) {
        serviceArea = 'immigration'
      } else if (pathname.includes('housing') || pathname.includes('disrepair')) {
        serviceArea = 'housing-disrepair'
      } else if (pathname.includes('personal-injury') || pathname.includes('accident')) {
        serviceArea = 'personal-injury'
      }

      ph.capture('$pageview', {
        $current_url: url,
        service_area: serviceArea,
      })
    }
  }, [pathname, searchParams, ph])

  return null
}

// Track phone number clicks
function TrackPhoneClicks() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link?.href?.startsWith('tel:')) {
        posthog.capture('phone_click', {
          phone_number: link.href.replace('tel:', ''),
          page: window.location.pathname,
        })
      }
      if (link?.href?.startsWith('mailto:')) {
        posthog.capture('email_click', {
          email: link.href.replace('mailto:', ''),
          page: window.location.pathname,
        })
      }
      // Track CTA button clicks
      const btn = target.closest('button, [role="button"], .btn, .cta')
      if (btn) {
        const text = btn.textContent?.trim().slice(0, 50)
        if (text && (text.toLowerCase().includes('consultation') || text.toLowerCase().includes('call') || text.toLowerCase().includes('contact') || text.toLowerCase().includes('get started') || text.toLowerCase().includes('enquire'))) {
          posthog.capture('cta_click', {
            button_text: text,
            page: window.location.pathname,
          })
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <TrackPhoneClicks />
      {children}
    </PHProvider>
  )
}
