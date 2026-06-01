"use client";

/**
 * Emergency immigration FAQ — client component.
 *
 * 25 plain-English Q&As organised across 6 categories. Each accordion
 * expand fires a GTM dataLayer event so we can measure which categories
 * + questions get the most engagement (which then informs whether to
 * split any of them into their own dedicated landing pages).
 *
 * Cross-links:
 *   - Hero CTA → /emergency-immigration-solicitor/ (the conversion LP)
 *   - Final CTA → phone tap-to-dial
 *
 * Schema markup: FAQPage (all 25 Qs), Breadcrumb, Person (Imran Shah),
 * Speakable. The big FAQPage payload is the SEO play — AI Overviews
 * and Perplexity cite long-tail FAQ schema regularly when the answers
 * are factual and well-structured.
 */

import Link from "next/link";
import { useState } from "react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { JsonLd, faqPageSchema, breadcrumbSchema, speakableSchema, personSchema } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { pushWizardEvent } from "@/lib/wizard-events";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, Calendar, Building2, Home,
  Plane, FileWarning, Gavel, BookOpen, ArrowRight,
} from "lucide-react";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/emergency-immigration-faq/";
const LAST_REVIEWED = "June 2026";
const AUTHOR = team.find((t) => t.slug === "imran-shah")!;

type FaqItem = { q: string; a: string };
type FaqCategory = {
  id: string;
  icon: typeof Building2;
  title: string;
  blurb: string;
  items: FaqItem[];
};

