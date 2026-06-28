// Manually maintained — last auto-sync 2026-06-08; subsequent edits by hand.
// If the PublishOS sync script (scripts/sync-copy.ts) is re-run it will
// overwrite these labels; back up first.
//
// Convention: Title Case for all child items, with these terms always
// uppercase: UK, ILR, EU. Acronyms in parentheses also uppercase (e.g.
// "Indefinite Leave to Remain (ILR)").

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Immigration Solicitors",
    href: "/immigration/",
    children: [
      { label: "UK Spouse Visa Solicitors", href: "/uk-spouse-visa-solicitors/" },
      { label: "British Citizenship Solicitors", href: "/british-citizenship-solicitors/" },
      { label: "Sponsor Licence Applications", href: "/sponsor-licence-applications/" },
      { label: "Indefinite Leave to Remain (ILR)", href: "/indefinite-leave-to-remain-ilr/" },
      { label: "UK Visa Applications", href: "/uk-visa-applications/" },
      { label: "Visa Refusal & Appeals Hub", href: "/visa-refusal-appeal/" },
      { label: "Immigration Solicitors", href: "/immigration-solicitors/" },
      { label: "Immigration Solicitor Bradford", href: "/immigration-solicitor-bradford/" },
      { label: "Immigration Solicitor Essex", href: "/immigration-solicitor-essex/" },
      { label: "Immigration Solicitor Manchester", href: "/immigration-solicitor-manchester/" },
      { label: "UK Spouse Visa", href: "/uk-spouse-visa/" },
      { label: "UK Visit Visa", href: "/uk-visit-visa/" },
      { label: "UK Ancestry Visa", href: "/uk-ancestry-visa/" },
      { label: "UK Fiancé Visa", href: "/uk-fiance-visa/" },
      { label: "UK Partner Visa Extension", href: "/uk-partner-visa-extension/" },
      { label: "UK Unmarried Partner Visa", href: "/uk-unmarried-partner-visa/" },
      { label: "Civil Partnership Visa", href: "/civil-partnership-visa/" },
      { label: "UK Visa Extensions & Renewals", href: "/uk-visa-extensions-renewals/" },
      { label: "Asylum Applications", href: "/asylum-applications/" },
      { label: "EU Settlement Scheme", href: "/eu-settlement-scheme/" },
    ],
  },
  {
    label: "Housing Law",
    href: "/housing-disrepair-claims/",
    children: [
      { label: "Housing Disrepair Claims", href: "/housing-disrepair-claims/" },
    ],
  },
  { label: "About Us", href: "/about-us/" },
  { label: "Our Fees", href: "/our-fees/" },
  { label: "Contact", href: "/contact-us/" },
];

export const teamMembers = [
  {
    slug: "ahrika-ghalib",
    name: "Ahrika Ghalib",
    role: "Principal Solicitor",
    specialisation: "Immigration Law",
    description:
      "Ahrika is the founder and principal solicitor at Abrahams Solicitors with extensive experience in immigration law, specialising in visa applications, asylum claims, and British citizenship matters.",
  },
  {
    slug: "ansar-malik",
    name: "Ansar Malik",
    role: "Senior Solicitor",
    specialisation: "Housing & Personal Injury",
    description:
      "Ansar leads the housing disrepair and personal injury departments, bringing years of litigation experience to achieve the best outcomes for clients.",
  },
  {
    slug: "adam-ejaz",
    name: "Adam Ejaz",
    role: "Solicitor",
    specialisation: "Immigration Law",
    description:
      "Adam specialises in complex immigration cases including appeals, judicial reviews, and human rights claims.",
  },
  {
    slug: "faisal-mahmood",
    name: "Faisal Mahmood",
    role: "Solicitor",
    specialisation: "Immigration Law",
    description:
      "Faisal handles a wide range of immigration matters with a particular focus on family reunion visas and settlement applications.",
  },
  {
    slug: "jenna-sandhu",
    name: "Jenna Sandhu",
    role: "Solicitor",
    specialisation: "Personal Injury",
    description:
      "Jenna specialises in personal injury claims, with expertise in workplace accidents and road traffic accidents.",
  },
  {
    slug: "mohamed-mohamed",
    name: "Mohamed Mohamed",
    role: "Solicitor",
    specialisation: "Immigration Law",
    description:
      "Mohamed provides expert advice on all immigration matters, with extensive experience in asylum and human rights applications.",
  },
  {
    slug: "nsrin-bairam",
    name: "Nsrin Bairam",
    role: "Paralegal",
    specialisation: "Immigration Law",
    description:
      "Nsrin supports the immigration team with case preparation, client liaison, and document management.",
  },
  {
    slug: "savas-kaya",
    name: "Savas Kaya",
    role: "Solicitor",
    specialisation: "Housing Law",
    description:
      "Savas focuses on housing disrepair claims, helping tenants secure compensation for substandard living conditions.",
  },
  {
    slug: "siama-naz",
    name: "Siama Naz",
    role: "Legal Secretary",
    specialisation: "Administration",
    description:
      "Siama provides administrative support across all departments, ensuring smooth case management and client communication.",
  },
];
