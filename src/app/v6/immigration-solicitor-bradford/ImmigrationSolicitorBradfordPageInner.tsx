"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField, UtmFields } from "@/components/v6/gclid-field";
import { useSpamGuard } from "@/lib/spam-client";
import { pushFormSubmit } from "@/lib/tracking";
import { pushWizardEvent } from "@/lib/wizard-events";
import { submitEnquiry } from "@/lib/publishos";
import { team } from "@/lib/team";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
} from "@/components/v6/jsonld";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  Phone,
  ChevronDown,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Shield,
  PoundSterling,
  Headset,
  ArrowRight,
} from "lucide-react";

const BASE_URL = "https://www.abrahamssolicitors.co.uk";
const BRADFORD_TEL = "03333396004";
const BRADFORD_TEL_DISPLAY = "0333 339 6004";
// Named reviewer for E-E-A-T (2026 YMYL requirement): Imran Shah leads immigration.
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

// Google Business Profile for the Bradford office (cid from the live listing).
// Used for sameAs + hasMap so the page and the GBP resolve to one entity.
const GBP_URL = "https://www.google.com/maps?cid=15089368944767082385";
// BD7 1HR centroid (Ordnance Survey via postcodes.io).
const OFFICE_LAT = 53.792899;
const OFFICE_LON = -1.769853;
// GOV.UK court and tribunal finder entry for the hearing centre that lists
// Bradford immigration and asylum appeals.
const TRIBUNAL_URL = "https://www.find-court-tribunal.service.gov.uk/courts/bradford-tribunal-hearing-centre";

const GOV_FEE_NOTE = "Paid separately to the Home Office — check the current figure on GOV.UK";

// Our own fixed fees mirror /our-fees/ exactly. Home Office fees and the
// Immigration Health Surcharge change, so we point at GOV.UK rather than
// printing a figure here that can go stale.
const FIXED_FEES = [
  { service: "Spouse / partner visa application", fee: "From £900", note: GOV_FEE_NOTE },
  { service: "Visa extension (FLR(M) / FLR(FP))", fee: "From £900", note: GOV_FEE_NOTE },
  { service: "Indefinite Leave to Remain", fee: "From £750", note: GOV_FEE_NOTE },
  { service: "British citizenship (naturalisation)", fee: "From £900", note: GOV_FEE_NOTE },
  { service: "Visa refusal appeal (First-tier Tribunal)", fee: "From £1,250", note: "Free 30-minute refusal letter review first" },
  { service: "Skilled Worker switching / extension", fee: "From £900", note: GOV_FEE_NOTE },
];

// Independent review aggregates, each read from the platform that hosts it.
// We do not reproduce client quotes on this page: outcome claims in immigration
// matters are not something a prospective client can verify, and we will not
// imply a result we cannot guarantee. Visitors can read every review at source.
const REVIEW_SOURCES = [
  {
    platform: "Verified Reviews (Skeepers)",
    rating: "4.9",
    count: 97,
    note: "Collected and hosted independently. We can reply to a review — we cannot edit or delete one.",
    href: "https://www.verified-reviews.co.uk/reviews/abrahamssolicitors.co.uk",
    cta: "Read all 97 at source",
  },
  {
    platform: "Google Business Profile",
    rating: "4.7",
    count: 60,
    note: "Left on the Google listing for our Bradford office at Listerhills Science Park.",
    href: GBP_URL,
    cta: "Read the Google reviews",
  },
];

// Named, SRA-registered solicitors who run Bradford immigration files. Every
// number below is checkable on the SRA register via the link on the card.
const BRADFORD_SOLICITORS = [
  {
    name: "Imran Shah",
    role: "Immigration & Litigation Solicitor",
    sra: "509359",
    sraUrl: "https://www.sra.org.uk/consumers/register/person/?sraNumber=509359",
    admitted: "Qualified April 2012",
    blurb: "Takes the cases that need methodical, careful preparation — spouse visa refusals, ILR appeals, judicial review, and Home Office disputes that have already gone wrong once.",
  },
  {
    name: "Humaira Anjum",
    role: "Immigration & Litigation Solicitor",
    sra: "663190",
    sraUrl: "https://higher-rights.sra.org.uk/consumers/register/person/?sraNumber=663190",
    admitted: "Qualified September 2021",
    blurb: "Works on family routes — spouse and partner visas, fiancé visas, unmarried partner applications and extensions. The person most of our Bradford families deal with day to day.",
  },
];

