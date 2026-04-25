import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Phone, ExternalLink } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { JsonLd } from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Solicitors | Immigration, Housing & Litigation Team",
  description:
    "Three SRA-regulated solicitors at Abrahams Solicitors handling UK immigration, housing disrepair and litigation. Direct solicitor access, verified profiles, free consultation.",
  alternates: { canonical: "/v6/our-team/" },
  openGraph: {
    title: "Meet Our Solicitors — Abrahams Solicitors",
    description: "SRA-regulated solicitors specialising in immigration, housing disrepair and litigation across the UK.",
  },
};

const BASE_URL = "https://www.abrahamssolicitors.co.uk";

const personGraph = {
  "@context": "https://schema.org",
  "@graph": team.map((s) => ({
    "@type": "Person",
    "@id": `${BASE_URL}/v6/our-team/#${s.slug}`,
    name: s.name,
    jobTitle: s.role,
    description: s.short,
    knowsAbout: s.specialisms,
    worksFor: { "@id": `${BASE_URL}#organization` },
    identifier: { "@type": "PropertyValue", name: "SRA", value: s.sraNumber },
    sameAs: [s.sraUrl],
  })),
};

export default function OurTeamPage() {
  return (
    <>
      <JsonLd data={personGraph} />

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Meet the Team</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl">
            Three solicitors. Direct access. No call centres.
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
            Every case at Abrahams is handled by an SRA-regulated solicitor — the same person you book the consultation with. No junior pass-offs.
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-base text-slate-500 leading-relaxed mb-2">
            We focus on the legal work that needs steady hands and proper preparation: immigration applications where one missed document can cost a family their right to stay in the UK, housing disrepair claims where a damp child&rsquo;s bedroom isn&rsquo;t a tenant&rsquo;s job to fix, and litigation that needs careful evidence rather than bluster.
          </p>
          <p className="text-base text-slate-500 leading-relaxed">
            All three of our solicitors are listed on the SRA register — links below if you&rsquo;d like to verify.
          </p>
        </div>
      </section>

      <section className="pb-12 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-8">
          {team.map((s) => (
            <article key={s.slug} id={s.slug} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <header className="mb-5">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{s.name}</h2>
                <p className="mt-1 text-brand-red text-sm font-semibold uppercase tracking-widest">{s.role}</p>
              </header>

              <div className="flex flex-wrap gap-2 mb-5">
                {s.specialisms.map((sp) => (
                  <span key={sp} className="text-xs font-semibold bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-100">{sp}</span>
                ))}
              </div>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                {s.long.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0" />
                  <span>SRA #{s.sraNumber} · admitted {s.admittedYear}</span>
                </div>
                <a
                  href={s.sraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand-red font-semibold hover:underline"
                >
                  Verify on SRA register
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50/60 border-t border-slate-100 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Speak to a solicitor today</h2>
          <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Free 30-minute consultation. Phone, video or in-person. We&rsquo;ll tell you honestly whether you have a case before we ask for a penny.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-8 font-bold uppercase tracking-wide">
              <Link href="/v6/free-consultation/">Book Free Consultation <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg h-12 border-slate-200 hover:border-brand-red hover:text-brand-red">
              <a href="tel:02033559823"><Phone className="h-4 w-4 mr-2" />0203 355 9823</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
