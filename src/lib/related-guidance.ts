/**
 * Contextual internal links between service pages, keyed by the page you are on.
 *
 * Why this exists as data rather than another bespoke JSX strip: the KV-template
 * service pages had almost no internal links into them. /indefinite-leave-to-
 * remain-ilr/ reached #17 with only a footer, a 404 and one page pointing at it;
 * /british-citizenship-solicitors/ and /sponsor-licence-applications/ had ZERO
 * contextual inbound links and no visibility at all. They were also
 * canonicalising themselves to the homepage until that was fixed, so internal
 * PageRank had nowhere to accumulate even if it had been sent.
 *
 * Each entry is written from the perspective of the page the reader is already
 * on, so the link earns its place in the sentence instead of being a bare
 * "related pages" list. Anchors vary deliberately: a cluster that sends one
 * repeated exact-match phrase from every member looks engineered.
 */
export type RelatedLink = {
  /** The sentence that makes the link make sense from where the reader is. */
  lead: string;
  href: string;
  anchor: string;
  /** Completes the sentence after the link. */
  trail: string;
};

export const RELATED_GUIDANCE: Record<string, RelatedLink[]> = {
  // ── Into /british-citizenship-solicitors/ ──────────────────────────────
  "indefinite-leave-to-remain-ilr": [
    {
      lead: "Settlement is usually the step before citizenship: you normally need to have held indefinite leave to remain for 12 months before you can naturalise.",
      href: "/british-citizenship-solicitors/",
      anchor: "our British citizenship solicitors",
      trail: "set out the naturalisation requirements, the residence and absence conditions, and the Life in the UK Test.",
    },
  ],
  "eu-settlement-scheme": [
    {
      lead: "Settled status under the EU Settlement Scheme can lead to naturalisation once the qualifying conditions are met.",
      href: "/british-citizenship-solicitors/",
      anchor: "British citizenship and naturalisation",
      trail: "explains what has to be proved and the timing that catches people out.",
    },
  ],
  "uk-visa-extensions-renewals": [
    {
      lead: "Extensions are rarely the destination. Most routes run through settlement and then, for those who want it, citizenship.",
      href: "/indefinite-leave-to-remain-ilr/",
      anchor: "indefinite leave to remain",
      trail: "covers the continuous-residence and absence rules that your extension period is already counting towards.",
    },
  ],

  // ── Into /sponsor-licence-applications/ ────────────────────────────────
  immigration: [
    {
      lead: "Employers have a separate problem: you cannot hire most overseas workers without a licence first.",
      href: "/sponsor-licence-applications/",
      anchor: "sponsor licence applications",
      trail: "covers eligibility, the HR systems the Home Office expects to see, and what happens at a compliance visit.",
    },
    {
      lead: "If a grandparent was born in the UK, there is a route most people have never heard of that leads to settlement after 5 years.",
      href: "/uk-ancestry-visa/",
      anchor: "the UK Ancestry visa",
      trail: "sets out who qualifies and the work requirement that catches applicants out.",
    },
  ],
  "uk-visa-applications": [
    {
      lead: "If the application depends on a UK employer sponsoring the role, the licence has to be in place before the worker can be assigned a certificate.",
      href: "/sponsor-licence-applications/",
      anchor: "applying for a sponsor licence",
      trail: "sets out what the Home Office assesses and the duties that follow a grant.",
    },
  ],

  "uk-partner-visa-extension": [
    {
      lead: "An extension is the middle step. The 5-year partner route ends in settlement, and the absence rule that decides it is already running during your extension.",
      href: "/indefinite-leave-to-remain-ilr/",
      anchor: "Indefinite leave to remain",
      trail: "sets out the continuous-residence and absence rules, including how to audit your own travel history before you apply.",
    },
  ],
  "uk-ancestry-visa": [
    {
      lead: "The UK Ancestry route leads to settlement after 5 years, and it has its own counting rule for the qualifying period.",
      href: "/indefinite-leave-to-remain-ilr/",
      anchor: "Our ILR solicitors",
      trail: "sets out the continuous-residence and absence rules, including how to audit your own travel history before you apply.",
    },
  ],

  // ── Visit cluster: /uk-visit-visa/ is the hub ──────────────────────────
  "uk-visit-visa": [
    {
      lead: "Refused a visit visa already? A standard visitor refusal works differently from a family-route refusal, and reapplying is often the better route than challenging it.",
      href: "/visit-visa-refusal/",
      anchor: "what to do after a visit visa refusal",
      trail: "walks through the options and the deadlines that apply.",
    },
  ],

  // ── Into /uk-ancestry-visa/ ────────────────────────────────────────────
  // Previously an orphaned spoke: it sits in neither the partner nor the visit
  // cluster, and nothing linked to it except the nav and the sitemap.
  // ── Into /visa-refusal-appeal/ ─────────────────────────────────────────
  "british-citizenship-solicitors": [
    {
      lead: "Naturalisation normally comes after settlement, and you usually need to have held indefinite leave to remain for 12 months before you can apply.",
      href: "/indefinite-leave-to-remain-ilr/",
      anchor: "Our indefinite leave to remain solicitors",
      trail: "sets out the continuous-residence and absence rules, including how to audit your own travel history before you apply.",
    },
    {
      lead: "A naturalisation refusal works differently from a visa refusal — there is no general right of appeal, but a reconsideration request or a fresh application may be open to you.",
      href: "/visa-refusal-appeal/",
      anchor: "refusals and appeals",
      trail: "explains which challenge route attaches to which kind of decision.",
    },
  ],
  "sponsor-licence-applications": [
    {
      lead: "If a licence application is refused or a licence is revoked, the routes open to you are narrow and the deadlines are short.",
      href: "/visa-refusal-appeal/",
      anchor: "our refusal and appeals service",
      trail: "sets out administrative review, appeal and judicial review and when each applies.",
    },
  ],
};
