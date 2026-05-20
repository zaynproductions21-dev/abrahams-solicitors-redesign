/**
 * British Citizenship (Naturalisation) wizard configuration.
 *
 * Source of truth: docs/citizenship-wizard-spec-v1.md — APPROVED v1.0 by
 * Imran Shah on 20 May 2026.
 *
 * Council mandates baked in:
 *   - 4 questions only (Council rec: don't re-ask what ILR already evidenced)
 *   - "British by birth" option REMOVED — link to gov.uk check tool instead
 *   - Any "not sure" → solicitor route
 *   - Plain-English route names ("Standard citizenship route" not "s.6(1) Naturalisation")
 *   - Confidence badges on every actionable result
 */

import type { Answers, Question, RouteResult, WizardConfig } from "./types";

const QUESTIONS: Question[] = [
  {
    id: "q1-status",
    heading: "Do you currently hold ILR or Settled Status under the EU Settlement Scheme?",
    helper:
      "ILR (Indefinite Leave to Remain) or EUSS Settled Status is the standard prerequisite for naturalisation. If you're not sure, that's normal — we'll help you check on the call.",
    options: [
      { value: "yes-12-plus", label: "Yes — I've held ILR or Settled Status for 12 months or more" },
      { value: "yes-under-12", label: "Yes — but for less than 12 months" },
      { value: "no-on-visa", label: "No — I'm currently on a visa (Skilled Worker, Spouse, Student, etc.)" },
      { value: "not-sure", label: "I'm not sure what status I currently have" },
    ],
  },
  {
    id: "q2-residence",
    heading: "How long have you continuously lived in the UK?",
    helper:
      "Count from the date you arrived with leave to enter or leave to remain. Don't include visitor stays before your first long-term visa.",
    options: [
      { value: "under-3y", label: "Less than 3 years" },
      { value: "3-5y", label: "3–5 years" },
      { value: "5y-plus", label: "5 years or more" },
      { value: "6y-plus", label: "6 years or more" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q3-spouse",
    heading: "Is your spouse or civil partner a British citizen?",
    helper:
      "There's a shorter naturalisation route for spouses of British citizens — 3 years' residence instead of 5, and no separate 12-month-post-ILR wait.",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "not-married", label: "I'm not married / not in a civil partnership" },
    ],
  },
  {
    id: "q4-absences",
    heading: "UK absences — have you been outside the UK more than 90 days in the last 12 months, OR more than 450 days in the last 5 years?",
    helper:
      "This is the standard naturalisation absence test. Going over isn't automatically fatal — caseworkers exercise discretion — but it does need careful framing in the application.",
    options: [
      { value: "no", label: "No — under both limits" },
      { value: "yes-once", label: "Yes — slightly over once" },
      { value: "yes-multiple", label: "Yes — significantly over" },
      { value: "not-sure", label: "I'm not sure / I'd need to add it up" },
    ],
  },
];

const SOLICITOR_ROUTE: RouteResult = {
  id: "solicitor-needed",
  name: "Solicitor consultation needed",
  citation: "Multiple — depends on facts",
  summary:
    "Your answers suggest a fact pattern where a 4-question tool can't safely guide you. We routinely advise clients in this situation — book a free 30-minute eligibility call with Imran Shah (named solicitor, SRA #509359) and we'll talk you through the right route.",
  considerations: [
    "\"Not sure\" answers and complex absence histories carry too much weight to be routed by a wizard",
    "A free 30-minute call is non-committal — bring whatever documents you have to hand",
    "Most callers leave the call knowing exactly what their next step is",
  ],
  tone: "needs-review",
  confidence: "low",
};

function hasAnyNotSure(a: Answers): boolean {
  return Object.values(a).some((v) => v === "not-sure");
}

