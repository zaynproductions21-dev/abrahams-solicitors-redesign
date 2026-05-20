/**
 * UK ILR (Indefinite Leave to Remain) wizard configuration.
 *
 * Source of truth: docs/ilr-wizard-spec-v1.md — APPROVED v1.0 by Imran Shah
 * on 20 May 2026. Any change to the question wording or routing logic here
 * MUST be tracked back to that spec.
 *
 * Council mandates baked in:
 *   - 8 questions (variable length per council rec)
 *   - Q0 visa-category-switch gate → solicitor route if yes/not-sure
 *   - Any "not sure" answer → solicitor route (no guess)
 *   - Confidence badges on every actionable result
 *   - Plain English; statutory cites in result footer only
 */

import type { Answers, Question, RouteResult, WizardConfig } from "./types";

const QUESTIONS: Question[] = [
  {
    id: "q0-switched",
    heading: "Have you switched between visa categories in the last 5 years?",
    helper:
      "E.g. moved from student visa to skilled worker, or from spouse visa to work visa. We ask because continuous-residence rules differ by route.",
    options: [
      { value: "no", label: "No — same visa category throughout" },
      { value: "yes", label: "Yes — switched at least once" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q1-residence",
    heading: "How long have you been in the UK on a visa?",
    helper:
      "Count from when you first arrived with leave to enter / leave to remain. Don't include visitor stays before your first long-term visa.",
    options: [
      { value: "under-4y", label: "Less than 4 years" },
      { value: "4-5y", label: "4–5 years" },
      { value: "5-9y", label: "5–9 years" },
      { value: "10y-plus", label: "10 years or more" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q2-visa",
    heading: "What's your current visa category?",
    helper:
      "Pick the closest match. If you're on a transitional visa from before April 2024, choose 'other' and we'll work it out on the call.",
    options: [
      { value: "partner", label: "Spouse, civil partner, or unmarried partner of a British/settled person" },
      { value: "skilled-worker", label: "Skilled Worker or Health & Care Worker" },
      { value: "student", label: "Student / Graduate route" },
      { value: "refugee", label: "Refugee or Humanitarian Protection" },
      { value: "euss-pre-settled", label: "EUSS Pre-Settled Status" },
      { value: "euss-settled", label: "EUSS Settled Status" },
      { value: "other", label: "Other (Global Talent, Innovator, Ancestry, etc.)" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q3-life-uk-test",
    heading: "Have you taken the Life in the UK Test?",
    helper:
      "24-question online multiple-choice test about British history and life. Costs £50 to book at gov.uk.",
    options: [
      { value: "passed", label: "Yes, passed" },
      { value: "not-yet", label: "Not yet — planning to take it" },
      { value: "failed", label: "I took it but didn't pass" },
      { value: "exempt", label: "I'm exempt (over 65, or have a long-term physical/mental condition)" },
    ],
  },
  {
    id: "q4-english",
    heading: "Have you met the English language requirement (B1 or higher)?",
    helper:
      "For ILR you need at least CEFR B1 in speaking and listening. Most people evidence this with an IELTS Life Skills B1 certificate or a UK-recognised English-taught degree.",
    options: [
      { value: "yes", label: "Yes — B1 certificate or English-taught degree" },
      { value: "no", label: "Not yet" },
      { value: "exempt", label: "I'm exempt (over 65, or have a long-term condition)" },
      { value: "not-sure", label: "I'm not sure what I need" },
    ],
  },
  {
    id: "q5-absences-5y",
    heading: "UK absences — have you spent more than 180 days outside the UK in any rolling 12-month period in the last 5 years?",
    helper:
      "This is the standard 5-year ILR test. The 10-year long-residence route uses a different absence rule (we'll ask about that next if relevant).",
    options: [
      { value: "no", label: "No — under 180 days every year" },
      { value: "yes-once", label: "Yes — once" },
      { value: "yes-multiple", label: "Yes — more than once" },
      { value: "not-sure", label: "I'm not sure / I'd need to add it up" },
    ],
  },
  {
    id: "q6-absences-10y",
    heading: "For 10-year long-residence — total UK absences over the full 10 years?",
    helper:
      "Only relevant if you've been in the UK 10+ years on visas. The 10-year route allows up to 540 days total absence across the decade, with no single absence over 184 days.",
    conditional: (a) => a.q1_residence === "10y-plus",
    options: [
      { value: "under-540", label: "Under 540 days total, no single trip over 184 days" },
      { value: "over-540", label: "Over 540 days total OR a single trip over 184 days" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q7-character",
    heading: "Do you have any criminal record, immigration breaches, or visa overstays?",
    helper:
      "This includes cautions, fixed-penalty notices, and any period of overstaying. We ask because the Suitability rules apply at every ILR stage. We treat this strictly confidentially.",
    options: [
      { value: "none", label: "None" },
      { value: "minor", label: "Minor only (a fixed-penalty notice, a spent caution from years ago)" },
      { value: "serious", label: "Yes — something more substantive" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
];

/**
 * Catch-all solicitor route. Used by the "not sure" precedence rule and as
 * the default fallback. Per council mandate, this must NEVER be presented
 * as a confident pathway — it's the safe landing zone.
 */
const SOLICITOR_ROUTE: RouteResult = {
  id: "solicitor-needed",
  name: "Solicitor consultation needed",
  citation: "Multiple — depends on facts",
  summary:
    "Your answers suggest a fact pattern where an 8-question tool can't safely guide you. We routinely advise clients in this situation — book a free 30-minute eligibility call with Imran Shah (named solicitor, SRA #509359) and we'll talk you through the right route.",
  considerations: [
    "Category switches, \"not sure\" answers, and serious Suitability questions all carry too much weight to be routed by a wizard",
    "A free 30-minute call is non-committal — bring whatever documents you have to hand",
    "Most callers leave the call knowing exactly what their next step is",
  ],
  tone: "needs-review",
  confidence: "low",
};

function hasAnyNotSure(a: Answers): boolean {
  return Object.values(a).some((v) => v === "not-sure");
}

export function routeForIlr(a: Answers): RouteResult {
  // Precedence per ilr-wizard-spec-v1.md § "Routing precedence"
  // 1. ANY "not sure" → solicitor
  if (hasAnyNotSure(a)) return SOLICITOR_ROUTE;

  // 2. Switched category → solicitor (Tier 2 ICT misroute guard)
  if (a.q0_switched === "yes") return SOLICITOR_ROUTE;

  // 3. "Other" visa category → solicitor
  if (a.q2_visa === "other") return SOLICITOR_ROUTE;

  // 4. Serious suitability concerns
  if (a.q7_character === "serious") {
    return {
      id: "suitability",
      name: "Suitability concerns — solicitor review essential",
      citation: "Immigration Rules — Suitability provisions (paragraph 322 / S-ILR / S-LTR)",
      summary:
        "Where there's a criminal record, immigration breach, or overstay history, the Suitability rules apply at every ILR stage. The outcome depends heavily on the specific facts — sentence length, time elapsed, whether the breach was admitted, what the application contained.",
      considerations: [
        "Custodial sentence over 12 months — usually mandatory refusal",
        "Custodial sentence under 12 months — refusal in most cases for 10 years post-sentence",
        "Non-custodial / fixed-penalty / spent cautions — usually disclosable but rarely fatal",
        "Overstays — varies by length and whether you applied for further leave inside the 14-day grace period",
        "This is the highest-leverage case for solicitor review pre-submission",
      ],
      tone: "needs-review",
      confidence: "low",
    };
  }

  // 5. EUSS — Pre-Settled or Settled
  if (a.q2_visa === "euss-pre-settled" || a.q2_visa === "euss-settled") {
    return {
      id: "euss-settled-status",
      name: "EUSS Settled Status",
      citation: "Appendix EU — Immigration Rules",
      summary:
        "Under the EU Settlement Scheme, 'Settled Status' under Appendix EU is the equivalent of ILR. If you currently hold Pre-Settled Status and have been continuously resident for 5+ years, you can upgrade. If you already hold Settled Status, you have ILR for most purposes.",
      considerations: [
        "The 5-year EUSS continuous residence test is more generous than standard ILR (12 months unbroken before any 6-month gap)",
        "Family members of EUSS holders have their own route under Appendix EU (Family Permit)",
        "EUSS Settled Status counts as 'settled' for British Citizenship by naturalisation",
      ],
      tone: "mixed",
      confidence: "medium",
    };
  }

  // 6. Refugee / Humanitarian Protection
  if (a.q2_visa === "refugee") {
    return {
      id: "refugee-hp-ilr",
      name: "Refugee / Humanitarian Protection ILR",
      citation: "Immigration Rules, paragraph 339Q (refugee leave) / paragraph 339R (HP leave)",
      summary:
        "As someone with refugee status or humanitarian protection, the route to settlement is different from the standard 5-year route. Settlement is typically available after 5 years on refugee / HP leave, with relaxed financial and English requirements in many cases.",
      considerations: [
        "Refugee ILR doesn't require the same financial threshold as Appendix FM routes",
        "English language and Life in UK Test apply — though hardship exemptions are more often available",
        "Confirm in the consultation: any travel to your country of origin can affect refugee status",
      ],
      tone: "mixed",
      confidence: "medium",
    };
  }

  // 7. Continuous residence broken (multiple long absences OR 10-yr breach)
  if (a.q5_absences_5y === "yes-multiple" || a.q6_absences_10y === "over-540") {
    return {
      id: "continuity-broken",
      name: "Continuous residence may have been broken — rebuild plan",
      citation: "Immigration Rules — route-specific continuous residence tests",
      summary:
        "Long absences may have reset your continuous-residence clock. The rules differ depending on which route you're on — there may be ways to count time toward ILR despite the absences, but this needs a solicitor's review.",
      considerations: [
        "Skilled Worker: 180 days in any rolling 12 months breaks continuity",
        "Partner (Appendix FM): no specific cap, but Home Office assesses 'intent to live together permanently'",
        "10-year long residence: 540 days total ceiling across the decade",
        "Sometimes the right move is to keep building the clock; sometimes a switch of route is faster — solicitor input matters here",
      ],
      tone: "mixed",
      confidence: "medium",
    };
  }

  // 8. 10-year long residence (happy)
  if (a.q1_residence === "10y-plus" && a.q6_absences_10y === "under-540") {
    return {
      id: "10-year-long-residence",
      name: "10-year long-residence ILR",
      citation: "Immigration Rules, paragraph 276B (long residence)",
      summary:
        "With 10+ years of continuous lawful residence and absences within the 540-day total / 184-day single-trip limits, the long-residence route under paragraph 276B is the route most relevant to discuss.",
      considerations: [
        "Lawful residence means no gaps without leave — section 3C leave during pending applications counts",
        "Public-interest tests apply (some convictions can refuse you regardless of residence)",
        "Document trail for the full 10 years matters — historical bank statements, council tax, GP records",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 9. 5-year ILR happy path
  if (a.q1_residence === "5-9y" && a.q5_absences_5y === "no") {
    return {
      id: "5-year-ilr-happy-path",
      name: "5-year ILR (standard route)",
      citation: "Immigration Rules — Part 8 / Appendix FM / Skilled Worker / Parent",
      summary:
        "Based on your answers, the standard 5-year ILR route looks like the right fit. Most of the eligibility shape — qualifying visa, continuous residence, B1 English, and Life in UK Test — appears to be in place.",
      considerations: [
        "Documentary evidence is decisive — most refusals come from missing or unclear documents, not eligibility itself",
        "UKVI standard service is roughly 6 months for ILR (priority and super-priority options exist)",
        "A solicitor review before submission is the highest-leverage step — much cheaper than a refusal",
        "Apply no earlier than 28 days before completing 5 years' qualifying residence",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 10. Not yet eligible — 4-5y
  if (a.q1_residence === "4-5y") {
    return {
      id: "not-yet-4-5y",
      name: "Not yet eligible — close to the 5-year point",
      citation: "Immigration Rules — qualifying period",
      summary:
        "You're close — most routes need 5 years of continuous qualifying residence before you can apply for ILR. You can apply up to 28 days before the 5-year date is reached.",
      considerations: [
        "Use the remaining time to build your evidence file (payslips, P60s, council tax, NHS records)",
        "Take the Life in the UK Test now if you haven't — there's no urgency, but it removes a step",
        "Confirm your English language evidence is on file (B1 certificate or qualifying degree)",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 11. Not yet eligible — under 4y
  if (a.q1_residence === "under-4y") {
    return {
      id: "not-yet-under-4y",
      name: "Not yet eligible — still building the 5-year clock",
      citation: "Immigration Rules — qualifying period",
      summary:
        "You're still building toward the 5-year qualifying period. The most useful thing to do now is make sure your current visa is on the right track — switching routes at this stage can reset the clock, so any switch needs careful thought.",
      considerations: [
        "Keep documents organised from day 1 — payslips, tenancy agreements, utility bills",
        "Watch absences — keep under 180 days in any rolling 12 months",
        "If you're thinking of switching routes (e.g. student → skilled worker), get advice first — the wrong switch can reset your 5-year clock",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 12. Default catch-all
  return SOLICITOR_ROUTE;
}

export const ILR_WIZARD_CONFIG: WizardConfig = {
  wizardType: "ilr",
  brandName: "UK ILR Wizard",
  serviceName: "[Wizard] UK ILR (Indefinite Leave to Remain)",
  defaultSource: "ilr-wizard",
  lastReviewed: "May 2026",
  questions: QUESTIONS,
  routeFor: routeForIlr,
  copy: {
    emailHeading: "Email your ILR result — no call, no spam",
    emailBody:
      "We'll send you a copy of your result. By submitting you agree we can email you about your ILR enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask.",
  },
};
