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
const ESSEX_TEL = "03333396004";
const ESSEX_TEL_DISPLAY = "0333 339 6004";

const FIXED_FEES = [
  { service: "Spouse visa (first application)", fee: "From £900", note: "Plus UKVI fees (£1,938 + IHS)" },
  { service: "FLR(M) extension", fee: "From £900", note: "Plus UKVI fee (£1,048 + IHS)" },
  { service: "Indefinite Leave to Remain", fee: "From £750", note: "Plus UKVI fee (£3,029)" },
  { service: "British Citizenship (naturalisation)", fee: "From £900", note: "Plus UKVI fee (£1,580 + ceremony £80)" },
  { service: "Visa refusal appeal (FTT IAC)", fee: "Quoted individually", note: "Free 30-min refusal letter review" },
  { service: "Skilled Worker switching / extension", fee: "From £900", note: "Plus UKVI fee + IHS" },
];

const TESTIMONIALS = [
  {
    name: "Daniel & Sara",
    service: "Spouse visa appeal",
    text: "After a brutal refusal we were close to giving up. The solicitor walked us through the grounds line by line, rebuilt the evidence pack, and won the appeal. Honest from day one — never sold us a result they couldn't deliver.",
  },
  {
    name: "Priya",
    service: "FLR(M) extension",
    text: "Direct contact with the solicitor throughout — no call centres, no junior handlers. The £29,000 financial threshold change happened mid-way through our planning but we were guided through it perfectly. Approved in 6 weeks.",
  },
  {
    name: "Marek",
    service: "Skilled Worker → ILR",
    text: "10 years on Skilled Worker, then a sponsor licence issue that nearly derailed everything. Abrahams got the variation through inside the grace period and then the ILR a year later. Worth every penny.",
  },
];

