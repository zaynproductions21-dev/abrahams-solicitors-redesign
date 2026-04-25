import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Heart,
  Shield,
  Briefcase,
  GraduationCap,
  Scale,
  BookOpen,
  Video,
  MapPin,
  MessageSquare,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration Lawyers Near Me | UK-Wide Coverage | Abrahams Law",
  description:
    "Find immigration lawyers near you. UK-wide coverage, local expertise. Direct solicitor access, fixed fees. Free consultation. Call today.",
};

const services = [
  { icon: Heart, title: "Spouse & Partner Visas", href: "/uk-spouse-visa/", desc: "Applications, extensions, and switching for partners and fiancés." },
  { icon: Shield, title: "British Citizenship", href: "/british-citizenship/", desc: "Naturalisation, marriage route, ancestry, and registration." },
  { icon: Briefcase, title: "Work Visas", href: "/immigration/", desc: "Skilled Worker, sponsor licences, and intra-company transfers." },
  { icon: GraduationCap, title: "Student Visas", href: "/immigration/", desc: "Student route applications, extensions, and post-study options." },
  { icon: Scale, title: "Visa Appeals", href: "/immigration/", desc: "Appeals, administrative reviews, and judicial review proceedings." },
  { icon: BookOpen, title: "Asylum & Human Rights", href: "/asylum-applications/", desc: "Asylum claims, human rights applications, and protection." },
];

const team = [
  { name: "Ahrika Ghalib", role: "Principal Solicitor", area: "Immigration Law", slug: "ahrika-ghalib" },
  { name: "Adam Ejaz", role: "Solicitor", area: "Immigration Law", slug: "adam-ejaz" },
  { name: "Faisal Mahmood", role: "Solicitor", area: "Immigration Law", slug: "faisal-mahmood" },
  { name: "Mohamed Mohamed", role: "Solicitor", area: "Immigration Law", slug: "mohamed-mohamed" },
];

const remoteSteps = [
  { num: "01", icon: Phone, title: "Initial Consultation", desc: "We start with a phone or video call to understand your case, assess your eligibility, and explain your options. No need to travel." },
  { num: "02", icon: MessageSquare, title: "Document Sharing", desc: "Share your documents securely by email. We review everything, identify any gaps, and prepare your application remotely." },
  { num: "03", icon: CheckCircle2, title: "Regular Updates", desc: "We keep you informed at every stage by phone and email. You always know where your case stands without needing to visit our office." },
];

const faqs = [
  {
    q: "Do I need to visit your office for immigration advice?",
    a: "No. We serve clients across the UK through phone and video consultations. Many of our cases are handled entirely remotely. However, if you prefer an in-person meeting, you are welcome at our London or Bradford offices.",
  },
  {
    q: "How do I find the right immigration lawyer for my case?",
    a: "Look for a solicitor who specialises in your specific immigration matter, is regulated by the SRA, and offers transparent fees. At Abrahams Solicitors, all our immigration team members are specialists, and we offer a free initial consultation so you can assess whether we are the right fit.",
  },
  {
    q: "What areas of the UK do you cover?",
    a: "We serve clients nationwide, with offices in London (EC2V 8AU) and Bradford (BD1 3LS). Our remote consultation service means we can assist you regardless of where you live in the UK.",
  },
  {
    q: "Are your fees the same regardless of my location?",
    a: "Yes. Our fixed fees apply to all clients regardless of location. There are no additional charges for remote consultations or for clients based outside London.",
  },
  {
    q: "Can you represent me in court if I am not based near your offices?",
    a: "Yes. We can represent you at immigration tribunals across England and Wales. We regularly appear at tribunals outside London and can arrange representation at the venue nearest to you.",
  },
];

export default function ImmigrationLawyersPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-5">
              Nationwide Immigration Lawyers
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] tracking-tight">
              Immigration Lawyers Near Me — Nationwide UK Coverage
            </h1>
            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-2xl">
              Expert immigration solicitors serving the whole of the UK. Offices
              in London and Bradford, with phone and video consultations
              available nationwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 h-13"
              >
                <Link href="/contact-us/">
                  Find Your Immigration Lawyer
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
                <a href="tel:02033559823">
                  <Phone className="h-4 w-4 mr-2" />
                  0203 355 9823
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nationwide Service */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              How We Work
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Nationwide Service Promise
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Same High Standards",
                desc: "Whether you visit our London office or consult by video from Scotland, you receive the same dedicated service, the same specialist solicitors, and the same fixed fees.",
              },
              {
                icon: Video,
                title: "Video Consultations",
                desc: "Cannot travel to our offices? No problem. We offer face-to-face consultations by video call, making expert immigration advice accessible wherever you are in the UK.",
              },
              {
                icon: MapPin,
                title: "Two UK Offices",
                desc: "Our London (EC2V) and Bradford (BD1) offices are available for in-person consultations. Both are centrally located and easily accessible by public transport.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Expertise
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Immigration Services
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/8 flex items-center justify-center mb-5">
                  <service.icon className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-2 group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Your Solicitors
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              Meet Your Immigration Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Link
                key={member.slug}
                href={`/our-team/${member.slug}/`}
                className="group block"
              >
                <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-heading text-lg font-bold mb-5">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-heading font-bold text-brand-navy group-hover:text-brand-red transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-brand-red text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-medium">
                    {member.area}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Remote Service Process */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Remote Clients
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy leading-tight">
              How We Serve Remote Clients
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {remoteSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-heading font-bold text-brand-gold">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
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
            Speak to an Immigration Lawyer Today
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Wherever you are in the UK, our expert immigration solicitors are
            ready to help. Book a free consultation today.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/contact-us/">Free Consultation</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <a href="tel:02033559823">
                <Phone className="h-4 w-4 mr-2" />
                0203 355 9823
              </a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
