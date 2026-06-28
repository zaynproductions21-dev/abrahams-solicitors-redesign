// Searchable page index for the header search bar.
// Manually maintained — when adding a new public page, add it here too.
//
// `keywords` is optional and only used by the matcher (not displayed). Use
// for terms users type that don't appear in the title or description (e.g.
// "fees" → matches /our-fees/, "lawyer" → matches solicitor pages).

export type SearchEntry = {
  title: string;
  href: string;
  description: string;
  category:
    | "Visas & Immigration"
    | "Wizards & Calculators"
    | "Housing & Personal Injury"
    | "Firm"
    | "Resources"
    | "Legal";
  keywords?: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  // ─── Visas & Immigration (the main intent) ────────────────────────
  { title: "Immigration Solicitors", href: "/immigration-solicitors/", description: "Direct solicitor access for UK immigration matters", category: "Visas & Immigration", keywords: ["lawyer", "attorney", "advice"] },
  { title: "UK Spouse Visa", href: "/uk-spouse-visa/", description: "Joining a UK partner — eligibility, evidence, fees", category: "Visas & Immigration", keywords: ["wife", "husband", "marriage", "spouse"] },
  { title: "UK Spouse Visa Solicitors", href: "/uk-spouse-visa-solicitors/", description: "Specialist help with spouse visa applications & refusals", category: "Visas & Immigration" },
  { title: "UK Spouse Visa from US", href: "/uk-spouse-visa-from-us/", description: "Spouse visa route for American applicants", category: "Visas & Immigration", keywords: ["america", "usa", "american"] },
  { title: "UK Fiancé Visa", href: "/uk-fiance-visa/", description: "Visa for couples planning to marry in the UK", category: "Visas & Immigration", keywords: ["wedding", "engagement"] },
  { title: "UK Unmarried Partner Visa", href: "/uk-unmarried-partner-visa/", description: "For unmarried partners in a relationship like marriage", category: "Visas & Immigration", keywords: ["cohabit", "partner"] },
  { title: "Civil Partnership Visa", href: "/civil-partnership-visa/", description: "UK route for civil partners", category: "Visas & Immigration" },
  { title: "UK Partner Visa Extension", href: "/uk-partner-visa-extension/", description: "Extending your partner / spouse visa in the UK", category: "Visas & Immigration", keywords: ["renew", "extension"] },
  { title: "UK Visa Extensions & Renewals", href: "/uk-visa-extensions-renewals/", description: "Extending or renewing any UK visa", category: "Visas & Immigration", keywords: ["renew", "extend"] },
  { title: "Indefinite Leave to Remain (ILR)", href: "/indefinite-leave-to-remain-ilr/", description: "Settlement after 5+ years on a qualifying UK visa", category: "Visas & Immigration", keywords: ["settlement", "ilr", "permanent"] },
  { title: "British Citizenship Solicitors", href: "/british-citizenship-solicitors/", description: "Naturalisation, registration, dual nationality", category: "Visas & Immigration", keywords: ["passport", "naturalise", "naturalisation"] },
  { title: "UK Visa Applications", href: "/uk-visa-applications/", description: "Complete guide to all UK visa routes", category: "Visas & Immigration" },
  { title: "UK Visit Visa", href: "/uk-visit-visa/", description: "Short-stay tourist, business or family visit visas", category: "Visas & Immigration", keywords: ["tourist", "holiday", "visit"] },
  { title: "UK Ancestry Visa", href: "/uk-ancestry-visa/", description: "Commonwealth route via UK-born grandparent", category: "Visas & Immigration", keywords: ["commonwealth", "grandparent"] },
  { title: "UK Dependent Child Visa", href: "/uk-dependent-child-visa/", description: "Bringing your child to live with you in the UK", category: "Visas & Immigration", keywords: ["children", "kid", "minor"] },
  { title: "UK Dependent Parent Visa", href: "/uk-dependent-parent-visa/", description: "Bringing an elderly parent to live in the UK", category: "Visas & Immigration", keywords: ["parent", "mother", "father", "elderly"] },
  { title: "Sponsor Licence Applications", href: "/sponsor-licence-applications/", description: "Employers sponsoring overseas workers", category: "Visas & Immigration", keywords: ["employer", "skilled worker", "sponsorship"] },
  { title: "Visa Refusal & Appeals Hub", href: "/visa-refusal-appeal/", description: "Challenge a refusal, lodge an appeal, judicial review", category: "Visas & Immigration", keywords: ["refused", "rejected", "appeal", "challenge"] },
  { title: "Asylum Applications", href: "/asylum-applications/", description: "Claiming asylum in the UK — process and rights", category: "Visas & Immigration", keywords: ["refugee", "protection"] },
  { title: "Asylum Credibility Interview", href: "/asylum-credibility-interview/", description: "Preparing for the substantive asylum interview", category: "Visas & Immigration" },
  { title: "EU Settlement Scheme", href: "/eu-settlement-scheme/", description: "Settled and pre-settled status for EU citizens", category: "Visas & Immigration", keywords: ["eu", "european", "brexit", "settled status"] },
  { title: "Emergency Immigration Solicitor", href: "/emergency-immigration-solicitor/", description: "Same-day urgent immigration help", category: "Visas & Immigration", keywords: ["urgent", "asap", "today", "deportation"] },
  { title: "Immigration Dawn Raids", href: "/immigration-dawn-raids/", description: "Your rights during a Home Office immigration raid", category: "Visas & Immigration", keywords: ["raid", "enforcement", "detention"] },
  { title: "Immigration Bail", href: "/bail401-immigration-bail/", description: "Bail applications for detained individuals (BAIL 401)", category: "Visas & Immigration", keywords: ["detention", "release"] },
  { title: "Detained Duty Advice Scheme", href: "/detained-duty-advice-scheme/", description: "Free legal advice for people held in immigration detention", category: "Visas & Immigration", keywords: ["detention", "free advice"] },
  { title: "IS91R Notice of Detention", href: "/is91r-notice-of-detention/", description: "Understanding the IS91R detention paperwork", category: "Visas & Immigration" },
  { title: "Section 120 Notice", href: "/section-120-notice/", description: "Responding to a Section 120 notice from the Home Office", category: "Visas & Immigration" },
  { title: "FLR(M) Visa Extension", href: "/flr-visa-extension/", description: "Extending leave on the family route after 30 months", category: "Visas & Immigration", keywords: ["flr", "form", "extension", "30 months"] },

  // ─── Wizards & Calculators ───────────────────────────────────────
  { title: "Adequate Maintenance Calculator", href: "/adequate-maintenance-calculator/", description: "Check if you qualify for the AM route (PIP, DLA, Carer's)", category: "Wizards & Calculators", keywords: ["calculator", "pip", "dla", "carer", "income"] },
  { title: "Visa Eligibility Wizard", href: "/visa-wizard/", description: "Quick guided tool to find the right UK visa", category: "Wizards & Calculators", keywords: ["which visa", "quiz", "tool"] },
  { title: "Citizenship Wizard", href: "/citizenship-wizard/", description: "Check your route to British citizenship", category: "Wizards & Calculators", keywords: ["naturalisation", "passport"] },
  { title: "ILR Wizard", href: "/ilr-wizard/", description: "Are you ready to apply for settlement?", category: "Wizards & Calculators", keywords: ["settlement", "indefinite leave"] },
  { title: "Skilled Worker Wizard", href: "/skilled-worker-wizard/", description: "Skilled Worker visa eligibility checker", category: "Wizards & Calculators", keywords: ["work visa", "sponsorship", "employer"] },
  { title: "Visit Visa Refusal Wizard", href: "/visit-visa-refusal/", description: "Understand why your visit visa was refused and what to do", category: "Wizards & Calculators", keywords: ["refused", "rejected"] },
  { title: "Emergency Immigration FAQ", href: "/emergency-immigration-faq/", description: "Quick answers for urgent immigration situations", category: "Wizards & Calculators", keywords: ["urgent", "today", "deportation"] },

  // ─── Housing & Personal Injury ───────────────────────────────────
  { title: "Housing Disrepair Claims", href: "/housing-disrepair-claims/", description: "Compensation for damp, mould, leaks — no win, no fee", category: "Housing & Personal Injury", keywords: ["damp", "mould", "leak", "landlord", "council", "compensation"] },
  { title: "Personal Injury", href: "/personal-injury/", description: "Accident, workplace and road traffic compensation claims", category: "Housing & Personal Injury", keywords: ["accident", "compensation", "injury", "workplace", "rta"] },

  // ─── Firm ────────────────────────────────────────────────────────
  { title: "About Us", href: "/about-us/", description: "SRA-regulated firm based in Bradford & London", category: "Firm" },
  { title: "Our Team", href: "/our-team/", description: "Meet the solicitors and paralegals", category: "Firm", keywords: ["solicitor", "lawyer", "people", "staff"] },
  { title: "Our Fees", href: "/our-fees/", description: "Fixed fees and no-win-no-fee — transparent pricing", category: "Firm", keywords: ["price", "cost", "how much", "fees"] },
  { title: "Reviews", href: "/reviews/", description: "4.9★ from 97 verified client reviews", category: "Firm", keywords: ["testimonials", "feedback", "ratings", "verified"] },
  { title: "Contact Us", href: "/contact-us/", description: "Phone, email, office address, opening hours", category: "Firm", keywords: ["phone", "email", "address", "office"] },
  { title: "Free Consultation", href: "/free-consultation/", description: "Book a free 30-minute call with a named solicitor", category: "Firm", keywords: ["book", "consultation", "appointment", "free call"] },
  { title: "Careers", href: "/careers/", description: "Job openings at Abrahams Solicitors", category: "Firm", keywords: ["jobs", "hiring", "vacancy", "work for us"] },
  { title: "Immigration Solicitor Bradford", href: "/immigration-solicitor-bradford/", description: "Our Bradford office for immigration matters", category: "Firm", keywords: ["bradford", "yorkshire"] },
  { title: "Immigration Solicitor Essex", href: "/immigration-solicitor-essex/", description: "Our Essex office for immigration matters", category: "Firm", keywords: ["essex"] },
  { title: "Immigration Solicitor Manchester", href: "/immigration-solicitor-manchester/", description: "Our Manchester office for immigration matters", category: "Firm", keywords: ["manchester"] },

  // ─── Resources ───────────────────────────────────────────────────
  { title: "Blog", href: "/blog/", description: "Articles, case notes and legal commentary", category: "Resources" },
  { title: "FAQs", href: "/faqs/", description: "Common questions answered in plain English", category: "Resources", keywords: ["help", "questions"] },
  { title: "Press Releases", href: "/press-releases/", description: "Firm news and media coverage", category: "Resources", keywords: ["news", "media"] },
  { title: "Newsletter", href: "/newsletter/", description: "Sign up for periodic immigration & housing updates", category: "Resources" },
  { title: "Refer a Friend", href: "/refer-a-friend/", description: "Refer someone and earn a thank-you reward", category: "Resources", keywords: ["referral", "reward"] },

  // ─── Legal ───────────────────────────────────────────────────────
  { title: "Privacy Policy", href: "/privacy-policy/", description: "How we handle your personal data", category: "Legal", keywords: ["gdpr", "data"] },
  { title: "Cookie Policy", href: "/cookie-policy/", description: "Cookies used on this website", category: "Legal" },
  { title: "Terms of Business", href: "/terms-of-business/", description: "Engagement terms and complaints procedure", category: "Legal", keywords: ["complaints"] },
  { title: "Website Legal Notice", href: "/website-legal-notice/", description: "Regulatory disclosure for this website", category: "Legal" },
];

