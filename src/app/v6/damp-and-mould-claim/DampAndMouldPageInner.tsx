"use client";

import Link from "next/link";
import { Phone, ShieldCheck, Clock, CheckCircle2, ArrowRight, FileText, Scale, ChevronRight } from "lucide-react";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  speakableSchema,
  personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HousingSimpleForm } from "@/components/v6/housing-simple-form";
import { HousingWhatsAppCTA } from "@/components/v6/housing-whatsapp-cta";
import { team } from "@/lib/team";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/damp-and-mould-claim/";
const AUTHOR = team.find((t) => t.slug === "sannah-khatoon")!;

const ANSWER_BLOCK =
  "If your Council or Housing Association landlord has ignored damp and mould after you reported it, you can usually claim compensation and a court order forcing the repairs. Under Section 11 of the Landlord and Tenant Act 1985 the landlord must keep the structure and exterior in repair; under Section 9A of the Homes (Fitness for Human Habitation) Act 2018 the property must be fit to live in throughout the tenancy. For social-landlord tenants, Awaab's Law — enacted after the death of two-year-old Awaab Ishak in Rochdale — now sets strict investigation and remedy deadlines for damp and mould hazards. Compensation is typically calculated as a percentage of rent paid during the disrepair plus special damages for ruined belongings, increased bills, and any health effects. Most awards we see sit between £1,500 and £15,000 depending on severity and duration.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much compensation can I claim for damp and mould?",
    answer:
      "Compensation is usually calculated as a percentage of rent paid during the disrepair period: 25%–50% of rent for severe damp affecting multiple rooms, 10%–25% for moderate problems, up to 10% for limited mould patches. Add special damages for ruined clothing, furniture, soft furnishings, increased heating bills, and any medical costs. Most awards sit between £1,500 and £15,000 depending on severity and duration. Every case is fact-specific.",
  },
  {
    question: "What is Awaab's Law and does it apply to me?",
    answer:
      "Awaab's Law is the amendment to the Social Housing (Regulation) Act 2023 enacted after the death of two-year-old Awaab Ishak in Rochdale from prolonged mould exposure. It requires social landlords (councils and housing associations) to investigate damp and mould hazards within fixed time limits and complete repairs within a reasonable period. Where they do not, that failure strengthens any claim for damages. Private tenants rely on Section 11 LTA 1985 and the Homes (Fitness) Act 2018 instead.",
  },
  {
    question: "How long do I have to bring a damp and mould claim?",
    answer:
      "You have six years from the date the disrepair began under the Limitation Act 1980. If the damp has caused personal injury — for example asthma triggered or worsened by mould — the limit is three years from the date you first became aware of the injury. You can claim while you are still in the property; ongoing disrepair strengthens the case because the rent loss period keeps growing.",
  },
  {
    question: "Do I need to pay anything up front?",
    answer:
      "No. Most housing disrepair claims run on a No Win, No Fee agreement (a Conditional Fee Agreement). You pay nothing up front and nothing if the case is unsuccessful. We arrange After-the-Event insurance so your opponent's costs are covered. If you qualify for Legal Aid we will tell you so you can decide the right route. Abrahams Solicitors is SRA-regulated (firm #809071).",
  },
];

