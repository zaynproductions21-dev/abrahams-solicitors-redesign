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

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/immigration-detention/";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

const ANSWER_BLOCK =
  "If someone close to you has been detained by UK Immigration Enforcement, held at a port of entry or taken to an Immigration Removal Centre, specialist representation can begin the same day. Under the Hardial Singh principles the Home Office may only detain for the period reasonably necessary for a lawful purpose, and must act with reasonable expedition; where that threshold is not met, detention can be challenged. A bail application to the First-tier Tribunal (Immigration and Asylum Chamber) can also be prepared urgently. In the hours after detention the right next steps are to confirm where the person is held, secure legal visits, serve any representations the Home Office needs to see before removal directions are set, and preserve rights of appeal. A specialist immigration solicitor can act on all of this from the first call.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Someone I know has just been detained — what should I do in the next hour?",
    answer:
      "Confirm where they are held — the Home Office must tell them, and families can call the IRC directly. Note any removal time already set. Call a specialist immigration solicitor so representations can be served and, where appropriate, a bail application prepared urgently. Avoid signing anything described as 'voluntary return' before advice.",
  },
  {
    question: "How does immigration bail work?",
    answer:
      "Bail is applied for to the First-tier Tribunal (Immigration and Asylum Chamber). The tribunal considers the reason for detention, the strength of the person's immigration case, risk of absconding and public interest. A clear address, a financial condition and, where available, a surety strengthen the application. A specialist solicitor prepares the bail summary and attends the hearing.",
  },
  {
    question: "Can detention itself be challenged?",
    answer:
      "Yes — under the Hardial Singh principles, immigration detention is only lawful for the period reasonably necessary to achieve a lawful purpose, and the Home Office must act with reasonable expedition. Where detention becomes unlawful, a judicial review can be brought in the Administrative Court. Whether this route is appropriate depends on the specific facts.",
  },
  {
    question: "What does Abrahams Solicitors cost for an urgent detention case?",
    answer:
      "The initial call is free. Fees are discussed in writing before any work is agreed. We will tell you honestly whether Legal Aid is likely to be available for the case (contrary to common belief, Legal Aid remains in scope for immigration detention and challenges to it) and signpost you to a Legal Aid provider if that is the right route. Abrahams Solicitors is regulated by the SRA, firm #809071.",
  },
];

export default function DetentionPageInner() {
  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "UK Immigration Detention Solicitor",
        description:
          "Specialist representation for people held in UK Immigration Removal Centres, at ports of entry, or by Immigration Enforcement. Bail applications, Hardial Singh assessments, judicial review of detention. SRA-regulated firm #809071.",
        slug: "immigration-detention",
        author: { name: AUTHOR.name, sraUrl: AUTHOR.sraUrl },
        contactPoints: [
          { telephone: "+442033559823", contactType: "customer service", availableLanguage: ["en-GB"] },
          { telephone: "+447476548311", contactType: "customer service", availableLanguage: ["en-GB"] },
        ],
        catalog: [
          { name: "Immigration bail application", description: "Preparation and representation at First-tier Tribunal (Immigration and Asylum Chamber) bail hearings." },
          { name: "Hardial Singh assessment", description: "Review of whether continued detention is lawful under the Hardial Singh principles." },
          { name: "Judicial review of detention", description: "Challenge to unlawful detention in the Administrative Court." },
          { name: "Representations against removal", description: "Service of representations where removal directions have been set or are imminent." },
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
        { name: "Someone has been detained" },
      ])} />
      <JsonLd data={speakableSchema(["#detention-answer", ".speakable-faq-answer"])} />

      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/emergency-immigration-solicitor/" className="hover:text-brand-red transition-colors">Emergency immigration</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Someone has been detained</span>
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
                Someone has been detained by UK Immigration — what happens now?
              </h1>

              <p id="detention-answer" className="mt-4 text-base sm:text-[17px] text-slate-700 leading-relaxed max-w-[62ch]">
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
                leadSource="detention-form"
                situation="detention"
                heading="Speak to a solicitor today"
                subheading="A specialist will phone you back within the hour, day or night."
                submitLabel="Request an urgent callback"
              />
              <EmergencyWhatsAppCTA situation="detention" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What to do in the next hour</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">Before anything else</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, t: "Find out where they are held", b: "The Home Office must notify the person detained — families can call the IRC directly. Note the date and time of detention, and any removal time already set." },
              { icon: FileText, t: "Do not sign a voluntary return form", b: "'Voluntary return' can trigger a re-entry ban and foreclose other routes. Specialist advice should come first — this does not have to be decided today." },
              { icon: CheckCircle2, t: "Call us before anything else", b: "The call is free. We will tell you honestly whether we can represent you, or whether a Legal Aid provider is a better fit for the particular case." },
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
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Legal framework</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">The law we rely on</h2>
          <div className="mt-6 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Hardial Singh principles</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">The Secretary of State may only detain for the period reasonably necessary to achieve a lawful purpose, must act with reasonable expedition, and must not detain if removal cannot be effected within a reasonable period. Breach of any of these makes continued detention unlawful.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Immigration bail — Schedule 10, Immigration Act 2016</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Bail is applied for to the First-tier Tribunal (Immigration and Asylum Chamber). A clear address, a financial condition and, where available, a credible surety strengthen the application. A specialist solicitor prepares the summary and attends the hearing.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-brand-red mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Judicial review of detention</p>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">Where continued detention is unlawful on the Hardial Singh test, a claim can be brought in the Administrative Court. In urgent cases, an interim remedy including an injunction against removal can be sought.</p>
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
            <Link href="/removal-directions-urgent/" className="group flex items-start gap-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-brand-red rounded-2xl p-4 transition-colors">
              <div>
                <p className="text-base font-black text-slate-900 group-hover:text-brand-red leading-tight">I've got a letter saying I have to leave</p>
                <p className="mt-1 text-sm text-slate-600 leading-snug">Removal directions, refusal, deadline looming — challenge or representation.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">Day &amp; night</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">A specialist solicitor, on the phone, within the hour.</h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">The hours after detention are the ones where representation matters most. Do not wait.</p>
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
