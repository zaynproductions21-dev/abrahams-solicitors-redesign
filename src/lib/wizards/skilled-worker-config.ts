/**
 * UK Skilled Worker triage wizard configuration.
 *
 * Source of truth: docs/skilled-worker-wizard-spec-v1.md — APPROVED v1.0
 * by Imran Shah on 1 June 2026.
 *
 * Why this wizard is structurally different from the other Phase 1-2-4
 * wizards (Spouse / Visit Visa Refusal / ILR / Citizenship):
 *   the headline outcome is a *deflection*. A large share of "Skilled
 *   Worker visa help" enquiries are recruitment cases (someone with no
 *   sponsor asking us to help them find one), which is not legal work
 *   and which a solicitor cannot help with. Outcome 1 routes those
 *   visitors politely to the gov.uk sponsor register + LinkedIn, marks
 *   the lead `noFollowUp: true`, and the WizardWidget shows a "no
 *   automatic follow-up call" note on the email-capture screen.
 *
 * Council mandates baked in (same as Phase 1-2-4):
 *   - Pure decision tree, no AI
 *   - 5 plain-English questions; statutory cites in result footer only
 *   - Result shown BEFORE email capture
 *   - SalesHub write only on explicit opt-in
 *   - Imran named on every result + footer (this wizard uses Imran as
 *     the named solicitor because Skilled Worker / business immigration
 *     sits in his personal practice — Humaira handles family routes)
 *   - "Not sure" answers force solicitor consultation (O7)
 */

import type { Answers, Question, RouteResult, WizardConfig } from "./types";

const QUESTIONS: Question[] = [
  {
    id: "q1-situation",
    heading: "What best describes your situation right now?",
    helper:
      "Pick the closest match — if more than one applies, pick the most urgent one.",
    options: [
      { value: "visa-expiring", label: "My Skilled Worker visa expires within 60 days" },
      { value: "visa-expired", label: "My visa has already expired" },
      { value: "sponsor-revoked", label: "My sponsor's licence has been revoked or my job has ended" },
      { value: "looking-for-sponsor", label: "I need to find a UK employer with a sponsor licence" },
      { value: "have-offer", label: "I have a job offer from a UK employer and need to switch/apply" },
      { value: "on-other-visa", label: "I'm on a different visa (e.g. student, spouse) and want to switch to Skilled Worker" },
      { value: "ilr-approaching", label: "I'm approaching 5 years on Skilled Worker (ILR/settlement)" },
      { value: "extension-due", label: "My current Skilled Worker visa is up for extension" },
      { value: "other", label: "Other / not sure" },
    ],
  },
  {
    id: "q2-time-in-uk",
    heading: "How long have you been in the UK on a work visa?",
    options: [
      { value: "never", label: "I'm not in the UK yet / I've never had a UK work visa" },
      { value: "under-1y", label: "Less than 1 year" },
      { value: "1-3y", label: "1 to 3 years" },
      { value: "3-5y", label: "3 to 5 years" },
      { value: "5y-plus", label: "5 years or more" },
    ],
  },
  {
    id: "q3-job-offer",
    heading: "Do you currently have a job offer from a UK employer with a sponsor licence?",
    helper:
      "You can check whether an employer is licensed on the gov.uk register of licensed sponsors.",
    options: [
      { value: "yes-confirmed", label: "Yes — and I've confirmed they hold a sponsor licence" },
      { value: "yes-unsure", label: "Yes — but I'm not sure if they hold a sponsor licence" },
      { value: "no-looking", label: "No — I'm currently job-hunting / looking for a sponsor" },
      { value: "no-not-yet", label: "No — I'm not at the job-hunting stage yet" },
    ],
  },
  {
    id: "q4-overstay",
    heading: "Have you overstayed your visa (now or in the past)?",
    helper:
      "This is important — overstaying changes the strategy substantially. Be honest; this wizard is anonymous.",
    options: [
      { value: "never", label: "No, I've never overstayed" },
      { value: "within-14d", label: "Yes — within the last 14 days" },
      { value: "over-14d-but-applied", label: "Yes — over 14 days, but I made an in-time application that was refused" },
      { value: "over-14d", label: "Yes — over 14 days and no in-time application" },
      { value: "not-sure", label: "I'm not sure" },
    ],
  },
  {
    id: "q5-priority",
    heading: "What's your priority over the next 3–6 months?",
    options: [
      { value: "stay-find-new-sponsor", label: "Stay in the UK and find a new sponsor / job" },
      { value: "switch-skilled-worker", label: "Apply for or switch to Skilled Worker on the offer I have" },
      { value: "extend-skilled-worker", label: "Extend my existing Skilled Worker visa" },
      { value: "settle-ilr", label: "Apply for ILR / settlement" },
      { value: "switch-family-route", label: "Switch to a family visa (spouse, partner, dependant)" },
      { value: "leave-return-later", label: "Leave the UK now and come back on a fresh Skilled Worker visa later" },
      { value: "not-sure", label: "I'm not sure / I want a specialist to advise" },
    ],
  },
];

