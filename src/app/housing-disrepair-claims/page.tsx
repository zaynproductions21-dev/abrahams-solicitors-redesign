import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Flame,
  Home,
  Bug,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housing Disrepair Claims | No Win No Fee | Free Assessment",
  description:
    "Housing disrepair compensation claims. No win, no fee. Damp, mould, heating issues. Free property assessment. Average £3,000-£15,000 compensation.",
};

const compensationTypes = [
  { icon: Droplets, title: "Damp & Mould", range: "£3,000 – £10,000", desc: "Black mould, rising damp, condensation issues affecting your health and home." },
  { icon: Flame, title: "Heating Failures", range: "£2,000 – £8,000", desc: "Broken boilers, no hot water, inadequate heating during winter months." },
  { icon: Home, title: "Structural Issues", range: "£5,000 – £15,000", desc: "Cracked walls, subsidence, roof leaks, and dangerous structural defects." },
  { icon: Bug, title: "Pest Infestations", range: "£2,000 – £7,000", desc: "Mice, rats, cockroaches, and other pests caused by disrepair." },
  { icon: Droplets, title: "Water Leaks", range: "£3,000 – £12,000", desc: "Leaking pipes, water ingress, flooding from faulty plumbing." },
  { icon: Zap, title: "Electrical Faults", range: "£3,000 – £10,000", desc: "Dangerous wiring, broken sockets, electrical hazards in the property." },
];

const processSteps = [
  { num: "01", title: "Free Property Assessment", desc: "We assess your situation over the phone. No need to visit our office — we come to you or review evidence remotely." },
  { num: "02", title: "Evidence Gathering", desc: "We arrange for an independent surveyor to inspect your property and document all disrepair issues with photographs and a detailed report." },
  { num: "03", title: "Landlord Notification", desc: "We send a formal letter of claim to your landlord, setting out the disrepair, the evidence, and the compensation we are seeking." },
  { num: "04", title: "Settlement or Court", desc: "Most cases settle without going to court. If your landlord refuses to engage, we issue court proceedings and fight for the compensation you deserve." },
];

const successStories = [
  {
    title: "Council Tenant With Severe Mould",
    amount: "£8,500",
    desc: "A mother of two had been living with black mould throughout her council flat for over three years. Despite repeated complaints, the council failed to act. We secured £8,500 in compensation and a commitment to complete all necessary repairs within 28 days.",
  },
  {
    title: "Private Rental Heating Failure",
    amount: "£5,200",
    desc: "A private tenant spent an entire winter without central heating after their landlord refused to replace a broken boiler. We documented the health impact and secured £5,200 in compensation plus full boiler replacement.",
  },
  {
    title: "Family Home With Structural Damp",
    amount: "£12,000",
    desc: "A family of four suffered with rising damp, peeling wallpaper, and damaged belongings for over two years. Our independent surveyor documented extensive structural damp, and we negotiated £12,000 compensation plus a full damp-proofing programme.",
  },
];

const tenantRights = [
  {
    title: "Landlord Repair Obligations",
    desc: "Under Section 11 of the Landlord and Tenant Act 1985, your landlord must keep the structure, exterior, and installations for water, gas, electricity, heating, and sanitation in proper repair.",
  },
  {
    title: "Right to a Safe Home",
    desc: "The Homes (Fitness for Human Habitation) Act 2018 requires that rented properties are fit for human habitation throughout the tenancy. Serious damp, mould, and structural issues breach this standard.",
  },
  {
    title: "Protection From Eviction",
    desc: "The Deregulation Act 2015 protects tenants from retaliatory eviction. If you have made a legitimate complaint about disrepair, your landlord cannot serve a Section 21 notice for six months.",
  },
  {
    title: "Right to Compensation",
    desc: "If your landlord has failed to carry out repairs after being notified, you are entitled to claim compensation for the inconvenience, discomfort, and any damage to your health or belongings.",
  },
];

const faqs = [
  {
    q: "Do I have to pay anything upfront?",
    a: "No. We handle housing disrepair claims on a no win, no fee basis. You pay nothing upfront and nothing if your claim is unsuccessful. If we win, our fees are recovered from the compensation — we will explain the exact terms before you commit.",
  },
  {
    q: "Can I claim if I rent from the council or a housing association?",
    a: "Yes. Council tenants and housing association tenants have the same rights as private tenants. In fact, a significant proportion of our housing disrepair claims are against local authorities and registered social landlords.",
  },
  {
    q: "What evidence do I need?",
    a: "Photographs of the disrepair, records of complaints to your landlord (emails, letters, online reports), and any medical evidence if your health has been affected. We will arrange an independent survey as part of your claim — you do not need to organise this yourself.",
  },
  {
    q: "How long does a housing disrepair claim take?",
    a: "Most claims settle within 3 to 6 months. If your landlord engages early, it can be faster. If court proceedings are needed, it may take 6 to 12 months. We keep you updated throughout the process.",
  },
  {
    q: "Will I be evicted if I make a claim?",
    a: "No. Retaliatory eviction is illegal under the Deregulation Act 2015. If your landlord attempts to evict you after you have made a disrepair complaint, the court will refuse the eviction and your landlord may face penalties.",
  },
  {
    q: "How much compensation can I expect?",
    a: "Compensation typically ranges from £3,000 to £15,000 depending on the severity of the disrepair, how long it has persisted, the impact on your health, and any damage to your belongings. We can give you a more accurate estimate during your free assessment.",
  },
];

export default function HousingDisrepairClaimsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">
              Housing Disrepair Solicitors
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight">
              Housing Disrepair Claims — Get Compensation for Poor Living Conditions
            </h1>
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: "£3k–£15k", label: "Average Compensation" },
                { value: "No Win", label: "No Fee" },
                { value: "Free", label: "Assessment" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-heading font-bold text-brand-gold">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
              >
                <Link href="/contact-us/">
                  Free Property Assessment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
                <a href="tel:02034880512">
                  <Phone className="h-4 w-4 mr-2" />
                  020 3488 0512
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation Types */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Compensation Estimates
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Types of Disrepair We Handle
            </h2>
            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              The compensation you could receive depends on the type of disrepair,
              how long it has persisted, and the impact on your daily life.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {compensationTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/8 flex items-center justify-center mb-5">
                  <type.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-1">
                  {type.title}
                </h3>
                <p className="text-brand-gold font-semibold text-sm mb-3">{type.range}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              The Process
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              How Your Claim Works
            </h2>
          </div>
          <div className="max-w-3xl space-y-0">
            {processSteps.map((step, i) => (
              <div key={step.num} className="flex gap-6 lg:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-px h-full bg-slate-200 my-2" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-heading font-bold text-brand-navy text-lg">{step.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenant Rights */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Know Your Rights
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Your Rights as a Tenant
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {tenantRights.map((right) => (
              <div key={right.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-navy text-lg">{right.title}</h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{right.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Recent Outcomes
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Success Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm"
              >
                <p className="text-3xl font-heading font-bold text-brand-red mb-3">
                  {story.amount}
                </p>
                <h3 className="font-heading font-bold text-brand-navy mb-3">
                  {story.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{story.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Common Questions
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl ring-1 ring-slate-200 p-6 lg:p-8">
                <h3 className="font-heading font-bold text-brand-navy mb-3">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-24 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">
            Living in Disrepair? Get the Compensation You Deserve
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Free property assessment. No win, no fee. Our experienced housing
            solicitors are ready to fight for your rights.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/contact-us/">Free Assessment</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02034880512">
                <Phone className="h-4 w-4 mr-2" />
                020 3488 0512
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
