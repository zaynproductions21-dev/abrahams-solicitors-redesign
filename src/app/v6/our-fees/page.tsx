import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { JsonLd, faqPageSchema } from "@/components/v6/jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fees",
  description: "Clear, transparent legal fees. Fixed-fee immigration work agreed in writing before we start; no win, no fee for housing disrepair and personal injury; legal aid where available.",
};

const FEE_FAQS = [
  {
    question: "Are your immigration fees really fixed?",
    answer:
      "Yes. For most immigration work we agree a fixed fee in writing before any work begins, so you are not exposed to open-ended hourly billing. The figures shown are starting points (“from”) for straightforward cases; your exact fixed fee is confirmed after a free assessment of your circumstances, and any higher fee for a more complex case is agreed with you in advance.",
  },
  {
    question: "Are Home Office and court fees included in your price?",
    answer:
      "No. Government charges — the Home Office application fee, the Immigration Health Surcharge, biometric enrolment, and any tribunal or court fees — are set by the government and paid in addition to our legal fee. These amounts change periodically, so check the current figures on GOV.UK; we will always tell you which apply to your case.",
  },
  {
    question: "What does “no win, no fee” mean for housing or personal injury claims?",
    answer:
      "For most housing disrepair and personal injury claims we can act under a Conditional Fee Agreement (“no win, no fee”). You pay nothing up front, and where the claim succeeds our costs are usually recovered from the other side, typically with After the Event insurance in place. We explain any deduction from your compensation before you sign anything.",
  },
  {
    question: "Could I get legal aid?",
    answer:
      "Some work — including asylum claims and certain immigration detention matters — may be covered by legal aid, subject to the means and merits tests set by the Legal Aid Agency. We can check whether you are likely to qualify; you can also read the current eligibility rules on GOV.UK.",
  },
  {
    question: "Is the initial consultation free?",
    answer:
      "Yes. We offer a free initial consultation in which a qualified solicitor assesses your case, explains your options honestly, and gives you a clear fee quote. There is no obligation to instruct us afterwards.",
  },
  {
    question: "What happens if my case turns out to be more complex?",
    answer:
      "If your matter needs more work than a standard case — for example a previous refusal, extensive evidence, or an appeal — we agree any higher fixed fee with you in writing before that work starts. You will not receive a surprise bill.",
  },
];

const feeCategories = [
  {
    title: "Immigration Law",
    highlight: "Fixed Fees",
    items: [
      { service: "Spouse Visa Application", price: "From £900*" },
      { service: "British Citizenship", price: "From £600*" },
      { service: "Visa Extensions", price: "From £900*" },
      { service: "ILR Application", price: "From £750*" },
      { service: "Visa Refusal Appeals", price: "From £1,250*" },
      { service: "Asylum Application", price: "Legal Aid / Fixed Fee" },
      { service: "Visit Visa", price: "From £500*" },
    ],
  },
  {
    title: "Housing Disrepair",
    highlight: "No Win, No Fee",
    items: [
      { service: "Disrepair Claims", price: "No Win, No Fee" },
      { service: "Compensation Claims", price: "No Win, No Fee" },
      { service: "Court Proceedings", price: "No Win, No Fee" },
    ],
  },
  {
    title: "Personal Injury",
    highlight: "No Win, No Fee",
    items: [
      { service: "Workplace Accidents", price: "No Win, No Fee" },
      { service: "Road Traffic Claims", price: "No Win, No Fee" },
      { service: "Serious Injury", price: "No Win, No Fee" },
      { service: "Fatal Accidents", price: "No Win, No Fee" },
    ],
  },
];

const included = [
  "Free initial consultation",
  "Dedicated solicitor from day one",
  "All correspondence and communication",
  "Document preparation and review",
  "Liaison with authorities on your behalf",
  "Regular case updates",
];

export default function V1FeesPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FEE_FAQS)} />
      {/* Hero */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Fees</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Clear, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
            We believe in honest, upfront pricing. No hidden charges, no surprise bills. Know your costs before we begin.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Fee Cards */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {feeCategories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                <div className="bg-brand-navy p-6">
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                  <p className="text-brand-gold text-sm font-medium mt-1">{cat.highlight}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.service} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <span className="text-sm text-brand-navy/80">{item.service}</span>
                        <span className="text-sm font-semibold text-brand-navy">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-xl">
                    <Link href="/contact-us/">Get a Quote<ArrowRight className="h-4 w-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            *Fixed fee price subject to our free case assessment. Complex cases may require an additional quote, which we&rsquo;ll always agree with you in writing before any work begins.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">What&apos;s Included</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-brand-navy leading-tight">No Hidden Extras</h2>
              <p className="mt-5 text-lg text-slate-500 leading-relaxed">Every fee quoted includes all the essentials. You won&apos;t be charged extra for basic services.</p>
            </div>
            <div className="space-y-4">
              {included.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white rounded-xl ring-1 ring-slate-200 px-5 py-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                  <span className="text-brand-navy font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How our pricing works */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">How Our Pricing Works</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">Clear fees, agreed before we start</h2>

          <h3 className="mt-8 text-lg font-bold text-brand-navy">Fixed fees, agreed in writing</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            For most immigration work we agree a <strong>fixed fee in writing</strong> before any work
            begins, set out in your client-care letter. The prices above are starting points for
            straightforward cases; your exact fee is confirmed after a free assessment. Where a case is
            more complex &mdash; a previous refusal, extensive evidence, or an appeal &mdash; any higher
            fixed fee is agreed with you in advance, never billed as a surprise.
          </p>

          <h3 className="mt-8 text-lg font-bold text-brand-navy">Government fees are separate</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Home Office application fees, the Immigration Health Surcharge, biometric enrolment, and any
            tribunal or court fees are set by the government and paid in addition to our legal fee. These
            amounts change periodically, so confirm the current figures at{" "}
            <a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">gov.uk</a>.
          </p>

          <h3 className="mt-8 text-lg font-bold text-brand-navy">No win, no fee for housing and injury claims</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Most housing disrepair and personal injury claims can be run under a Conditional Fee
            Agreement. You pay nothing up front; where the claim succeeds our costs are usually recovered
            from the other side, typically with After the Event insurance in place. We explain any
            deduction from your compensation before you sign.
          </p>

          <h3 className="mt-8 text-lg font-bold text-brand-navy">Legal aid where available</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Some work &mdash; including asylum and certain detention matters &mdash; may be covered by
            legal aid, subject to the means and merits tests set by the Legal Aid Agency. We can check
            whether you are likely to qualify.
          </p>
        </div>
      </section>

      {/* Fees FAQ */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Fees &mdash; Common Questions</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">Your questions about cost</h2>
          <dl className="mt-8 divide-y divide-slate-200">
            {FEE_FAQS.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="text-base font-bold text-brand-navy">{f.question}</dt>
                <dd className="mt-2 text-base text-slate-600 leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Get Your Free Quote Today</h2>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">Speak to us about your case and we&apos;ll provide a clear, fixed fee quote.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/contact-us/">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <DynamicCallLink className="inline-flex items-center"><Phone className="h-4 w-4 mr-2" /><DynamicPhoneText /></DynamicCallLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
