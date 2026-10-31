/**
 * Housing-disrepair hero A/B test — variant fill blocks.
 *
 * Both components render INSIDE Block A of the hero (below the H1 and
 * sub-head), filling the whitespace that opens up on desktop when the
 * form in Block B stretches the grid row taller than the headline
 * stack. The empty space was flagged by the client on 2026-10-31; this
 * A/B tests whether a problem-recognition grid (visceral) or a rights-
 * block (educational) converts better than the empty control.
 *
 * Both are server-renderable (no "use client" needed) — they are pure
 * JSX with no interactivity. That keeps the hero LCP intact.
 */

import {
  Droplet,
  Flame,
  Zap,
  Home,
  Bug,
  Wind,
  Scale,
  BadgeCheck,
  ShieldCheck,
  Clock,
} from "lucide-react";

/**
 * Variant: problem-photo-grid.
 *
 * Six icon tiles mapping to the top 6 claim categories. Visual,
 * scannable, zero-text-prefix — a tenant arriving in distress
 * recognises their situation instantly ("yes, that's my mould") and
 * is pulled toward the form.
 */
export function ProblemPhotoGrid() {
  const tiles = [
    { icon: Droplet, label: "Damp &amp; mould" },
    { icon: Flame, label: "Broken heating" },
    { icon: Home, label: "Leaks &amp; roof" },
    { icon: Zap, label: "Faulty wiring" },
    { icon: Bug, label: "Pest infestation" },
    { icon: Wind, label: "Ventilation" },
  ];
  return (
    <div className="mt-7 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6">
      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        If any of this is your home — you have a claim
      </p>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="flex flex-col items-center text-center bg-white rounded-xl border border-slate-100 py-3 px-2 sm:py-4"
          >
            <t.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-red mb-1.5" />
            <span
              className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.label }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Variant: statutory-rights-block.
 *
 * Four short cards citing the exact statutes / covenants that give the
 * tenant a right of action. Educational rather than emotional — plays
 * to the SEO-driven segment that already knows "disrepair" is a legal
 * term and is scanning for solicitor credibility.
 */
export function StatutoryRightsBlock() {
  const rights = [
    {
      icon: Scale,
      title: "Section 11, LTA 1985",
      body: "Landlord must repair structure, exterior and core services — automatic duty.",
    },
    {
      icon: BadgeCheck,
      title: "Homes (Fitness) Act 2018",
      body: "Property must be fit for human habitation throughout the tenancy.",
    },
    {
      icon: ShieldCheck,
      title: "Pre-Action Protocol",
      body: "20-day response window → surveyor → settlement or court order.",
    },
    {
      icon: Clock,
      title: "Six-year window",
      body: "You have six years from the start of the disrepair to bring a claim.",
    },
  ];
  return (
    <div className="mt-7 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6">
      <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
        Your rights at a glance
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {rights.map((r) => (
          <div
            key={r.title}
            className="bg-white rounded-xl border border-slate-100 p-3 sm:p-4"
          >
            <div className="flex items-start gap-2">
              <r.icon className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                  {r.title}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-600 leading-snug">
                  {r.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
