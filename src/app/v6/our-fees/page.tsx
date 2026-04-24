import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fees",
  description: "Clear, transparent legal fees. Fixed pricing for immigration services. No win, no fee for housing and personal injury claims.",
};

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
                    <Link href="/v6/contact-us/">Get a Quote<ArrowRight className="h-4 w-4 ml-2" /></Link>
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

      {/* CTA */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Get Your Free Quote Today</h2>
          <p className="mt-6 text-white/40 text-lg max-w-xl mx-auto">Speak to us about your case and we&apos;ll provide a clear, fixed fee quote.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/v6/contact-us/">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