// ─── Outcome library ───────────────────────────────────────────────────

const SOLICITOR_ROUTE: RouteResult = {
  id: "solicitor-needed",
  name: "Specialist consultation",
  citation: "Appendix Skilled Worker — general",
  summary:
    "Your circumstances need a more detailed conversation than a wizard can give. A 30-minute free consultation will go through your specific facts and identify the right route.",
  considerations: [
    "Bring your current visa BRP/eVisa, the most recent CoS or job offer letter, and any refusal letters to the call",
    "We'll identify whether switching, extension, ILR, family route, or specialist work fits best",
    "Free 30-minute consultation, no obligation",
  ],
  tone: "mixed",
  confidence: "low",
};

const JOB_SEARCH_DEFLECTION: RouteResult = {
  id: "job-search-deflection",
  name: "Job search first — this isn't legal work yet",
  citation:
    "Appendix Skilled Worker — sponsor-licence requirement (only A-rated licensed sponsors can issue a Certificate of Sponsorship)",
  summary:
    "To apply for a Skilled Worker visa you need a job offer from a UK employer who already holds a Skilled Worker sponsor licence. Solicitors can't introduce you to sponsors — that's recruitment, not legal work — but the route is straightforward once you have an offer. We can help with the visa application itself when the job offer is on the table.",
  considerations: [
    "Search the official gov.uk register of licensed sponsors by sector / region: gov.uk/government/publications/register-of-licensed-sponsors-workers",
    "On LinkedIn, filter job searches by \"visa sponsorship available\" — sponsor-licensed employers usually say so on their company About pages",
    "Specialist recruiters in your sector (tech, healthcare, finance, engineering) often have direct relationships with sponsor-licensed employers — search \"[your sector] sponsorship recruiter UK\"",
    "Once you have a real offer, come back to us — switching or applying with a confirmed sponsor is typically a 2–3 week instructable case",
  ],
  tone: "mixed",
  confidence: "high",
  noFollowUp: true,
};

const GRACE_PERIOD: RouteResult = {
  id: "60-day-grace-period",
  name: "60-day grace period — urgent legal review",
  citation:
    "Appendix Skilled Worker — paragraph SW 11.1 (60-day grace period after Certificate of Sponsorship withdrawn / sponsor licence revoked) and Paragraph 39E of the Immigration Rules where applicable",
  summary:
    "When a Skilled Worker's sponsor licence is revoked or their job ends, the Home Office allows 60 days from the date of cessation to either find a new licensed sponsor and apply to vary the visa, or leave the UK or switch to a different immigration category. The clock starts on the date the sponsor stops sponsoring — not the date you're notified. This is one of the most time-sensitive things we do.",
  considerations: [
    "Get the CoS cancellation date from your employer — that's day 0 of the 60-day grace period",
    "A new sponsor must be lined up and the variation application made before day 60, or the visa lapses",
    "Switching to a family route (spouse, partner) is possible within the 60 days if you qualify",
    "If 60 days has passed, see the overstayer route — Para 39E may still apply if there are exceptional circumstances",
  ],
  tone: "needs-review",
  confidence: "high",
};

