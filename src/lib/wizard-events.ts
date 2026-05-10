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

/** Push a wizard-namespaced event to the GTM dataLayer. No-op on the server. */
export function pushWizardEvent(event: string, payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