const CATEGORIES: FaqCategory[] = [
  {
    id: "detention",
    icon: Building2,
    title: "Detention at a removal centre",
    blurb:
      "Rights from the moment of detention, the IS91R form, the Detained Duty Advice Scheme, bail applications, and visits.",
    items: [
      {
        q: "How long can immigration detention last in the UK?",
        a: "There is no fixed statutory time limit on immigration detention in the UK. In practice, detention should be for the shortest period necessary to effect removal and must be regularly reviewed by the Home Office (the Hardial Singh principles, derived from R v Governor of Durham Prison ex parte Hardial Singh [1984]). Detention becomes unlawful where there is no realistic prospect of removal within a reasonable period. Many people are detained for weeks or months; a smaller number for longer. After 8 days, the detained person has a legal right to apply to the First-tier Tribunal for immigration bail.",
      },
      {
        q: "What is the IS91R form and why does it matter?",
        a: "The IS91R is the formal Home Office document that records the reasons for detention. Every detained person must be given it. It sets out the legal basis for detention, the factors the caseworker considered, and the next review date. If your relative has been taken to a removal centre and they haven't been given an IS91R, ask the welfare officer for it on their behalf — that's the document a solicitor will need to challenge detention or apply for bail.",
      },
      {
        q: "What is the Detained Duty Advice Scheme (DDAS) and is it enough?",
        a: "The Detained Duty Advice Scheme provides a free 30-minute session with a duty solicitor inside every UK immigration removal centre. It is a useful triage — it confirms the basis for detention, explains the immediate options, and identifies whether the case looks bail-eligible. A single 30-minute session is not full representation; for ongoing case work (bail applications, challenges to the lawfulness of detention, refusal appeals, judicial review) a solicitor needs to be retained on the case. Ask the welfare officer at the centre to arrange the DDAS slot.",
      },
      {
        q: "What's the difference between Tribunal bail and Home Office bail?",
        a: "Tribunal bail (under Schedule 10 of the Immigration Act 2016) is an application to the First-tier Tribunal Immigration and Asylum Chamber for release on conditions. Home Office bail is granted by the Home Office itself, using form BAIL401, and is generally easier to obtain but with more restrictive conditions. After 8 days in detention, anyone can apply for Tribunal bail; we generally recommend the Tribunal route because an independent judge reviews the case rather than the Home Office reviewing its own decision.",
      },
      {
        q: "Which UK immigration removal centres are currently operational?",
        a: "The main UK immigration removal centres in 2026 are Yarl's Wood (Bedfordshire), Brook House and Tinsley House (Gatwick), Harmondsworth (Heathrow), Colnbrook (Heathrow), and Dungavel (Scotland). Morton Hall in Lincolnshire was closed as an immigration removal centre in 2021. Short-term holding facilities also exist at major ports and airports. The centre someone is detained at affects which Tribunal hearing centre will hear bail applications, and which solicitors have local visiting access.",
      },
      {
        q: "Can I visit someone in an immigration removal centre?",
        a: "Yes. Each centre has visiting hours (typically 2-9pm with variation by site) and requires booking in advance — usually 24-48 hours' notice. Visitors need photographic ID and a confirmation reference. Solicitors do not need to book and have wider access for legal-visit purposes. If you can, take the IS91R form details and any documents the detained person has been served with to the visit.",
      },
    ],
  },
  {
    id: "dawn-raids",
    icon: Home,
    title: "Dawn raids & Immigration Enforcement",
    blurb:
      "Warrants, your rights at the door, the right to silence, and what to do during an enforcement visit.",
    items: [
      {
        q: "Do Immigration Enforcement officers need a warrant to enter my home?",
        a: "For residential premises, yes — officers normally need a warrant (issued under Schedule 2 of the Immigration Act 1971 or paragraph 25A) to force entry. You are not legally obliged to open the door without a warrant. You can ask through the door whether they have one; if they do, they must show it to you before entry. Stay calm and don't obstruct — your conduct at the door is later considered by the Tribunal. Don't sign anything before getting legal advice.",
      },
      {
        q: "What rights do I have during a dawn raid?",
        a: "You have the right to remain silent. You don't have to answer questions about your immigration status, employment, or anyone else's status. You have the right to a solicitor — and if you are taken to a removal centre, you have the right to a 5-minute phone call on arrival, which you should use to contact a solicitor or family member. Don't sign documents at the address or at the removal centre without legal advice first.",
      },
      {
        q: "Should I refuse to open the door to Immigration Enforcement?",
        a: "If officers have a valid warrant, refusing to open the door will not stop them entering and may make the situation worse. If they don't have a warrant, you can decline to let them in. Either way, stay calm and be polite — antagonism damages your case later. The most useful single thing you can do is call a solicitor on the spot; if your phone is being watched, ask another adult in the property to call from a different phone or step away to call.",
      },
      {
        q: "Can my employer be fined if I'm working without permission?",
        a: "Yes. Civil penalties of up to £60,000 per worker can be issued to employers who employ workers without the right to work in the UK, under section 15 of the Immigration, Asylum and Nationality Act 2006. If an Immigration Enforcement visit identifies undocumented workers, both the worker and the employer face consequences. Employers should obtain right-to-work checks (under the Code of Practice on preventing illegal working) for every employee.",
      },
    ],
  },
  {
    id: "removal-injunctions",
    icon: Plane,
    title: "Removal directions & emergency injunctions",
    blurb:
      "What removal directions are, how much notice the Home Office gives, the routes to stop a removal, and what an injunction can do.",
    items: [
      {
        q: "What are removal directions and how much notice does the Home Office give?",
        a: "Removal directions (RDs) are the formal notice specifying the flight, date and time for removal from the UK. The Home Office can serve removal directions with as little as 72 hours' notice in standard cases; charter flight removals (group removals to specific countries) can be served with even less. The 72-hour minimum was set out in case-law and is intended to allow time to take legal advice — but it's a minimum, not a guarantee.",
      },
      {
        q: "How does an emergency injunction stop a removal?",
        a: "An emergency injunction is a court order from the Upper Tribunal or High Court Administrative Court that suspends removal while a legal challenge is heard. The threshold the court applies is whether there is a serious question to be tried — lower than winning the case today, and enough to buy time. Out-of-hours, applications go through the duty-judge system by email; we have obtained injunctions within four hours of a scheduled flight where the grounds were strong.",
      },
      {
        q: "What is a Rule 39 application to Strasbourg?",
        a: "Rule 39 is the procedure for requesting an interim measure from the European Court of Human Rights in Strasbourg. It is a last-resort remedy used only after UK domestic routes are exhausted, and only where someone faces a real risk of treatment contrary to Article 2 (right to life) or Article 3 (prohibition of torture and inhuman or degrading treatment) in the destination country. The court grants Rule 39 measures sparingly; when granted, they bind the UK to suspend removal pending the substantive complaint.",
      },
      {
        q: "What grounds can stop a removal at the last minute?",
        a: "The main grounds are: a real risk of treatment in breach of ECHR Articles 2 or 3 in the destination country; family or private life under Article 8 (e.g. separation from a partner or children with British status); an outstanding judicial review where the underlying decision is being challenged; fresh evidence that wasn't before the original decision-maker and that materially changes the picture; or — under Section 78 of the Nationality, Immigration and Asylum Act 2002 — an in-country appeal right that automatically suspends removal until the appeal is decided.",
      },
      {
        q: "What is Section 78 of the Nationality, Immigration and Asylum Act 2002?",
        a: "Section 78 NIAA 2002 automatically prohibits the removal of a person from the UK while their in-country immigration appeal is pending. If your solicitor identifies that an appeal right is live, the removal can be stopped without a court order at all — the statutory bar applies, and the Home Office must withdraw the removal directions. This is one reason we recommend taking legal advice immediately on receiving a refusal letter, before any removal date is set.",
      },
    ],
  },
  {
    id: "overstayers",
    icon: FileWarning,
    title: "Expired visas & overstayers",
    blurb:
      "Paragraph 39E, re-entry bans, voluntary returns, and the narrow window where in-country applications are still possible.",
    items: [
      {
        q: "What is Paragraph 39E of the Immigration Rules?",
        a: "Paragraph 39E permits the Home Office to disregard short overstays — typically up to 14 days — where there is a good reason. The recognised grounds include an in-time application that was refused without a right of appeal (with the new application made within 14 days of the refusal), or exceptional circumstances such as serious illness, the death of a close family member, or a documented Royal Mail / Home Office service failure. The 14-day window is narrow and the grounds are limited; once you fall outside it, the strategy changes substantially.",
      },
      {
        q: "What happens if I overstay my UK visa?",
        a: "Long-term overstays carry serious consequences: an in-country switch becomes much harder, a re-entry ban of up to 10 years can apply if you are removed, and a refused in-country application made as an overstayer can trigger enforcement action. Some routes (Article 8 family life, 20-year Long Residence) can survive overstaying; most don't. The right answer depends entirely on the facts — duration of overstay, immigration history, family ties, whether the Home Office is aware — and the right time to take advice is the moment you realise the visa has expired.",
      },
      {
        q: "What is a re-entry ban and how long does it last?",
        a: "Re-entry bans under Part 9 of the Immigration Rules apply to people removed from the UK or refused entry after overstay or breach of conditions. The ban can be 1 year (if you left voluntarily), 2-5 years (if removed at public expense), or 10 years (in cases involving deception or false documents). A 'voluntary return' before any enforcement action substantially reduces re-entry ban risk — which is why even an overstayer with a difficult case has options worth taking advice on.",
      },
      {
        q: "Can I apply for a new visa after my old one has expired?",
        a: "Yes — but the strategy depends on your status. Within 14 days of expiry (or within 14 days of an in-time refusal), Paragraph 39E may save the application. After that, most in-country applications will fail and may trigger enforcement. The cleaner route is often a voluntary return + out-of-country application; some routes (family life with British children, 20-year long residence) may still be available in-country with the right evidence. Get legal advice before making any further application.",
      },
    ],
  },
  {
    id: "refusals-appeals",
    icon: Gavel,
    title: "Refusals, appeals & judicial review",
    blurb:
      "Appeal deadlines, fresh claims under Paragraph 353, judicial review timelines, and the Pre-Action Protocol.",
    items: [
      {
        q: "How long do I have to appeal a UK immigration refusal?",
        a: "14 days from the date on the refusal letter if you are in the UK, 28 days if you are overseas, and 5 working days if you are detained. The deadline runs from the date on the letter, not the date you received it. The Tribunal has limited tolerance for missed deadlines; out-of-time appeals are possible with an exceptional reason (medical emergency, bereavement, service failure) but each day past the deadline weakens the application.",
      },
      {
        q: "What is a fresh claim under Paragraph 353?",
        a: "Paragraph 353 of the Immigration Rules covers further submissions made after a final refusal. To be treated as a fresh claim — which generates a new right of appeal — the submissions must be significantly different from the material that has previously been considered, and must have a realistic prospect of success before a Tribunal. Para 353 is the route we typically use after an out-of-time appeal extension is refused, or after appeal rights have been exhausted, where new evidence has come to light.",
      },
      {
        q: "What is judicial review in an immigration case?",
        a: "Judicial review is a legal challenge to the Home Office's decision-making process rather than the merits of the decision. It applies where the Home Office acted unlawfully, irrationally, or unfairly — for example, failed to consider relevant evidence, applied the wrong legal test, or breached procedural fairness. JR is filed in the Upper Tribunal Immigration and Asylum Chamber (or the High Court Administrative Court for some categories). The deadline is 3 months from the decision (sometimes shorter). It's often used after appeal rights are exhausted, or where there is no statutory right of appeal in the first place.",
      },
      {
        q: "What is a Pre-Action Protocol letter?",
        a: "A Pre-Action Protocol (PAP) letter is the formal pre-litigation letter sent to the Home Office before issuing judicial review proceedings. It sets out the proposed claim, the grounds, and the relief sought, and gives the Home Office a chance to reconsider. Many cases are resolved at the PAP stage — the Home Office withdraws the original decision and reconsiders — without ever reaching court. We use PAP letters routinely for urgent removal challenges where there's time to use them.",
      },
      {
        q: "Can I appeal a deportation order if I have family in the UK?",
        a: "Yes. Family life with a British or settled spouse, partner or children is a recognised ground of appeal against a deportation order under Article 8 of the European Convention on Human Rights. The strength of the appeal depends on the nature and length of the family relationships, the age and dependency of any children, and the public interest factors set out in section 117C of the Nationality, Immigration and Asylum Act 2002. Cases involving criminal convictions are decided individually and the threshold is higher.",
      },
    ],
  },
  {
    id: "process-cost",
    icon: BookOpen,
    title: "Process, cost & out-of-hours",
    blurb:
      "What to expect on the first call, fees, legal aid eligibility, and how the 24/7 line works in practice.",
    items: [
      {
        q: "What happens when I call the emergency line?",
        a: "Mon–Fri 9am–6pm calls are answered live by a qualified team member who takes instructions immediately. Out of hours (evenings, weekends, bank holidays including Christmas Day), the line takes your number through a short recorded message and triggers the on-call solicitor — we aim to call you back within 30 minutes, or by 9am the next working day at the latest. The on-call rota is structured so the person who calls back is qualified to act on the case, not just to take a message.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "If you can: the detained person's full name and date of birth, the name and address of the removal centre (if applicable), the date and time of any removal directions, the date on the most recent Home Office letter, the immigration status (visa type, expiry date), and any reference number from previous applications. If you don't have all of this, call anyway — the first 0-30 minutes of the call is us taking instructions and working out the situation. Don't delay the call for the sake of paperwork.",
      },
      {
        q: "How much does an emergency immigration solicitor cost?",
        a: "The first call is free. For emergency injunction applications, bail applications, and urgent appeals, we work on fixed fees agreed in writing before any work starts — so you know the cost before we begin. Interest-free payment plans are available. Legal aid covers many detention-lawfulness and asylum cases (means and merits tested), and we assess eligibility on the first call and apply for legal aid alongside the urgent work if you qualify. We don't refuse urgent work because of cost.",
      },
      {
        q: "Can I get legal aid for an immigration emergency?",
        a: "Legal aid is available for: asylum cases (Schedule 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012); challenges to the lawfulness of immigration detention; some judicial reviews against the Home Office; and certain trafficking cases. It is not generally available for the underlying spouse visa, work visa, or non-protection refusal appeal. Both means and merits are assessed. We can lodge the legal aid application alongside the urgent work; we don't wait for the application to be granted before starting.",
      },
      {
        q: "Is the 24-hour line answered by a solicitor or a call handler?",
        a: "In office hours (Mon–Fri 9am–6pm) calls are answered live by a qualified team member who can take instructions. Out of hours, the line routes you to a recorded line that captures your details and triggers the on-call solicitor. We aim to call back within 30 minutes; if all duty solicitors are already on emergency calls, we will call by 9am the next working day at the latest. The on-call rota is staffed by immigration-qualified solicitors, not generalist duty cover.",
      },
      {
        q: "Do I need a solicitor specifically, or is general immigration advice enough?",
        a: "For non-emergency immigration applications, general advice services do good work. Emergency cases are different. Filing in the Upper Tribunal or High Court, representing on judicial review, or running a same-day removal challenge are reserved activities — only an SRA-regulated solicitor (or an authorised barrister via a solicitor) can do them. If removal is scheduled in days, someone is in detention, or a court order is needed, you need a solicitor with out-of-hours capacity.",
      },
    ],
  },
];

