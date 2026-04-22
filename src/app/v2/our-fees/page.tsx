import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fees | Bold Modern",
  description: "Transparent legal pricing. Fixed fees for immigration. No win, no fee for housing and personal injury.",
};

const pricingCards = [
  {
    title: "Immigration Law",
    subtitle: "Fixed Fees",
    popular: true,
    color: "brand-red",
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
    title: "Housing Disrepair",
    subtitle: "No Win, No Fee",
    popular: false,
    color: "brand-gold",
    items: [
      { service: "Disrepair Claims", price: "No Win, No Fee" },
      { service: "Compensation Claims", price: "No Win, No Fee" },
      { service: "Court Proceedings", price: "No Win, No Fee" },
    ],
  },
  {
    title: "Personal Injury",
    subtitle: "No Win, No Fee",
    popular: false,
    color: "brand-navy",
    items: [
      { service: "Workplace Accidents", price: "No Win, No Fee" },
      { service: "Road Traffic Claims", price: "No Win, No Fee" },
      { service: "Serious Injury", price: "No Win, No Fee" },
      { service: "Fatal Accidents", price: "No Win, No Fee" },
    ],
  },
];

export default function V2FeesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy py-24 lg:py-36 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="w-16 h-1 bg-brand-red mb-6" />
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">Our Fees</h1>
          <p className="mt-6 text-xl text-white/40 max-w-2xl">Transparent pricing. No hidden charges. Know your costs before we start.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingCards.map((card) => (
              <div key={card.title} className={`relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${card.popular ? "ring-2 ring-brand-red" : ""}`}>
                {card.popular && (
                  <div className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3" />Most Popular
                  </div>
                )}
                <div className={`p-8 ${card.popular ? "bg-brand-red" : "bg-brand-navy"}`}>
                  <h3 className="text-2xl font-heading font-bold text-white">{card.title}</h3>
                  <p className="text-white/70 font-medium mt-1">{card.subtitle}</p>
                </div>
                <div className="p-8">
                  <div className="space-y-4">
                    {card.items.map((item) => (
                      <div key={item.service} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                        <span className="text-sm text-brand-navy/80 font-medium">{item.service}</span>
                        <span className="text-sm font-bold text-brand-navy">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className={`w-full mt-8 rounded-2xl h-12 font-bold ${card.popular ? "bg-brand-red hover:bg-brand-red-dark text-white shadow-lg shadow-brand-red/20" : "bg-brand-navy hover:bg-brand-navy-light text-white"}`}>
                    <Link href="/v2/contact-us/">Get a Quote<ArrowRight className="h-4 w-4 ml-2" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-brand-red mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-navy">Every Fee Includes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Free initial consultation",
              "Dedicated solicitor from day one",
              "All correspondence included",
              "Document preparation & review",
              "Authority liaison on your behalf",
              "Regular case updates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white rounded-2xl shadow-lg px-6 py-5">
                <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0" />
                <span className="text-brand-navy font-semibold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">Get Your Free Quote</h2>
          <p className="mt-6 text-white/70 text-lg">Speak to us — we&apos;ll give you a clear, fixed fee quote.</p>
          <div className="mt-10">
            <Button asChild className="bg-white text-brand-red hover:bg-white/90 rounded-2xl text-base h-14 px-10 font-bold shadow-lg">
              <Link href="/v2/contact-us/">Request a Quote<ArrowRight className="h-5 w-5 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