const FAQS = [
  {
    question: "Can an Essex-based immigration solicitor handle my case remotely?",
    answer:
      "Yes — and that's how the vast majority of our Essex clients prefer it. We handle everything by phone, Zoom or WhatsApp video, and secure document upload. You don't need to travel. We have clients in Chelmsford, Colchester, Southend, Romford, Basildon and across the county who've never once visited our London office. Immigration law is document-based — it simply doesn't require in-person meetings unless you specifically want one. And if you do want face-to-face, our London City office is easy to reach from across Essex via Liverpool Street.",
  },
  {
    question: "How much does an immigration solicitor cost for Essex residents?",
    answer:
      "We charge fixed fees — agreed and written down before any work starts. Most spouse visa, FLR(M), ILR and citizenship applications come in between £750 and £900 plus VAT. The UKVI government fee is separate — currently £1,938 for a spouse entry clearance or £3,029 for ILR, paid directly to the Home Office. We don't bundle it into our headline figure to make our price look smaller than it is. If your case is more complicated — a previous refusal, a gap in leave, judicial review — we'll quote individually after a free 30-minute assessment. Interest-free payment plans are also available.",
  },
  {
    question: "My visa was refused — how quickly do I need to act if I live in Essex?",
    answer:
      "The deadlines are strict, and they're the same no matter where you live: 14 days from the date on the refusal letter if you're in the UK; 28 days if you're overseas; and 5 working days if you're in immigration detention. These aren't soft deadlines — a late appeal is exponentially harder to pursue and in some cases simply not possible at all. If your deadline is within 7 days, call us immediately on 0333 339 6004. We offer a free 30-minute review of any refusal letter and handle urgent cases for Essex clients. Every day you wait narrows your options.",
  },
  {
    question: "What immigration services do you provide to Essex clients?",
    answer:
      "We cover the full range of immigration matters for clients across Essex. That includes spouse and partner visas, FLR(M) extensions (including the new £29,000 financial threshold requirements), Indefinite Leave to Remain, British citizenship by naturalisation, Skilled Worker visas and sponsor licence applications, visa refusal appeals to the First-tier Tribunal (Immigration and Asylum Chamber), Judicial Review, and human rights and asylum claims. Not sure which route applies to your situation? A free 30-minute scoping call is the fastest way to find out.",
  },
  {
    question: "Is it worth using a solicitor for my Essex immigration case rather than doing it myself?",
    answer:
      "Honestly — for a straightforward renewal with a clean immigration history, some applicants manage perfectly well alone, and we'll tell you straight if yours is one of those cases. Where DIY applications tend to fall apart is in the detail: a missing document, an incorrectly worded statement of reasons, a photograph that doesn't meet the specification. The Home Office won't ask you to clarify — it'll simply refuse. A refusal isn't just disappointing: you typically lose the UKVI government fee, face a delay of many months, and in some cases trigger reporting obligations on your employer or sponsor. Our fixed fee for a straightforward application is almost always less than the cost of getting it wrong.",
  },
];

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
    pushWizardEvent("essex_lp_form_started", { source: "immigration-solicitor-essex" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    pushWizardEvent("essex_lp_form_submitted", {
      source: "immigration-solicitor-essex",
      matter: matter || "not-specified",
    });
    await submitEnquiry(
      {
        source: "immigration-solicitor-essex",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] Immigration — Essex",
        case: `Essex LP consultation request. Matter: ${matter || "(not specified)"}.`,
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
          If urgent, call us direct: <a href={`tel:${ESSEX_TEL}`} className="text-brand-red font-semibold">{ESSEX_TEL_DISPLAY}</a>
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
          href={`tel:${ESSEX_TEL}`}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-red transition-colors font-medium"
        >
          <Phone className="h-3.5 w-3.5" />
          Essex enquiries: {ESSEX_TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}

export default function ImmigrationSolicitorEssexPageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${BASE_URL}/immigration-solicitor-essex/#service`,
    name: "Immigration Solicitors Essex — Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors serving Essex. Fixed fees for spouse visas, ILR, citizenship, visa appeals and Skilled Worker routes. London office with remote UK-wide service.",
    provider: { "@id": `${BASE_URL}#organization` },
    url: `${BASE_URL}/immigration-solicitor-essex/`,
    telephone: `+44${ESSEX_TEL.slice(1)}`,
    areaServed: [
      { "@type": "County", name: "Essex" },
      { "@type": "City", name: "Chelmsford" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite 10, Atlas House, 1 King Street",
      addressLocality: "London",
      postalCode: "EC2V 8AU",
      addressCountry: "GB",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "97",
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${BASE_URL}/` },
          { name: "Immigration Solicitors", url: `${BASE_URL}/immigration-solicitors/` },
          { name: "Essex" },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.question, answer: f.answer })))} />

      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-[10rem] font-black text-slate-200/80 leading-none tracking-tight select-none">ES</div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Essex Coverage</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-red/8 text-brand-red text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <MapPin className="h-3 w-3" />
                Essex &amp; East of England
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                SRA-Regulated Immigration Solicitors{" "}
                <span className="text-brand-red">Serving Essex</span>{" "}
                — Fixed Fees, Direct Access.
              </h1>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-md">
                SRA-regulated solicitors — not unregulated advisors — handling spouse visas, ILR, citizenship and visa refusal appeals across all of Essex. Fixed fees agreed in writing before we start, and 4.9 stars from 97 verified client reviews.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Shield, text: "SRA Regulated #809071" },
                  { icon: Star, text: "4.9 ★ from 97 reviews" },
                  { icon: PoundSterling, text: "Fixed fees from £750" },
                  { icon: MapPin, text: "London office: EC2V 8AU" },
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
                  href={`tel:${ESSEX_TEL}`}
                  onClick={() => pushWizardEvent("essex_lp_phone_tap", { source: "hero", placement: "cta-strip" })}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red bg-transparent transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {ESSEX_TEL_DISPLAY}
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

      <section className="border-y border-slate-100 py-10 bg-slate-50/40">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            {[
              { icon: Headset, title: "Direct Solicitor Access", desc: "You speak directly with your named solicitor from day one — not a call handler, not a paralegal passing messages back and forth. Your case, your solicitor." },
              { icon: PoundSterling, title: "Fixed Fees — No Surprises", desc: "Every fee is fixed and confirmed in writing before we start. What you're quoted is what you pay — no hourly rate surprises halfway through your application." },
              { icon: MapPin, title: "London Office + Remote Essex-Wide", desc: "Our London City office is 30 minutes from Chelmsford via Liverpool Street. Most Essex clients never need to come in — we work by phone, video call, and secure document upload." },
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

      <section className="py-14 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Transparent pricing</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Fixed Fees for Essex Immigration Cases
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
          <p className="text-xs text-slate-400 mt-3">All fees plus VAT at 20%. Interest-free payment plans available on request.</p>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Serving Essex</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Our Nearest Office to Essex
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                Our nearest office to Essex is at Atlas House, 1 King Street, London EC2V 8AU — a short walk from Bank station, and easy to reach from anywhere in Essex via Liverpool Street. That said, 95% of our Essex clients never actually need to come in. We handle everything by phone, Zoom or WhatsApp video, with encrypted document upload for anything that needs signing or sharing. If you'd rather sit down face to face, we can usually arrange an appointment at our London office within 24 hours.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Suite 10, Atlas House</p>
                    <p className="text-sm text-slate-500">1 King Street, London EC2V 8AU</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand-red shrink-0" />
                  <a href={`tel:${ESSEX_TEL}`} className="text-sm text-slate-900 hover:text-brand-red transition-colors font-medium">
                    {ESSEX_TEL_DISPLAY}
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
                <a href={`tel:${ESSEX_TEL}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Our Essex Line
                </a>
              </Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Areas we cover in Essex</p>
              <div className="flex flex-wrap gap-2">
                {["Chelmsford", "Colchester", "Southend-on-Sea", "Basildon", "Brentwood", "Harlow", "Thurrock", "Epping", "Romford", "Grays"].map(area => (
                  <span key={area} className="text-[12px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                We also act for clients across England and Wales and for UK nationals and partners overseas filing for entry clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">What Our Clients Say</h2>
            <div className="mt-4 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3">
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />)}
              </div>
              <span className="text-xl font-black text-slate-900">4.9</span>
              <span className="text-sm text-slate-500">from <strong className="text-slate-700">97 verified reviews</strong></span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex gap-0.5 mb-3">
                  {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-brand-red text-brand-red" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.service}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link
              href="/reviews/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline"
            >
              Read all 97 verified reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Essex FAQs</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                Common questions from Essex clients about our immigration services.
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
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors"
                  >
                    {faq.question}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-14 lg:py-18">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Start With a Free 30-Minute Call — No Obligation.
              </h2>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                Speak directly to a solicitor about your Essex immigration case — not a sales team. You'll get an honest assessment of your options and a fixed-fee quote before any work begins. Book online or call 0333 339 6004.
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
                  href={`tel:${ESSEX_TEL}`}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {ESSEX_TEL_DISPLAY}
                </a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              {[
                "Free 30-minute scoping call with a named solicitor",
                "Written fixed-fee quote before any work starts",
                "London office + remote service across all of Essex",
                "SRA-regulated firm #809071",
                "4.9 ★ from 97 verified client reviews",
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
