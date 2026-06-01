/**
 * Reusable cross-link card pointing visitors at the adequate-maintenance
 * calculator. Used on every partner-visa cluster page (spouse / fiancé /
 * unmarried partner / civil partnership / FLR(M) extension) so visitors
 * who arrive on those pages and panic at the £29,000 figure know the
 * exemption exists for sponsors on disability benefits or war pensions.
 *
 * Built 2026-06-01 after the calculator shipped — most partner-visa pages
 * mention "£29k income requirement" prominently but don't signal the
 * adequate-maintenance alternative, so the disability-sponsor cohort
 * bounces before reaching the calculator via the nav.
 */

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function AdequateMaintenanceCallout({
  compact = false,
}: {
  /** Compact mode shrinks margins/padding for sidebar / inline contexts. */
  compact?: boolean;
}) {
  return (
    <aside
      className={`rounded-2xl border-2 border-brand-red/20 bg-gradient-to-br from-brand-red/5 to-amber-50 ${compact ? "p-4 sm:p-5" : "p-5 sm:p-7"}`}
      aria-label="Adequate maintenance route — alternative to the £29,000 income requirement"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-red text-white">
          <ShieldCheck className="h-3 w-3" /> Disability or war-pension sponsor?
        </span>
      </div>
      <h3
        className={`${compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"} font-black text-slate-900 leading-tight tracking-tight`}
      >
        You may not need to meet the £29,000 income requirement.
      </h3>
      <p className={`mt-2 ${compact ? "text-sm" : "text-sm sm:text-base"} text-slate-700 leading-relaxed`}>
        If the UK sponsor receives <strong>PIP, DLA, Attendance Allowance, Carer&rsquo;s Allowance, AFIP
        or a War Disablement Pension</strong>, the standard £29,000 minimum income requirement does
        not apply &mdash; the lower &ldquo;adequate maintenance&rdquo; test applies instead. Use our free
        calculator to check in 60 seconds.
      </p>
      <Link
        href="/adequate-maintenance-calculator/"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline underline-offset-2"
      >
        Open the Adequate Maintenance Calculator
        <ArrowRight className="h-4 w-4" />
      </Link>
    </aside>
  );
}
