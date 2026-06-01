/**
 * Shared wizard types. The visa-wizard-widget defined these inline; we lift
 * them out so /ilr-wizard/ and /citizenship-wizard/ can reuse the same engine
 * without forking the component.
 *
 * Used by:
 *   - src/components/v6/wizard-widget.tsx (generic engine)
 *   - src/lib/wizards/ilr-config.ts
 *   - src/lib/wizards/citizenship-config.ts
 *
 * See council transcript at docs/ilr-citizenship-wizards-council-transcript-2026-05-20.md
 */

export type Option = {
  value: string;
  label: string;
  helper?: string;
};

export type Question = {
  id: string;
  heading: string;
  helper?: string;
  options: Option[];
  /**
   * If provided, the question is only shown when this predicate returns true
   * given the current answer state. Used by Q6 of the ILR wizard (only shown
   * when Q1 = "10y-plus").
   */
  conditional?: (answers: Answers) => boolean;
};

export type Answers = Partial<Record<string, string>>;

export type RouteTone = "positive" | "mixed" | "needs-review";

/** Council-mandated confidence badge shown next to every actionable result. */
export type Confidence = "high" | "medium" | "low";

export type RouteResult = {
  id: string;
  name: string;
  citation: string;
  summary: string;
  considerations: string[];
  tone: RouteTone;
  confidence?: Confidence;
  /**
   * Set true for outcomes that are deliberately *not* an instructable
   * legal case — e.g. the Skilled Worker wizard's "job-search deflection"
   * route. Used by the WizardWidget to soften the email-capture wording
   * ("we won't auto-call") and surface a "no automatic follow-up" note.
   */
  noFollowUp?: boolean;
};

export type WizardConfig = {
  /**
   * Used in GTM events, CRM tagging, and as the URL slug for routing-decision logs.
   * Must match the spec doc's `wizardType` value.
   */
  wizardType: "ilr" | "citizenship" | "spouse" | "skilled-worker";

  /** Visible above the progress bar — e.g. "ILR Wizard". */
  brandName: string;

  /** SalesHub `service` value, e.g. "[Wizard] UK ILR". */
  serviceName: string;

  /** Source prefix used in CRM source field, e.g. "ilr-wizard-standalone". */
  defaultSource: string;

  /** "Last reviewed" date stamp shown on every result + footer. */
  lastReviewed: string;

  /** Questions in display order. Variable length per wizard (council rec). */
  questions: Question[];

  /**
   * Pure decision function — no AI. Given the answer map, return the route
   * card to show. Implements the precedence rules from the spec doc.
   *
   * Council mandate: any "not sure" answer must route to a solicitor
   * consultation route, never return a guess.
   */
  routeFor: (answers: Answers) => RouteResult;

  /**
   * Optional copy overrides for the result + email-capture screens. Defaults
   * applied in the generic widget if omitted.
   */
  copy?: {
    resultBadge?: string;     // default "Most relevant route"
    emailCtaLabel?: string;   // default "Email me the result"
    emailHeading?: string;    // default "Email your result — no call, no spam"
    emailBody?: string;       // GDPR/PECR consent line
    thanksHeading?: string;
  };
};
