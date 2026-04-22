import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fees | Creative Expressive",
  description: "Transparent legal pricing. Fixed fees for immigration, no win no fee for housing and personal injury.",
};

const feeCategories = [
  {
    num: "01", title: "Immigration Law", highlight: "Fixed Fees",
    items: [
      { service: "Spouse Visa Application", price: "From £1,500" },
      { service: "British Citizenship", price: "From £800" },
      { service: "Visa Extensions", price: "From £800" },
      { service: "ILR Application", price: "From £1,200" },
      { service: "Asylum Application", price: "Legal Aid" },
      { service: "Visit Visa", price: "From £500" },
    ],
  },
  {
    num: "02", title: "Housing Disrepair", highlight: "No Win, No Fee",
    items: [
      { service: "Disrepair Claims", price: "No Win, No Fee" },
      { service: "Compensation Claims", price: "No Win, No Fee" },
      { service: "Court Proceedings", price: "No Win, No Fee" },
    ],
  },
  {
    num: "03", title: "Personal Injury", highlight: "No Win, No Fee",
    items: [
      { service: "Workplace Accidents", price: "No Win, No Fee" },
      { service: "Road Traffic Claims", price: "No Win, No Fee" },
      { service: "Serious Injury", price: "No Win, No Fee" },
      { service: "Fatal Accidents", price: "No Win, No Fee" },
    ],
  },
];

export default function V3FeesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[400px] font-heading font-bold text-white/[0.02] leading-none select-none">A</div>
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="relative inline-block mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] px-2">Pricing</p>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-[0.95]">
            <span className="block">What We Charge</span>
            <span className="block text-brand-gold">&mdash; And Why</span>
          </h1>
          <p className="mt-8 text-lg text-white/40 max-w-xl leading-relaxed">Transparent pricing. No hidden extras. We believe in honest, upfront fees.</p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-[#faf9f6] border-y border-brand-gold/20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 text-center">
          <p className="text-xl lg:text-2xl font-heading italic text-brand-navy/80">&ldquo;No hidden fees. No surprise bills. Know your costs before we begin.&rdquo;</p>
        </div>
      </section>

      {/* Fee Cards */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {feeCategories.map((cat) => (
              <div key={cat.title} className="relative bg-white rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold" />
                <div className="p-8 lg:p-10">
                  <div className="flex items-start gap-6 mb-8">
                    <span className="text-5xl font-heading font-bold text-brand-gold/20">{cat.num}</span>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-brand-navy">{cat.title}</h3>
                      <p className="text-brand-gold text-sm font-semibold mt-1">{cat.highlight}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((item) => (
                      <div key={item.service} className="flex items-center justify-between bg-[#faf9f6] rounded-lg px-5 py-4">
                        <span className="text-sm text-brand-navy/80">{item.service}</span>
                        <span className="text-sm font-bold text-brand-navy ml-4 whitespace-nowrap">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Included</p>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">No Hidden Extras</h2>
              <div className="w-12 h-px bg-brand-gold mt-6 mb-6" />
              <p className="text-slate-500 leading-relaxed">Every fee we quote includes all the essentials. You won&apos;t be charged extra for basic services that should come standard.</p>
            </div>
            <div className="space-y-4">
              {["Free initial consultation", "Dedicated solicitor from day one", "All correspondence included", "Document preparation & review", "Authority liaison on your behalf", "Regular case updates"].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-[#faf9f6] rounded-xl px-5 py-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                  <span className="text-brand-navy font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-32 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Get a Quote</p>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy">Discuss Your Fees</h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6 mb-8" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl text-base h-13 px-8">
              <Link href="/v3/contact-us/">Request a Quote<ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button asChild className="bg-transparent hover:bg-brand-gold/10 text-brand-gold border-2 border-brand-gold rounded-xl text-base h-13 px-8">
              <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
