"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { pushFormSubmit } from "@/lib/tracking";
import { SlotImage } from "@/components/slot-image";
import { useSpamGuard } from "@/lib/spam-client";
import { HoneypotInput } from "@/components/v6/honeypot-input";
import { GclidField, MsclkidField } from "@/components/v6/gclid-field";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { VisaWizardWidget } from "@/components/v6/visa-wizard-widget";
import { VisitVisaRefusalWidget } from "@/components/v6/visit-visa-refusal-widget";
import { VisaWizardEntryCard } from "@/components/v6/visa-wizard-entry-card";
import { JsonLd, faqPageSchema, breadcrumbSchema, serviceSchema, personSchema } from "@/components/v6/jsonld";
import { submitEnquiry } from "@/lib/publishos";
import {
  CheckCircle2, ArrowRight, Phone, ChevronRight, ChevronDown,
  MessageCircle, Mail, Star, Shield, PoundSterling, Headset,
  Calendar, Scale, ExternalLink,
} from "lucide-react";
import {
  getServicePage, immigrationPages, personalInjuryPages, housingPage,
  SERVICE_METADATA, DEFAULT_LAST_REVIEWED,
} from "@/lib/services-data";
import { team } from "@/lib/team";

function stripHeadingPrefix(text: string): string {
  return text
    .replace(/^\s*(H[1-6]|Meta\s*Title|Meta\s*Description|Meta|Title|Heading)\s*:\s*/i, "")
    // Strip editor placeholders like "[INTERNAL LINK: /contact-us]" or "[LINK: xxx]"
    .replace(/\[\s*(INTERNAL\s+LINK|LINK|CTA|IMAGE|IMG)\s*:[^\]]*\]/gi, "")
    // Collapse any double-spacing left behind
    .replace(/[ \t]{2,}/g, " ")
    .trim();
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
        return <p key={idx}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