// BD-postcode areas inside the Bradford district, then the wider patch.
const BRADFORD_AREAS = [
  "Bradford city centre", "Listerhills", "Great Horton", "Manningham", "Heaton",
  "Thornbury", "Bowling", "Little Horton", "Shipley", "Bingley", "Keighley", "Ilkley",
];
const WIDER_AREAS = ["Leeds", "Halifax", "Huddersfield", "Dewsbury", "Wakefield", "West Yorkshire"];

const FAQS = [
  {
    question: "Do you have an immigration solicitor office in Bradford?",
    answer:
      "Yes — our Bradford office is at Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR. It's open Monday to Friday, 9am–5pm. We're a short walk from Bradford Interchange. Call our Bradford line on 0333 339 6004 to arrange a face-to-face appointment, or we can handle everything remotely by phone or video if you prefer.",
  },
  {
    question: "How much does an immigration solicitor cost in Bradford?",
    answer:
      "We work on fixed fees, agreed in writing before any work starts. Most spouse visa, FLR(M), ILR and citizenship applications start from £750 to £900 plus VAT. The UKVI government fee and Immigration Health Surcharge are paid separately to the Home Office. Complex cases — previous refusal, gap in leave, dependants, judicial review — are quoted individually after a free 30-minute scoping call. Interest-free payment plans are available.",
  },
  {
    question: "Can you handle Bradford immigration cases remotely?",
    answer:
      "Almost all of our immigration work is done remotely. We use phone, video (Zoom, WhatsApp), and secure document upload. A Bradford office visit is not required for any application work. We act for clients across West Yorkshire and nationwide, plus UK nationals and partners overseas filing for entry clearance.",
  },
  {
    question: "What immigration services do you cover in Bradford?",
    answer:
      "Our Bradford solicitors handle the full range of immigration matters: spouse and partner visas, FLR(M) extensions, ILR (Indefinite Leave to Remain), British citizenship (naturalisation), Skilled Worker visas, visa refusal appeals to the First-tier Tribunal, and Judicial Review. We also handle asylum applications and human rights claims.",
  },
  {
    question: "Where will my immigration appeal be heard if I live in Bradford?",
    answer:
      "Appeals against Home Office refusals go to the First-tier Tribunal (Immigration and Asylum Chamber). For people living in Bradford and the surrounding district, the hearing is normally listed at Bradford Tribunal Hearing Centre, Phoenix House, Rushton Avenue, Thornbury, Bradford BD3 7BH — the same venue hears immigration and asylum appeals alongside benefits cases. You can confirm the venue and its contact details on the GOV.UK court and tribunal finder. Our Listerhills office is a few miles across the city, so we can prepare your bundle and witness statements with you in person and get you to the hearing without a long journey.",
  },
  {
    question: "Which solicitor will handle my case?",
    answer:
      "A named solicitor on the SRA register, not a case handler. Imran Shah (SRA number 509359, qualified April 2012) takes immigration and litigation files that need methodical preparation — spouse visa refusals, ILR appeals and judicial review. Humaira Anjum (SRA number 663190, qualified September 2021) works on family routes including spouse, partner, fiancé and unmarried partner applications. You can check either of them yourself on the Solicitors Regulation Authority register. Abrahams Solicitors is the trading style of Abrahams (Yorkshire) Ltd, SRA firm number 809071.",
  },
  {
    question: "Which areas of Bradford and West Yorkshire do you cover?",
    answer:
      "We act for clients across the Bradford district — the BD postcodes covering the city centre, Listerhills, Great Horton, Manningham, Heaton, Thornbury, Bowling, Little Horton, Shipley, Bingley, Keighley and Ilkley — plus Leeds, Halifax, Huddersfield, Dewsbury and Wakefield. Outside West Yorkshire we act for clients across England and Wales, and for British citizens and settled partners sponsoring an application from overseas.",
  },
  {
    question: "My visa was refused — how fast do I need to act in Bradford?",
    answer:
      "Appeal deadlines are strict: 14 days from the refusal letter date if you're in the UK, 28 days if overseas, and 5 working days if you are detained. Always check the deadline printed on your own decision letter — that date is the one that governs your case. A late appeal is possible but gets harder with every day that passes. If your deadline falls inside the next 7 days, call our Bradford line now: 0333 339 6004.",
  },
];

