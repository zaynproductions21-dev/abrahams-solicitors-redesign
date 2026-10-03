/**
 * Independent review aggregates, each read from the platform that hosts it.
 *
 * Replaces the three invented client testimonials that were duplicated across
 * the Bradford, Manchester and Essex location pages — named people
 * ("Daniel & Sara", "Priya", "Marek") with specific outcome claims ("won the
 * appeal", "approved in 6 weeks"). Checked against the 97 real reviews on the
 * independent Verified Reviews listing: none of those names or phrases appear
 * there. Invented testimonials carrying outcome claims on a regulated firm's
 * YMYL pages are an SRA Code of Conduct problem before they are an SEO one.
 *
 * What is published here instead is only what a visitor can verify by
 * following the link. Both figures are real: the Skeepers listing for
 * abrahamssolicitors.co.uk emits ratingValue 4.9 / reviewCount 97, and the
 * Bradford Google Business Profile shows 4.7 from 60.
 *
 * No client quotes. We do not publish outcome claims for immigration matters.
 */
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export const SKEEPERS_URL =
  "https://www.verified-reviews.co.uk/reviews/abrahamssolicitors.co.uk";
export const BRADFORD_GBP_URL =
  "https://www.google.com/maps?cid=15089368944767082385";

export const REVIEW_SOURCES = [
  {
    platform: "Verified Reviews (Skeepers)",
    rating: "4.9",
    count: 97,
    note: "Collected and hosted independently. We can reply to a review — we cannot edit or delete one.",
    href: SKEEPERS_URL,
    cta: "Read all 97 at source",
  },
  {
    platform: "Google Business Profile",
    rating: "4.7",
    count: 60,
    note: "Left on the Google listing for our Bradford office at Listerhills Science Park.",
    href: BRADFORD_GBP_URL,
    cta: "Read the Google reviews",
  },
];

export function VerifiedReviews({ intro }: { intro?: string }) {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Verified reviews</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            What Clients Say &mdash; Checkable at Source
          </h2>
          <p className="mt-4 text-base text-slate-500 leading-relaxed">
            {intro ?? "Both scores below are hosted by the platform that collected them, not by us. Follow either link and read every review yourself."}{" "}
            We don&rsquo;t publish client quotes about case outcomes &mdash; no solicitor can promise a result, and a quote implying one wouldn&rsquo;t be fair to you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEW_SOURCES.map(src => (
            <div key={src.platform} className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{src.platform}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map(i => <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />)}
                </div>
                <span className="text-2xl font-black text-slate-900">{src.rating}</span>
                <span className="text-sm text-slate-500">from <strong className="text-slate-700">{src.count} reviews</strong></span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mt-3">{src.note}</p>
              <a
                href={src.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-brand-red hover:underline"
              >
                {src.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link href="/reviews/" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:underline">
            See the full review page <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
