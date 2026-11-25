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

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/leaks-and-water-damage/";
const AUTHOR = team.find((t) => t.slug === "sannah-khatoon")!;

const ANSWER_BLOCK =
  "If your Council or Housing Association rental has a leak, a burst pipe, or ceiling and wall damage from water the landlord has failed to fix, you can usually claim compensation and a court order forcing the repairs. Under Section 11 of the Landlord and Tenant Act 1985 the landlord must keep in repair the structure and exterior — walls, roof, drains — and the installations for water supply, sanitation and heating. Where they have been told and have not acted within a reasonable time, you can claim damages for the loss of enjoyment of the property, plus special damages for ruined belongings, replacement furniture, increased utility bills, and any temporary accommodation costs. Most awards we see for serious leak cases sit between £1,500 and £15,000 depending on how long the problem went unresolved and how much of the home it affected.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "My landlord keeps patching the leak but it comes back — can I claim?",
    answer:
      "Yes. Repeated short-term patching that fails to fix the underlying cause is still disrepair under Section 11 LTA 1985 if the landlord has been given notice and reasonable time. A specialist housing solicitor can instruct an independent surveyor to identify the root cause (failed flashing, missing tiles, worn damp-proof course, a sub-floor pipe) and value the ongoing loss.",
  },
  {
    question: "What can I claim for ruined belongings?",
    answer:
      "Special damages cover items damaged by the leak: clothing, bedding, soft furnishings, electrical items, carpets, and any temporary accommodation you have had to pay for. Keep photos of each item and receipts for anything you have replaced. The compensation reflects the replacement cost of the specific items, not a general estimate.",
  },
  {
    question: "How long do I have to bring the claim?",
    answer:
      "Six years from the date the disrepair began under the Limitation Act 1980. If the leak has caused personal injury — a slip, electric shock, or respiratory issue from secondary damp — the limit is three years from the date you became aware of the injury. You can bring the claim while still living in the property.",
  },
  {
    question: "Does Abrahams charge up front?",
    answer:
      "No. We run most housing disrepair cases on No Win, No Fee. You pay nothing up front and nothing if the case is unsuccessful. After-the-Event insurance covers your opponent's costs. We will check Legal Aid eligibility first and tell you if that route is a better fit for your facts. SRA-regulated firm #809071.",
  },
];

export default function LeaksAndWaterDamagePageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Leaks and Water Damage Housing Disrepair Claims",
        description:
          "Specialist representation for Council and Housing Association tenants dealing with persistent leaks, burst pipes and water-damaged ceilings. Compensation and enforced repairs under Section 11 LTA 1985. SRA-regulated firm #809071.",
        slug: "leaks-and-water-damage",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        contactPoints: [
          { telephone: "+442033559823", contactType: "customer service", availableLanguage: ["en-GB"] },
          { telephone: "+447476548311", contactType: "customer service", availableLanguage: ["en-GB"] },
        ],
        catalog: [
          { name: "Leak and water-damage compensation", description: "Rent loss and special damages for persistent leaks, water-damaged ceilings and failed plumbing a landlord has not remedied." },
          { name: "Court order for structural repairs", description: "Legal action under Section 11 LTA 1985 to force the landlord to carry out roof, plumbing or damp-proof repairs on a binding timetable." },
          { name: "Special damages for ruined belongings", description: "Claims for clothing, furniture, electrical items and temporary accommodation costs caused by the leak." },
          { name: "Leak-related personal injury", description: "Where a slip, shock, or respiratory issue has been caused or worsened by the water damage, compensation claims for the health impact." },
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
        { name: "Leaks and water damage" },
      ])} />
      <JsonLd data={speakableSchema(["#leaks-answer", ".speakable-faq-answer"])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/housing-disrepair/" className="hover:text-brand-red transition-colors">Housing disrepair</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Leaks and water damage</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Leaks &amp; water damage</span>
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
                A leak in my rented home — what can I claim?
              </h1>

              <p id="leaks-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
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
              <HousingSimpleForm sourceOverride="housing-leaks-form" />
              <HousingWhatsAppCTA scenario="leaks" />
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
              { icon: Clock, t: "Photograph the leak at source and the damage", b: "Take dated photos of where the water is coming in, the wet patches on walls and ceilings, and every item that has been damaged. A short phone video walking from the leak source through the affected rooms is some of the best evidence we see." },
              { icon: FileText, t: "Keep every bit of correspondence", b: "Text messages, emails, letters, repair tickets, complaint reference numbers. If your landlord is a council or housing association, log the complaint through their formal complaints process so there is a documented timeline of reports and inaction." },
              { icon: CheckCircle2, t: "Call us before you accept temporary patches", b: "Repeated patch jobs that fail delay the proper fix and can mask the real cause from a surveyor. A specialist housing solicitor can help you tell the landlord in writing what is actually required under Section 11 LTA 1985." },
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
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Landlord must keep in repair the structure and exterior — including walls, roof, drains and gutters — and the installations for water, gas, electricity, sanitation and heating. Leaks caused by failed plumbing, missing tiles, or burst pipes fall inside this duty. The duty cannot be contracted out of.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Pre-Action Protocol for Housing Conditions Claims</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">A court-set process every housing disrepair solicitor must follow before issuing proceedings. We serve a formal letter of claim listing the disrepair; the landlord has 20 working days to respond; an independent surveyor is instructed, and most cases settle through this protocol without the need for a court hearing.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 9A, Homes (Fitness for Human Habitation) Act 2018</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">For tenancies granted or renewed on or after 20 March 2019, the property must be fit for human habitation throughout. Serious leaks that produce secondary damp or render rooms unusable are frequently cited by courts as rendering a property unfit under this section.</p>
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
            <Link href="/damp-and-mould-claim/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Damp and mould</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Prolonged damp, black mould, condensation — Awaab's Law and Section 9A claims.</p>
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">Stop chasing the landlord. Start getting it fixed.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">Spend 60 seconds telling us where the water is coming in — a specialist solicitor will call you back today with a free, honest assessment.</p>
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
