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
import { EmergencyUrgentForm } from "@/components/v6/emergency-urgent-form";
import { EmergencyWhatsAppCTA } from "@/components/v6/emergency-whatsapp-cta";
import { team } from "@/lib/team";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/removal-directions-urgent/";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const ANSWER_BLOCK =
  "If you have been handed a letter with a date on it — removal directions, a refusal notice with a short appeal window, or a fixed deadline to leave the UK — the clock is specific and the next step is a solicitor-led assessment of which challenge route is actually open to you. Depending on the decision there may be an administrative review (ordinarily within 14 or 28 days), an appeal to the First-tier Tribunal (Immigration and Asylum Chamber), fresh representations with new evidence, or a pre-action protocol letter followed by judicial review in the Administrative Court. Each route has its own deadline, its own evidence requirements, and its own risk if used wrongly. A specialist immigration solicitor can read the letter, map the deadlines against your facts, and tell you which route to use within the first call.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "I have been given removal directions — how long do I have?",
    answer:
      "The window is usually measured in days, not weeks, and depends on where you are and whether an in-country appeal is available. In detention cases, removal directions can be as little as 72 hours. The first step is to have the letter read by a specialist so the right remedy is used before the window closes.",
  },
  {
    question: "I had a visa refusal — do I have an appeal?",
    answer:
      "That depends on the type of decision. Human-rights and protection decisions attract an in-country appeal to the First-tier Tribunal; many points-based refusals attract an administrative review within 14 or 28 days instead. The decision letter tells you — but it is often read in a specific way, and a specialist solicitor can confirm the right route before any deadline is missed.",
  },
  {
    question: "What is a Pre-Action Protocol letter and when is it used?",
    answer:
      "A Pre-Action Protocol letter is the formal step before judicial review in the Administrative Court. It sets out the challenge, the law being relied on, and the remedy sought. It is used where no other remedy is available, or where urgent interim relief against removal is needed. Judicial review is a specialist remedy and requires representation.",
  },
  {
    question: "What does Abrahams Solicitors cost for an urgent challenge?",
    answer:
      "The initial call is free. Fees are confirmed in writing before any work begins. We will tell you honestly whether Legal Aid is likely to be available (it can be for some asylum, human-rights, and detention-related cases) and signpost accordingly. Abrahams Solicitors is regulated by the SRA, firm #809071.",
  },
];

export default function RemovalDirectionsPageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Removal Directions, Refusal and Deadline Legal Advice",
        description:
          "Specialist representation for people served with removal directions, a refusal decision, or a short deadline to leave the UK. Administrative review, First-tier Tribunal appeal, Pre-Action Protocol and judicial review assessed on each case. SRA-regulated firm #809071.",
        slug: "removal-directions-urgent",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        contactPoints: [
          { telephone: "+442033559823", contactType: "customer service", availableLanguage: ["en-GB"] },
          { telephone: "+447476548311", contactType: "customer service", availableLanguage: ["en-GB"] },
        ],
        catalog: [
          { name: "Administrative review", description: "In-time review of eligible decisions within the 14 or 28 day window stated in the decision letter." },
          { name: "First-tier Tribunal appeal", description: "In-time appeal to the Immigration and Asylum Chamber on human-rights and protection decisions." },
          { name: "Fresh representations", description: "Service of further submissions with new evidence where appeal rights are exhausted." },
          { name: "Judicial review of removal", description: "Pre-Action Protocol letter and claim in the Administrative Court where no other remedy is available." },
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
        { name: "Emergency Immigration", url: "https://www.abrahamssolicitors.co.uk/emergency-immigration-solicitor/" },
        { name: "Letter saying I have to leave" },
      ])} />
      <JsonLd data={speakableSchema(["#removal-directions-answer", ".speakable-faq-answer"])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/emergency-immigration-solicitor/" className="hover:text-brand-red transition-colors">Emergency immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Letter saying I have to leave</span>
          </nav>
        </div>
      </section>

      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 min-w-0 order-1 lg:order-none">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-red uppercase tracking-widest mb-3">
                <ShieldCheck className="h-3 w-3" />
                SRA-regulated firm #809071
              </span>
              <DynamicCallLink className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl px-5 py-3 mb-5 shadow-lg">
                <Phone className="h-5 w-5" />
                <span className="text-left">
                  <span className="block text-[10px] font-bold text-white/80 uppercase tracking-widest">Day &amp; night · tap to call</span>
                  <span className="block text-xl font-black tracking-tight"><DynamicPhoneText /></span>
                </span>
              </DynamicCallLink>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-slate-900 leading-[1.08] tracking-tight">
                I have been given a letter saying I have to leave — what are my options?
              </h1>

              <p id="removal-directions-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
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

            <div className="lg:col-span-2 min-w-0 order-2 lg:order-none">
              <EmergencyUrgentForm
                leadSource="removal-directions-form"
                situation="removal-directions"
                heading="Have the letter read by a solicitor today"
                subheading="Leave a mobile number — a specialist will call back within the hour."
                submitLabel="Request an urgent callback"
              />
              <EmergencyWhatsAppCTA situation="removal-directions" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What to do right now</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">Before the deadline runs</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, t: "Note the date and time on the letter", b: "The letter will state its own deadline. That date starts the clock on whichever remedy is open to you. Take a photo so there is a timestamp a solicitor can rely on." },
              { icon: FileText, t: "Keep the letter and the envelope", b: "The envelope's postmark can matter where service dates are in dispute. Do not throw either out." },
              { icon: CheckCircle2, t: "Call us before you reply", b: "A reply, a surrender, a voluntary departure or a signed form can all have consequences. The first conversation should be with a specialist solicitor." },
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
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The challenge routes</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">What the law offers</h2>
          <div className="mt-6 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Administrative review</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">A review of the Home Office decision within the window stated in the letter — ordinarily 14 or 28 days. Available for certain points-based refusals. Where applicable, this is usually the first remedy.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">First-tier Tribunal appeal</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">In-time appeal to the Immigration and Asylum Chamber on human-rights and protection decisions. The decision letter will tell you the window and whether the appeal lies in-country or out-of-country.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Pre-Action Protocol / judicial review</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Where no other remedy is open, or urgent interim relief against removal is needed, a Pre-Action Protocol letter precedes a claim in the Administrative Court. Specialist representation is essential.</p>
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
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">If this isn't the right page</p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Sibling emergency immigration pages</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <Link href="/visa-expired-urgent/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">My visa has run out</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Overstayed or about to overstay — section 3C, paragraph 39E, Article 8 routes.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
            <Link href="/immigration-detention/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Someone I know has been detained</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Removal centre, port, Immigration Enforcement visit — bail and Hardial Singh review.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Day &amp; night</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">The letter has a deadline. The call does not.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">A specialist solicitor can read the letter, map the clock against your facts, and tell you the right route before the window closes.</p>
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
