"use client";

/**
 * Emergency-Immigration Router Hero — variant B for the hero A/B.
 *
 * Shown when the `ab_emerg_hero` cookie resolves to "router". Replaces
 * the current detention/dawn-raid-led hero with a situation router
 * driven by the real CRM taxonomy (49 leads, 10 months):
 *
 *   • 20% visa-expired  →  /visa-expired-urgent/
 *   • 10% detention     →  /immigration-detention/
 *   •  8% letter-to-leave (removal + refusal) → /removal-directions-urgent/
 *   • 35% "other" + 22% unspecified → "Not sure? Call now" + free-text form
 *
 * Design decisions mandated by the LLM Council on 2026-11-01:
 *  1. Phone number is HUGE and ABOVE the tiles, visible without scroll.
 *  2. Tile labels in panic-English, not legal jargon.
 *  3. "Not sure?" is a direct tap-to-call CTA — the leaky tile→form
 *     recreation of the 35% "other" problem is explicitly rejected.
 *  4. Named duty solicitor (Imran Shah, SRA #509359) + SRA badge, no
 *     "we obtain your visa"-shaped promises anywhere.
 */

import Link from "next/link";
import { Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { EmergencyUrgentForm } from "@/components/v6/emergency-urgent-form";
import { captureEmergencyImmigrationLead } from "@/lib/emergency-ab-tracking";

type Tile = {
  href: string;
  heading: string;
  sub: string;
  source: Parameters<typeof captureEmergencyImmigrationLead>[0]["source"];
};

const TILES: Tile[] = [
  {
    href: "/visa-expired-urgent/",
    heading: "My visa has run out",
    sub: "You, or someone close to you, has overstayed. Still options — we start today.",
    source: "visa-expired-form",
  },
  {
    href: "/immigration-detention/",
    heading: "Someone I know has been detained",
    sub: "Held at a removal centre, port or by Immigration Enforcement. We can act in hours.",
    source: "detention-form",
  },
  {
    href: "/removal-directions-urgent/",
    heading: "I've got a letter saying I have to leave",
    sub: "Removal directions, refusal, deadline looming. Challenge or representation — same day.",
    source: "removal-directions-form",
  },
];

export function EmergencyRouterHero({
  abHeroVariant,
}: {
  abHeroVariant: string;
}) {
  return (
    <section className="relative bg-brand-navy border-b border-slate-100 overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Block A — the big phone + headline + tiles. */}
          <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              SRA-regulated · firm #809071
            </span>

            {/* Sticky huge phone number ABOVE the tiles, per council. */}
            <DynamicCallLink
              onClick={() =>
                captureEmergencyImmigrationLead({
                  variant: abHeroVariant,
                  situation: "router-hero",
                  source: "tap-to-call",
                })
              }
              className="group inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-brand-navy rounded-xl px-5 py-3 mb-6 shadow-lg w-full sm:w-auto"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-red text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Day &amp; night · tap to call
                </span>
                <span className="block text-xl sm:text-2xl font-black tracking-tight text-brand-red">
                  <DynamicPhoneText />
                </span>
              </span>
              <ArrowRight className="hidden sm:inline-block h-5 w-5 text-slate-400 group-hover:text-brand-red ml-auto" />
            </DynamicCallLink>

            {/* H1 — the hero question. */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-[1.05] tracking-tight">
              What has happened?
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              Pick the one closest to your situation and we will route you to an immigration solicitor who handles it every week.
            </p>

            {/* Tiles — one tap per scenario. */}
            <div className="mt-7 grid gap-3 sm:gap-4">
              {TILES.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex items-start gap-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 sm:p-5 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-red transition-colors leading-tight">
                      {t.heading}
                    </p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-snug">{t.sub}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
                </Link>
              ))}

              {/* "Not sure?" — direct call CTA, no tile→form leak. */}
              <DynamicCallLink
                onClick={() =>
                  captureEmergencyImmigrationLead({
                    variant: abHeroVariant,
                    situation: "triage",
                    source: "tap-to-call",
                  })
                }
                className="flex items-start gap-4 bg-brand-red/95 hover:bg-brand-red text-white rounded-2xl p-4 sm:p-5 transition-colors"
              >
                <Phone className="h-5 w-5 shrink-0 mt-1" />
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-black leading-tight">
                    Not sure which — just speak to a solicitor now
                  </p>
                  <p className="mt-1.5 text-sm text-white/80 leading-snug">
                    Call <DynamicPhoneText /> and tell us in your own words. No form, no account.
                  </p>
                </div>
              </DynamicCallLink>
            </div>
          </div>

          {/* Block B — the on-page fallback form for everyone who prefers to leave a number. */}
          <div className="lg:col-span-2 min-w-0 order-2 lg:order-none">
            <EmergencyUrgentForm
              abHeroVariant={abHeroVariant}
              leadSource="triage-form"
              situation="triage"
              heading="Prefer we call you?"
              subheading="Leave a number — a solicitor will phone you back today, day or night."
              submitLabel="Request an urgent callback"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
