export interface ServicePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroDescription: string;
  badge?: string;
  sections: {
    title: string;
    content: string;
    items?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
  parentService?: string;
  parentHref?: string;
}

export const immigrationPages: ServicePage[] = [
  {
    slug: "immigration",
    title: "Immigration Services",
    metaTitle: "Immigration Solicitors London | Visa & Appeals | Abrahams",
    metaDescription:
      "Leading London immigration lawyers. Visa applications, British citizenship, asylum claims. Expert legal advice for all immigration matters.",
    heroTitle: "Immigration Solicitors London",
    heroDescription:
      "Expert immigration lawyers specialising in visa applications, appeals, British citizenship, and asylum claims. We provide clear, effective guidance through every stage of the immigration process.",
    badge: "Immigration Law",
    sections: [
      {
        title: "Our Immigration Services",
        content:
          "At Abrahams Solicitors, our immigration team handles all aspects of UK immigration law. Whether you are applying for a visa, seeking asylum, or appealing a Home Office decision, our experienced solicitors provide the expert representation you need.",
        items: [
          "Visa Applications & Appeals",
          "British Citizenship & Naturalisation",
          "Asylum Applications",
          "EU Settlement Scheme",
          "Spouse & Partner Visas",
          "Family Reunion Visas",
          "Visit Visas",
          "Ancestry Visas",
          "Indefinite Leave to Remain (ILR)",
          "Visa Extensions & Renewals",
        ],
      },
      {
        title: "Our Immigration Process",
        content:
          "We take a structured approach to every immigration case to maximise your chances of success.",
        items: [
          "Free initial consultation to assess your case",
          "Detailed review of your circumstances and eligibility",
          "Preparation and submission of your application",
          "Liaison with the Home Office on your behalf",
          "Representation at hearings and appeals if required",
          "Ongoing support until your matter is resolved",
        ],
      },
      {
        title: "Why Choose Our Immigration Team",
        content:
          "Our immigration solicitors have extensive experience handling complex cases with high success rates. We understand the stress and uncertainty of immigration matters, and we are committed to providing clear, compassionate, and effective legal support.",
        items: [
          "Multilingual team serving diverse communities",
          "Proven track record of successful applications",
          "Transparent fees with no hidden charges",
          "Offices in London and Bradford for convenience",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a visa application take?",
        answer:
          "Processing times vary depending on the type of visa. Standard applications typically take 8-12 weeks, while priority services can reduce this to 5-10 working days. We will advise you on expected timescales for your specific application.",
      },
      {
        question: "Can you help if my visa application has been refused?",
        answer:
          "Yes, we regularly handle appeals and administrative reviews of refused applications. We will review the reasons for refusal and advise on the best course of action, whether that is an appeal, judicial review, or fresh application.",
      },
      {
        question: "Do you offer Legal Aid for immigration cases?",
        answer:
          "Legal Aid is available for certain immigration matters, particularly asylum cases. During your initial consultation, we will assess whether you qualify for Legal Aid and explain all available funding options.",
      },
    ],
  },
  {
    slug: "asylum-applications",
    title: "Asylum Applications",
    metaTitle: "Asylum Solicitors London | Asylum Applications UK",
    metaDescription:
      "Expert asylum solicitors in London. We help individuals seeking protection in the UK with compassionate, effective legal representation.",
    heroTitle: "Asylum Applications",
    heroDescription:
      "If you are seeking protection in the UK, our experienced asylum solicitors provide compassionate and effective legal representation throughout the entire process.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Asylum Legal Support",
        content:
          "Claiming asylum is one of the most important legal processes you may ever face. Our team has extensive experience representing individuals from across the world who are seeking protection in the UK from persecution.",
        items: [
          "Initial asylum claims and screening interviews",
          "Preparation for substantive asylum interviews",
          "Appeals against refused asylum claims",
          "Fresh claims and further submissions",
          "Judicial review of Home Office decisions",
          "Support with documentation and evidence gathering",
        ],
      },
      {
        title: "The Asylum Process",
        content:
          "We guide you through every step of the UK asylum process, from your initial claim to the final decision.",
        items: [
          "Registration and screening interview",
          "Gathering evidence to support your claim",
          "Preparation for your substantive interview",
          "Representation during Home Office interviews",
          "Appeal to the First-tier Tribunal if refused",
          "Further appeals and judicial review where appropriate",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I claim asylum in the UK?",
        answer:
          "You should claim asylum as soon as possible after arriving in the UK. This is done by registering your claim with the Home Office. We can help you prepare for the screening interview and gather the evidence needed to support your claim.",
      },
      {
        question: "Can I work while my asylum claim is being processed?",
        answer:
          "You cannot normally work while your asylum claim is being processed. However, if your claim has been outstanding for more than 12 months through no fault of your own, you may apply for permission to work in certain roles.",
      },
    ],
  },
  {
    slug: "british-citizenship",
    title: "British Citizenship",
    metaTitle: "British Citizenship Solicitors | Naturalisation | Abrahams",
    metaDescription:
      "Expert help with British citizenship applications and naturalisation. London solicitors guiding you through eligibility, requirements, and the application process.",
    heroTitle: "British Citizenship & Naturalisation",
    heroDescription:
      "Our experienced solicitors guide you through the British citizenship application process, ensuring you meet all requirements for a successful outcome.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Citizenship Services",
        content:
          "Becoming a British citizen is a significant milestone. Our team helps you navigate the eligibility requirements and application process with confidence.",
        items: [
          "Naturalisation applications",
          "Registration as a British citizen",
          "Citizenship by descent",
          "Citizenship ceremonies",
          "Right of abode applications",
          "British passport applications",
        ],
      },
      {
        title: "Eligibility Requirements",
        content:
          "To apply for British citizenship by naturalisation, you must generally meet the following criteria:",
        items: [
          "Aged 18 or over",
          "Hold indefinite leave to remain (ILR) or EU settled status",
          "Have lived in the UK for at least 5 years (3 years if married to a British citizen)",
          "Not have spent more than 450 days outside the UK in the last 5 years",
          "Pass the Life in the UK test",
          "Meet the English language requirement",
          "Be of good character",
        ],
      },
    ],
  },
  {
    slug: "eu-settlement-scheme",
    title: "EU Settlement Scheme",
    metaTitle: "EU Settlement Scheme Solicitors | Settled Status | Abrahams",
    metaDescription:
      "Expert legal help with EU Settlement Scheme applications, pre-settled and settled status in London.",
    heroTitle: "EU Settlement Scheme",
    heroDescription:
      "Our solicitors assist EU, EEA, and Swiss nationals with applications under the EU Settlement Scheme, including late applications and appeals.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "EU Settlement Scheme Services",
        content:
          "Although the deadline for initial applications has passed, there are still circumstances where applications can be made. We can help with:",
        items: [
          "Late applications with reasonable grounds",
          "Applications to upgrade from pre-settled to settled status",
          "Family permits for joining EU settled residents",
          "Appeals against refused applications",
          "Administrative reviews",
        ],
      },
    ],
  },
  {
    slug: "uk-spouse-visa",
    title: "UK Spouse Visa",
    metaTitle: "Spouse Visa Solicitors London | UK Spouse Visa Applications",
    metaDescription:
      "Expert spouse visa solicitors in London. We help with UK spouse visa applications, extensions, and settlement for married partners.",
    heroTitle: "UK Spouse Visa Applications",
    heroDescription:
      "Bringing your spouse to the UK or extending an existing spouse visa? Our experienced immigration team guides you through every requirement.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Spouse Visa Services",
        content:
          "The UK spouse visa allows you to live in the UK with your husband or wife who is either a British citizen or has settled status. We handle all aspects of the application.",
        items: [
          "Initial spouse visa applications",
          "Spouse visa extensions",
          "Settlement (indefinite leave to remain) for spouses",
          "Switching to a spouse visa from within the UK",
          "Appeals against refused applications",
        ],
      },
      {
        title: "Key Requirements",
        content:
          "To qualify for a UK spouse visa, you and your partner must meet several requirements:",
        items: [
          "Your relationship must be genuine and subsisting",
          "You must intend to live together permanently in the UK",
          "Your sponsor must meet the minimum income threshold (currently £29,000)",
          "You must meet the English language requirement",
          "There must be adequate accommodation available",
        ],
      },
    ],
  },
  {
    slug: "uk-partner-visa-extension",
    title: "UK Partner Visa Extension",
    metaTitle: "Partner Visa Extension UK | Immigration Solicitors London",
    metaDescription:
      "Expert help extending your UK partner visa. London immigration solicitors with high success rates for visa extensions.",
    heroTitle: "UK Partner Visa Extension",
    heroDescription:
      "Need to extend your partner visa? Our solicitors ensure your extension application is prepared correctly for the best chance of success.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Partner Visa Extension Services",
        content:
          "If you are currently in the UK on a partner visa, you will need to apply for an extension before your current visa expires. We help ensure your application is submitted correctly and on time.",
        items: [
          "Timely application before visa expiry",
          "Evidence gathering for genuine relationship",
          "Financial requirement documentation",
          "English language evidence",
          "Settlement applications after qualifying period",
        ],
      },
    ],
  },
  {
    slug: "uk-fiance-visa",
    title: "UK Fiance Visa",
    metaTitle: "Fiance Visa UK | Fiance Visa Solicitors London",
    metaDescription:
      "Expert fiance visa solicitors in London. We handle UK fiance visa applications for couples planning to marry in the UK.",
    heroTitle: "UK Fiance Visa Applications",
    heroDescription:
      "Planning to marry your partner in the UK? Our solicitors help you navigate the fiance visa application process from start to finish.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Fiance Visa Services",
        content:
          "A fiance visa allows you to enter the UK to marry your partner. After marriage, you can apply for a spouse visa to continue living in the UK.",
        items: [
          "Fiance visa applications",
          "Evidence preparation for genuine relationship",
          "Financial requirement guidance",
          "Switching to spouse visa after marriage",
          "Appeals against refused applications",
        ],
      },
    ],
  },
  {
    slug: "civil-partnership-visa",
    title: "Civil Partnership Visa",
    metaTitle: "Civil Partnership Visa UK | Immigration Solicitors",
    metaDescription:
      "Expert legal help with UK civil partnership visas. London solicitors assisting same-sex and opposite-sex civil partners.",
    heroTitle: "Civil Partnership Visa",
    heroDescription:
      "Our immigration team provides expert assistance with civil partnership visa applications, helping you and your partner build your life together in the UK.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Civil Partnership Visa Services",
        content:
          "The civil partnership visa route allows you to join your civil partner in the UK. The requirements and process are similar to the spouse visa route.",
        items: [
          "Proposed civil partnership visa applications",
          "Civil partner visa extensions",
          "Settlement for civil partners",
          "Switching category within the UK",
          "Appeal representation",
        ],
      },
    ],
  },
  {
    slug: "uk-unmarried-partner-visa",
    title: "UK Unmarried Partner Visa",
    metaTitle: "Unmarried Partner Visa UK | Immigration Solicitors London",
    metaDescription:
      "Expert help with UK unmarried partner visa applications. Prove your relationship and meet requirements with our specialist solicitors.",
    heroTitle: "UK Unmarried Partner Visa",
    heroDescription:
      "Living together but not married? Our solicitors help you apply for an unmarried partner visa to join your partner in the UK.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Unmarried Partner Visa Services",
        content:
          "If you have been living together with your partner for at least 2 years in a relationship akin to marriage, you may be eligible for an unmarried partner visa.",
        items: [
          "Initial unmarried partner visa applications",
          "Evidence gathering for cohabitation",
          "Visa extensions",
          "Settlement applications",
          "Appeal representation if refused",
        ],
      },
    ],
  },
  {
    slug: "uk-dependent-child-visa",
    title: "UK Dependent Child Visa",
    metaTitle: "Dependent Child Visa UK | Family Immigration Solicitors",
    metaDescription:
      "Expert help bringing your children to the UK. Dependent child visa solicitors in London with proven results.",
    heroTitle: "UK Dependent Child Visa",
    heroDescription:
      "Bringing your child to the UK to join you? Our solicitors handle dependent child visa applications with care and expertise.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Dependent Child Visa Services",
        content:
          "Children under 18 may be able to join their parents in the UK as dependants. We handle applications for children joining parents on various visa categories.",
        items: [
          "Child dependent visa applications",
          "Applications for children born in the UK",
          "Switching immigration categories for children",
          "Settlement applications for dependent children",
          "British citizenship registration for children",
        ],
      },
    ],
  },
  {
    slug: "uk-dependent-parent-visa",
    title: "UK Dependent Parent Visa",
    metaTitle: "Parent Visa UK | Adult Dependent Relative Visa Solicitors",
    metaDescription:
      "Expert help with UK parent visa and adult dependent relative applications. Specialist immigration solicitors in London.",
    heroTitle: "UK Dependent Parent Visa",
    heroDescription:
      "Need to bring an elderly parent to the UK? Our solicitors advise on the adult dependent relative visa route and alternative options.",
    badge: "Family Immigration",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Dependent Parent Visa Services",
        content:
          "The adult dependent relative visa allows elderly parents or grandparents to join family members in the UK if they require long-term personal care. We can help navigate this complex application.",
        items: [
          "Adult dependent relative visa applications",
          "Medical evidence gathering",
          "Care needs assessments",
          "Alternative immigration routes for parents",
          "Appeal representation",
        ],
      },
    ],
  },
  {
    slug: "uk-visit-visa",
    title: "UK Visit Visa",
    metaTitle: "UK Visit Visa | Visitor Visa Solicitors London",
    metaDescription:
      "Expert help with UK visit visa applications. Tourist, family, and business visitor visa solicitors in London.",
    heroTitle: "UK Visit Visa Applications",
    heroDescription:
      "Whether visiting family, touring the UK, or attending business meetings, our solicitors help ensure your visit visa application succeeds.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Visit Visa Services",
        content:
          "UK visit visas allow you to come to the UK for up to 6 months for tourism, visiting family, attending business meetings, or receiving medical treatment.",
        items: [
          "Standard visitor visa applications",
          "Family visitor visas",
          "Business visitor visas",
          "Medical visitor visas",
          "Academic visitor visas",
          "Repeat visitor visas",
        ],
      },
    ],
  },
  {
    slug: "uk-ancestry-visa",
    title: "UK Ancestry Visa",
    metaTitle: "UK Ancestry Visa | Ancestry Visa Solicitors London",
    metaDescription:
      "Expert ancestry visa solicitors in London. We help Commonwealth citizens with British-born grandparents live and work in the UK.",
    heroTitle: "UK Ancestry Visa",
    heroDescription:
      "If you are a Commonwealth citizen with a grandparent born in the UK, you may be eligible for a UK Ancestry Visa allowing you to live and work here.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Ancestry Visa Services",
        content:
          "The UK Ancestry Visa is available to Commonwealth citizens aged 17 or over who have a grandparent born in the UK, Channel Islands, or Isle of Man.",
        items: [
          "Ancestry visa applications",
          "Evidence of grandparent's birth in the UK",
          "Ancestry visa extensions",
          "Settlement after 5 years on ancestry visa",
          "Dependent applications for family members",
        ],
      },
    ],
  },
  {
    slug: "indefinite-leave-to-remain-ilr",
    title: "Indefinite Leave to Remain (ILR)",
    metaTitle: "ILR Solicitors London | Indefinite Leave to Remain",
    metaDescription:
      "Expert ILR solicitors in London. We help with indefinite leave to remain applications for permanent settlement in the UK.",
    heroTitle: "Indefinite Leave to Remain (ILR)",
    heroDescription:
      "Applying for permanent settlement in the UK? Our experienced solicitors guide you through the ILR application process to secure your future.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "ILR Services",
        content:
          "Indefinite Leave to Remain (ILR) grants you permanent residence in the UK. Once you have ILR, you can live and work in the UK without any immigration restrictions.",
        items: [
          "ILR applications on all eligible routes",
          "Life in the UK test preparation guidance",
          "English language requirement advice",
          "ILR for family members and dependants",
          "Replacement BRP cards",
          "Progression to British citizenship",
        ],
      },
    ],
  },
  {
    slug: "uk-visa-extensions-renewals",
    title: "UK Visa Extensions & Renewals",
    metaTitle: "Visa Extension UK | Visa Renewal Solicitors London",
    metaDescription:
      "Expert visa extension and renewal solicitors in London. Timely applications to maintain your immigration status in the UK.",
    heroTitle: "UK Visa Extensions & Renewals",
    heroDescription:
      "Don't let your visa expire. Our solicitors ensure your extension or renewal application is submitted correctly and on time.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Visa Extension Services",
        content:
          "If your current UK visa is due to expire, it is essential to apply for an extension before the expiry date. We handle extensions for all visa categories.",
        items: [
          "Work visa extensions",
          "Student visa extensions",
          "Family visa extensions",
          "Visitor visa extensions (in exceptional circumstances)",
          "Switching between visa categories",
          "Urgent and same-day applications",
        ],
      },
    ],
  },
  {
    slug: "uk-private-life-visa-ilr",
    title: "UK Private Life Visa / ILR",
    metaTitle: "Private Life Visa UK | Article 8 Immigration Solicitors",
    metaDescription:
      "Expert private life visa and Article 8 solicitors in London. We help those with established private life in the UK to regularise their status.",
    heroTitle: "UK Private Life Visa & ILR",
    heroDescription:
      "If you have built a private life in the UK over many years, you may be eligible to regularise your immigration status through the private life route.",
    badge: "Immigration Law",
    parentService: "Immigration Services",
    parentHref: "/immigration/",
    sections: [
      {
        title: "Private Life Route",
        content:
          "The private life immigration route allows individuals who have lived in the UK for an extended period to apply for leave to remain based on their established private life under Article 8 of the European Convention on Human Rights.",
        items: [
          "20-year long residence applications",
          "Applications for young people who have lived in the UK for 7+ years",
          "Article 8 human rights claims",
          "Discretionary leave applications",
          "Settlement under the private life route",
        ],
      },
    ],
  },
];