export default function DampAndMouldPageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Damp and Mould Housing Disrepair Claims",
        description:
          "Specialist representation for Council and Housing Association tenants with persistent damp and mould. Compensation and enforced repairs under Section 11 LTA 1985, Section 9A Homes (Fitness) Act 2018 and Awaab's Law. SRA-regulated firm #809071.",
        slug: "damp-and-mould-claim",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        contactPoints: [
          { telephone: "+442033559823", contactType: "customer service", availableLanguage: ["en-GB"] },
          { telephone: "+447476548311", contactType: "customer service", availableLanguage: ["en-GB"] },
        ],
        catalog: [
          { name: "Damp and mould compensation", description: "Rent loss and special damages for prolonged damp and mould that a social or private landlord has failed to remedy." },
          { name: "Court order for repairs", description: "Legal action under Section 11 LTA 1985 to force the landlord to carry out repairs on a binding timetable." },
          { name: "Awaab's Law enforcement", description: "Claims against social landlords for breach of the investigation and remedy deadlines introduced by the Social Housing (Regulation) Act 2023." },
          { name: "Mould-related personal injury", description: "Where damp or mould has triggered or worsened asthma or other illness, compensation claims for the health impact." },
        ],
      })} />
      <JsonLd data={personSchema({
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        sraNumber: AUTHOR.sraNumber,
        sraUrl: AUTHOR.sraUrl,
        bio: AUTHOR.short,
        slug: AUTHOR.slug,
      })} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Housing Disrepair", url: "https://www.abrahamssolicitors.co.uk/housing-disrepair/" },
        { name: "Damp and mould claim" },
      ])} />
      <JsonLd data={speakableSchema(["#damp-mould-answer", ".speakable-faq-answer"])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/housing-disrepair/" className="hover:text-brand-red transition-colors">Housing disrepair</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Damp and mould claim</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Damp &amp; mould claims</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">No win, no fee</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <DynamicCallLink className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-5 py-3 mb-5 shadow-lg">
                <Phone className="h-5 w-5" />
                <span className="text-left">
                  <span className="block text-[10px] font-bold text-white/80 uppercase tracking-widest">Speak to a solicitor now</span>
                  <span className="block text-xl font-black tracking-tight"><DynamicPhoneText /></span>
                </span>
              </DynamicCallLink>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.08] tracking-tight">
                Damp or mould in my rented home — what can I do?
              </h1>

              <p id="damp-mould-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
                {ANSWER_BLOCK}
              </p>

              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  {AUTHOR.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{AUTHOR.name}</Link> — {AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{AUTHOR.sraNumber} · Admitted {AUTHOR.admittedYear} ·{" "}
                    <a href={AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 min-w-0 order-2 lg:order-none" id="qualifier">
              <HousingSimpleForm sourceOverride="housing-damp-mould-form" />
              <HousingWhatsAppCTA scenario="damp-mould" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What to do right now</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">Three things to do today</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, t: "Photograph everything, with date stamps", b: "Use your phone's camera with date-stamp on. Every affected wall, every mouldy corner, every ruined item of clothing or furniture. The strongest claims we handle are evidenced in weeks of photos, not words." },
              { icon: FileText, t: "Keep the written trail", b: "Every text, email and letter you've sent the landlord — plus their replies, or the silence that followed. If your landlord is a council or housing association, log the complaint through their formal process so there is a record of the ignored report." },
              { icon: CheckCircle2, t: "Call us before the landlord's inspector arrives", b: "A pre-inspection phone call with a specialist housing solicitor is free, and it tells us whether to arrange our own independent surveyor and what to say — or not say — on the day." },
            ].map((s) => (
              <div key={s.t} className="bg-white rounded-2xl border border-slate-100 p-5">
                <s.icon className="h-5 w-5 text-brand-red mb-3" />
                <p className="text-sm font-bold text-slate-900">{s.t}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The law behind the claim</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">The statutes we rely on</h2>
          <div className="mt-6 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 11, Landlord and Tenant Act 1985</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Landlord must keep in repair the structure and exterior of the dwelling and the installations for water, gas, electricity, sanitation and heating. Damp caused by failed guttering, missing roof tiles, faulty damp-proof course or structural condensation falls squarely inside this duty.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 9A, Homes (Fitness for Human Habitation) Act 2018</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">For tenancies granted or renewed on or after 20 March 2019, the property must be fit for human habitation at the start of the tenancy and throughout. Severe damp and mould is one of the HHSRS hazards courts routinely cite in finding a property unfit under this section.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Awaab's Law — Social Housing (Regulation) Act 2023</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Enacted after the death of two-year-old Awaab Ishak in Rochdale from prolonged mould exposure. It requires social landlords to investigate damp and mould within strict time limits and complete remedy works within a reasonable period. Where they do not, that failure strengthens a damages claim.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common questions</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">FAQ</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                <summary className="cursor-pointer p-5 text-sm sm:text-base font-bold text-slate-900 hover:text-brand-red">{f.question}</summary>
                <div className="speakable-faq-answer px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Other housing disrepair claims</p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">If your problem is something else</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <Link href="/leaks-and-water-damage/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Leaks and water damage</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Roof leaks, burst pipes, water-damaged ceilings — compensation and repairs under Section 11.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
            <Link href="/pest-infestation-claim/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Pests, vermin and infestation</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Rats, mice, cockroaches, bedbugs — unfit for habitation claims and compensation.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Or go back to the <Link href="/housing-disrepair/" className="font-semibold text-brand-red hover:underline">main housing disrepair page →</Link>
          </p>
        </div>
      </section>

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">No win, no fee</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">Stop chasing your landlord. Start getting it fixed.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">Spend 60 seconds telling us what&rsquo;s wrong — a specialist solicitor will call you back today with a free, honest assessment.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
          </div>
          <p className="mt-6 text-xs text-white/40">Abrahams Solicitors · SRA #809071 · {PAGE_URL}</p>
        </div>
      </section>
    </>
  );
}
