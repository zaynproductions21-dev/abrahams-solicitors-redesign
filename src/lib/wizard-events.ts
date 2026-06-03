// Shared GTM dataLayer event helpers used across every wizard / qualifier
// widget on the v6 site:
//
//   • <VisaWizardWidget>          — /visa-wizard/, /uk-spouse-visa/
//   • <HousingQualifier>          — /housing-disrepair/
//   • <PiQualifier>               — /personal-injury/
//   • <VisaQualifier>             — /uk-dependent-child-visa/, /uk-dependent-parent-visa/
//
// All wizards push the same canonical event names so a single GTM /
// GA4 / Looker Studio funnel report covers every wizard surface on the
// site, filterable by `source`.
//
// Canonical event taxonomy:
//
//   wizard_start                 — once on widget mount
//   wizard_question_answered     — each "Continue" click; payload includes
//                                  source, question_id, question_step,
//                                  question_total, answer
//   wizard_result_shown          — when the result / strength card displays
//                                  (after submission for the housing/PI/visa
//                                  qualifiers; before for the visa wizard
//                                  which uses result-first-then-email)
//   wizard_email_capture_opened  — visa wizard only; fires when the user
//                                  opens the optional email-capture step
//   ec_form_submit               — existing, fires on actual submission
//                                  (handled by tracking.ts pushFormSubmit)
//   wizard_entry_card_clicked    — Pattern B card click on hub / cluster
//                                  pages (handled inside the card itself)

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Derive the landing-page A/B variant from the current URL. Returns
 * undefined on routes that aren't part of an active A/B — so the
 * dimension isn't pushed for pages where it's meaningless.
 *
 * Currently tracking:
 *   /immigration-solicitors/         → "canonical"
 *   /immigration-solicitors-direct/  → "direct"
 *
 * Used as a custom dimension on every GTM/GA4 event so we can split
 * CPA / CVR / engagement metrics by variant. Spec: see
 *   docs/abrahams-immigration-solicitors-ab-spec-2026-06-03.md
 */
function deriveLpVariant(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const p = window.location.pathname;
  if (p === "/immigration-solicitors-direct" || p === "/immigration-solicitors-direct/") {
    return "direct";
  }
  if (p === "/immigration-solicitors" || p === "/immigration-solicitors/") {
    return "canonical";
  }
  return undefined;
}

/** Push a wizard-namespaced event to the GTM dataLayer. No-op on the server. */
export function pushWizardEvent(event: string, payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const lpVariant = deriveLpVariant();
  window.dataLayer.push({
    event,
    ...payload,
    // Only attach lp_variant on pages where it's defined — avoids
    // pushing `lp_variant: undefined` from unrelated wizard pages.
    ...(lpVariant ? { lp_variant: lpVariant } : {}),
  });
}