// ─── Form ──────────────────────────────────────────────────────────────

function HeroForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [matter, setMatter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const spam = useSpamGuard();

  function markStarted() {
    if (started) return;
    setStarted(true);
    pushWizardEvent("bradford_lp_form_started", { source: "immigration-solicitor-bradford" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    pushWizardEvent("bradford_lp_form_submitted", {
      source: "immigration-solicitor-bradford",
      matter: matter || "not-specified",
    });
    await submitEnquiry(
      {
        source: "immigration-solicitor-bradford",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] Immigration — Bradford",
        case: `Bradford LP consultation request. Matter: ${matter || "(not specified)"}.`,
      },
      spam.payload(),
    );
    setSubmitting(false);
    setSubmitted(true);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-colors";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 sm:p-7 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-black text-slate-900 tracking-tight">
          Thanks {firstName.split(" ")[0]}.
        </h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          A solicitor will call you back on <strong>{phone}</strong> within one working hour (Mon–Fri). Weekend submissions land Monday morning.
        </p>
        <p className="mt-3 text-xs text-slate-400">
          If urgent, call Bradford direct: <a href={`tel:${BRADFORD_TEL}`} className="text-brand-red font-semibold">{BRADFORD_TEL_DISPLAY}</a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-brand-red shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-lg font-black text-slate-900">Free 30-Min Consultation</h3>
      </div>
      <p className="text-[13px] text-slate-400 mb-4">Speak directly to a solicitor. No obligation.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <UtmFields />
        <div className="grid grid-cols-2 gap-3">
          <input
            value={firstName}
            onChange={e => { setFirstName(e.target.value); markStarted(); }}
            placeholder="First name"
            required
            className={inputClass}
          />
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last name"
            className={inputClass}
          />
        </div>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          required
          className={inputClass}
        />
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          type="tel"
          placeholder="Phone number"
          required
          className={inputClass}
        />
        <select
          value={matter}
          onChange={e => setMatter(e.target.value)}
          required
          aria-label="Immigration matter"
          className={`${inputClass} appearance-none bg-white bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center] pr-9`}
          style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")" }}
        >
          <option value="">What do you need help with?</option>
          <option value="spouse-visa">Spouse / Partner Visa</option>
          <option value="flr-extension">FLR(M) Extension</option>
          <option value="ilr">Indefinite Leave to Remain (ILR)</option>
          <option value="citizenship">British Citizenship</option>
          <option value="skilled-worker">Skilled Worker Visa</option>
          <option value="refusal-appeal">Visa Refusal / Appeal</option>
          <option value="other">Other / Not Sure</option>
        </select>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide"
        >
          {submitting ? "Sending…" : "Request Free Consultation"}
        </Button>
      </form>
      <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-100">
        <a
          href={`tel:${BRADFORD_TEL}`}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-red transition-colors font-medium"
        >
          <Phone className="h-3.5 w-3.5" />
          Bradford: {BRADFORD_TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────

export default function ImmigrationSolicitorBradfordPageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${BASE_URL}/immigration-solicitor-bradford/#service`,
    name: "Immigration Solicitors Bradford — Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors serving Bradford and West Yorkshire. Fixed fees for spouse visas, ILR, citizenship, visa appeals and Skilled Worker routes.",
    provider: { "@id": `${BASE_URL}#organization` },
    url: `${BASE_URL}/immigration-solicitor-bradford/`,
    telephone: `+44${BRADFORD_TEL.slice(1)}`,
    areaServed: [
      { "@type": "City", name: "Bradford" },
      { "@type": "City", name: "Shipley" },
      { "@type": "City", name: "Keighley" },
      { "@type": "City", name: "Bingley" },
      { "@type": "City", name: "Ilkley" },
      { "@type": "AdministrativeArea", name: "City of Bradford" },
      { "@type": "AdministrativeArea", name: "West Yorkshire" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 20, Listerhills Science Park, Campus Road",
      addressLocality: "Bradford",
      postalCode: "BD7 1HR",
      addressCountry: "GB",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: OFFICE_LAT,
      longitude: OFFICE_LON,
    },
    hasMap: GBP_URL,
    // Ties this page to the Bradford Google Business Profile so the two
    // resolve to one entity rather than two competing local signals.
    sameAs: [GBP_URL],
    // Aggregate is the independently hosted Verified Reviews (Skeepers) score
    // for abrahamssolicitors.co.uk, identified and linked in the Reviews
    // section below so a visitor can check it at source.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "97",
    },
    employee: BRADFORD_SOLICITORS.map(sol => ({
      "@type": "Person",
      name: sol.name,
      jobTitle: sol.role,
      url: sol.sraUrl,
      identifier: { "@type": "PropertyValue", name: "SRA", value: sol.sra },
      worksFor: { "@id": `${BASE_URL}#organization` },
    })),
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${BASE_URL}/` },
          { name: "Immigration Solicitors", url: `${BASE_URL}/immigration-solicitors/` },
          { name: "Immigration Solicitor Bradford" },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.question, answer: f.answer })))} />

      {/* ─── Hero ─── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-[10rem] font-black text-slate-200/80 leading-none tracking-tight select-none">BD</div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Bradford Office</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              {/* Geo pill */}
              <div className="inline-flex items-center gap-1.5 bg-brand-red/8 text-brand-red text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <MapPin className="h-3 w-3" />
                Bradford &amp; West Yorkshire
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                Immigration Solicitors{" "}
                <span className="text-brand-red">Bradford</span>{" "}
                — Fixed Fees, Direct Access.
              </h1>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-md">
                SRA-regulated immigration solicitors with a Bradford office. Spouse visas, ILR, citizenship, and visa appeals — all on fixed fees agreed upfront.
              </p>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed max-w-md">
                Reviewed by <Link href="/our-team/" className="font-semibold text-slate-700 hover:text-brand-red">{AUTHOR.name}</Link> &mdash; SRA #{AUTHOR.sraNumber}, admitted {AUTHOR.admittedYear}. <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">Verify on the SRA register</a>.
              </p>

              {/* Trust pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Shield, text: "SRA Regulated #809071" },
                  { icon: Star, text: "4.9 ★ · 97 verified reviews" },
                  { icon: PoundSterling, text: "Fixed fees from £750" },
                  { icon: MapPin, text: "Bradford office: BD7 1HR" },
                ].map(p => (
                  <span key={p.text} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                    <p.icon className="h-3.5 w-3.5 text-brand-red" />
                    {p.text}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
                  <a href="#form">Get Free Consultation</a>
                </Button>
                <a
                  href={`tel:${BRADFORD_TEL}`}
                  onClick={() => pushWizardEvent("bradford_lp_phone_tap", { source: "hero", placement: "cta-strip" })}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red bg-transparent transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {BRADFORD_TEL_DISPLAY}
                </a>
              </div>
            </div>

            <div id="form" className="relative">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── Why choose us ─── */}
      <section className="border-y border-slate-100 py-10 bg-slate-50/40">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            {[
              { icon: Headset, title: "Direct Solicitor Access", desc: "You deal with your named solicitor directly — not a call handler or paralegal relay." },
              { icon: PoundSterling, title: "Fixed Fees — No Surprises", desc: "Every matter is priced in writing before we start. No hourly rate shock. No hidden extras." },
              { icon: MapPin, title: "Bradford Office + Remote UK-Wide", desc: "Face-to-face appointments available at our Listerhills Science Park office, or we work 100% remotely." },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-lg bg-brand-red/8 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Fixed fees table ─── */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Transparent pricing</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Fixed Fees for Bradford Immigration Cases
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              Every fee is agreed in writing before we start. UKVI government fees and IHS are paid separately to the Home Office — we never bundle them in to inflate our headline figure.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 font-bold text-slate-700">Service</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-700">Our Fee</th>
                  <th className="text-left px-5 py-3.5 font-bold text-slate-700 hidden sm:table-cell">Government Fee</th>
                </tr>
              </thead>
              <tbody>
                {FIXED_FEES.map((row, i) => (
                  <tr key={row.service} className={`border-b border-slate-100 ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{row.service}</td>
                    <td className="px-5 py-3.5 font-bold text-brand-red">{row.fee}</td>
                    <td className="px-5 py-3.5 text-slate-400 hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">Fees exclude VAT &mdash; whether VAT applies depends on where you are treated as living for VAT purposes. <Link href="/our-fees/" className="text-brand-red hover:underline">See our full fee schedule and VAT position</Link>. Interest-free payment plans available on request.</p>
        </div>
      </section>

      {/* ─── Bradford office card ─── */}
      <section className="py-14 lg:py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Visit us</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Our Bradford Immigration Office
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                We&rsquo;re at Unit 20, Listerhills Science Park, Campus Road, Bradford BD7 1HR, open Monday to Friday, 9am to 5pm. The office sits just west of the city centre near the University of Bradford, within easy reach of Bradford Interchange and Bradford Forster Square by bus or a short taxi ride, with parking on site.
              </p>
              <p className="mt-3 text-base text-slate-500 leading-relaxed">
                Bring the refusal letter if you have one, your passport, any previous Home Office correspondence, and evidence of income or savings if your case has a financial requirement. And if you can&rsquo;t get to Listerhills, just say so when you call &mdash; almost all of our immigration work runs by phone, video and secure document upload, and no application route requires you to come in person.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Listerhills Science Park</p>
                    <p className="text-sm text-slate-500">Unit 20, Campus Road, Bradford BD7 1HR</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand-red shrink-0" />
                  <a href={`tel:${BRADFORD_TEL}`} className="text-sm text-slate-900 hover:text-brand-red transition-colors font-medium">
                    {BRADFORD_TEL_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-brand-red shrink-0" />
                  <p className="text-sm text-slate-500">Mon – Fri: 9:00am – 5:00pm</p>
                </div>
              </div>
              <Button
                asChild
                className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide"
              >
                <a href={`tel:${BRADFORD_TEL}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Bradford Office
                </a>
              </Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Across the Bradford district</p>
              <div className="flex flex-wrap gap-2">
                {BRADFORD_AREAS.map(area => (
                  <span key={area} className="text-[12px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">And the wider patch</p>
              <div className="flex flex-wrap gap-2">
                {WIDER_AREAS.map(area => (
                  <span key={area} className="text-[12px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Outside West Yorkshire we act for clients across England and Wales, and for British citizens and settled partners sponsoring an application from overseas.
              </p>
              <a
                href={GBP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline pt-1"
              >
                <MapPin className="h-4 w-4" />
                Find the Bradford office on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Where a Bradford appeal is heard (local-authority content) ─── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Local, in the way that counts</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Where a Bradford Immigration Appeal Is Actually Heard
              </h2>
              <div className="mt-5 space-y-4 text-base text-slate-500 leading-relaxed">
                <p>
                  If the Home Office refuses your application and you have a right of appeal, it goes to the First-tier Tribunal (Immigration and Asylum Chamber). For people in Bradford and the surrounding area, that hearing is normally listed at <strong className="text-slate-700">Bradford Tribunal Hearing Centre, Phoenix House, Rushton Avenue, Thornbury, Bradford BD3 7BH</strong> &mdash; the same venue handles immigration and asylum appeals alongside benefits cases. You can confirm the venue and its contact details on the{" "}
                  <a href={TRIBUNAL_URL} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline font-semibold">
                    GOV.UK court and tribunal finder
                  </a>.
                </p>
                <p>
                  That matters more than it sounds. An appeal is won or lost on the bundle you file and the witnesses you put in front of the judge. Our office at Listerhills Science Park is a few miles across the city from Phoenix House, so we can sit down with you in person, take a witness statement, go through the refusal letter line by line, and get you to the hearing without a stressful journey on the morning it counts. None of that is possible when your solicitor is a call centre three hundred miles away.
                </p>
                <p>
                  If your refusal letter is already in your hand, check the appeal deadline before you do anything else. Deadlines in immigration appeals are short, and the tribunal doesn&rsquo;t have to extend them.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href="/visa-refusal-appeal/" className="text-brand-red font-semibold hover:underline">Visa refusal and appeals &rarr;</Link>
                <Link href="/uk-spouse-visa/" className="text-brand-red font-semibold hover:underline">Spouse visa applications &rarr;</Link>
                <Link href="/indefinite-leave-to-remain-ilr/" className="text-brand-red font-semibold hover:underline">Indefinite Leave to Remain &rarr;</Link>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hearing centre</p>
                <p className="mt-3 text-sm font-bold text-slate-900">Bradford Tribunal Hearing Centre</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Phoenix House, Rushton Avenue, Thornbury, Bradford BD3 7BH
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-slate-400 shrink-0">Hears:</dt>
                    <dd className="text-slate-700 font-medium">Immigration and asylum, benefits</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-slate-400 shrink-0">Source:</dt>
                    <dd>
                      <a href={TRIBUNAL_URL} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline font-medium">
                        GOV.UK court finder
                      </a>
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                  Venue listings and contact details can change. Always check the current entry on GOV.UK, and work to the deadline printed on your own decision letter.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Named solicitors (E-E-A-T) ─── */}
      <section className="py-14 lg:py-20 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Who does the work</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Who Will Actually Handle Your Case
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              You deal with a named solicitor on the SRA register. Not a case handler.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {BRADFORD_SOLICITORS.map(sol => (
              <div key={sol.sra} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{sol.name}</h3>
                <p className="text-sm font-semibold text-brand-red mt-0.5">{sol.role}</p>
                <p className="text-xs text-slate-400 mt-1">{sol.admitted}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-4">{sol.blurb}</p>
                <a
                  href={sol.sraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-brand-red hover:underline"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Check SRA number {sol.sra}
                </a>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400 mt-6 leading-relaxed max-w-3xl">
            You can check either of them on the Solicitors Regulation Authority register. We&rsquo;d rather you did. Abrahams Solicitors is the trading style of Abrahams (Yorkshire) Ltd, an SRA-regulated firm, firm number 809071. <Link href="/our-team/" className="text-brand-red hover:underline font-semibold">Meet the full team</Link>.
          </p>
        </div>
      </section>

      {/* ─── Reviews — independent sources only, no quoted outcome claims ─── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Verified reviews</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              What Clients Say &mdash; Checkable at Source
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              Both scores below are hosted by the platform that collected them, not by us. Follow either link and read every review yourself. We don&rsquo;t publish client quotes about case outcomes on this page &mdash; no solicitor can promise a result, and a quote implying one wouldn&rsquo;t be fair to you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEW_SOURCES.map(src => (
              <div key={src.platform} className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{src.platform}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />)}
                  </div>
                  <span className="text-2xl font-black text-slate-900">{src.rating}</span>
                  <span className="text-sm text-slate-500">from <strong className="text-slate-700">{src.count} reviews</strong></span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mt-3">{src.note}</p>
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-brand-red hover:underline"
                >
                  {src.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link
              href="/reviews/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline"
            >
              See the full review page <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-14 lg:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Bradford FAQs</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                Common questions from Bradford and West Yorkshire clients about our immigration services.
              </p>
              <Button
                asChild
                className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide"
              >
                <Link href="/contact-us/">Ask a Question</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <h3 className="m-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors"
                    >
                      {faq.question}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  {/* GEO: answer stays in the DOM always (collapsed via CSS grid). */}
                  <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${openFaq === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-brand-navy py-14 lg:py-18">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Ready to Speak to a Bradford Immigration Solicitor?
              </h2>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                Fixed fees. Direct solicitor access. Bradford office plus video consultations UK-wide. Free 30-minute first call — no obligation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand-navy hover:bg-slate-100 rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12"
                >
                  <a href="#form">Get Free Consultation</a>
                </Button>
                <a
                  href={`tel:${BRADFORD_TEL}`}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {BRADFORD_TEL_DISPLAY}
                </a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              {[
                "Free 30-minute scoping call with a named solicitor",
                "Written fixed-fee quote before any work starts",
                "Bradford office + UK-wide remote service",
                "SRA-regulated firm #809071",
                "4.9 ★ from 97 independently hosted Verified Reviews",
              ].map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <p className="text-sm text-white/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