function ConsultationForm({ serviceName }: { serviceName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const spam = useSpamGuard();

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-7">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Free {serviceName} Consultation</h3>
      <p className="text-sm text-slate-400 mb-5">Speak to a solicitor today — no obligation.</p>
      <form onSubmit={async (e) => { e.preventDefault(); pushFormSubmit({ email, phone }); await submitEnquiry({ source: `service-page:${serviceName}`, name, email, phone, service: serviceName, case: caseDescription }, spam.payload()); window.location.href = `/thank-you/`; }} className="space-y-3">
        <HoneypotInput value={spam.honeypot} onChange={spam.setHoneypot} />
        <GclidField />
        <MsclkidField />
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required className={inputClass} />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required className={inputClass} />
        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className={inputClass} />
        <div className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600 flex items-center justify-between">
          <span>Enquiring about: <span className="font-semibold text-slate-900">{serviceName}</span></span>
        </div>
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
  // Pattern A — embed the full wizard inline on the spouse-visa hero
  // instead of the standard consultation form (v1 placement test).
  const isSpouseVisa = slug === "uk-spouse-visa" || slug === "uk-spouse-visa-solicitors";
  // Pattern A — Phase 2 — embed the visit-visa-refusal wizard on the
  // /visa-refusal-appeal/ page (same shape as the Spouse Visa embed).
  const isVisaRefusalAppeal = slug === "visa-refusal-appeal";
  // Pattern B — show the wizard entry-point CARD (links to /visa-wizard/)
  // on the immigration hub and the rest of the partner-visa cluster.
  // Excludes the page that ALREADY embeds the full wizard inline.
  const isPartnerVisaCluster =
    slug === "uk-fiance-visa" ||
    slug === "uk-partner-visa-extension" ||
    slug === "uk-unmarried-partner-visa" ||
    slug === "civil-partnership-visa";
  const showWizardEntryCard = slug === "immigration" || isPartnerVisaCluster;
  const priceLabel = isHousing ? "No Win, No Fee" : "From £240*";

  // E-E-A-T metadata: author byline, last-reviewed date, statutory framework.
  // Resolved per service from SERVICE_METADATA (Content Quality council, May 2026).
  const meta = SERVICE_METADATA[slug];
  const author = meta?.authorSlug ? team.find(t => t.slug === meta.authorSlug) : undefined;
  const lastReviewed = meta?.lastReviewed ?? (author ? DEFAULT_LAST_REVIEWED : null);

  return (
    <>
      <JsonLd data={serviceSchema({ name: stripHeadingPrefix(page.title), description: stripHeadingPrefix(page.heroDescription), slug, priceLabel })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        ...(page.parentService && page.parentHref ? [{ name: page.parentService, url: `https://www.abrahamssolicitors.co.uk${page.parentHref}` }] : []),
        { name: stripHeadingPrefix(page.title) },
      ])} />
      {page.faqs && page.faqs.length > 0 && (
        <JsonLd data={faqPageSchema(page.faqs.map(f => ({ question: stripHeadingPrefix(f.question), answer: stripHeadingPrefix(f.answer) })))} />
      )}
      {author && (
        <JsonLd data={personSchema({
          name: author.name,
          jobTitle: author.role,
          sraNumber: author.sraNumber,
          sraUrl: author.sraUrl,
          bio: author.short,
          slug: author.slug,
        })} />
      )}
      {/* ─── Breadcrumb ─── own row above hero so it reads as navigation */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400 overflow-hidden">
            <Link href="/" className="hover:text-brand-red transition-colors shrink-0">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            {page.parentService && page.parentHref && (
              <>
                <Link href={`/v6${page.parentHref}`} className="hover:text-brand-red transition-colors truncate max-w-[110px] sm:max-w-none">{page.parentService}</Link>
                <ChevronRight className="h-3 w-3 shrink-0" />
              </>
            )}
            <span className="text-slate-600 font-medium truncate">{page.title}</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── Porto-style: white bg, bold heading left, form right */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        {/* Hero image — desktop only, behind the consultation form. */}
        <div className="absolute inset-y-0 right-0 w-[55%] hidden lg:block pointer-events-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-london.jpg"
            alt="Solicitor at the London office of Abrahams Solicitors with the City of London skyline in the background"
            className="w-full h-full object-cover object-center"
            width={1536}
            height={1024}
            loading="eager"
          />
          {/* Soft fade on the left edge so the headline text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" aria-hidden="true" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
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
                <DynamicCallLink className="inline-flex items-center justify-center rounded-lg text-sm font-semibold h-12 px-6 border border-slate-200 text-slate-700 hover:border-brand-red hover:text-brand-red bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
              </div>

              {/* Author byline (E-E-A-T) — only when an author is mapped for this service */}
              {author && (
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {author.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">
                      Reviewed by <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{author.name}</Link> &mdash; {author.role.toLowerCase()}.
                    </p>
                    <p className="text-xs text-slate-400">
                      SRA #{author.sraNumber} &middot; Admitted {author.admittedYear} &middot;{" "}
                      <a href={author.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                        Verify on SRA register
                      </a>
                    </p>
                    {lastReviewed && (
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Last reviewed: {lastReviewed}
                      </p>
                    )}
                  </div>
                </div>
              )}

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
              {isSpouseVisa
                ? <VisaWizardWidget compact source={`visa-wizard-embed:${slug}`} />
                : isVisaRefusalAppeal
                ? <VisitVisaRefusalWidget compact source={`visit-visa-refusal-embed:${slug}`} />
                : <ConsultationForm serviceName={page.title} />}
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Pattern B — wizard entry-point card on the immigration hub + the
       *  spouse-visa cluster (cluster pages that don't embed the full wizard). */}
      {showWizardEntryCard && (
        <VisaWizardEntryCard
          surface={slug}
          headline={
            slug === "immigration"
              ? "Not sure which UK visa route fits you?"
              : `Compare ${stripHeadingPrefix(page.title).toLowerCase()} against other visa routes`
          }
          subhead={
            slug === "immigration"
              ? "Six plain-English questions, instant route recommendation with the rule reference. Free, no call follows automatically."
              : "Take our free 60-second wizard. We'll route you to the version of the spouse / partner visa that actually fits your facts — no call follows automatically."
          }
        />
      )}

      {/* ─── Statutory framework — only when the service has cited statutes */}
      {meta?.statutes && meta.statutes.length > 0 && (
        <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your legal framework</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                The sources of law that govern this route
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                We cite each source so you can verify it yourself.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {meta.statutes.map(s => (
                <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                      <Scale className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900">{s.name}</p>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.what}</p>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:underline">
                        Read source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <div className={`bg-slate-50 rounded-2xl aspect-[4/3] overflow-hidden relative ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <SlotImage
                  slot={`service-${slug}-${i + 1}`}
                  fallbackSrc={`https://placehold.co/1200x900/f1f5f9/dc2626/png?text=${encodeURIComponent(stripHeadingPrefix(section.title).slice(0, 40))}&font=playfair-display`}
                  alt={`${stripHeadingPrefix(page.title)} — ${stripHeadingPrefix(section.title)} (editorial photo: UK solicitor reviewing case documents with client, warm natural light, navy + gold branding)`}
                  className="w-full h-full object-cover"
                  type="service"
                  width={1200}
                  height={900}
                />
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
              <Link href="/our-fees/">View All Fees</Link>
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
                  <Link href="/contact-us/">Ask Us Anything</Link>
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

      <TeamStrip />

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
                <DynamicCallLink className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" /><span className="text-lg font-bold"><DynamicPhoneText /></span>
                </DynamicCallLink>
                <a href="https://wa.me/447476548311" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
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

      {/* ─── Price footnote + YMYL disclaimer ─── */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-5 space-y-2">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            *Fixed fee price subject to our free case assessment. All fees are quoted upfront — no hidden charges. UKVI government fees and the Immigration Health Surcharge are separate and change periodically — confirm current rates at gov.uk before applying.
          </p>
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            This page is general guidance, not legal advice. For advice on your circumstances, contact us. Abrahams Solicitors &middot; SRA-regulated firm #809071.{lastReviewed ? ` Last reviewed: ${lastReviewed}.` : ""}
          </p>
        </div>
      </section>
    </>
  );
}