export const personalInjuryPages: ServicePage[] = [
  {
    slug: "personal-injury",
    title: "Personal Injury",
    metaTitle: "Personal Injury Solicitors London | Accident Claims",
    metaDescription:
      "London personal injury lawyers. Work accidents, car crashes, serious injury claims. No win, no fee. Expert legal representation.",
    heroTitle: "Personal Injury Solicitors London",
    heroDescription:
      "Suffered an injury that wasn't your fault? Our experienced personal injury solicitors fight for the compensation you deserve on a no win, no fee basis.",
    badge: "Personal Injury",
    sections: [
      {
        title: "Our Personal Injury Services",
        content:
          "We handle a wide range of personal injury claims, from workplace accidents to serious life-changing injuries. Our dedicated team works on a no win, no fee basis.",
        items: [
          "Accidents at Work",
          "Car Accident Claims",
          "Motorcycle Accident Claims",
          "Pedestrian Accident Claims",
          "Serious Injury Claims",
          "Fatal Accident Claims",
          "Slips, Trips and Falls",
          "Head and Brain Injuries",
          "Spinal Injuries",
        ],
      },
      {
        title: "No Win, No Fee",
        content:
          "We understand that the financial burden of legal fees can add stress to an already difficult situation. That's why we offer a no win, no fee service for personal injury claims, so you can pursue justice without financial risk.",
      },
      {
        title: "How We Help",
        content: "Our personal injury process is designed to minimise stress and maximise your compensation.",
        items: [
          "Free initial consultation to assess your claim",
          "Investigation and evidence gathering",
          "Medical evidence and expert reports",
          "Negotiation with insurers for maximum settlement",
          "Court representation if settlement cannot be reached",
          "Support with rehabilitation and recovery",
        ],
      },
    ],
  },
  {
    slug: "accidents-at-work",
    title: "Accidents at Work",
    metaTitle: "Accidents at Work Solicitors | Workplace Injury Claims",
    metaDescription:
      "Expert workplace accident solicitors in London. We help employees claim compensation for injuries sustained at work. No win, no fee.",
    heroTitle: "Accidents at Work Claims",
    heroDescription:
      "Injured at work? Your employer has a legal duty to keep you safe. Our solicitors help you claim the compensation you are entitled to.",
    badge: "Personal Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Workplace Accident Claims",
        content:
          "Employers have a legal duty of care to provide a safe working environment. If you have been injured at work due to your employer's negligence, you may be entitled to compensation.",
        items: [
          "Factory and warehouse accidents",
          "Construction site injuries",
          "Office workplace accidents",
          "Manual handling injuries",
          "Injuries from defective equipment",
          "Exposure to hazardous substances",
        ],
      },
    ],
  },
  {
    slug: "employers-duty-of-care",
    title: "Employer's Duty of Care",
    metaTitle: "Employer's Duty of Care | Workplace Safety Solicitors",
    metaDescription:
      "Understanding your employer's duty of care. Expert workplace safety solicitors helping injured employees claim compensation.",
    heroTitle: "Employer's Duty of Care",
    heroDescription:
      "Your employer is legally obligated to ensure your safety at work. If they have failed in this duty and you've been injured, we can help.",
    badge: "Personal Injury",
    parentService: "Accidents at Work",
    parentHref: "/accidents-at-work/",
    sections: [
      {
        title: "Understanding Employer's Duty of Care",
        content:
          "Under UK law, employers must take reasonable steps to ensure the health, safety, and welfare of their employees. This includes providing safe equipment, proper training, and a safe working environment.",
        items: [
          "Risk assessments and hazard identification",
          "Safe systems of work",
          "Adequate training and supervision",
          "Personal protective equipment (PPE)",
          "Maintenance of equipment and premises",
          "Reporting and investigating incidents",
        ],
      },
    ],
  },
  {
    slug: "back-injury-claims",
    title: "Back Injury Claims",
    metaTitle: "Back Injury Claims | Compensation Solicitors London",
    metaDescription:
      "Expert back injury claim solicitors in London. Compensation for workplace back injuries, lifting injuries, and spinal problems.",
    heroTitle: "Back Injury Claims",
    heroDescription:
      "Back injuries can be debilitating and life-changing. Our solicitors help you claim fair compensation for back injuries caused by accidents or negligence.",
    badge: "Personal Injury",
    parentService: "Accidents at Work",
    parentHref: "/accidents-at-work/",
    sections: [
      {
        title: "Back Injury Compensation",
        content:
          "Back injuries are among the most common workplace injuries. They can range from minor strains to serious disc and spinal injuries that affect your ability to work and enjoy life.",
        items: [
          "Slipped or herniated disc injuries",
          "Lower back pain and strains",
          "Spinal fractures",
          "Sciatica and nerve damage",
          "Injuries from manual handling",
          "Repetitive strain injuries",
        ],
      },
    ],
  },
  {
    slug: "slips-and-trips",
    title: "Slips and Trips",
    metaTitle: "Slip and Trip Claims | Accident Compensation Solicitors",
    metaDescription:
      "Expert slip and trip accident solicitors in London. Compensation for injuries from falls at work or in public places.",
    heroTitle: "Slips and Trips Claims",
    heroDescription:
      "Injured in a slip, trip, or fall? Whether at work, in a shop, or on a public pathway, our solicitors can help you claim compensation.",
    badge: "Personal Injury",
    parentService: "Accidents at Work",
    parentHref: "/accidents-at-work/",
    sections: [
      {
        title: "Slip and Trip Compensation",
        content:
          "Slip, trip, and fall accidents are extremely common and can result in serious injuries. Property owners and employers have a duty to maintain safe premises.",
        items: [
          "Wet or slippery floors",
          "Uneven surfaces and potholes",
          "Poor lighting",
          "Obstructed walkways",
          "Defective flooring or carpeting",
          "Ice and snow on pathways",
        ],
      },
    ],
  },
  {
    slug: "fall-from-height-claims",
    title: "Fall From Height Claims",
    metaTitle: "Fall From Height Claims | Work Injury Solicitors",
    metaDescription:
      "Expert solicitors for fall from height claims. Compensation for injuries from falls at work including construction and industrial accidents.",
    heroTitle: "Fall From Height Claims",
    heroDescription:
      "Falls from height are among the most serious workplace accidents. Our solicitors specialise in securing maximum compensation for these devastating injuries.",
    badge: "Personal Injury",
    parentService: "Accidents at Work",
    parentHref: "/accidents-at-work/",
    sections: [
      {
        title: "Fall From Height Claims",
        content:
          "Falls from height remain one of the leading causes of workplace fatalities and serious injuries in the UK. Employers have strict legal duties under the Work at Height Regulations 2005.",
        items: [
          "Falls from scaffolding",
          "Ladder accidents",
          "Falls from roofs",
          "Falls through fragile surfaces",
          "Falls from platforms and mezzanines",
          "Inadequate fall protection",
        ],
      },
    ],
  },
  {
    slug: "car-accidents-claims",
    title: "Car Accident Claims",
    metaTitle: "Car Accident Claims | Road Traffic Accident Solicitors",
    metaDescription:
      "Expert car accident solicitors in London. Compensation for injuries from road traffic accidents. No win, no fee representation.",
    heroTitle: "Car Accident Claims",
    heroDescription:
      "Been injured in a car accident that wasn't your fault? Our solicitors help you claim compensation for your injuries, losses, and suffering.",
    badge: "Personal Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Road Traffic Accident Claims",
        content:
          "Car accidents can cause devastating injuries and significant financial losses. Our experienced solicitors handle all types of road traffic accident claims.",
        items: [
          "Whiplash and soft tissue injuries",
          "Serious and catastrophic injuries",
          "Hit and run accidents",
          "Uninsured driver claims",
          "Multi-vehicle collisions",
          "Loss of earnings and expenses",
        ],
      },
    ],
  },
  {
    slug: "motorcycle-accident-claims",
    title: "Motorcycle Accident Claims",
    metaTitle: "Motorcycle Accident Claims | Biker Injury Solicitors",
    metaDescription:
      "Expert motorcycle accident solicitors in London. We help injured bikers claim the compensation they deserve.",
    heroTitle: "Motorcycle Accident Claims",
    heroDescription:
      "Motorcyclists are particularly vulnerable on the road. Our specialist solicitors understand the unique challenges of motorcycle accident claims.",
    badge: "Personal Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Motorcycle Accident Compensation",
        content:
          "Motorcycle accidents often result in more serious injuries due to the lack of physical protection. We specialise in securing fair compensation for injured motorcyclists.",
        items: [
          "Collisions caused by other road users",
          "Road defect accidents",
          "Filtering and overtaking accidents",
          "Roundabout and junction collisions",
          "Pillion passenger injuries",
          "Fatal motorcycle accidents",
        ],
      },
    ],
  },
  {
    slug: "passenger-claims",
    title: "Passenger Claims",
    metaTitle: "Passenger Accident Claims | Injury Compensation Solicitors",
    metaDescription:
      "Expert passenger injury solicitors in London. Compensation for injuries to passengers in cars, buses, taxis, and other vehicles.",
    heroTitle: "Passenger Accident Claims",
    heroDescription:
      "Injured as a passenger? Whether in a car, bus, taxi, or other vehicle, you have the right to claim compensation for injuries that weren't your fault.",
    badge: "Personal Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Passenger Injury Claims",
        content:
          "As a passenger, you are almost never at fault in an accident. Our solicitors help passengers in all types of vehicles claim the compensation they deserve.",
        items: [
          "Car passenger injuries",
          "Bus and coach passenger claims",
          "Taxi and private hire vehicle accidents",
          "Train passenger injuries",
          "Seatbelt and airbag failure claims",
        ],
      },
    ],
  },
  {
    slug: "pedestrian-claims",
    title: "Pedestrian Claims",
    metaTitle: "Pedestrian Accident Claims | Injury Solicitors London",
    metaDescription:
      "Expert pedestrian accident solicitors in London. Compensation for injuries to pedestrians hit by vehicles or injured on unsafe pathways.",
    heroTitle: "Pedestrian Accident Claims",
    heroDescription:
      "Injured as a pedestrian? Our experienced solicitors help you claim compensation for injuries caused by negligent drivers or unsafe conditions.",
    badge: "Personal Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Pedestrian Injury Claims",
        content:
          "Pedestrian accidents can result in devastating injuries due to the vulnerability of those on foot. We fight for the maximum compensation for injured pedestrians.",
        items: [
          "Injuries from vehicles at crossings",
          "Pavement and pathway accidents",
          "Injuries from reversing vehicles",
          "Child pedestrian accidents",
          "Hit and run pedestrian claims",
        ],
      },
    ],
  },
  {
    slug: "serious-injury-claims",
    title: "Serious Injury Claims",
    metaTitle: "Serious Injury Claims | Catastrophic Injury Solicitors",
    metaDescription:
      "Expert serious and catastrophic injury solicitors in London. Maximum compensation for life-changing injuries.",
    heroTitle: "Serious Injury Claims",
    heroDescription:
      "Life-changing injuries require specialist legal representation. Our serious injury team secures the maximum compensation to support your long-term recovery.",
    badge: "Serious Injury",
    parentService: "Personal Injury",
    parentHref: "/personal-injury/",
    sections: [
      {
        title: "Serious Injury Expertise",
        content:
          "Serious and catastrophic injuries transform lives in an instant. Our specialist team understands the long-term impact and fights for comprehensive compensation packages.",
        items: [
          "Head and brain injuries",
          "Spinal cord injuries and paralysis",
          "Loss of limb (amputation)",
          "Loss of sight or hearing",
          "Severe burns",
          "Multiple fractures and polytrauma",
          "Fatal accident claims",
        ],
      },
    ],
  },
  {
    slug: "fatal-accident-claims",
    title: "Fatal Accident Claims",
    metaTitle: "Fatal Accident Claims | Wrongful Death Solicitors London",
    metaDescription:
      "Compassionate fatal accident solicitors in London. We help bereaved families claim compensation after the wrongful death of a loved one.",
    heroTitle: "Fatal Accident Claims",
    heroDescription:
      "The loss of a loved one through someone else's negligence is devastating. Our compassionate solicitors help bereaved families seek justice and financial security.",
    badge: "Serious Injury",
    parentService: "Serious Injury Claims",
    parentHref: "/serious-injury-claims/",
    sections: [
      {
        title: "Fatal Accident Compensation",
        content:
          "Under the Fatal Accidents Act 1976, dependants of a person who has been killed through negligence can claim compensation. We handle these sensitive cases with the utmost care.",
        items: [
          "Bereavement damages",
          "Loss of dependency claims",
          "Funeral expenses",
          "Loss of services claims",
          "Claims on behalf of the estate",
          "Criminal injuries compensation",
        ],
      },
    ],
  },
  {
    slug: "head-and-brain-injury",
    title: "Head and Brain Injury",
    metaTitle: "Head & Brain Injury Claims | Specialist Solicitors London",
    metaDescription:
      "Expert head and brain injury solicitors in London. Specialist representation for traumatic brain injury compensation claims.",
    heroTitle: "Head and Brain Injury Claims",
    heroDescription:
      "Brain injuries require specialist legal expertise. Our team works with leading medical experts to secure comprehensive compensation for brain injury victims.",
    badge: "Serious Injury",
    parentService: "Serious Injury Claims",
    parentHref: "/serious-injury-claims/",
    sections: [
      {
        title: "Brain Injury Compensation",
        content:
          "Traumatic brain injuries can have profound and lasting effects on every aspect of a person's life. We pursue comprehensive compensation to cover all current and future needs.",
        items: [
          "Mild traumatic brain injury (concussion)",
          "Moderate and severe brain injuries",
          "Diffuse axonal injuries",
          "Brain haemorrhage and bleeding",
          "Skull fractures",
          "Long-term care and rehabilitation costs",
        ],
      },
    ],
  },
  {
    slug: "loss-of-sight-claims",
    title: "Loss of Sight Claims",
    metaTitle: "Loss of Sight Claims | Eye Injury Solicitors London",
    metaDescription:
      "Expert eye injury and loss of sight solicitors in London. Compensation for blindness and visual impairment caused by accidents.",
    heroTitle: "Loss of Sight Claims",
    heroDescription:
      "Loss of sight dramatically changes every aspect of life. Our specialist solicitors secure the maximum compensation for eye injuries and visual impairment.",
    badge: "Serious Injury",
    parentService: "Serious Injury Claims",
    parentHref: "/serious-injury-claims/",
    sections: [
      {
        title: "Eye Injury and Loss of Sight Claims",
        content:
          "Eye injuries and loss of sight can occur in workplace accidents, road traffic collisions, assaults, and medical negligence cases. We help victims secure fair compensation.",
        items: [
          "Total loss of sight in one or both eyes",
          "Partial vision loss",
          "Workplace chemical burns to eyes",
          "Eye injuries from flying debris",
          "Medical negligence causing sight loss",
          "Compensation for adaptive equipment and care",
        ],
      },
    ],
  },
  {
    slug: "spinal-injury-claims",
    title: "Spinal Injury Claims",
    metaTitle: "Spinal Injury Claims | Paralysis Solicitors London",
    metaDescription:
      "Expert spinal injury solicitors in London. Specialist compensation claims for paralysis, spinal cord damage, and back injuries.",
    heroTitle: "Spinal Injury Claims",
    heroDescription:
      "Spinal injuries can result in life-changing paralysis and disability. Our specialist team fights for the comprehensive compensation you need for your future.",
    badge: "Serious Injury",
    parentService: "Serious Injury Claims",
    parentHref: "/serious-injury-claims/",
    sections: [
      {
        title: "Spinal Cord Injury Compensation",
        content:
          "Spinal cord injuries are among the most serious and life-altering injuries a person can sustain. We work with leading medical and rehabilitation experts to build the strongest possible claim.",
        items: [
          "Complete and incomplete spinal cord injuries",
          "Tetraplegia (quadriplegia)",
          "Paraplegia",
          "Cauda equina syndrome",
          "Spinal fractures and disc injuries",
          "Lifetime care and accommodation costs",
        ],
      },
    ],
  },
];

