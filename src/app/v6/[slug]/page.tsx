"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { submitEnquiry } from "@/lib/publishos";
import {
  CheckCircle2, ArrowRight, Phone, ChevronRight, ChevronDown,
  MessageCircle, Mail, Star, Shield, PoundSterling, Headset,
} from "lucide-react";
import {
  getServicePage, immigrationPages, personalInjuryPages, housingPage,
} from "@/lib/services-data";

function stripHeadingPrefix(text: string): string {
  return text.replace(/^\s*(H[1-6]|Meta\s*Title|Meta\s*Description|Meta|Title|Heading)\s*:\s*/i, "");
}

function RichContent({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);
  return (
    <div className="space-y-4 text-base text-slate-500 leading-relaxed">
      {blocks.map((block, idx) => {
        const lines = block.split("\n").map(l => stripHeadingPrefix(l.trim())).filter(Boolean);
        const bulletChars = ["•", "✓", "-", "*"];
        const isBulletLine = (l: string) => bulletChars.some(c => l.startsWith(c + " ") || l.startsWith(c));
        const allBullets = lines.length > 1 && lines.slice(1).every(isBulletLine);
        const heading = allBullets && !isBulletLine(lines[0]) ? lines[0] : null;
        const items = heading ? lines.slice(1) : lines.filter(isBulletLine);
        const textLines = heading ? [] : lines.filter(l => !isBulletLine(l));

        if (items.length > 0) {
          return (
            <div key={idx}>
              {heading && <p className="font-semibold text-slate-900 mb-2">{heading}</p>}
              {textLines.length > 0 && (
                <p className="mb-2">{textLines.join(" ")}</p>
              )}
              <ul className="space-y-2 pl-0">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-1" />
                    <span>{item.replace(/^[•✓\-*]\s*/, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return <p key={idx}>{block}</p>;
      })}
    </div>
  );
}

function ConsultationForm({ serviceName, defaultService = "" }: { serviceName: string; defaultService?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [caseDescription, setCaseDescription] = useState("");

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-7">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Free {serviceName} Consultation</h3>
      <p className="text-sm text-slate-400 mb-5">Speak to a solicitor today — no obligation.</p>
      <form onSubmit={async (e) => { e.preventDefault(); pushFormSubmit({ email, phone }); await submitEnquiry({ source: `service-page:${serviceName}`, name, email, phone, service, case: caseDescription }); window.location.href = `/v6/thank-you/`; }} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required className={inputClass} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required className={inputClass} />
        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className={inputClass} />
        <select value={service} onChange={e => setService(e.target.value)} required className={`${inputClass} appearance-none bg-white`}>
          <option value="">Service Required</option>
          <option value="spouse-visa">Spouse Visa</option>
          <option value="british-citizenship">British Citizenship</option>
          <option value="visa-extension">Visa Extension</option>
          <option value="ilr">ILR Application</option>
          <option value="asylum">Asylum Application</option>
          <option value="visit-visa">Visit Visa</option>
          <option value="housing-disrepair">Housing Disrepair</option>
          <option value="personal-injury">Personal Injury</option>
          <option value="other">Other</option>
        </select>
        <textarea value={caseDescription} onChange={e => setCaseDescription(e.target.value)} placeholder="Briefly describe your case" rows={3} className={`${inputClass} resize-none`} />
        <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 text-sm font-bold uppercase tracking-wide">
          Get Free Advice
        </Button>
      </form>
    </div>
  );
}

export default function V6ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getServicePage(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!page) return <div className="py-40 text-center text-slate-400">Page not found</div>;

  // Determine pricing display
  const isHousing = slug.includes("housing") || slug.includes("disrepair");
  const isCitizenship = slug.includes("citizenship") || slug.includes("naturalisation");
  const priceLabel = isHousing ? "No Win, No Fee" : "From £240*";

  return (
    <>
      {/* ─── Hero ─── Porto-style: white bg, bold heading left, form right */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400 mb-4 overflow-hidden">
                <Link href="/v6/" className="hover:text-brand-red transition-colors shrink-0">Home</Link>
                <ChevronRight className="h-3 w-3 shrink-0" />
                {page.parentService && page.parentHref && (
                  <>
                    <Link href={`/v6${page.parentHref}`} className="hover:text-brand-red transition-colors truncate max-w-[110px] sm:max-w-none">{page.parentService}</Link>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                  </>
                )}
                <span className="text-slate-600 font-medium truncate">{page.title}</span>
              </nav>

              {/* Badge + price */}
              <div className="flex items-center gap-3 mb-4">
                {page.badge && (
                  <span className="text-xs font-bold text-brand-red uppercase tracking-widest">{page.badge}</span>
                )}
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">{priceLabel}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                {stripHeadingPrefix(page.heroTitle)}
              </h1>
              <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-xl">{stripHeadingPrefix(page.heroDescription)}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
                  <a href="#consultation-form">Book Free Consultation</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red">
                  <a href="tel:02034880512"><Phone className="h-4 w-4 mr-2" />020 3488 0512</a>
                </Button>
              </div>

              {/* Trust strip */}
              <div className="flex items-center gap-6 mt-6 pt-5 border-t border-slate-100">
                {[
                  { icon: Headset, text: "Direct solicitor access" },
                  { icon: PoundSterling, text: "Fixed fees" },
                  { icon: Shield, text: "SRA regulated" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-slate-400">
                    <t.icon className="h-4 w-4 text-brand-red" />{t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 2 cols — consultation form */}
            <div className="lg:col-span-2 min-w-0" id="consultation-form">
              <ConsultationForm serviceName={page.title} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content sections ─── alternating layout */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 space-y-10 lg:space-y-14">
          {page.sections.map((section, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-3">
                  {stripHeadingPrefix(section.title)}
                </h2>
                <RichContent text={section.content} />
                {section.items && (
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={`bg-slate-50 rounded-2xl aspect-[4/3] flex items-center justify-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <div className="text-center">
                  <div className="text-6xl font-black text-brand-red/10">{String(i + 1).padStart(2, "0")}</div>
                  <p className="text-sm text-slate-400 mt-2">{stripHeadingPrefix(section.title)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing callout ─── */}
      <section className="border-y border-slate-100 py-8 bg-slate-50/50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-1">Pricing</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{page.title}: <span className="text-brand-red">{priceLabel}</span></h3>
              <p className="text-sm text-slate-400 mt-1">{priceLabel.includes("*") ? "*Consultation fee. Full service fees vary by case — see our fees page." : "Clear, upfront pricing with no hidden costs. Free initial consultation."}</p>
            </div>
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12 shrink-0">
              <Link href="/v6/our-fees/">View All Fees</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── Porto-style split layout */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="py-10 lg:py-14">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Common Questions</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                  {page.title} FAQ
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Plain-English answers to the questions we hear most often about {page.title.toLowerCase()}.
                </p>
                <Button asChild className="mt-6 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                  <Link href="/v6/contact-us/">Ask Us Anything</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {page.faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm font-bold text-slate-900 hover:text-brand-red transition-colors">
                      {stripHeadingPrefix(faq.question)}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{stripHeadingPrefix(faq.answer)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Testimonial strip ─── */}
      <section className="bg-slate-50/60 py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-red text-brand-red" />)}
            </div>
            <blockquote className="text-lg sm:text-xl text-slate-700 leading-relaxed italic">
              &ldquo;Abrahams Solicitors handled my case with incredible professionalism. They made a stressful process feel manageable and kept me informed at every stage.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-bold text-slate-900">Sarah M.</p>
            <p className="text-xs text-slate-400">Immigration Client</p>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA with form (Porto double-form pattern) ─── */}
      <section className="bg-brand-navy py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                Ready to Discuss Your {page.title} Case?
              </h2>
              <p className="mt-4 text-white/50 text-base leading-relaxed">
                Book a free consultation with one of our specialist solicitors. We offer phone, video, and in-person appointments nationwide.
              </p>
              <div className="mt-6 space-y-3">
                <a href="tel:02034880512" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" /><span className="text-lg font-bold">020 3488 0512</span>
                </a>
                <a href="https://wa.me/442034880512" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                  <MessageCircle className="h-4 w-4" />WhatsApp Us
                </a>
                <a href="mailto:info@abrahamssolicitors.co.uk" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                  <Mail className="h-4 w-4" />info@abrahamssolicitors.co.uk
                </a>
              </div>
            </div>
            <ConsultationForm serviceName={page.title} />
          </div>
        </div>
      </section>
    </>
  );
}