function CategoryAccordion({ cat, openId, setOpenId }: { cat: FaqCategory; openId: string | null; setOpenId: (id: string | null) => void }) {
  const CatIcon = cat.icon;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
            <CatIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{cat.title}</h2>
            <p className="mt-1 text-sm text-slate-500 leading-snug">{cat.blurb}</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {cat.items.map((it, idx) => {
          const id = `${cat.id}-${idx}`;
          const isOpen = openId === id;
          return (
            <div key={id}>
              <button
                type="button"
                onClick={() => {
                  if (!isOpen) {
                    pushWizardEvent("emergency_faq_expanded", {
                      category: cat.id,
                      question_id: id,
                      question: it.q,
                    });
                  }
                  setOpenId(isOpen ? null : id);
                }}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50/60"
                aria-expanded={isOpen}
                aria-controls={`faq-${id}`}
              >
                <span className="text-sm sm:text-base font-bold text-slate-900">{it.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div id={`faq-${id}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed speakable-faq-answer">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EmergencyFaqPageInner() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Flatten every question into the FAQPage schema payload so AI Overviews,
  // Perplexity and ChatGPT can cite us as the source on long-tail queries.
  const flatFaqs = CATEGORIES.flatMap((c) => c.items.map((it) => ({ question: it.q, answer: it.a })));

  return (
    <>
      {/* ─── Schema ─── */}
      <JsonLd data={faqPageSchema(flatFaqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration/" },
          {
            name: "Emergency Immigration Solicitor",
            url: "https://www.abrahamssolicitors.co.uk/emergency-immigration-solicitor/",
          },
          { name: "Emergency Immigration FAQ" },
        ])}
      />
      <JsonLd
        data={personSchema({
          name: AUTHOR.name,
          jobTitle: AUTHOR.role,
          sraNumber: AUTHOR.sraNumber,
          sraUrl: AUTHOR.sraUrl,
          bio: AUTHOR.short,
          slug: AUTHOR.slug,
        })}
      />
      <JsonLd data={speakableSchema(["#hero-lead", ".speakable-faq-answer"])} />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400 overflow-hidden">
            <Link href="/" className="hover:text-brand-red transition-colors shrink-0">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/immigration/" className="hover:text-brand-red transition-colors shrink-0">Immigration</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/emergency-immigration-solicitor/" className="hover:text-brand-red transition-colors truncate">
              Emergency Immigration Solicitor
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-slate-600 font-medium truncate">FAQ</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
              Emergency Immigration FAQ
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" /> SRA #809071
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            UK immigration emergency &mdash; the plain-English answers
          </h1>
          <p id="hero-lead" className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Detention. Removal directions. Dawn raids. Expired visas. Refused visas. Below: 25
            plain-English answers to the questions we hear most often from people in an
            immigration crisis. Reviewed by {AUTHOR.name} &mdash; SRA #{AUTHOR.sraNumber}, admitted{" "}
            {AUTHOR.admittedYear} &mdash; against the current Immigration Rules.
          </p>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-3xl">
            <strong className="text-slate-700">If your case is urgent right now</strong> &mdash;
            someone in detention, removal directions served, officers at the door &mdash; don&rsquo;t
            read the FAQ first. Call us. Our emergency LP is at{" "}
            <Link href="/emergency-immigration-solicitor/" className="text-brand-red font-semibold hover:underline">
              /emergency-immigration-solicitor/
            </Link>
            .
          </p>

          {/* Primary CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <DynamicCallLink
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-base font-bold uppercase tracking-wide px-6 h-12"
              onClick={() => pushWizardEvent("emergency_phone_tap", { source: "emergency-immigration-faq", placement: "hero" })}
            >
              <Phone className="h-4 w-4" />
              Call now &mdash; <DynamicPhoneText />
            </DynamicCallLink>
            <Link
              href="/emergency-immigration-solicitor/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline underline-offset-2"
            >
              Open the emergency landing page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── Category jump-nav ─── */}
      <section className="py-6 lg:py-8 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Jump to a category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const CatIcon = c.icon;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <CatIcon className="h-3.5 w-3.5" />
                  {c.title}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ accordions, one per category ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 space-y-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <CategoryAccordion cat={cat} openId={openId} setOpenId={setOpenId} />
            </div>
          ))}
        </div>
      </section>

      <TeamStrip />

      {/* ─── Final CTA ─── */}
      <section className="py-12 lg:py-16 bg-brand-navy">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">If your case is urgent</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Read the FAQ later. Pick up the phone now.
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed">
            Detention, removal directions, dawn raids and missed appeal deadlines all need legal
            action within hours, not days.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <DynamicCallLink
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-base font-bold uppercase tracking-wide h-14 px-7"
              onClick={() => pushWizardEvent("emergency_phone_tap", { source: "emergency-immigration-faq", placement: "final-cta" })}
            >
              <Phone className="h-5 w-5" />
              Tap to call &mdash; <DynamicPhoneText />
            </DynamicCallLink>
            <Link
              href="/emergency-immigration-solicitor/"
              className="inline-flex items-center justify-center rounded-lg text-sm font-bold uppercase tracking-wide h-14 px-6 bg-white text-brand-navy hover:bg-slate-100"
            >
              Emergency landing page
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/60 leading-relaxed flex items-center justify-center gap-1.5">
            <Calendar className="h-3 w-3" /> Last reviewed: {LAST_REVIEWED} by {AUTHOR.name} (SRA #
            {AUTHOR.sraNumber}). Page URL: {PAGE_URL}.
          </p>
        </div>
      </section>
    </>
  );
}
