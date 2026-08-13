'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

// Privacy-hardened, consent-gated PostHog for a legal/immigration site.
// - The posthog-js and posthog-js/react packages are DYNAMICALLY imported
//   inside initPostHog() — they don't touch the initial page bundle.
//   Before consent, PostHog contributes 0 KiB to first-load JS.
// - Loads ONLY after the visitor accepts via the cookie banner (cookie-consent.tsx).
// - Session replay masks ALL inputs and ALL text; profiles only for identified users.
// - Key/host come from env — nothing fires until NEXT_PUBLIC_POSTHOG_KEY is set.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
// First-party reverse proxy: analytics route through this site's own /ingest path
// (rewritten to PostHog in next.config + skipped in proxy.ts) — no third party.
const POSTHOG_HOST = '/ingest'
const COOKIE_KEY = 'abrahams-cookie-consent-v1'
const CONSENT_EVENT = 'abrahams:consent-changed'

// Loose type for the PostHog client — kept as `any` because the type is
// only reachable via a runtime import which we're deliberately not making.
// Not worth pulling `import type { PostHog }` in and betting on the exact
// name held over versions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PostHogClient = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PostHogReactProvider = any

// Module-level references populated after the dynamic import resolves.
// null before consent, so the posthog-js bundle is never loaded on initial
// page paint. Once initialised, they're reused across route changes.
let postHogClient: PostHogClient = null
let PostHogReactProviderComponent: PostHogReactProvider = null
let initPromise: Promise<void> | null = null

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

async function initPostHog(): Promise<void> {
  if (initPromise) return initPromise
  if (!POSTHOG_KEY || typeof window === 'undefined') return
  initPromise = (async () => {
    // Dynamic imports — both split into a separate async chunk that only
    // downloads at this point, not on initial page load.
    const [{ default: posthog }, phReact] = await Promise.all([
      import('posthog-js'),
      import('posthog-js/react'),
    ])
    PostHogReactProviderComponent = phReact.PostHogProvider
    if (!posthog.__loaded) {
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
    postHogClient = posthog
  })()
  return initPromise
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || !postHogClient) return
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

    postHogClient.capture('$pageview', {
      $current_url: url,
      service_area: serviceArea,
    })
  }, [pathname, searchParams])

  return null
}

// Track phone number clicks, email clicks, and generic CTA taps.
// Only mounts after consent, so postHogClient is guaranteed populated by
// the time this component's useEffect runs — but we still null-check for
// belt-and-braces in case the module is being replaced mid-frame.
function TrackPhoneClicks() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!postHogClient) return
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link?.href?.startsWith('tel:')) {
        postHogClient.capture('phone_click', {
          phone_number: link.href.replace('tel:', ''),
          page: window.location.pathname,
        })
      }
      if (link?.href?.startsWith('mailto:')) {
        postHogClient.capture('email_click', {
          email: link.href.replace('mailto:', ''),
          page: window.location.pathname,
        })
      }
      // Track CTA button clicks
      const btn = target.closest('button, [role="button"], .btn, .cta')
      if (btn) {
        const text = btn.textContent?.trim().slice(0, 50)
        if (text && (text.toLowerCase().includes('consultation') || text.toLowerCase().includes('call') || text.toLowerCase().includes('contact') || text.toLowerCase().includes('get started') || text.toLowerCase().includes('enquire'))) {
          postHogClient.capture('cta_click', {
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
    const activate = async () => {
      if (hasConsent()) {
        await initPostHog()
        setReady(true)
      }
    }
    activate()
    window.addEventListener(CONSENT_EVENT, activate)
    return () => window.removeEventListener(CONSENT_EVENT, activate)
  }, [])

  // Before consent: render children bare, no PHProvider wrapping — the
  // posthog-js bundle is never loaded. This is the primary perf win.
  if (!ready || !PostHogReactProviderComponent || !postHogClient) {
    return <>{children}</>
  }

  const PHProvider = PostHogReactProviderComponent
  return (
    <PHProvider client={postHogClient}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <TrackPhoneClicks />
      {children}
    </PHProvider>
  )
}