export function routeForCitizenship(a: Answers): RouteResult {
  // 1. Any "not sure" → solicitor (council mandate)
  if (hasAnyNotSure(a)) return SOLICITOR_ROUTE;

  // 2. No ILR yet
  if (a.q1_status === "no-on-visa") {
    return {
      id: "get-ilr-first",
      name: "Get ILR first — naturalisation comes after settlement",
      citation: "British Nationality Act 1981, Schedule 1, paragraph 1(2)(c)",
      summary:
        "To naturalise under the standard or spouse route, you need ILR (or EUSS Settled Status) at the date of application. Your current visa status doesn't yet meet that. The right next step is the ILR application — try our ILR wizard for that, or book a consultation.",
      considerations: [
        "Naturalisation timelines work backwards from when you can apply for ILR",
        "For most visa routes, ILR comes after 5 years of continuous residence",
        "Some routes (10-year long residence, refugee/HP) have different ILR clocks — see the ILR wizard",
      ],
      tone: "mixed",
      confidence: "high",
    };
  }

  // 3. Held ILR <12 months and NOT spouse — wait
  if (a.q1_status === "yes-under-12" && a.q3_spouse !== "yes") {
    return {
      id: "wait-12-months-post-ilr",
      name: "Wait 12 months after ILR — standard route only",
      citation: "British Nationality Act 1981, Schedule 1, paragraph 1(2)(b)",
      summary:
        "You've got ILR but it's been less than 12 months. For the standard 5-year route you need to have held ILR for at least 12 months at the date of application. The date is firm — apply too early and the application is refused with fee lost.",
      considerations: [
        "Calculate from the date your ILR was granted (on the BRP, not when you got the card in the post)",
        "Use the waiting period to take the Life in UK Test if you haven't, get your B1 certificate, and gather absence evidence",
        "If your spouse is a British citizen, you can apply now under the spouse route (s.6(2)) — see the spouse outcome",
      ],
      tone: "mixed",
      confidence: "high",
    };
  }

  // 4. Absence test — significantly over
  if (a.q4_absences === "yes-multiple") {
    return {
      id: "absence-discretion",
      name: "Absence-based discretion case — solicitor framing matters",
      citation: "British Nationality Act 1981, Schedule 1, paragraph 1(3) — Home Office discretion",
      summary:
        "Your absences exceed the standard limits. The good news is the Home Office can exercise discretion — but the case needs to be made carefully. The wrong framing in the SOL form turns a discretionary refusal into a fee-loss.",
      considerations: [
        "The standard limits — 90 days in last 12 months, 450 days in last 5 years — are guidance, not absolutes",
        "Discretion is most likely to be exercised when absences were for compelling reasons (work secondment, family emergency, study abroad)",
        "A solicitor-drafted personal statement explaining the absences is the highest-leverage piece of work",
        "An absence-based refusal can usually be re-applied for — but waiting until the count is clean is often faster",
      ],
      tone: "mixed",
      confidence: "medium",
    };
  }

  // 5. Spouse route (s.6(2)) — 3+ years, British spouse
  if (a.q3_spouse === "yes" && (a.q2_residence === "3-5y" || a.q2_residence === "5y-plus" || a.q2_residence === "6y-plus")) {
    return {
      id: "spouse-route-s6-2",
      name: "Standard citizenship route — spouse of a British citizen",
      citation: "British Nationality Act 1981, section 6(2) + Schedule 1",
      summary:
        "As the spouse or civil partner of a British citizen with 3+ years of continuous UK residence, the spouse route under section 6(2) is shorter than the standard route — no 12-month wait after ILR, just the 3-year residence + good character + language requirements.",
      considerations: [
        "You do need to hold ILR (or EUSS Settled Status) at the date of application — but there's no waiting period after you get it",
        "The 90-day / 450-day absence test still applies",
        "Good-character test applies the same way as the standard route",
        "Spouse must be a British citizen at the date of your naturalisation application (and at the ceremony)",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 6. Standard 5-year route (s.6(1))
  if (
    a.q1_status === "yes-12-plus" &&
    (a.q2_residence === "5y-plus" || a.q2_residence === "6y-plus")
  ) {
    return {
      id: "standard-route-s6-1",
      name: "Standard citizenship route (5-year residence)",
      citation: "British Nationality Act 1981, section 6(1) + Schedule 1",
      summary:
        "With ILR held for 12+ months and 5+ years' continuous residence, the standard naturalisation route under section 6(1) of the British Nationality Act 1981 is the route most relevant to discuss. The Home Office processing time is currently around 6 months.",
      considerations: [
        "Documentary evidence is decisive — most refusals come from the absence test or good-character disclosure, not eligibility itself",
        "A solicitor review of the SOL form before submission is the highest-leverage step",
        "A naturalisation ceremony is required after approval (you book this yourself)",
        "Your country may or may not allow dual nationality — confirm with their consulate before you naturalise",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 7. Not yet eligible (residence)
  if (a.q2_residence === "under-3y") {
    return {
      id: "not-yet-residence",
      name: "Not yet eligible — keep building the residence clock",
      citation: "British Nationality Act 1981, Schedule 1, paragraph 1(2)(a)",
      summary:
        "You need at least 3 years (spouse route) or 5 years (standard route) of continuous UK residence before you can naturalise. You're not there yet, but you can use this time to plan.",
      considerations: [
        "Keep documents organised from day 1 — payslips, tenancy agreements, utility bills, GP records",
        "Watch absences — stay under 90 days/year if you can",
        "Take the Life in UK Test now if you haven't (no urgency, but removes a step later)",
        "The clock for naturalisation starts from the date you began your continuous residence",
      ],
      tone: "positive",
      confidence: "high",
    };
  }

  // 8. Catch-all
  return SOLICITOR_ROUTE;
}

export const CITIZENSHIP_WIZARD_CONFIG: WizardConfig = {
  wizardType: "citizenship",
  brandName: "British Citizenship Wizard",
  serviceName: "[Wizard] British Citizenship (Naturalisation)",
  defaultSource: "citizenship-wizard",
  lastReviewed: "May 2026",
  questions: QUESTIONS,
  routeFor: routeForCitizenship,
  copy: {
    emailHeading: "Email your citizenship result — no call, no spam",
    emailBody:
      "We'll send you a copy of your result. By submitting you agree we can email you about your citizenship enquiry. We won't add you to marketing lists, and we won't call unless you specifically ask.",
  },
};