const OVERSTAYER: RouteResult = {
  id: "overstayer-specialist",
  name: "Overstayer specialist consultation — urgent",
  citation:
    "Paragraph 39E of the Immigration Rules (exceptional circumstances) and Appendix V 3.7 (re-entry bans for overstayers)",
  summary:
    "Overstaying creates serious complications: an in-country switch becomes much harder, and depending on circumstances a re-entry ban of up to 10 years can apply if removed. Paragraph 39E of the Immigration Rules allows the Home Office to disregard short overstays (typically up to 14 days) where there's a good reason — but it's a narrow window. Anyone overstaying needs solicitor advice on whether an in-country application is still possible, or whether leaving voluntarily is the cleaner route.",
  considerations: [
    "The 14-day Para 39E window has limited grounds — applications refused with no in-time appeal, or exceptional circumstances",
    "A \"voluntary return\" before any enforcement action substantially reduces re-entry ban risk",
    "Some routes (Article 8 family life, Long Residence) survive overstaying — most don't",
    "Do not make further applications without solicitor review — a refused in-country application as an overstayer can trigger removal",
  ],
  tone: "needs-review",
  confidence: "low",
};

const SWITCH_OR_EXTEND: RouteResult = {
  id: "switching-extension-instructable",
  name: "Switching or extending Skilled Worker — instructable",
  citation:
    "Appendix Skilled Worker (eligibility SW 4.1 onwards), Appendix English Language (B1 CEFR) and Appendix Finance (£1,270 maintenance, 28-day rule)",
  summary:
    "With a confirmed job offer and a licensed sponsor, switching to or extending Skilled Worker is one of the more straightforward routes — provided the salary meets the threshold for the SOC code, the English requirement is met, and (for switches) you're in a category that permits in-country switching to Skilled Worker. Most applications are decided within 8 weeks (3 weeks with priority service).",
  considerations: [
    "Confirm the SOC code and minimum salary — most general roles need around £38,700+, with lower thresholds for new entrants, health & care workers, shortage occupations and education roles",
    "English at B1 CEFR via a SELT or a recognised English-taught degree",
    "Maintenance: £1,270 held for 28 days, or sponsor certifies maintenance",
    "Priority service: 5 working days; super-priority: 1 working day",
    "Visit visa, short-term study, seasonal worker and a few other categories cannot switch in-country — they must leave and apply out-of-country",
  ],
  tone: "positive",
  confidence: "high",
};

const ILR_ROUTE: RouteResult = {
  id: "ilr-settlement",
  name: "ILR / settlement after 5 years' continuous residence",
  citation:
    "Appendix Skilled Worker — paragraph SW 24.1 onwards (settlement), Appendix Continuous Residence, Life in the UK test, and English at B1 CEFR",
  summary:
    "After 5 years' continuous residence on Skilled Worker (and predecessor Tier 2 General routes), and provided the salary meets the threshold at the time of the ILR application, English at B1 is met, the Life in the UK test is passed, and absences are within limits, you qualify for Indefinite Leave to Remain. ILR removes the work restriction and is a step towards British citizenship.",
  considerations: [
    "Continuous residence: usually no more than 180 days outside the UK in any 12-month rolling period",
    "Salary at the ILR application must meet the going rate for the SOC code at the time of application — your historic threshold isn't enough",
    "Life in the UK test must be passed before applying",
    "ILR opens the route to naturalisation after a further 12 months (or immediately if married to a British citizen)",
  ],
  tone: "positive",
  confidence: "high",
};

