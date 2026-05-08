"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { PiQualifier } from "@/components/v6/pi-qualifier";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  speakableSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2,
  AlertCircle, Scale, FileCheck2, Clock, BadgeCheck, Briefcase,
  Car, Footprints, MapPin, Eye, Heart, Stethoscope,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/personal-injury/";

const ISSUE_CATALOG = [
  { name: "Accidents at work", description: "Workplace injuries including falls, machinery, lifting, and breach of employer duty under HSWA 1974.", icon: Briefcase },
  { name: "Road traffic accidents", description: "Driver, passenger, motorcyclist, cyclist and pedestrian claims under the Road Traffic Act 1988.", icon: Car },
  { name: "Slips, trips and falls", description: "Premises injuries on shop floors, public spaces and council land — Occupiers' Liability Act claims.", icon: Footprints },
  { name: "Public liability claims", description: "Injuries in public places where a business or council failed in their duty of care.", icon: MapPin },
  { name: "Serious injury", description: "Head, brain, spinal, sight-loss and life-changing injuries — long-term care and rehabilitation costs.", icon: Eye },
  { name: "Fatal accidents", description: "Claims by family members under the Fatal Accidents Act 1976 and Law Reform Act 1934.", icon: Heart },
  { name: "Medical negligence", description: "Misdiagnosis, surgical error, birth injury and other clinical negligence cases.", icon: Stethoscope },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What counts as a personal injury claim?",
    answer:
      "A personal injury claim is a civil legal action you bring against someone whose negligence caused you to suffer injury, illness, or financial loss. The most common types are accidents at work (covered by the Health and Safety at Work etc Act 1974), road traffic accidents (Road Traffic Act 1988), slips and trips on someone's premises (Occupiers' Liability Act 1957/1984), and medical negligence. To win, you need to show three things: the other party owed you a duty of care, they breached that duty, and the breach directly caused your injury. Compensation can cover pain and suffering, loss of earnings, medical costs, rehabilitation, care and ongoing support — anything reasonably caused by the accident.",
  },
  {
    question: "How much compensation can I claim for a personal injury?",
    answer:
      "Compensation in a UK personal injury claim is split into two parts. General damages cover pain, suffering and loss of amenity — these follow the Judicial College Guidelines, which range from around £1,500 for minor whiplash to over £400,000 for severe brain or spinal injury. Special damages cover financial losses you can prove with receipts: lost earnings (past and future), medical and physiotherapy bills, care costs, travel, equipment, and home adaptations. A typical road traffic case settles for £2,000 – £15,000, a workplace back injury £5,000 – £40,000, and serious life-changing injuries can exceed £150,000+. Every case is fact-specific — a solicitor will give you a realistic range after reviewing the medical evidence.",
  },
  {
    question: "How long do I have to bring a personal injury claim?",
    answer:
      "You have three years from the date of the accident, or three years from the date you first became aware of the injury, to bring a personal injury claim under Section 11 of the Limitation Act 1980. If you miss this deadline, you usually lose the right to claim — courts will only extend the period in narrow circumstances. There are exceptions. Children have until their 21st birthday (three years from age 18). If the injured person lacks mental capacity, the clock does not start until capacity is regained. Industrial disease claims (asbestos, hearing loss) run from the date of knowledge, which can be many years after exposure. If you are close to the deadline, contact us today — we move quickly.",
  },
  {
    question: "Will I have to pay anything to make a personal injury claim?",
    answer:
      "Most personal injury clients pay nothing up front and nothing if the case is lost. We run claims on a No Win, No Fee agreement (a Conditional Fee Agreement). If we win, our success fee is capped at 25% of your damages — this is the legal maximum and we do not charge more. We also arrange After-the-Event (ATE) insurance which covers the opponent's costs if your case is unsuccessful, so you are not left personally exposed. For road traffic accidents under the small claims limit (currently £5,000 in whiplash cases) the funding works differently — we will explain your options upfront. There are no hidden fees, and we do not deduct money for ATE premiums from your damages.",
  },
  {
    question: "What's the difference between settling out of court and going to trial?",
    answer:
      "Most personal injury claims — over 95% in our experience — settle without ever reaching court. The Pre-Action Protocol for Personal Injury Claims requires both sides to exchange evidence and try to negotiate before issuing proceedings. A typical case timeline is: letter of claim, defendant has 21 days to acknowledge then up to three months to investigate, medical evidence obtained, then settlement negotiations or formal Part 36 offers. If the defendant denies liability or offers too little, we can issue court proceedings — but most cases settle at that point too. A trial only happens when both sides genuinely disagree on liability or the medical evidence. We prepare every case as if it might go to trial, which is why most settle on good terms.",
  },
];

