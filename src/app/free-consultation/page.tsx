import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Phone,
  Video,
  MapPin,
  FileText,
  Shield,
  Clock,
  ArrowRight,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Immigration Consultation | Expert Legal Advice | Book Now",
  description:
    "Free immigration consultation with expert solicitors. Assess your case, understand options, get clear next steps. Book your free call today.",
};

const consultationTypes = [
  {
    icon: Phone,
    title: "Phone Consultation",
    description:
      "A quick, focused 30-minute call with one of our experienced solicitors. Ideal if you need prompt advice and prefer the convenience of speaking from wherever you are. We call you at a time that suits your schedule.",
  },
  {
    icon: Video,
    title: "Video Consultation",
    description:
      "A face-to-face consultation via Zoom or Microsoft Teams. Perfect if you want to share documents on-screen and have a more personal conversation with your solicitor, all from the comfort of your home or office.",
  },
  {
    icon: MapPin,
    title: "In-Person Consultation",
    description:
      "Visit us at our London (Stratford) or Bradford office for a private, in-person meeting. Recommended for complex matters where you have extensive documentation to review or simply prefer meeting face to face.",
  },
];

const testimonials = [
  {
    quote:
      "I was overwhelmed and unsure of my immigration options. The free consultation gave me complete clarity on my case and the steps I needed to take. Within weeks, my solicitor had everything moving in the right direction. I cannot recommend Abrahams Solicitors highly enough.",
    name: "Amina R.",
    matter: "Spouse Visa Application",
  },
  {
    quote:
      "From the very first call, I felt genuinely listened to. The solicitor explained everything in plain English, outlined realistic timeframes, and there was absolutely no pressure to commit. It was the most professional and reassuring legal experience I have ever had.",
    name: "David K.",
    matter: "Indefinite Leave to Remain",
  },
];

export default function FreeConsultationPage() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Free Legal Consultation
          </p>
          <h1 className="font-heading font-bold text-white text-4xl lg:text-6xl leading-tight mb-6">
            Free Immigration Consultation&nbsp;&mdash; Expert Advice, No&nbsp;Obligation
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Speak with a qualified immigration solicitor at no cost. We will
            assess your case, review your options, and set out clear next
            steps&nbsp;&mdash; all within a single call.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
            {[
              "Comprehensive case assessment",
              "Full options review",
              "Clear, actionable next steps",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-white/90 text-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                {item}
              </span>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 py-3 h-auto"
          >
            <a href="#booking-form">
              Book Your Free 30-Minute Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* ── Two-Column: Form + Info ── */}
      <section className="py-24 lg:py-32" id="booking-form">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Booking Form */}
            <div>
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
                Request a Consultation
              </p>
              <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-6">
                Book Your Free Call
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Fill in your details below and a member of our team will be in
                touch to arrange your consultation at a time that works for you.
              </p>

              <form className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    placeholder="e.g. Sarah Ahmed"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="07xxx xxxxxx"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="immigration">Immigration</option>
                    <option value="housing-disrepair">Housing Disrepair</option>
                    <option value="personal-injury">Personal Injury</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label
                    htmlFor="contact-method"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Preferred Contact Method
                  </label>
                  <select
                    id="contact-method"
                    name="contact-method"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
                  >
                    <option value="">Select a method</option>
                    <option value="phone">Phone</option>
                    <option value="video">Video Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                {/* Case Description */}
                <div>
                  <label
                    htmlFor="case-description"
                    className="block text-sm font-medium text-brand-navy mb-1.5"
                  >
                    Brief Case Description
                  </label>
                  <textarea
                    id="case-description"
                    name="case-description"
                    rows={4}
                    placeholder="Tell us a little about your situation so we can prepare for your consultation..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red resize-y"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl w-full text-base h-auto py-3"
                >
                  Request My Free Consultation
                </Button>

                <p className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  We respond within 2 working hours
                </p>
              </form>
            </div>

            {/* Right — What to Expect */}
            <div className="space-y-10 lg:pt-16">
              {/* What Happens */}
              <div>
                <h3 className="font-heading font-bold text-brand-navy text-xl mb-4">
                  What Happens During the Consultation
                </h3>
                <ul className="space-y-3">
                  {[
                    "We listen carefully to understand your circumstances and objectives.",
                    "Your solicitor assesses the merits of your case against current legislation.",
                    "We explain the available legal routes and their realistic prospects of success.",
                    "You receive a clear outline of next steps, likely timelines, and any costs involved.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-slate-500 text-base leading-relaxed"
                    >
                      <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-heading font-bold text-brand-navy text-xl mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-gold" />
                  Documents to Have Ready
                </h3>
                <ul className="space-y-3">
                  {[
                    "Your passport and any current or expired visas",
                    "Home Office correspondence or decision letters",
                    "Proof of relationship (if applicable) such as marriage certificates",
                    "Evidence of employment, accommodation, or financial situation",
                    "Any previous legal advice or solicitor correspondence",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-slate-500 text-base leading-relaxed"
                    >
                      <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reassurance */}
              <div className="bg-slate-50 rounded-2xl p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-brand-navy text-base mb-1">
                      No Obligation, Completely Free
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      There is absolutely no obligation to instruct us after the
                      consultation. The call is free of charge, and you are
                      welcome to take your time before making any decisions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-brand-navy text-base mb-1">
                      Confidential and Legally Privileged
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Everything you share with us is protected by legal
                      professional privilege. Your information is treated with
                      the strictest confidence and will never be disclosed to
                      third parties without your express consent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation Types ── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              How We Meet
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl mb-4">
              Consultation Types
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Choose the format that suits you best. Every option provides the
              same thorough, expert legal advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center mb-5">
                  <type.icon className="h-6 w-6 text-brand-navy" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-3">
                  {type.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Client Experiences
            </p>
            <h2 className="font-heading font-bold text-brand-navy text-3xl lg:text-5xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <Quote className="h-8 w-8 text-brand-gold/30 mb-4" />
                <p className="text-slate-500 text-base leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-heading font-bold text-brand-navy text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-400 text-sm">{t.matter}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Get Started Today
          </p>
          <h2 className="font-heading font-bold text-white text-3xl lg:text-5xl mb-6">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Take the first step towards resolving your legal matter. Our expert
            solicitors are here to help, and the initial consultation is
            completely free with no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base px-8 py-3 h-auto"
            >
              <a href="#booking-form">
                Book Your Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline-light"
              className="rounded-xl text-base px-8 py-3 h-auto"
            >
              <Link href="/contact-us">Contact Our Offices</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
