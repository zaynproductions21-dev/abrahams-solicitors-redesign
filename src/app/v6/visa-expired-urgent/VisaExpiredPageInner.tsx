"use client";

import Link from "next/link";
import { Phone, ShieldCheck, Clock, CheckCircle2, ArrowRight, FileText, Scale } from "lucide-react";
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
import { team } from "@/lib/team";
import { ChevronRight } from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/visa-expired-urgent/";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

// 150-word verbatim-liftable answer. First paragraph answers the H1
// question directly for AI Overviews lift. Statute cited inline.
const ANSWER_BLOCK =
  "If your UK visa has expired you still have options. Under section 3C of the Immigration Act 1971 your leave can be automatically extended while a valid in-time application is being decided or appealed. If you missed the deadline, paragraph 39E of the Immigration Rules disregards an overstay of up to 14 days where there is a good reason beyond your control, and in some cases a longer period where the application is on compassionate grounds. In practice this means that an application made quickly, with the right evidence, is often treated more favourably than it feels. The right next step depends on how long ago the leave expired, whether a decision is pending, and your route. A specialist immigration solicitor can assess that in minutes.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "My UK visa expired yesterday — can I still apply?",
    answer:
      "Yes, in most cases. Paragraph 39E of the Immigration Rules disregards an overstay of up to 14 days where a good reason beyond your control is given with the application. Longer periods can be disregarded on compassionate grounds. The sooner the application is made with the right evidence, the stronger the position. A specialist solicitor can advise within hours on the right route.",
  },
  {
    question: "I overstayed more than 14 days — have I lost all options?",
    answer:
      "Not necessarily. Section 3C extension may still apply if there was an in-time application pending. Human rights and Article 8 ECHR routes can also be available where you have family or private life ties in the UK. Removal is not automatic. Specialist advice is strongly recommended before any contact with the Home Office.",
  },
  {
    question: "Will applying from inside the UK after overstay cause a ban?",
    answer:
      "A failed in-country application does not of itself trigger a re-entry ban. A re-entry ban can be triggered by voluntary departure after overstay, by deception, or by a removal decision — the periods vary from one to ten years. The right strategy depends on your specific facts and a specialist solicitor can map these before you act.",
  },
  {
    question: "What does Abrahams Solicitors cost for this?",
    answer:
      "The initial call is free and without obligation. Fees are discussed in writing before any work is agreed. We offer fixed-fee representation on most immigration routes and will tell you honestly if a Legal Aid provider or Citizens Advice would serve you better. Abrahams Solicitors is regulated by the SRA, firm number 809071.",
  },
];

export default function VisaExpiredPageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Visa Expired / Overstayer Legal Advice",
        description:
          "Specialist immigration solicitor representation for people whose UK visa has expired, including section 3C extensions, paragraph 39E applications, and human-rights route assessments. SRA-regulated firm #809071.",
        slug: "visa-expired-urgent",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        catalog: [
          { name: "Section 3C extension assessment", description: "Review of whether leave is automatically extended while an in-time application is being decided." },
          { name: "Paragraph 39E out-of-time application", description: "Representation for applications made within 14 days of overstay, or longer on compassionate grounds." },
          { name: "Human rights (Article 8) in-country application", description: "Family-life and private-life route assessment for applicants no longer on a current visa." },
          { name: "Voluntary departure risk assessment", description: "Advice on re-entry ban periods and alternatives before any contact with the Home Office." },
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
        { name: "Visa expired" },
      ])} />
      <JsonLd data={speakableSchema(["#visa-expired-answer", ".speakable-faq-answer"])} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/emergency-immigration-solicitor/" className="hover:text-brand-red transition-colors">Emergency immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Visa expired</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
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
                My UK visa has expired — what are my options?
              </h1>

              <p id="visa-expired-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
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
                leadSource="visa-expired-form"
                situation="visa-expired"
                heading="Speak to a solicitor today"
                subheading="Leave a mobile number — we will call back within the hour, day or night."
                submitLabel="Request an urgent callback"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to do right now */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What to do right now</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">Before you do anything else</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, t: "Do not approach the Home Office yet", b: "Voluntary departure, voluntary disclosure and surrender interviews all have consequences a solicitor should map before you act. Nothing you have done so far is irreversible." },
              { icon: FileText, t: "Gather your documents", b: "Passport, biometric residence permit, the most recent decision letter or application acknowledgement, and any evidence of ties to the UK (tenancy, bills, family). A photo of each is enough for the first call." },
              { icon: CheckCircle2, t: "Call us before anything else", b: "The call is free. We will tell you honestly whether we can represent you, whether another provider is a better fit, and what the clock looks like on your facts." },
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

      {/* Routes block */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The main routes</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">The routes we most often use</h2>
          <div className="mt-6 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Section 3C — Immigration Act 1971</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">If an in-time application is being decided, or an in-time appeal is pending, your leave is treated as automatically extended on the same conditions. We check first whether you are already on 3C before doing anything else.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Paragraph 39E — Immigration Rules</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">An out-of-time application made within 14 days of your leave expiring can be treated as if it were made in time, where a good reason beyond your control is given. Longer disregards apply on compassionate grounds. Evidence is everything on these.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Article 8 ECHR — Human Rights route</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Where there is a genuine family life or private life in the UK, an in-country human-rights application can be the right route even after overstay. Each application is assessed on its own facts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Lateral links to sibling sub-pages */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">If this isn't the right page</p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Sibling emergency immigration pages</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <Link href="/immigration-detention/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">Someone I know has been detained</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Removal centre, port, or Immigration Enforcement visit — we can act in hours.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
            <Link href="/removal-directions-urgent/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">I've got a letter saying I have to leave</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Removal directions, refusal, deadline looming — challenge or representation, same day.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Day &amp; night</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">A specialist solicitor, on the phone, within the hour.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Overstayed by a day, a week, or a year — the right conversation starts with a free call, not a decision you can't take back.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
          </div>
          <p className="mt-6 text-xs text-white/40">
            Abrahams Solicitors · SRA #809071 · {PAGE_URL}
          </p>
        </div>
      </section>
    </>
  );
}
