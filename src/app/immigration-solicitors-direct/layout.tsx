/**
 * /immigration-solicitors-direct/ — minimal-nav A/B candidate of the
 * /immigration-solicitors/ LP for the £150/day Google Ads
 * "Immigration Lawyers / Immigration Solicitors" campaign.
 *
 * Built 2026-06-03 after Council Track A (4 of 5 advisors rejected a
 * full strip of the existing page but approved a sister LP with reduced
 * nav, kept as a reversible A/B against /immigration-solicitors/).
 *
 * Why this layout lives outside `/v6/`:
 * The v6 root layout (src/app/v6/layout.tsx) renders V6Header (full
 * site nav) and V6Footer (service hub links) for every child route.
 * Next.js App Router layouts compose — a child cannot remove its
 * parent's chrome. To genuinely strip the nav we must escape the v6
 * layout entirely. Placing this route at the app-root level (peer of
 * /v6/) does that — it inherits only from src/app/layout.tsx (HTML +
 * fonts + PostHog).
 *
 * What stays vs goes vs new:
 *   KEEP (tracking + UX):
 *     - GoogleTagManager (GTM-MPNJCTN7)        — ec_form_submit etc
 *     - BingUet (UET tag 187225876)            — Microsoft Ads tracking
 *     - GclidCapture                           — click ID persistence
 *     - CookieConsent                          — GDPR / consent mode
 *     - Poppins font                           — visual consistency
 *     - LegalService JSON-LD                   — rich-snippet eligibility
 *   DROP (per council):
 *     - V6Header (site nav with Immigration / Housing / About etc)
 *     - V6Footer (service hub footer with 30+ links)
 *     - StickyCallBar (page-level CTAs are sufficient; sticky duplicate
 *       creates decision fatigue per Contrarian)
 *     - ChatWidgets (extra interaction surface for a single-action LP)
 *
 * Ad-group repoint plan: Solicitors ad group final URL changes from
 * `/immigration-solicitors/` to `/immigration-solicitors-direct/`,
 * 14-day CPA watch, 2-minute revert if worse.
 */

import { Poppins } from "next/font/google";
import { CookieConsent } from "@/components/v6/cookie-consent";
import { GoogleTagManager } from "@/components/v6/google-tag-manager";
import { BingUet } from "@/components/v6/bing-uet";
import { GclidCapture } from "@/components/v6/gclid-capture";
import { JsonLd, organisationSchema } from "@/components/v6/jsonld";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ImmigrationSolicitorsDirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      <GoogleTagManager />
      <BingUet />
      <GclidCapture />
      <JsonLd data={organisationSchema()} />
      <style>{`
        .${poppins.className} h1,
        .${poppins.className} h2,
        .${poppins.className} h3,
        .${poppins.className} h4,
        .${poppins.className} h5,
        .${poppins.className} h6,
        .${poppins.className} p,
        .${poppins.className} a,
        .${poppins.className} span,
        .${poppins.className} button,
        .${poppins.className} input,
        .${poppins.className} label {
          font-family: ${poppins.style.fontFamily} !important;
        }
      `}</style>
      {/*
        Minimal direct-LP nav: just the firm logo + phone CTA. No service
        links. Renders trust-by-presence ("real law firm has a logo and
        phone, not a stripped 'one-action' wall") per Outsider advisor,
        without the service-hub drift that hurt the parent LP.
      */}
      <DirectLpHeader />
      <main className="flex-1">{children}</main>
      <DirectLpFooter />
      <CookieConsent />
    </div>
  );
}

/**
 * Minimal header for the direct LP. Logo + phone only — no nav menu.
 * Inline rather than a separate component because it's tightly scoped
 * to this route and unlikely to be reused elsewhere.
 */
function DirectLpHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo (text-only — no link to homepage, intentional for LP focus) */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center font-black text-sm">
              A
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-bold text-brand-navy tracking-tight">Abrahams</span>
              <span className="block text-[9px] font-semibold text-brand-gold uppercase tracking-[0.2em]">Solicitors</span>
            </div>
          </div>
          {/*
            Phone CTA inline. Using a plain <a tel:> rather than the
            DynamicCallLink component to avoid a third dependency — the
            phone number is fixed for this LP (no per-source dynamic
            number swap because all traffic is from the same ad group).
          */}
          <a
            href="tel:02033559823"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg px-4 sm:px-5 h-10 sm:h-11 text-sm font-semibold transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="hidden sm:inline">0203 355 9823</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Minimal footer for the direct LP. Regulatory boilerplate only — no
 * service-hub link grid. SRA disclosure is required by Solicitors
 * Regulation Authority Rule 8.1 for any solicitor's marketing page.
 */
function DirectLpFooter() {
  return (
    <footer className="bg-brand-navy text-white/80 py-8 lg:py-10 mt-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] sm:text-xs leading-relaxed">
          <div>
            <p className="font-semibold text-white">Abrahams Solicitors</p>
            <p className="mt-1">
              Authorised and regulated by the Solicitors Regulation Authority &middot; SRA Firm
              ID #809071 &middot;{" "}
              <a
                href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=809071"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Verify on SRA register
              </a>
            </p>
          </div>
          <div className="text-white/60">
            &copy; {new Date().getFullYear()} Abrahams Solicitors
          </div>
        </div>
      </div>
    </footer>
  );
}
