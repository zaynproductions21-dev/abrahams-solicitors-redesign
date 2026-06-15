'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

// Privacy-hardened, consent-gated PostHog for a legal/immigration site.
// - Loads ONLY after the visitor accepts via the cookie banner (cookie-consent.tsx).
// - Session replay masks ALL inputs and ALL text; profiles only for identified users.
// - Key/host come from env — nothing fires until NEXT_PUBLIC_POSTHOG_KEY is set.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
// First-party reverse proxy: analytics route through this site's own /ingest path
// (rewritten to PostHog in next.config + skipped in proxy.ts) — no third party.
const POSTHOG_HOST = '/ingest'
const COOKIE_KEY = 'abrahams-cookie-consent-v1'
const CONSENT_EVENT = 'abrahams:consent-changed'

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.localStorage.getItem(COOKIE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed?.decision === 'accepted'
  } catch {
    return false
  }
}

let initialised = false
function initPostHog() {
  if (initialised || !POSTHOG_KEY || typeof window === 'undefined' || posthog.__loaded) return
  initialised = true
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    ui_host: 'https://eu.posthog.com',
    capture_pageview: false, // captured manually for SPA route changes (below)
    capture_pageleave: true,
    autocapture: true, // clicks/navigation — input values are never captured
    person_profiles: 'identified_only',
    session_recording: { maskAllInputs: true, maskTextSelector: '*' },
  })
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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const activate = () => {
      if (hasConsent()) {
        initPostHog()
        setReady(true)
      }
    }
    activate()
    window.addEventListener(CONSENT_EVENT, activate)
    return () => window.removeEventListener(CONSENT_EVENT, activate)
  }, [])

  return (
    <PHProvider client={posthog}>
      {ready && (
        <>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <TrackPhoneClicks />
        </>
      )}
      {children}
    </PHProvider>
  )
}
