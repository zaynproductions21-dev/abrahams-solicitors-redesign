/**
 * Server-rendered FAQ accordion.
 *
 * Extracted from /faqs/, which had to be rebuilt after shipping a FAQ page that
 * served zero FAQs to crawlers, and from /emergency-immigration-faq/, which had
 * the same defect: answers rendered only on click (`{isOpen && …}`), so the
 * served HTML carried the questions and none of the answers — while the
 * FAQPage schema promised every Q&A to the AI engines it was written for.
 *
 * Native <details>/<summary> avoids that class of bug entirely. It collapses
 * visually, keeps every answer in the initial HTML, needs no JavaScript, is
 * keyboard-accessible by default, and works in a server component, so the host
 * page keeps its `export const metadata`.
 *
 * Pair it with faqPageSchema() built from the SAME array you pass here, so the
 * markup and the visible text can never drift apart.
 */
import { JsonLd, faqPageSchema } from "@/components/v6/jsonld";

export type FaqEntry = { question: string; answer: React.ReactNode; plain: string };

// Static, so it is built once at module level rather than per row per render.
const CHEVRON = (
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
);

/**
 * `answer` is what renders (so it can carry links); `plain` is the text that
 * goes into the schema. Keeping them as separate fields is deliberate: the
 * schema must not contain markup, and a reader should not get a worse answer
 * than a crawler does. Keep them saying the same thing.
 */
export function FaqDetails({
  faqs,
  heading,
  intro,
  emitSchema = true,
}: {
  faqs: FaqEntry[];
  heading: string;
  intro?: string;
  emitSchema?: boolean;
}) {
  return (
    <section className="py-12 lg:py-16 bg-white border-t border-slate-100">
      {emitSchema ? (
        <JsonLd data={faqPageSchema(faqs.map(f => ({ question: f.question, answer: f.plain })))} />
      ) : null}
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{heading}</h2>
        {intro ? <p className="mt-3 text-sm text-slate-600 leading-relaxed">{intro}</p> : null}
        <div className="mt-8 space-y-3">
          {faqs.map(faq => (
            <details key={faq.question} className="group border border-slate-200 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-bold m-0">{faq.question}</h3>
                {CHEVRON}
              </summary>
              <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
