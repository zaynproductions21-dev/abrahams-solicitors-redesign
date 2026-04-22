export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Immigration Law",
    href: "/immigration/",
    children: [
      { label: "Immigration Solicitors London", href: "/immigration-solicitors-london/" },
      { label: "Spouse Visa Services", href: "/spouse-visa-solicitors/" },
      { label: "British Citizenship", href: "/british-citizenship-services/" },
      { label: "UK Spouse Visa", href: "/uk-spouse-visa/" },
      { label: "UK Partner Visa Extension", href: "/uk-partner-visa-extension/" },
      { label: "UK Fiance Visa", href: "/uk-fiance-visa/" },
      { label: "Civil Partnership Visa", href: "/civil-partnership-visa/" },
      { label: "UK Unmarried Partner Visa", href: "/uk-unmarried-partner-visa/" },
      { label: "UK Visit Visa", href: "/uk-visit-visa/" },
      { label: "UK Ancestry Visa", href: "/uk-ancestry-visa/" },
      { label: "Indefinite Leave to Remain", href: "/indefinite-leave-to-remain-ilr/" },
      { label: "Visa Extensions & Renewals", href: "/uk-visa-extensions-renewals/" },
      { label: "Asylum Applications", href: "/asylum-applications/" },
      { label: "EU Settlement Scheme", href: "/eu-settlement-scheme/" },
      { label: "Immigration Lawyers Near Me", href: "/immigration-lawyers/" },
    ],
  },
  {
    label: "Housing Law",
    href: "/housing-disrepair/",
    children: [
      { label: "Housing Disrepair Claims", href: "/housing-disrepair-claims/" },
      { label: "Tenant Rights", href: "/housing-disrepair/" },
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
