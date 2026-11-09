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

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/pest-infestation-claim/";
const AUTHOR = team.find((t) => t.slug === "sannah-khatoon")!;

const ANSWER_BLOCK =
  "If your Council or Housing Association home has rats, mice, cockroaches, bedbugs or other persistent pests the landlord has not treated, you can usually claim compensation and a court order forcing proper treatment and repair of the entry points. Under Section 9A of the Homes (Fitness for Human Habitation) Act 2018 the property must be fit to live in throughout the tenancy, and a serious infestation is one of the HHSRS hazards (hygiene and pests) that routinely renders a home unfit. Where pests are entering through a defect the landlord is responsible for — holes in brickwork, failed drains, damaged ventilation grilles — Section 11 of the Landlord and Tenant Act 1985 also applies. In parallel, your local authority's environmental health team can serve a statutory nuisance notice under the Environmental Protection Act 1990. Most awards we see sit between £1,500 and £10,000 depending on severity and duration.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "The landlord says it's my fault — do I still have a claim?",
    answer:
      "Usually yes. Landlords routinely blame tenant hygiene for infestations that are actually caused by structural defects — holes in brickwork, failed air bricks, shared drains, communal rubbish stores. A specialist housing solicitor can instruct an independent pest-control surveyor to identify the entry points and the real cause. Where the cause is a defect in the structure, exterior or installations, Section 11 LTA 1985 makes the landlord responsible.",
  },
  {
    question: "What is Environmental Health's role?",
    answer:
      "Your local authority environmental health team can inspect under the Housing Act 2004 Housing Health and Safety Rating System (HHSRS). If they find a Category 1 or Category 2 hazard, they can serve an improvement notice on the landlord. For social landlords they have additional powers. This is a parallel remedy that often runs alongside a solicitor-led disrepair claim.",
  },
  {
    question: "How much compensation can I claim?",
    answer:
      "Awards reflect the severity of the infestation, how much of the home it affected, how long it continued, and whether it caused health effects. Most awards we see for serious infestation cases sit between £1,500 and £10,000. Special damages can be added for ruined mattresses, bedding, soft furnishings, pest-treatment costs you have paid yourself, and any temporary accommodation.",
  },
  {
    question: "Do I need to pay anything up front?",
    answer:
      "No. Most housing disrepair cases run on No Win, No Fee. You pay nothing up front and nothing if the case is unsuccessful. After-the-Event insurance covers your opponent's costs. If Legal Aid is likely available for your facts we will tell you so you can decide the right route. SRA-regulated firm #809071.",
  },
];

export default function PestInfestationPageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Pest and Vermin Housing Disrepair Claims",
        description:
          "Specialist representation for Council and Housing Association tenants dealing with rats, mice, cockroaches, bedbugs and other infestations. Compensation and enforced treatment under the Homes (Fitness) Act 2018 and Section 11 LTA 1985. SRA-regulated firm #809071.",
        slug: "pest-infestation-claim",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        contactPoints: [
          { telephone: "+442033559823", contactType: "customer service", availableLanguage: ["en-GB"] },
          { telephone: "+447476548311", contactType: "customer service", availableLanguage: ["en-GB"] },
        ],
        catalog: [
          { name: "Pest infestation compensation", description: "Rent loss and special damages for infestations the landlord has failed to treat properly." },
          { name: "Court order to repair entry points", description: "Legal action under Section 11 LTA 1985 to force the landlord to repair the structural defects allowing pests in." },
          { name: "Unfit for habitation claim", description: "Claims under Section 9A Homes (Fitness) Act 2018 where the infestation renders the home unfit." },
          { name: "Environmental Health escalation", description: "Parallel notices under the Environmental Protection Act 1990 Section 80 (statutory nuisance) via the local authority." },
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
        { name: "Pest infestation claim" },
      ])} />
      <JsonLd data={speakableSchema(["#pest-answer", ".speakable-faq-answer"])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/housing-disrepair/" className="hover:text-brand-red transition-colors">Housing disrepair</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Pest infestation claim</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Pest &amp; vermin infestation</span>
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
                Rats, mice or cockroaches in my rented home — what can I claim?
              </h1>

              <p id="pest-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
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
              <div className="hidden lg:block">
                <HousingSimpleForm sourceOverride="housing-pest-form" />
              </div>
              <div className="lg:hidden rounded-2xl bg-white shadow-xl border border-slate-100 p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Think you have a claim?
                </p>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Free 60-second check with a specialist housing solicitor — no obligation, no win no fee for most clients.
                </p>
                <DynamicCallLink className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold">
                  Call <DynamicPhoneText />
                </DynamicCallLink>
                <p className="mt-3 text-center text-[11px] text-slate-400">SRA #809071 · Mon–Fri 9am–5pm</p>
              </div>
              <HousingWhatsAppCTA scenario="pests" />
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
              { icon: Clock, t: "Photograph and video everything", b: "Droppings, nests, live or dead pests, chewed packaging or electrical cables, holes in brickwork, failed air bricks. Short dated videos walking around the affected rooms are among the strongest evidence we see." },
              { icon: FileText, t: "Keep every repair request and reply", b: "Texts, emails, letters, complaint reference numbers. If your landlord is a council or housing association, log the complaint through their formal process so there is a documented timeline of your reports and their inaction." },
              { icon: CheckCircle2, t: "Call Environmental Health in parallel", b: "Your local authority environmental health team can inspect under the HHSRS and serve a notice on the landlord if a Category 1 or 2 hazard is found. A specialist solicitor can run this in parallel with a disrepair claim, not instead of one." },
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
                  <p className="font-bold text-slate-900">Section 9A, Homes (Fitness for Human Habitation) Act 2018</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">For tenancies granted or renewed on or after 20 March 2019, the property must be fit for human habitation throughout. Hygiene and pests is one of the twenty-nine HHSRS hazard categories; a serious infestation routinely renders a property unfit under this section.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 11, Landlord and Tenant Act 1985</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Where pests are entering through a structural defect — holes in brickwork, broken air bricks, failed drains, damaged ventilation grilles — the landlord's duty to keep the structure and exterior in repair applies, and that duty includes closing the entry points pests are using.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 80, Environmental Protection Act 1990</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">The local authority environmental health team can serve an abatement notice on the landlord where a pest infestation amounts to a statutory nuisance. This runs in parallel with a civil disrepair claim rather than as an alternative.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile-only form ─── Council 2026-11-07: form moved off the
          top of the mobile hero to the earned-trust position. Desktop
          unchanged — hero still carries the form on lg+. */}
      <section className="lg:hidden py-10 bg-white">
        <div className="max-w-md mx-auto px-6">
          <HousingSimpleForm sourceOverride="housing-pest-form" />
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
            <Link href="/leaks-and-water-damage/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Leaks and water damage</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Roof leaks, burst pipes, water-damaged ceilings — compensation and repairs under Section 11.</p>
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">You've already paid the rent. Make them earn it.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">Spend 60 seconds telling us what's happening — a specialist solicitor will call you back today with a free, honest assessment.</p>
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