const FAMILY_ROUTE_HANDOFF: RouteResult = {
  id: "switch-to-family-route",
  name: "Switching to a family route — run the Spouse Visa wizard next",
  citation: "Appendix FM (Family Members) — Immigration Rules",
  summary:
    "Switching from Skilled Worker to a family route (spouse, partner, parent of child) is possible in-country if you meet the family route requirements. The eligibility test there is very different — relationship genuineness, English, the £29,000 financial threshold for spouses, accommodation adequacy — so it makes sense to run our Spouse Visa wizard first to see if you'd qualify.",
  considerations: [
    "Open the Spouse Visa Wizard at /visa-wizard/ — it's six questions and routes you to the right family-route variant",
    "If the UK sponsor (e.g. your partner) receives PIP, DLA, Carer's Allowance or another qualifying benefit, the £29,000 financial test is replaced by the lower adequate-maintenance test — try /adequate-maintenance-calculator/",
    "Switching from Skilled Worker to FLR(M) is in-country and Section 3C of the Immigration Act 1971 preserves your status during the application",
  ],
  tone: "mixed",
  confidence: "medium",
};

function hasAnyNotSure(a: Answers): boolean {
  return Object.values(a).some((v) => v === "not-sure");
}

export function routeForSkilledWorker(a: Answers): RouteResult {
  // Precedence per skilled-worker-wizard-spec-v1.md § "Routing precedence"
  // Note: precedence rule 1 (long overstay) must beat the deflection so
  // that a 6-month overstayer who's "looking for a sponsor" is told to
  // see an overstayer specialist FIRST, not pointed at LinkedIn.

  // 1. Long overstay — must take priority over everything else
  if (a.q4_overstay === "over-14d") return OVERSTAYER;

  // 2. Sponsor revoked, OR visa expiring in 60 days with no active job search
  if (
    a.q1_situation === "sponsor-revoked" ||
    (a.q1_situation === "visa-expiring" &&
      (a.q3_job_offer === "no-looking" || a.q3_job_offer === "no-not-yet"))
  ) {
    return GRACE_PERIOD;
  }

  // 3. Visa already expired — overstayer route (within-14d or applied in-time
  //    might still have Para 39E grounds, but the wizard correctly routes to
  //    solicitor for both rather than guess)
  if (a.q1_situation === "visa-expired") return OVERSTAYER;

  // 4. Job-search deflection — the headline non-instructable case
  if (
    a.q1_situation === "looking-for-sponsor" ||
    (a.q3_job_offer === "no-looking" && a.q5_priority === "stay-find-new-sponsor")
  ) {
    return JOB_SEARCH_DEFLECTION;
  }

  // 5. Family-route handoff
  if (a.q5_priority === "switch-family-route") return FAMILY_ROUTE_HANDOFF;

  // 6. ILR / settlement
  if (
    (a.q1_situation === "ilr-approaching" && a.q2_time_in_uk === "5y-plus") ||
    a.q5_priority === "settle-ilr"
  ) {
    return ILR_ROUTE;
  }

  // 7. Switching / extending — instructable happy path
  if (
    (a.q3_job_offer === "yes-confirmed" || a.q3_job_offer === "yes-unsure") &&
    (a.q1_situation === "have-offer" ||
      a.q1_situation === "on-other-visa" ||
      a.q1_situation === "extension-due")
  ) {
    return SWITCH_OR_EXTEND;
  }

  // 8. "Not sure" or default → solicitor
  if (hasAnyNotSure(a) || a.q1_situation === "other") return SOLICITOR_ROUTE;

  return SOLICITOR_ROUTE;
}

export const SKILLED_WORKER_WIZARD_CONFIG: WizardConfig = {
  wizardType: "skilled-worker",
  brandName: "UK Skilled Worker Triage",
  serviceName: "[Wizard] UK Skilled Worker",
  defaultSource: "skilled-worker-wizard",
  lastReviewed: "June 2026",
  questions: QUESTIONS,
  routeFor: routeForSkilledWorker,
  copy: {
    emailHeading: "Email your Skilled Worker result — no spam",
    emailBody:
      "We'll send you a copy of your result. By submitting you agree we can email you about your Skilled Worker enquiry. We won't add you to marketing lists.",
  },
};