const STATUTES = [
  { name: "Section 11, Limitation Act 1980", what: "Three-year deadline to bring a personal injury claim, running from the date of injury or the date of knowledge." },
  { name: "Health and Safety at Work etc Act 1974", what: "Employers' duty to protect workers — the foundation of accident-at-work claims." },
  { name: "Road Traffic Act 1988 + RTA Protocol", what: "Compulsory motor insurance and the fast-track Pre-Action Protocol for road traffic claims under £25,000." },
  { name: "Occupiers' Liability Acts 1957 + 1984", what: "Duty of occupiers (shops, councils, landlords) to keep visitors reasonably safe — slips, trips and falls." },
];

export default function PersonalInjuryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Personal Injury Solicitors",
        description: "No Win, No Fee personal injury solicitors covering accidents at work, road traffic accidents, slips and falls, serious injury, fatal accidents and medical negligence across England and Wales. SRA-regulated firm #809071.",
        slug: "personal-injury",
        catalog: ISSUE_CATALOG.map(i => ({ name: i.name, description: i.description })),
      })} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Personal Injury" },
      ])} />
      <JsonLd data={speakableSchema([
        "#hero-lead",
        "#what-is-personal-injury",
        ".speakable-faq-answer",
      ])} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Personal Injury</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Personal Injury</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">No Win, No Fee</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Injured at work, on the road or somewhere else?
              </h1>

              <p id="hero-lead" className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                A personal injury claim recovers compensation when someone else&rsquo;s negligence has caused you harm. Under <strong className="text-slate-900">Section 11 of the Limitation Act 1980</strong> you have three years from the date of injury (or knowledge of injury) to claim. Most cases run on No Win, No Fee — you pay nothing if we lose.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
                <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red">
                  <a href="#qualifier">Free 60-second check</a>
                </Button>
                <a href="#qualifier" className="text-sm font-semibold text-brand-red hover:underline">
                  Or request a callback →
                </a>
              </div>

              {/* Author byline — firm-level (we don't have a single named PI specialist). */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by the <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">Abrahams Solicitors litigation team</Link>.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA-regulated firm #809071 ·{" "}
                    <a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=809071" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { icon: BadgeCheck, text: "No Win, No Fee" },
                  { icon: Scale, text: "Solicitor-led, no claims-farmers" },
                  { icon: Clock, text: "Callback within the hour" },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-slate-500">
                    <t.icon className="h-4 w-4 text-brand-red" />{t.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 min-w-0" id="qualifier">
              <PiQualifier />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Stat strip — compliant ranges, no fabricated success rate */}
      <section className="bg-brand-navy py-7 lg:py-9">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">3-year</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">limitation period for personal injury claims (Limitation Act 1980 s.11). Don&rsquo;t leave it too late.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">£1,500&ndash;£150,000+</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Typical compensation range, depending on injury severity and financial losses.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">No Win, No Fee</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Most clients pay nothing up front and nothing if the claim is unsuccessful.</p>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-white/40 text-center sm:text-left">
            Compensation ranges based on Judicial College Guidelines (16th edition). Figures are illustrative — every case turns on its own facts. Past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* What is personal injury */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-personal-injury" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            What is a personal injury claim?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              A personal injury claim is a civil legal action against the person, business, or public body whose negligence caused you to suffer harm. Negligence is a legal concept with three ingredients: (1) the other party owed you a <em>duty of care</em>, (2) they <em>breached</em> that duty, and (3) the breach <em>caused</em> your injury or loss.
            </p>
            <p>
              The duty of care depends on the situation. Employers owe you a duty under the <strong className="text-slate-900">Health and Safety at Work etc Act 1974</strong>. Drivers owe other road users a duty under the <strong className="text-slate-900">Road Traffic Act 1988</strong>. Shops, councils and landlords owe lawful visitors a duty under the <strong className="text-slate-900">Occupiers&rsquo; Liability Act 1957</strong>. Doctors and clinicians owe patients a duty of reasonable skill and care.
            </p>
            <p>
              If you can prove all three ingredients, the law allows you to recover <em>compensation</em> — money to put you, as far as possible, in the position you would have been in had the accident never happened. That covers pain and suffering (general damages), past and future financial losses (special damages), the cost of rehabilitation and care, and any necessary home or vehicle adaptations.
            </p>
            <p>
              Time matters. Under <strong className="text-slate-900">Section 11 of the Limitation Act 1980</strong> you have three years from the date of the accident (or the date you first realised you had been injured) to bring a claim. Miss the deadline and you usually lose the right to compensation, so call early — even before you&rsquo;ve gathered all your medical evidence.
            </p>
          </div>
        </div>
      </section>

      {/* Statutory authority block */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your legal rights</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The four statutes that protect you
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every personal injury claim is built on a clear set of legal rights. We cite the source so you can verify it yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STATUTES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{s.name}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.what}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issue catalog */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What we claim for</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Personal injury claims we routinely take on
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              These are the core categories. If your circumstances don&rsquo;t obviously fit one, call us — we&rsquo;ll talk it through with you for free.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ISSUE_CATALOG.map(c => (
              <div key={c.name} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <c.icon className="h-4 w-4 text-brand-red" />
                  <p className="text-sm font-bold text-slate-900">{c.name}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The process</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              How a personal injury claim runs
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              We follow the Pre-Action Protocol for Personal Injury Claims — the court-set process every solicitor must follow.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Free 30-min assessment", b: "We listen, ask about evidence, and tell you honestly whether you have a claim worth pursuing." },
              { n: "02", t: "Letter of claim served", b: "We serve a formal letter of claim on the defendant or insurer. They have 21 days to acknowledge, then up to three months to investigate." },
              { n: "03", t: "Medical evidence", b: "We instruct an independent medical expert to examine you and produce a report. Costs are covered by the case, not by you." },
              { n: "04", t: "Negotiation or court", b: "Most cases settle without court — typically within 6 to 18 months. If liability is denied, we issue proceedings and prepare for trial." },
            ].map(s => (
              <li key={s.n} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest">{s.n}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{s.t}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Questions we get asked</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Personal injury FAQ
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Direct answers in plain English. If yours isn&rsquo;t here, ring us — we don&rsquo;t charge to ask a question.
              </p>
              <DynamicCallLink className="mt-6 inline-flex items-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide h-10 px-4">
                <Phone className="h-4 w-4 mr-2" />
                <DynamicPhoneText />
              </DynamicCallLink>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-brand-red transition-colors"
                  >
                    {f.question}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="speakable-faq-answer px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Honest comparison: insurance-direct vs solicitor-led */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Be informed</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Should you settle direct with the insurer or use a solicitor?
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Both options exist. Here&rsquo;s an honest comparison so you can decide for yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold text-slate-900 mb-3">Settling direct with the insurer</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />Faster — no formal proceedings</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />No legal fees on your side</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />The insurer&rsquo;s job is to pay as little as possible</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />Without medical evidence you can&rsquo;t value your claim properly</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />Once you sign, the case is closed — even if injuries worsen</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border-2 border-brand-red p-6">
              <p className="text-sm font-bold text-brand-red mb-3">Solicitor-led claim (Abrahams)</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />No Win, No Fee for most clients</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Independent medical evidence — properly valued claim</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Negotiation pressure — insurer knows we can issue proceedings</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Future losses + rehabilitation factored in</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />ATE insurance protects you against opponent costs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing transparency */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Pricing — be honest with me</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                What does this actually cost me?
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                For most personal injury clients the answer is: <strong className="text-slate-900">nothing up front, and nothing if the claim is unsuccessful.</strong>
              </p>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Read the full breakdown of every fee and how the No Win, No Fee agreement works on our fees page — no jargon, no hidden costs.
              </p>
              <Button asChild className="mt-5 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                <Link href="/our-fees/">View All Fees</Link>
              </Button>
            </div>
            <ul className="space-y-3 bg-white rounded-2xl border border-slate-100 p-6">
              {[
                { t: "No upfront cost", b: "We start work without asking you for money." },
                { t: "Success fee capped at 25%", b: "If we win, our fee is taken from your damages — capped at 25%, never more." },
                { t: "Medical & disbursements", b: "Covered by the case — we pay for your medical reports as the claim progresses." },
                { t: "ATE insurance", b: "After-the-Event insurance covers the opponent&rsquo;s costs if the case is unsuccessful." },
                { t: "Whiplash claims under £5,000", b: "These are now handled via the Official Injury Claim portal — different funding rules. We&rsquo;ll explain what applies to you." },
              ].map(item => (
                <li key={item.t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.t}</p>
                    <p className="text-sm text-slate-500" dangerouslySetInnerHTML={{ __html: item.b }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TeamStrip />

      {/* Bottom CTA */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">No Win, No Fee</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Don&rsquo;t leave it too late. Three years goes fast.
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Spend 60 seconds telling us what happened — a specialist solicitor will call you back within the hour with a free, honest assessment.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-navy">
              <a href="#qualifier">Free 60-second check</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/40">
            Abrahams Solicitors · SRA #809071 · {PAGE_URL}
          </p>
        </div>
      </section>
    </>
  );
}