export const housingPage: ServicePage = {
  slug: "housing-disrepair",
  title: "Housing Disrepair",
  metaTitle: "Housing Disrepair Solicitors London | Property Claims",
  metaDescription:
    "London housing disrepair solicitors. Expert legal help for property condition claims, landlord disputes, compensation. Free consultation.",
  heroTitle: "Housing Disrepair Solicitors London",
  heroDescription:
    "Living in a property that your landlord refuses to repair? Our housing disrepair solicitors help you claim compensation and force your landlord to carry out essential repairs.",
  badge: "Housing Law",
  sections: [
    {
      title: "Housing Disrepair Claims",
      content:
        "Under the Landlord and Tenant Act 1985, your landlord has a legal obligation to keep your home in a reasonable state of repair. If they fail to do so after being notified, you may be entitled to compensation.",
      items: [
        "Damp and mould",
        "Leaking roofs and pipes",
        "Broken heating and hot water systems",
        "Structural damage and cracks",
        "Pest infestations",
        "Electrical hazards",
        "Broken windows and doors",
        "Unsafe communal areas",
      ],
    },
    {
      title: "What You Can Claim",
      content:
        "If your landlord has failed to carry out repairs after being notified of the issue, you may be entitled to:",
      items: [
        "Compensation for inconvenience and distress",
        "Compensation for damage to personal belongings",
        "A court order forcing your landlord to complete repairs",
        "Rent reduction for the period of disrepair",
        "Compensation for health issues caused by the disrepair",
        "Costs of alternative accommodation if necessary",
      ],
    },
    {
      title: "Our Housing Disrepair Process",
      content:
        "We take a structured approach to housing disrepair claims to achieve the best outcome for our clients.",
      items: [
        "Free initial assessment of your claim",
        "Inspection of your property by an independent surveyor",
        "Letter before action to your landlord",
        "Negotiation for compensation and repairs",
        "Court proceedings if your landlord refuses to act",
        "Enforcement of court orders if necessary",
      ],
    },
  ],
  faqs: [
    {
      question: "How long does a housing disrepair claim take?",
      answer:
        "Most housing disrepair claims are resolved within 3-6 months, depending on the landlord's response. If court proceedings are necessary, the process may take longer. We will keep you updated at every stage.",
    },
    {
      question: "Do I need to pay for a housing disrepair claim?",
      answer:
        "We can often take housing disrepair cases on a no win, no fee basis or under Legal Aid. During your free consultation, we will discuss the best funding option for your case.",
    },
    {
      question: "Can my landlord evict me for making a claim?",
      answer:
        "Your landlord cannot evict you in retaliation for making a disrepair claim. This is known as a retaliatory eviction and is illegal under the Deregulation Act 2015. We can advise you on your rights.",
    },
  ],
};

export function getServicePage(slug: string): ServicePage | undefined {
  if (slug === "housing-disrepair") return housingPage;
  return (
    immigrationPages.find((p) => p.slug === slug) ||
    personalInjuryPages.find((p) => p.slug === slug)
  );
}
