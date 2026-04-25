import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Train,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Abrahams Solicitors | Immigration & Housing Lawyers",
  description:
    "Contact expert immigration and housing solicitors. London office, nationwide coverage. Phone, email, online booking. Free consultation available.",
};

export default function ContactUsPage() {
  return (
    <SiteLayout>
      {/* ── Hero ── */}
      <section className="relative bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-navy-light/60 via-transparent to-transparent" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Contact Abrahams Solicitors
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our experienced legal team. We offer free initial
            consultations and respond to all enquiries within two working hours.
          </p>
        </div>
      </section>

      {/* ── Contact Form + Info Cards ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Contact Form */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
                Send Us a Message
              </p>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy mb-4">
                How Can We Help?
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-10">
                Complete the form below and a member of our legal team will be in
                touch. All enquiries are treated in the strictest confidence.
              </p>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-brand-navy mb-2"
                  >
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="e.g. James Wilson"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-brand-navy mb-2"
                    >
                      Email Address <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.co.uk"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-brand-navy mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 07700 900000"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-brand-navy mb-2"
                  >
                    Service Type <span className="text-brand-red">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  >
                    <option value="">Select a service&hellip;</option>
                    <option value="immigration">Immigration Law</option>
                    <option value="housing">Housing Disrepair</option>
                    <option value="personal-injury">Personal Injury</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-navy mb-2"
                  >
                    Your Message <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Please briefly describe your legal matter&hellip;"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red resize-y"
                  />
                </div>

                <p className="text-sm text-slate-400">
                  Need to send documents? Email them directly to{" "}
                  <a
                    href="mailto:info@abrahamssolicitors.co.uk"
                    className="text-brand-red hover:underline"
                  >
                    info@abrahamssolicitors.co.uk
                  </a>
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>

                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4 text-brand-gold" />
                  We respond within 2 working hours
                </p>
              </form>
            </div>

            {/* Right — Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy">
                    Phone
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-slate-500">
                  <div>
                    <p className="font-medium text-brand-navy">
                      Immigration Enquiries
                    </p>
                    <a
                      href="tel:02033559823"
                      className="text-brand-red hover:underline"
                    >
                      0203 355 9823
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-brand-navy">
                      Housing &amp; PI Enquiries
                    </p>
                    <a
                      href="tel:02033559823"
                      className="text-brand-red hover:underline"
                    >
                      0203 355 9823
                    </a>
                  </div>
                  <p className="flex items-center gap-2 pt-2 text-xs text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    Response time: same day
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy">
                    Email
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-slate-500">
                  <a
                    href="mailto:info@abrahamssolicitors.co.uk"
                    className="text-brand-red hover:underline block"
                  >
                    info@abrahamssolicitors.co.uk
                  </a>
                  <p className="flex items-center gap-2 pt-2 text-xs text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                    Response time: within 2 working hours
                  </p>
                </div>
              </div>

              {/* Emergency Card */}
              <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy">
                    Emergency
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-slate-500">
                  <p>
                    Out-of-hours contact available for urgent immigration
                    matters.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-gold shrink-0" />
                      Detention cases
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-gold shrink-0" />
                      Removal notices
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-gold shrink-0" />
                      Emergency injunctions
                    </li>
                  </ul>
                  <a
                    href="tel:02033559823"
                    className="inline-flex items-center gap-2 text-brand-red font-medium hover:underline pt-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call 0203 355 9823
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office Details ── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              Our Offices
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy">
              Visit Us in Person
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* London Office */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold text-brand-navy mb-6">
                London Office
              </h3>
              <div className="space-y-4 text-sm text-slate-500">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-brand-gold" />
                  <span>
                    Suite 10, Atlas House, 1 King Street, London EC2V 8AU
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-gold" />
                  <a
                    href="tel:02033559823"
                    className="hover:text-brand-red transition-colors"
                  >
                    0203 355 9823
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="h-5 w-5 mt-0.5 shrink-0 text-brand-gold" />
                  <span>
                    Nearest stations: Bank, Mansion House, Cannon Street
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-gold" />
                  <span>Mon&ndash;Fri 9:00am&ndash;5:30pm</span>
                </div>
              </div>
            </div>

            {/* Bradford Office */}
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-heading font-bold text-brand-navy mb-6">
                Bradford Office
              </h3>
              <div className="space-y-4 text-sm text-slate-500">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-brand-gold" />
                  <span>
                    2nd Floor, 6 Piccadilly, Bradford BD1 3LS
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-gold" />
                  <a
                    href="tel:02033559823"
                    className="hover:text-brand-red transition-colors"
                  >
                    0203 355 9823
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Train className="h-5 w-5 mt-0.5 shrink-0 text-brand-gold" />
                  <span>Nearest station: Bradford Interchange</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-gold" />
                  <span>Mon&ndash;Fri 9:00am&ndash;5:30pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Get Started ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
              How It Works
            </p>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-brand-navy">
              Get Started in Three Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Contact Us",
                description:
                  "Reach out by phone, email, or by completing the enquiry form above. Let us know about your legal matter.",
              },
              {
                step: "02",
                title: "Free Initial Consultation",
                description:
                  "We will arrange a free consultation to discuss your case in detail and advise you on the best course of action.",
              },
              {
                step: "03",
                title: "Begin Working on Your Case",
                description:
                  "Once instructed, our solicitors will get to work straight away, keeping you informed at every stage.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white font-heading font-bold text-lg mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-navy">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">
            Speak to a Solicitor
          </p>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white max-w-2xl mx-auto leading-tight">
            Prefer to Speak to Someone Directly?
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Our friendly team is available Monday to Friday, 9:00am to 5:30pm.
            Call us today for a free, no-obligation conversation about your legal
            matter.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl"
            >
              <a href="tel:02033559823">
                <Phone className="mr-2 h-4 w-4" />
                Call 0203 355 9823
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl"
            >
              <Link href="/free-consultation/">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
