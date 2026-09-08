/**
 * /faqs/ — the firm's FAQ page.
 *
 * WAS: a "use client" component that fetched its FAQs from PublishOS inside a
 * useEffect. Three consequences, all invisible until you looked at the served
 * HTML rather than the rendered page:
 *
 *   1. Every answer arrived after hydration, so the server HTML contained no
 *      FAQ content at all — 2,681 visible characters and a single question
 *      heading on a page holding twelve published Q&As.
 *   2. The FAQPage JSON-LD was gated on `faqs && faqs.length > 0`, so it never
 *      rendered server-side either. The firm's FAQ page emitted no FAQ schema.
 *   3. Each answer was additionally mount-gated behind `{open && …}`, so even
 *      after hydration only the opened answer existed in the DOM.
 *
 * An AI engine or a non-executing crawler saw a FAQ page with no FAQs. This is
 * the highest-intent citable content the firm has — plain-English answers to
 * the exact questions people ask assistants — and none of it was reachable.
 *
 * NOW: a server component. FAQs are fetched on the server, every answer is in
 * the initial HTML, and the schema is built from the same data that renders.
 * The accordion is native <details>/<summary>: it collapses visually, keeps the
 * text in the DOM, needs no JavaScript, and is keyboard-accessible by default.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { JsonLd, faqPageSchema, personSchema } from "@/components/v6/jsonld";
import { getFaqs, type FaqItem } from "@/lib/publishos";
import { team } from "@/lib/team";

// Legal content is attributed to an SRA-regulated solicitor. On YMYL pages the
// named reviewer has to be someone who can actually stand behind the advice.
const REVIEWER = team.find(t => t.slug === "imran-shah")!;

// The page was a client component, so it could not export metadata and
// inherited the root layout's immigration-focused title.
export const metadata: Metadata = {
  title: "Frequently Asked Questions | Abrahams Solicitors",
  description:
    "Plain-English answers on immigration, housing disrepair, fees and funding, and what working with an SRA-regulated solicitor actually involves. Reviewed by a qualified solicitor.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/faqs/" },
};

// FAQs are edited in PublishOS, so re-fetch hourly rather than pinning them
// into the build. Fresh enough to matter, cheap enough not to hit the API per
// request.
export const revalidate = 3600;

export default async function V6FaqsPage() {
  const all = await getFaqs(revalidate);
  const faqs = all
    .filter(f => f.status === "published")
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const grouped = faqs.reduce((acc, f) => {
    const cat = f.category || "General";
    (acc[cat] ||= []).push(f);
    return acc;
  }, {} as Record<string, FaqItem[]>);

  return (
    <>
      {faqs.length > 0 && (
        <>
          <JsonLd data={faqPageSchema(faqs.map(f => ({ question: f.question, answer: f.answer })))} />
          <JsonLd
            data={personSchema({
              name: REVIEWER.name,
              jobTitle: REVIEWER.role,
              sraNumber: REVIEWER.sraNumber,
              sraUrl: REVIEWER.sraUrl,
              bio: REVIEWER.short,
              slug: REVIEWER.slug,
            })}
          />
        </>
      )}

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Help</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl leading-relaxed">
            Plain-English answers to the questions we hear most often about immigration, housing, fees, and process.
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {faqs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-10 w-10 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No FAQs published yet.</p>
              <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg">
                <Link href="/contact-us/">Ask a question</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-5">{category}</h2>
                  <div className="space-y-3">
                    {items.map(faq => (
                      <details key={faq.id} className="group border border-slate-200 rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h3 className="text-sm font-bold m-0">{faq.question}</h3>
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 group-open:rotate-180"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </summary>
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 whitespace-pre-wrap">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {faqs.length > 0 && (
            <p className="mt-10 pt-6 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              Reviewed by{" "}
              <a href={REVIEWER.sraUrl} rel="noopener" target="_blank" className="font-semibold text-slate-700 underline">
                {REVIEWER.name}
              </a>
              , {REVIEWER.role} — SRA #{REVIEWER.sraNumber}, admitted {REVIEWER.admittedYear}. These answers are general
              information about how we work, not legal advice on your circumstances.
            </p>
          )}
        </div>
      </section>

      <section className="bg-slate-50/60 border-t border-slate-100 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Still have questions?</h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Book a free consultation with one of our specialist solicitors.
          </p>
          <Button asChild size="lg" className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-8 font-bold uppercase tracking-wide">
            <Link href="/contact-us/">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
