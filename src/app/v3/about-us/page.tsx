import Link from "next/link";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/navigation";
import { ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Creative Expressive",
  description: "Meet the Abrahams Solicitors team. Experienced immigration, housing, and personal injury specialists.",
};

const values = [
  { num: "01", title: "Client-First", desc: "Every decision guided by what is best for our clients." },
  { num: "02", title: "Transparency", desc: "Fixed fees and honest advice — no hidden costs." },
  { num: "03", title: "Expertise", desc: "Deep specialism in immigration, housing, and personal injury." },
  { num: "04", title: "Accessibility", desc: "Direct solicitor access with nationwide coverage." },
];

export default function V3AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[400px] font-heading font-bold text-white/[0.02] leading-none select-none">A</div>
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="relative inline-block mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] px-2">About Our Firm</p>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-[0.95]">
            <span className="block">A Team</span>
            <span className="block text-brand-gold">Dedicated to</span>
            <span className="block">Your Success</span>
          </h1>
          <p className="mt-8 text-lg text-white/40 max-w-xl leading-relaxed">Expert legal representation built on transparency, dedication, and an unwavering commitment to results.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Our Values</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy">What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl">
            {values.map((v, i) => (
              <div key={v.num} className={`relative bg-white rounded-xl p-8 ${i % 2 === 1 ? "sm:mt-8" : ""}`}>
                <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-brand-gold" />
                <span className="text-4xl font-heading font-bold text-brand-gold/20">{v.num}</span>
                <h3 className="text-xl font-heading font-bold text-brand-navy mt-2 mb-3">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-brand-navy py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 text-[150px] font-heading font-bold text-brand-gold/[0.05] leading-none">&ldquo;</div>
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xl lg:text-2xl text-white/80 italic font-heading leading-relaxed">
            &ldquo;We believe that everyone deserves access to expert legal advice, delivered with compassion and clarity.&rdquo;
          </p>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6 mb-4" />
          <p className="text-brand-gold font-semibold">Ahrika Ghalib</p>
          <p className="text-white/30 text-sm">Principal Solicitor</p>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 lg:py-36 bg-[#faf9f6]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Our People</p>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy">Meet the Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.slug} className="relative bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gold" />
                <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center text-white font-heading text-xl font-bold mb-6 ring-2 ring-brand-gold ring-offset-2 ring-offset-white">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy">{member.name}</h3>
                <p className="text-brand-gold text-sm font-medium mt-1">{member.role}</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-semibold">{member.specialisation}</p>
                <p className="text-sm text-slate-500 mt-4 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.3em] mb-4">Get Started</p>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-brand-navy leading-tight">Begin Your Consultation</h2>
          <div className="w-12 h-px bg-brand-gold mx-auto mt-6 mb-8" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-brand-navy hover:bg-brand-navy-light text-white rounded-xl text-base h-13 px-8">
              <Link href="/v3/contact-us/">Book an Appointment</Link>
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
