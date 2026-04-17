export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Immigration Services",
    href: "/immigration/",
    children: [
      { label: "Visa Applications & Appeals", href: "/immigration/" },
      { label: "Asylum Applications", href: "/asylum-applications/" },
      { label: "British Citizenship", href: "/british-citizenship/" },
      { label: "EU Settlement Scheme", href: "/eu-settlement-scheme/" },
      { label: "UK Spouse Visa", href: "/uk-spouse-visa/" },
      { label: "UK Partner Visa Extension", href: "/uk-partner-visa-extension/" },
      { label: "UK Fiance Visa", href: "/uk-fiance-visa/" },
      { label: "Civil Partnership Visa", href: "/civil-partnership-visa/" },
      { label: "UK Unmarried Partner Visa", href: "/uk-unmarried-partner-visa/" },
      { label: "Family Visas", href: "/uk-dependent-child-visa/" },
      { label: "UK Visit Visa", href: "/uk-visit-visa/" },
      { label: "UK Ancestry Visa", href: "/uk-ancestry-visa/" },
      { label: "Indefinite Leave to Remain", href: "/indefinite-leave-to-remain-ilr/" },
      { label: "UK Visa Extensions", href: "/uk-visa-extensions-renewals/" },
      { label: "Private Life Visa / ILR", href: "/uk-private-life-visa-ilr/" },
    ],
  },
  {
    label: "Housing Law",
    href: "/housing-disrepair/",
    children: [
      { label: "Housing Disrepair Claims", href: "/housing-disrepair/" },
    ],
  },
  {
    label: "Personal Injury",
    href: "/personal-injury/",
    children: [
      { label: "Accidents at Work", href: "/accidents-at-work/" },
      { label: "Employer's Duty of Care", href: "/employers-duty-of-care/" },
      { label: "Back Injury Claims", href: "/back-injury-claims/" },
      { label: "Slips and Trips", href: "/slips-and-trips/" },
      { label: "Fall From Height", href: "/fall-from-height-claims/" },
      { label: "Car Accident Claims", href: "/car-accidents-claims/" },
      { label: "Motorcycle Accidents", href: "/motorcycle-accident-claims/" },
      { label: "Passenger Claims", href: "/passenger-claims/" },
      { label: "Pedestrian Claims", href: "/pedestrian-claims/" },
      { label: "Serious Injury Claims", href: "/serious-injury-claims/" },
      { label: "Fatal Accident Claims", href: "/fatal-accident-claims/" },
      { label: "Head and Brain Injury", href: "/head-and-brain-injury/" },
      { label: "Loss of Sight Claims", href: "/loss-of-sight-claims/" },
      { label: "Spinal Injury Claims", href: "/spinal-injury-claims/" },
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