// Lowercase the searchable haystack once at module load. The matcher does
// case-insensitive substring matching across title + description + keywords;
// pre-lowercasing avoids per-keystroke .toLowerCase() across the index.
type IndexedEntry = SearchEntry & { _haystack: string };

export const INDEXED_ENTRIES: IndexedEntry[] = SEARCH_INDEX.map((e) => ({
  ...e,
  _haystack: [e.title, e.description, ...(e.keywords ?? [])].join(" ").toLowerCase(),
}));

export function searchPages(query: string, limit = 6): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // Split into terms — every term must match somewhere. Allows "spouse fees"
  // to surface /our-fees/ + spouse-visa pages, etc.
  const terms = q.split(/\s+/);
  const hits: { entry: SearchEntry; score: number }[] = [];
  for (const e of INDEXED_ENTRIES) {
    if (!terms.every((t) => e._haystack.includes(t))) continue;
    // Score: title prefix match > title substring > anywhere else.
    const titleLower = e.title.toLowerCase();
    let score = 0;
    if (titleLower.startsWith(q)) score += 1000;
    else if (titleLower.includes(q)) score += 500;
    score += terms.filter((t) => titleLower.includes(t)).length * 100;
    score -= e.title.length;
    hits.push({ entry: e, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit).map((h) => h.entry);
}
