import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight, ShieldCheck, ArrowRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { JsonLd, breadcrumbSchema } from "@/components/v6/jsonld";
import { SkeepersListWidget } from "@/components/v6/skeepers-list-widget";
import { FaqDetails, type FaqEntry } from "@/components/v6/faq-details";
import type { Metadata } from "next";

const PAGE_URL = "https://www.abrahamssolicitors.co.uk/reviews/";
const SKEEPERS_PUBLIC_URL = "https://www.verified-reviews.co.uk/reviews/abrahamssolicitors.co.uk";

// Aggregate snapshot — synced against the Verified Reviews listing. Update
// these two numbers when the count crosses a milestone (the widget itself
// renders live data once loaded; this block is the static fallback so the
// page reads correctly with JS disabled and so the Schema.org rich snippet
// stays accurate).
// Answer-first Q&A. The GEO audit's top-priority action was that this page and
// /about-us/ both carried no FAQPage schema and almost no question-shaped
// headings, on a site whose technical GEO score is otherwise maxed out.
//
// These answer the questions people actually ask before instructing a
// solicitor, not the ones that flatter the page. The platform-variance answer
// is deliberate: the 4.7 on Google is already public, so explaining why the
// three numbers differ is more credible than displaying only the best one.
// `plain` is what goes into the schema; keep it saying what `answer` says.
const REVIEW_FAQS: FaqEntry[] = [
  {
    question: "Are these reviews genuine, and can Abrahams delete a bad one?",
    plain:
      "Reviews on this page are collected and published by Verified Reviews, an independent platform. We can't edit or delete a review once it's published — we can only reply to it. That goes for the critical ones just as much as the complimentary ones. The full listing, including our replies, sits on the Verified Reviews site, and that's where the average and the count on this page come from.",
    answer: (
      <>
        Reviews on this page are collected and published by{" "}
        <a href={SKEEPERS_PUBLIC_URL} rel="noopener nofollow" target="_blank" className="font-semibold text-slate-700 underline">
          Verified Reviews
        </a>
        , an independent platform. We can&rsquo;t edit or delete a review once it&rsquo;s published &mdash; we can only
        reply to it. That goes for the critical ones just as much as the complimentary ones. The full listing,
        including our replies, sits on the Verified Reviews site, and that&rsquo;s where the average and the count on
        this page come from.
      </>
    ),
  },
  {
    question: "Why is your rating different on Verified Reviews, Google and ReviewSolicitors?",
    plain:
      "Because the three platforms draw on different groups of clients over different periods. Verified Reviews stands at 4.9 from 97, Google at 4.7 from 63, and ReviewSolicitors at 4.8 from 22. Verified Reviews invites clients directly once a matter ends, so it reflects people who actually instructed us. Google is open to anyone with a Google account. None of the three figures is wrong — they're measuring different samples, and a smaller sample moves further on a single review.",
    answer: (
      <>
        Because the three platforms draw on different groups of clients over different periods. Verified Reviews
        stands at <strong>4.9 from 97</strong>, Google at <strong>4.7 from 63</strong>, and ReviewSolicitors at{" "}
        <strong>4.8 from 22</strong>. Verified Reviews invites clients directly once a matter ends, so it reflects
        people who actually instructed us. Google is open to anyone with a Google account. None of the three figures
        is wrong &mdash; they&rsquo;re measuring different samples, and a smaller sample moves further on a single
        review.
      </>
    ),
  },
  {
    question: "What if I'm not happy with the service I receive?",
    plain:
      "Tell us first. Complaining costs you nothing, and we don't charge for handling it. If we haven't resolved things within eight weeks, you can take the complaint to the Legal Ombudsman — it's independent of us and also free. Our full procedure, including the time limits and the Ombudsman's contact details, is on our complaints page.",
    answer: (
      <>
        Tell us first. Complaining costs you nothing, and we don&rsquo;t charge for handling it. If we haven&rsquo;t
        resolved things within eight weeks, you can take the complaint to the Legal Ombudsman &mdash; it&rsquo;s
        independent of us and also free. Our full procedure, including the time limits and the Ombudsman&rsquo;s
        contact details, is on our{" "}
        <Link href="/complaints/" className="font-semibold text-slate-700 underline">
          complaints page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I speak to a solicitor before deciding to instruct?",
    plain:
      "Yes. The first 30 minutes is free, and you speak to a solicitor rather than a call handler. The phone is answered live 24 hours a day by our own staff, so you're not waiting for office hours to find out whether we can help.",
    answer: (
      <>
        Yes. The first 30 minutes is free, and you speak to a solicitor rather than a call handler. The phone is
        answered live 24 hours a day by our own staff, so you&rsquo;re not waiting for office hours to find out
        whether we can help.
      </>
    ),
  },
];

const REVIEW_COUNT = 97;
const REVIEW_AVERAGE = 4.9;

export const metadata: Metadata = {
  title: "Verified Client Reviews — Abrahams Solicitors",
  description: `Read all ${REVIEW_COUNT} verified client reviews of Abrahams Solicitors. ${REVIEW_AVERAGE}★ average. Independently verified by Skeepers — no review can be edited or deleted by us.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Client Reviews — ${REVIEW_AVERAGE}★ from ${REVIEW_COUNT} verified clients`,
    description: `Independently verified reviews of Abrahams Solicitors — immigration, housing and personal injury work.`,
    url: PAGE_URL,
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <>
      {/* ─── Schema ─── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Abrahams Solicitors",
          url: "https://www.abrahamssolicitors.co.uk/",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: REVIEW_AVERAGE.toFixed(1),
            reviewCount: REVIEW_COUNT,
            bestRating: 5,
            worstRating: 1,
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Reviews" },
        ])}
      />

      {/* ─── Breadcrumb ─── */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Reviews</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Client Feedback</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" /> Independently verified
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                What our clients say
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Every review below is collected by{" "}
                <a
                  href={SKEEPERS_PUBLIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                >
                  Verified Reviews (Skeepers)
                </a>{" "}
                directly from clients after their case closes. We cannot edit, hide,
                or remove a review &mdash; only respond to it. That is why every score on
                this page can be trusted.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
                  <Link href="/contact-us/">Book Free Consultation</Link>
                </Button>
                <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-5 border border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
              </div>
            </div>

            {/* Right — aggregate panel */}
            <div className="lg:col-span-2 min-w-0">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Overall rating</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-slate-900 leading-none">{REVIEW_AVERAGE}</span>
                  <span className="text-sm text-slate-500">/ 5.0</span>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {[0,1,2,3,4].map(i => (
                    <Star key={i} className="h-5 w-5 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-700">
                  Based on <strong className="text-slate-900">{REVIEW_COUNT} verified reviews</strong>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-500 leading-snug">
                  <li className="flex items-start gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                    Collected after case closure
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                    Cannot be edited or deleted by us
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                    Hosted independently by Skeepers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── AI summary placeholder ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/40 border-b border-slate-100">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-brand-red" />
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest">AI Summary</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The themes that come up most often
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Once the Skeepers widget is connected, an AI-generated summary of the
            common themes across all {REVIEW_COUNT} reviews appears here, refreshed
            as new feedback arrives.
          </p>

          {/* Editorial fallback — these are the themes we hear most often in
              client letters and consultations. The widget's AI summary replaces
              this block once it's loaded. */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              { title: "Plain English from the first call", body: "Clients consistently mention that their named solicitor explained the law in ordinary language, not legalese — particularly on spouse visa, ILR, and housing disrepair work." },
              { title: "Responsive and reachable", body: "Recurring praise for replies inside 24 hours, direct mobile contact for urgent matters, and being able to speak to the actual solicitor handling the file (not a call centre)." },
              { title: "Honest fee quotes", body: "Reviewers highlight that the fixed fee they were quoted at the start is the fee they paid at the end — no scope creep, no surprise invoices." },
              { title: "Cases won on the facts", body: "Successful outcomes mentioned across immigration appeals, refusal challenges, and housing-disrepair settlements, with several reviewers noting they had been refused elsewhere first." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-black text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Skeepers list widget mount ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">Verified reviews</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                All {REVIEW_COUNT} client reviews
              </h2>
            </div>
            <a
              href={SKEEPERS_PUBLIC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-brand-red underline-offset-2 hover:underline"
            >
              View on Verified Reviews ↗
            </a>
          </div>

          {/* Skeepers list widget — renders client-side. Until the merchant
              snippet is configured (see component), this falls back to a
              clear CTA pointing at the public listing so the page is useful
              from day one. */}
          <SkeepersListWidget fallbackUrl={SKEEPERS_PUBLIC_URL} />
        </div>
      </section>

      <FaqDetails
        faqs={REVIEW_FAQS}
        heading="Questions about these reviews"
        intro="How the reviews are collected, why the numbers differ between platforms, and what to do if something goes wrong."
      />

      {/* ─── CTA ─── */}
      <section className="py-12 lg:py-16 bg-brand-navy">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Ready to be our next 5-star review?
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Free 30-minute consultation with a named solicitor. Fixed fees agreed
            in writing before any work starts.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
              <Link href="/contact-us/">
                <MessageCircle className="h-4 w-4 mr-2" />
                Book Free Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-5 border border-white/30 text-white hover:bg-white/10 bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
          </div>
        </div>
      </section>
    </>
  );
}
