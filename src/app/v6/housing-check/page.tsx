/**
 * /housing-check/ — standalone 60-second housing-disrepair case check.
 *
 * Shipped 2026-10-31 as the destination for the SMS auto-reply fired
 * when a visitor completes the exit-intent popup on
 * /housing-disrepair/. The URL promise in that SMS is "Free 60-sec
 * case check" so the recipient must land in a dedicated wizard, not
 * back on the LP they just left.
 *
 * Deliberately minimal: a tight header, one-line context, the wizard
 * itself, SRA footnote. No hero, no secondary form, no testimonials
 * — the recipient is already a warm lead who has already given their
 * phone number; the only job of this page is to help them qualify
 * their claim in under a minute.
 *
 * Pairs with /api/lead/route.ts SMS body (URL: abrahamssolicitors.co.uk/housing-check).
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HousingQualifier } from "@/components/v6/housing-qualifier";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { JsonLd, breadcrumbSchema } from "@/components/v6/jsonld";
import { Phone, ShieldCheck, Clock } from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/housing-check/";

export const metadata: Metadata = {
  title: "Free 60-second housing disrepair case check | Abrahams Solicitors",
  description:
    "Answer 5 quick questions to find out whether you have a housing disrepair claim against your council or housing association. No win no fee. SRA-regulated firm #809071.",
  alternates: { canonical: PAGE_URL },
  // Deliberately not indexed. This page is the destination of a
  // transactional SMS, not an organic entry point. Google already has
  // the full housing-disrepair LP indexed with the wizard reachable
  // through its own toggle.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Free 60-second housing disrepair case check — Abrahams Solicitors",
    description:
      "5 quick questions to find out whether you have a housing disrepair claim. Specialist Council & Housing Association solicitors. No win no fee.",
    url: PAGE_URL,
    type: "website",
    locale: "en_GB",
  },
};

export default function HousingCheckPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Housing Disrepair Claims", url: "https://www.abrahamssolicitors.co.uk/housing-disrepair/" },
        { name: "60-second case check" },
      ])} />

      {/* Compact header — just the firm identity + a visible phone,
          no primary nav. The recipient came in from an SMS; menus
          would just invite them to leave. */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-[720px] mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/favicon-32x32.png"
              alt="Abrahams Solicitors"
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="font-black text-brand-navy text-sm sm:text-base tracking-tight truncate">
              Abrahams Solicitors
            </span>
          </Link>
          <DynamicCallLink className="inline-flex items-center gap-1.5 text-brand-red font-bold text-xs sm:text-sm hover:underline">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline"><DynamicPhoneText /></span>
            <span className="sm:hidden">Call</span>
          </DynamicCallLink>
        </div>
      </header>

      <main className="bg-slate-50/60 min-h-[calc(100vh-140px)]">
        <div className="max-w-[720px] mx-auto px-5 py-6 sm:py-10">
          {/* Context strip — orient the recipient in one line. */}
          <div className="mb-5 flex items-center gap-2 text-xs font-bold text-brand-red uppercase tracking-widest">
            <Clock className="h-3.5 w-3.5" />
            60-second case check
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Find out if you have a housing disrepair claim.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[55ch]">
            Five quick questions. No obligation, no account to create. A specialist housing solicitor will review your answers and call you back today if you qualify.
          </p>

          {/* The wizard itself — self-contained, carries its own form,
              its own tracking, its own Thank-You state. */}
          <div className="mt-7">
            <HousingQualifier />
          </div>

          {/* Trust strip — one line of regulatory + commercial reassurance. */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              SRA-regulated firm #809071
            </span>
            <span>No win, no fee</span>
            <span>Callback within the hour</span>
          </div>

          {/* Secondary call affordance — if the recipient would
              rather speak than tap, keep that door open on the same page. */}
          <p className="mt-6 text-sm text-slate-600">
            Prefer to speak now?{" "}
            <DynamicCallLink className="font-semibold text-brand-red hover:underline">
              <DynamicPhoneText />
            </DynamicCallLink>
          </p>
        </div>
      </main>
    </>
  );
}
