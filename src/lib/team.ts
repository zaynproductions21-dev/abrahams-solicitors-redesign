export type Solicitor = {
  slug: string;
  name: string;
  role: string;
  specialisms: string[];
  /** Short blurb — homepage + inner-page strips. */
  short: string;
  /** Long bio — /our-team/ page only. */
  long: string;
  sraNumber: string;
  sraUrl: string;
  admittedYear: number;
};

export const team: Solicitor[] = [
  {
    slug: "imran-shah",
    name: "Imran Shah",
    role: "Immigration & Litigation Solicitor",
    specialisms: ["Immigration", "Litigation", "Visa Appeals"],
    short: "Imran handles immigration and litigation cases that need methodical preparation and clear strategy.",
    long: "Imran works on immigration and litigation cases that need careful preparation and a clear strategy from day one — spouse visa refusals, ILR appeals, judicial reviews, complex Home Office disputes. The kind of work where one wrong line in a witness statement can derail a case for years.\n\nHe's been a qualified solicitor since April 2012, so he's seen the rules change more than once. Clients tell us they appreciate two things in particular: he doesn't oversell their chances, and he doesn't bury bad news either. You'll always know where your case stands and what's coming next.",
    sraNumber: "509359",
    sraUrl: "https://www.sra.org.uk/consumers/register/person/?sraNumber=509359",
    admittedYear: 2012,
  },
  {
    slug: "humaira-anjum",
    name: "Humaira Anjum",
    role: "Immigration & Litigation Solicitor",
    specialisms: ["Immigration", "Litigation", "Family Visas"],
    short: "Humaira walks families through every stage of immigration and litigation matters with calm, careful guidance.",
    long: "Humaira works across immigration and litigation, with a particular focus on cases where families need someone to take them through every step — spouse visas, fiancé visas, unmarried partner visas, ILR extensions, and judicial reviews when the Home Office gets it wrong.\n\nQualified since September 2021, Humaira is the steady voice when a case starts to feel overwhelming. She'll tell you what evidence you need, when you need it, and why — and keeps you in the loop without burying you in jargon.",
    sraNumber: "663190",
    sraUrl: "https://higher-rights.sra.org.uk/consumers/register/person/?sraNumber=663190",
    admittedYear: 2021,
  },
  {
    slug: "sannah-khatoon",
    name: "Sannah Khatoon",
    role: "Litigation & Housing Disrepair Solicitor",
    specialisms: ["Housing Disrepair", "Landlord & Tenant", "Litigation"],
    short: "Sannah recovers damages and forces repairs in housing disrepair claims — usually on no win, no fee.",
    long: "If your landlord has ignored damp, mould, broken heating, leaks, or unsafe wiring for months, Sannah is the solicitor you want. She handles housing disrepair claims and landlord-and-tenant disputes — typically on a No Win, No Fee basis — and goes after both compensation and the repairs you've been chasing.\n\nShe knows housing law from the tenant's side and isn't fazed by letting agents who think they can stall their way out. Most cases she takes settle with damages awarded and the work finally getting done.",
    sraNumber: "654258",
    sraUrl: "https://www.sra.org.uk/consumers/register/person/?sraNumber=654258",
    admittedYear: 2018,
  },
];
