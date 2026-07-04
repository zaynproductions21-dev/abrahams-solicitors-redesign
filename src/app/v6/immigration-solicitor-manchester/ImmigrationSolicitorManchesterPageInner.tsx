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
const MANCHESTER_TEL = "03333396004";
const MANCHESTER_TEL_DISPLAY = "0333 339 6004";

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
    question: "Can you handle my immigration case even though your office is in Bradford, not Manchester?",
    answer:
      "Yes — and here's the honest answer: your solicitor's office location matters far less than the quality of legal advice you receive. Immigration law is the same whether you're in Manchester, Bradford or Inverness, and we handle almost all client work remotely. We've acted for clients across Greater Manchester — Rochdale, Oldham, Bolton, Trafford, Wigan, Tameside — without a single one needing to visit Bradford for their case to progress. If you'd prefer a face-to-face meeting, Bradford is around 45 minutes away by train from Manchester Victoria. But we wouldn't expect you to make that trip.",
  },
  {
    question: "How much does an immigration solicitor cost for a Manchester client?",
    answer:
      "We charge fixed fees, confirmed in writing before any work starts. Most spouse visa, FLR(M), ILR and citizenship applications come in between £750 and £900 plus VAT. The UKVI government fee is separate — paid directly to the Home Office. Current charges are £1,938 for a spouse entry clearance, £1,048 for an FLR(M) extension, and £3,029 for ILR. We don't bundle those figures into our headline fee to make things look tidier than they are. Complex cases — previous refusals, gaps in leave, Judicial Review — are quoted individually after a free 30-minute assessment. Interest-free payment plans are available.",
  },
  {
    question: "What immigration services do you offer to Manchester and Greater Manchester residents?",
    answer:
      "We cover the full range of immigration matters for clients across Greater Manchester, including Manchester, Salford, Stockport, Oldham, Bolton, Bury, Rochdale, Trafford, Wigan and Tameside. Our services include spouse and partner visas, FLR(M) extensions, Indefinite Leave to Remain, British citizenship by naturalisation, Skilled Worker visa applications and employer sponsor licence work, visa refusal appeals to the First-tier Tribunal (IAC), Judicial Review, and asylum and human rights claims. If you're a recent graduate looking to switch to a Skilled Worker visa, we can help with that too — call us for a free assessment.",
  },
  {
    question: "My visa was refused and I'm based in Manchester — how quickly do I need to act?",
    answer:
      "The deadlines are strict: 14 days from the date on your refusal letter if you're in the UK, 28 days if you're overseas, and 5 working days if you're in immigration detention. These are absolute deadlines — a late appeal is rarely salvageable, and every day that passes without instruction narrows your options. If your deadline is within 7 days, call us now on 0333 339 6004. We handle urgent refusal cases for Manchester clients and can act the same day. Not sure whether you have grounds to appeal? We offer a free 30-minute review of any refusal letter so you can find out where you stand before committing to anything.",
  },
  {
    question: "I work irregular hours in Manchester — can I get an appointment outside office hours?",
    answer:
      "Yes — and this genuinely matters to us. A significant proportion of our Manchester clients work in the NHS, in hospitality, in transport, or in logistics — sectors where a 9-to-5 appointment simply isn't realistic. We offer early-morning calls from 7:30am, evening appointments until 7:30pm, and Saturday consultations by arrangement. Simply tell us when you're available when you enquire, and we'll work around you. Immigration decisions can be time-sensitive, and missing a consultation because of shift patterns isn't something we're comfortable with. Call 0333 339 6004 or submit the form and note your availability — we'll make it work.",
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
    pushWizardEvent("manchester_lp_form_started", { source: "immigration-solicitor-manchester" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !phone) return;
    setSubmitting(true);
    pushFormSubmit({ email, phone });
    pushWizardEvent("manchester_lp_form_submitted", {
      source: "immigration-solicitor-manchester",
      matter: matter || "not-specified",
    });
    await submitEnquiry(
      {
        source: "immigration-solicitor-manchester",
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        service: "[LP] Immigration — Manchester",
        case: `Manchester LP consultation request. Matter: ${matter || "(not specified)"}.`,
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
          If urgent, call us direct: <a href={`tel:${MANCHESTER_TEL}`} className="text-brand-red font-semibold">{MANCHESTER_TEL_DISPLAY}</a>
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
          href={`tel:${MANCHESTER_TEL}`}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-red transition-colors font-medium"
        >
          <Phone className="h-3.5 w-3.5" />
          {MANCHESTER_TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}

export default function ImmigrationSolicitorManchesterPageInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${BASE_URL}/immigration-solicitor-manchester/#service`,
    name: "Immigration Solicitors Manchester — Abrahams Solicitors",
    description:
      "SRA-regulated immigration solicitors serving Manchester and Greater Manchester. Fixed fees for spouse visas, ILR, citizenship, visa appeals and Skilled Worker routes.",
    provider: { "@id": `${BASE_URL}#organization` },
    url: `${BASE_URL}/immigration-solicitor-manchester/`,
    telephone: `+44${MANCHESTER_TEL.slice(1)}`,
    areaServed: [
      { "@type": "City", name: "Manchester" },
      { "@type": "AdministrativeArea", name: "Greater Manchester" },
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
          { name: "Manchester" },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQS.map(f => ({ question: f.question, answer: f.answer })))} />

      {/* ─── Hero ─── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-[10rem] font-black text-slate-200/80 leading-none tracking-tight select-none">M1</div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Manchester</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-red/8 text-brand-red text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <MapPin className="h-3 w-3" />
                Manchester &amp; Greater Manchester
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                Immigration Solicitors{" "}
                <span className="text-brand-red">for Greater Manchester</span>{" "}
                — Fixed Fees, Flexible Hours, 4.9★.
              </h1>
              <p className="mt-4 text-lg text-slate-500 leading-relaxed max-w-md">
                Solicitors regulated by the SRA, helping clients across Greater Manchester with spouse visas, ILR, citizenship and visa appeals. Fixed fees from £750, agreed in writing before we begin — with appointments that work around shift patterns and irregular hours.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Shield, text: "SRA Regulated #809071" },
                  { icon: Star, text: "4.9 ★ from 97 reviews" },
                  { icon: PoundSterling, text: "Fixed fees from £750" },
                  { icon: Clock, text: "Appointments from 7:30am–7:30pm" },
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
                  href={`tel:${MANCHESTER_TEL}`}
                  onClick={() => pushWizardEvent("manchester_lp_phone_tap", { source: "hero", placement: "cta-strip" })}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red bg-transparent transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {MANCHESTER_TEL_DISPLAY}
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
              { icon: Headset, title: "Direct Solicitor Access", desc: "You deal directly with your named solicitor — no call handlers, no handoffs to juniors. The same person, from your first call to the final decision." },
              { icon: PoundSterling, title: "Fixed Fees — No Surprises", desc: "Your fee is fixed and confirmed in writing before any work begins. No hourly meter ticking away in the background." },
              { icon: MapPin, title: "Remote UK-Wide + Bradford Office", desc: "We work with Manchester clients entirely over the phone and video — Zoom, WhatsApp, secure document upload. Bradford office available if you prefer in-person, ~45 mins by train." },
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
              Fixed Fees for Manchester Immigration Cases
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

      {/* ─── Manchester coverage card ─── */}
      <section className="py-14 lg:py-16 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">How we serve you</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Based in Bradford. Serving All of Greater Manchester.
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                Our nearest office is at Listerhills Science Park, Bradford BD7 1HR — about 35 miles from Manchester city centre, or roughly 45 minutes by train from Manchester Victoria to Bradford Interchange. In practice, almost all of our Manchester clients never need to make that journey. We handle everything remotely: phone consultations, Zoom or WhatsApp video, and encrypted document upload. If you'd prefer to sit down with a solicitor face to face, Bradford is easy to reach and we can usually arrange appointments at short notice.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Nearest Office — Listerhills Science Park</p>
                    <p className="text-sm text-slate-500">Unit 20, Campus Road, Bradford BD7 1HR</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-brand-red shrink-0" />
                  <a href={`tel:${MANCHESTER_TEL}`} className="text-sm text-slate-900 hover:text-brand-red transition-colors font-medium">
                    {MANCHESTER_TEL_DISPLAY}
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
                <a href={`tel:${MANCHESTER_TEL}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Areas we cover</p>
              <div className="flex flex-wrap gap-2">
                {["Manchester", "Salford", "Stockport", "Oldham", "Bolton", "Bury", "Rochdale", "Trafford", "Wigan", "Tameside"].map(area => (
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

      {/* ─── Reviews ─── */}
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

      {/* ─── FAQ ─── */}
      <section className="py-14 lg:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Manchester FAQs</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-500 leading-relaxed">
                Common questions from Manchester and Greater Manchester clients about our immigration services.
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

      {/* ─── Final CTA ─── */}
      <section className="bg-brand-navy py-14 lg:py-18">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Speak to a Solicitor Today — Evenings and Weekends Available.
              </h2>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                We know many of our Manchester clients work shifts — in healthcare, hospitality, transport, and everything in between — so calling during office hours simply isn't always possible. That's why we offer early-morning, evening, and weekend appointments on request. Book online or call 0333 339 6004. Your first 30-minute call is free, with no obligation whatsoever.
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
                  href={`tel:${MANCHESTER_TEL}`}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {MANCHESTER_TEL_DISPLAY}
                </a>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              {[
                "Free 30-minute scoping call with a named solicitor",
                "Written fixed-fee quote before any work starts",
                "Remote service across Greater Manchester + Bradford office",
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
