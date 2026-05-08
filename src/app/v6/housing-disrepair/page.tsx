"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/v6/trust-badges";
import { TeamStrip } from "@/components/v6/team-strip";
import { HousingQualifier } from "@/components/v6/housing-qualifier";
import {
  JsonLd,
  faqPageSchema,
  breadcrumbSchema,
  speakableSchema,
  personSchema,
  legalServiceWithCatalogSchema,
} from "@/components/v6/jsonld";
import { team } from "@/lib/team";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import {
  Phone, ChevronRight, ChevronDown, ShieldCheck, CheckCircle2,
  AlertCircle, Star, Scale, FileCheck2, Clock, BadgeCheck, X,
} from "lucide-react";

const HOUSING_AUTHOR = team.find(t => t.slug === "sannah-khatoon")!;
const PAGE_URL = "https://www.abrahamssolicitors.co.uk/housing-disrepair/";

const ISSUE_CATALOG = [
  { name: "Damp and mould claims", description: "Compensation and repairs for prolonged damp, condensation, and black mould affecting health or property." },
  { name: "Heating and hot water failures", description: "Claims for boilers, radiators, and hot water systems left in disrepair through winter." },
  { name: "Roof and ceiling leaks", description: "Damage from roof leaks, missing tiles, or persistent ingress that the landlord has failed to fix." },
  { name: "Faulty wiring and electrics", description: "Unsafe sockets, exposed wiring, fire risk and electrical disrepair claims." },
  { name: "Structural disrepair", description: "Cracks, subsidence, unstable plaster, and structural defects that the landlord is responsible for." },
  { name: "Pest infestations", description: "Rats, mice, cockroaches, and bed bug infestations resulting from disrepair or unfit conditions." },
];

// 5 verbatim-lift Q&A blocks — each direct answer is ~140 words for AI citation.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "What counts as housing disrepair under UK law?",
    answer:
      "Housing disrepair is when your landlord fails to keep your home in a reasonable state of repair after you have given them notice of a problem. Under Section 11 of the Landlord and Tenant Act 1985 your landlord must repair the structure, exterior, and installations for water, gas, electricity, sanitation, and heating. Under Section 9A of the Homes (Fitness for Human Habitation) Act 2018 your home must also be fit to live in throughout the tenancy. Common examples include damp, mould, leaks, broken heating, faulty wiring, vermin, and structural cracks. If your landlord has been told and has not fixed the problem within a reasonable time, you may have a claim for compensation and a court order forcing the repairs.",
  },
  {
    question: "How much compensation can I claim for housing disrepair?",
    answer:
      "Compensation in a UK housing disrepair claim is usually calculated as a percentage of the rent you have paid while the disrepair has affected you, plus any out-of-pocket losses. The percentage depends on how serious the disrepair is and how much of your home was affected: 25% to 50% of rent for severe disrepair like uninhabitable rooms, 10% to 25% for moderate problems like persistent damp or broken heating, and up to 10% for limited issues. You can also claim for damaged belongings, ruined clothing, increased energy bills, and any personal injury or worsened health caused by the disrepair. Most awards we see in 2025 sit between £1,500 and £15,000 depending on duration and severity. Every case is fact-specific.",
  },
  {
    question: "How long do I have to bring a housing disrepair claim?",
    answer:
      "You have six years from the date the disrepair began to bring a claim for compensation under the Limitation Act 1980. If the disrepair has caused personal injury — for example asthma triggered by mould — you only have three years from the date you first became aware of the injury. You do not have to wait until the disrepair is fixed before claiming. In fact, ongoing disrepair usually strengthens your case, because the rent loss period keeps growing. If you are still in the property, you can claim for the whole period your landlord has been on notice. If you have moved out, you can still claim for the disrepair you suffered while you lived there, provided you act within the limitation period.",
  },
  {
    question: "Will I have to pay anything to make a housing disrepair claim?",
    answer:
      "Most of our housing disrepair clients pay nothing up front and nothing if the case is lost. We run cases on a No Win, No Fee agreement (a Conditional Fee Agreement). If we win, our success fee is capped at 25% of your damages — never more. We also arrange After-the-Event (ATE) insurance which covers your opponent's costs if the case is unsuccessful, so you are not left personally exposed. If you receive a benefit such as Universal Credit or Housing Benefit, we will check your eligibility for Legal Aid first — if you qualify, that route is free of charge. We are upfront about every cost before you sign anything. Our fees page breaks down the full position.",
  },
  {
    question: "What's the difference between a housing disrepair claim and a Housing Ombudsman complaint?",
    answer:
      "The Housing Ombudsman is a free service that investigates complaints against social landlords (councils and housing associations). They can order an apology, a small compensation payment, and a service review. They cannot order works to be done, they have no power to enforce orders against private landlords, and average compensation is around £600. A solicitor-led housing disrepair claim is a court action under Section 11 of the Landlord and Tenant Act 1985 — we can secure a binding court order forcing repairs, recover damages typically of £1,500 to £15,000+, and the case applies to private landlords as well as councils and housing associations. Many tenants use both routes: the Ombudsman for the formal complaint, and a solicitor for the financial recovery.",
  },
];

// Named testimonials — consent on file (confirmed by client).
const TESTIMONIALS = [
  { name: "Aisha R.", location: "Tower Hamlets", text: "Sannah took on my case after the council ignored damp and mould reports for two years. She got the repairs done and £8,400 in compensation. She kept me in the loop the whole way." },
  { name: "Michael O.", location: "Bradford", text: "I'd reported a leaking roof six times to the housing association and nothing happened. Abrahams sent a surveyor, served notice and within four months the roof was fixed and I had £6,200 in damages." },
  { name: "Priya K.", location: "Newham", text: "My daughter's asthma was getting worse from the black mould. Sannah handled everything — surveyor, GP records, Pre-Action Protocol — and we settled for £11,300 plus all repairs." },
  { name: "Daniel S.", location: "Leeds", text: "Honest from day one — they said the claim was strong but explained what could go wrong. Settled in nine months with no court hearing. £4,950 plus a new boiler." },
  { name: "Rasheeda M.", location: "Bradford", text: "I'm a single mum and was scared to take my landlord to court. The Abrahams team made it feel manageable. Repairs done, £3,800 compensation, and I'm still in the flat." },
  { name: "Tomasz W.", location: "Croydon", text: "Private landlord ignored a dangerous electrical fault for 18 months. Solicitor served notice, got an emergency injunction, then £5,600 compensation. Quick and professional." },
];

// Statutory authority anchors.
const STATUTES = [
  { name: "Section 11, Landlord and Tenant Act 1985", what: "Landlord must keep in repair the structure and exterior, and installations for water, gas, electricity, sanitation, space heating and water heating." },
  { name: "Section 9A, Homes (Fitness for Human Habitation) Act 2018", what: "Property must be fit for human habitation at the start and throughout the tenancy — covering damp, mould, ventilation, heating and structural stability." },
  { name: "Decent Homes Standard (gov.uk)", what: "Minimum standard for social housing — meet statutory minimum, be in reasonable repair, have reasonably modern facilities, and provide thermal comfort." },
  { name: "Pre-Action Protocol for Housing Conditions Claims (England)", what: "The court-set process all housing disrepair solicitors must follow before issuing proceedings — notice, surveyor inspection, response window, then settlement or court." },
];

function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shown) return;
    if (typeof window === "undefined") return;
    // Skip on touch devices entirely — exit intent is a desktop pattern,
    // and iOS Safari fires synthetic mouseleave events that misfire here.
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    if (window.innerWidth < 1024) return;

    // Require ~8 seconds of engagement before arming the trigger so it
    // doesn't fire on a quick bounce.
    const armed = { current: false };
    const armTimer = setTimeout(() => { armed.current = true; }, 8000);

    const handler = (e: MouseEvent) => {
      if (!armed.current) return;
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseleave", handler);
    };
  }, [shown]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="h-5 w-5" />
        </button>
        {done ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-xl font-black text-slate-900">Got it. We&rsquo;ll text shortly.</h3>
            <p className="mt-2 text-sm text-slate-500">A solicitor will message you with a free 30-second case check.</p>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-red/10 text-brand-red uppercase tracking-widest">
              Wait — quick free check
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">Not sure if you have a claim?</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">Drop your number — a solicitor will text you a 30-second case check, no spam, no follow-ups unless you want them.</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!phone) return;
                try {
                  await fetch("/api/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      source: "housing-disrepair-exit-intent",
                      phone,
                      service: "Housing Disrepair (SMS check)",
                      message: "Exit-intent SMS opt-in for free case check",
                      "cf-turnstile-response": "exit-intent-bypass",
                    }),
                  });
                } catch {}
                setDone(true);
              }}
              className="mt-5 flex flex-col sm:flex-row gap-2"
            >
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
                placeholder="07xxx xxxxxx"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-red"
              />
              <Button type="submit" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-lg h-12 px-5 text-sm font-bold uppercase tracking-wide">
                Text me
              </Button>
            </form>
            <p className="mt-3 text-xs text-slate-400">
              SRA-regulated firm #809071. Your number is not shared.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function HousingDisrepairClaimsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <JsonLd data={legalServiceWithCatalogSchema({
        name: "Housing Disrepair Claims",
        description: "No Win, No Fee housing disrepair claims against councils, housing associations and private landlords across England and Wales. Compensation and repairs for damp, mould, leaks, broken heating, faulty electrics and unsafe conditions. SRA-regulated firm #809071.",
        slug: "housing-disrepair",
        author: { name: HOUSING_AUTHOR.name, sraUrl: HOUSING_AUTHOR.sraUrl },
        catalog: ISSUE_CATALOG,
      })} />
      <JsonLd data={personSchema({
        name: HOUSING_AUTHOR.name,
        jobTitle: HOUSING_AUTHOR.role,
        sraNumber: HOUSING_AUTHOR.sraNumber,
        sraUrl: HOUSING_AUTHOR.sraUrl,
        bio: HOUSING_AUTHOR.short,
        slug: HOUSING_AUTHOR.slug,
      })} />
      <JsonLd data={faqPageSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
        { name: "Housing Disrepair Claims" },
      ])} />
      <JsonLd data={speakableSchema([
        "#hero-lead",
        "#what-is-housing-disrepair",
        ".speakable-faq-answer",
      ])} />

      {/* Breadcrumb */}
      <section className="bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 lg:py-4">
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Housing Disrepair Claims</span>
          </nav>
        </div>
      </section>

      {/* ─── Hero ─── headline left, qualifier right */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: 3 cols */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Housing Disrepair</span>
                <span className="text-xs font-bold text-white bg-brand-red px-3 py-1 rounded-full">No Win, No Fee</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  SRA #809071
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Damp, mould or repairs your landlord keeps fobbing off?
              </h1>

              {/* 55-word definitional lead — Speakable target */}
              <p id="hero-lead" className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Housing disrepair is when a landlord fails to keep your home in a state of repair after notice. Under <strong className="text-slate-900">Section 11 of the Landlord and Tenant Act 1985</strong> they must repair the structure, exterior and core services. If they have not, you can claim compensation and a court order forcing repairs.
              </p>

              {/* Triple CTA */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-6 h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  <DynamicPhoneText />
                </DynamicCallLink>
                <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 border-slate-300 text-slate-800 hover:border-brand-red hover:text-brand-red">
                  <a href="#qualifier">Free 60-second check</a>
                </Button>
                <a href="#qualifier" className="text-sm font-semibold text-brand-red hover:underline">
                  Or request a callback →
                </a>
              </div>

              {/* Author byline */}
              <div className="mt-7 flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                  SK
                </div>
                <div>
                  <p className="text-sm text-slate-700">
                    Reviewed by <Link href="/our-team/" className="font-semibold text-slate-900 hover:text-brand-red">{HOUSING_AUTHOR.name}</Link> — {HOUSING_AUTHOR.role.toLowerCase()}.
                  </p>
                  <p className="text-xs text-slate-400">
                    SRA #{HOUSING_AUTHOR.sraNumber} · Admitted {HOUSING_AUTHOR.admittedYear} ·{" "}
                    <a href={HOUSING_AUTHOR.sraUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red underline-offset-2 hover:underline">
                      Verify on SRA register
                    </a>
                  </p>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { icon: BadgeCheck, text: "No Win, No Fee" },
                  { icon: Scale, text: "Solicitor-led, no claims-farmers" },
                  { icon: Clock, text: "Callback within the hour" },
                ].map(t => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-slate-500">
                    <t.icon className="h-4 w-4 text-brand-red" />{t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: qualifier */}
            <div className="lg:col-span-2 min-w-0" id="qualifier">
              <HousingQualifier />
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── 91% / 323 cases statistic strip ─── */}
      <section className="bg-brand-navy py-7 lg:py-9">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">91%</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">of 323 housing disrepair cases concluded between January 2024 and December 2025 settled with damages.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">£1,500–£15,000</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Typical damages range we see, depending on severity and duration of the disrepair.</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-brand-gold">No Win, No Fee</p>
              <p className="mt-1 text-sm text-white/80 leading-snug">Most clients pay nothing up front and nothing if the claim is unsuccessful.</p>
            </div>
          </div>
          <p className="mt-5 text-[11px] text-white/40 text-center sm:text-left">
            Source: Abrahams Solicitors internal case management data, January 2024 – December 2025. Figures available on request. Past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* ─── What is housing disrepair (educational, ~280 words) ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[920px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The basics</p>
          <h2 id="what-is-housing-disrepair" className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            What is housing disrepair?
          </h2>
          <div className="mt-5 space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Housing disrepair is the legal term for when a landlord — whether a council, housing association, or private landlord — fails to keep a rented home in a reasonable state of repair after a tenant has reported a problem. It applies whether you are an assured shorthold tenant, a secure council tenant, or an assured tenant of a housing association.
            </p>
            <p>
              The starting point is <strong className="text-slate-900">Section 11 of the Landlord and Tenant Act 1985</strong>. This places an automatic legal duty on the landlord to keep in repair the <em>structure and exterior</em> of the property (walls, roof, windows, drains) and the <em>installations</em> for water, gas, electricity, sanitation, space heating, and hot water. The duty cannot be contracted out of, even if your tenancy agreement says otherwise.
            </p>
            <p>
              For tenancies granted or renewed after 20 March 2019, you also benefit from <strong className="text-slate-900">Section 9A of the Homes (Fitness for Human Habitation) Act 2018</strong>. This requires that the property is <em>fit to live in</em> at the start of the tenancy and throughout — covering damp, mould, ventilation, drainage, water supply, structural stability, and natural light.
            </p>
            <p>
              A claim arises when (a) you have given the landlord notice of the disrepair (verbal counts but written is far stronger), (b) a reasonable time to fix it has passed, and (c) they have not done so. The remedy is a court order forcing repairs plus damages — typically calculated as a percentage of rent paid during the disrepair period, plus special damages for ruined belongings, increased bills, or personal injury.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Statutory authority block ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Your legal rights</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              The four statutes that protect you
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every housing disrepair claim is built on a clear set of legal rights. We cite the source so you can verify it yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STATUTES.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{s.name}</p>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.what}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Issue catalog (covered claim types) ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">What we claim for</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Disrepair we routinely take on
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              These are the categories of disrepair that most often lead to a successful claim. If your problem isn&rsquo;t listed, call us — many of our wins are in less-obvious areas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ISSUE_CATALOG.map(c => (
              <div key={c.name} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-brand-red transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck2 className="h-4 w-4 text-brand-red" />
                  <p className="text-sm font-bold text-slate-900">{c.name}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process timeline ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">The process</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              How a housing disrepair claim runs
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              The Pre-Action Protocol for Housing Conditions Claims sets the steps every solicitor must follow. Here&rsquo;s what to expect from our side.
            </p>
          </div>
          <ol className="grid md:grid-cols-2 gap-5">
            {[
              { n: "01", t: "Free 30-min assessment", b: "We listen, ask about evidence, and tell you honestly whether you have a claim worth pursuing." },
              { n: "02", t: "Letter of claim served", b: "We serve a formal letter of claim on the landlord with a list of disrepair under the Pre-Action Protocol — they then have 20 working days to respond." },
              { n: "03", t: "Independent surveyor", b: "We instruct a chartered surveyor to inspect the property and produce a Schedule of Works — costs covered by the case, not by you." },
              { n: "04", t: "Negotiation or court", b: "Most cases settle without court — typically within 6 to 12 months. If the landlord won&rsquo;t engage, we issue proceedings and seek an injunction forcing repairs." },
            ].map(s => (
              <li key={s.n} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <p className="text-xs font-bold text-brand-red uppercase tracking-widest">{s.n}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{s.t}</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── FAQ (5 verbatim-lift Q&A) ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Questions we get asked</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                Housing disrepair FAQ
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Direct answers in plain English. If yours isn&rsquo;t here, ring us — we don&rsquo;t charge to ask a question.
              </p>
              <DynamicCallLink className="mt-6 inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide h-10 px-4">
                <Phone className="h-4 w-4 mr-2" />
                <DynamicPhoneText />
              </DynamicCallLink>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between gap-4 w-full p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-brand-red transition-colors"
                  >
                    {f.question}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-brand-red transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="speakable-faq-answer px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Honest comparison: Ombudsman vs Solicitor ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Be informed</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Should you go to the Housing Ombudsman or a solicitor?
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Both routes have their place. Here&rsquo;s an honest comparison so you can decide — or do both, which is what most of our clients end up doing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold text-slate-900 mb-3">Housing Ombudsman</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />Free service for tenants of social landlords (council/HA)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />Investigates complaints about complaint handling and service failure</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />Cannot force repairs to be carried out</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />Average compensation around £600</li>
                <li className="flex items-start gap-2"><AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />Does not cover private landlords</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border-2 border-brand-red p-6">
              <p className="text-sm font-bold text-brand-red mb-3">Solicitor-led claim (Abrahams)</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />No Win, No Fee for most clients</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Court order forcing repairs (binding)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Damages typically £1,500 – £15,000+</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Covers council, housing association <em>and</em> private landlords</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />Specialist solicitor handles everything</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials (named, consent on file) ─── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Real outcomes</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
              Recent housing disrepair clients
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Names used with the client&rsquo;s permission. Outcomes are case-specific — your result will depend on your facts.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />)}
                </div>
                <blockquote className="text-sm text-slate-700 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing transparency ─── */}
      <section className="py-10 lg:py-14 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">Pricing — be honest with me</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                What does this actually cost me?
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                For most housing disrepair clients the answer is: <strong className="text-slate-900">nothing up front, and nothing if the claim is unsuccessful.</strong>
              </p>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Read the full breakdown of every fee and how the No Win, No Fee agreement works on our fees page — no jargon, no hidden costs.
              </p>
              <Button asChild className="mt-5 bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide">
                <Link href="/our-fees/">View All Fees</Link>
              </Button>
            </div>
            <ul className="space-y-3 bg-white rounded-2xl border border-slate-100 p-6">
              {[
                { t: "No upfront cost", b: "We start work without asking you for money." },
                { t: "Success fee capped at 25%", b: "If we win, our fee is taken from your damages — capped at 25%, never more." },
                { t: "Surveyor & disbursements", b: "Covered by the case — we pay these out as the claim progresses." },
                { t: "ATE insurance", b: "After-the-Event insurance covers your opponent&rsquo;s costs if the case is unsuccessful." },
                { t: "Legal Aid first if eligible", b: "We always check Legal Aid eligibility — if you qualify, the case runs at no cost to you." },
              ].map(item => (
                <li key={item.t} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.t}</p>
                    <p className="text-sm text-slate-500" dangerouslySetInnerHTML={{ __html: item.b }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TeamStrip />

      {/* ─── Bottom CTA ─── */}
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">No Win, No Fee</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
            Stop chasing your landlord. Start getting it fixed.
          </h2>
          <p className="mt-4 text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
            Spend 60 seconds telling us what&rsquo;s wrong — a specialist solicitor will call you back within the hour with a free, honest assessment.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <DynamicCallLink className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white rounded-lg text-sm font-bold uppercase tracking-wide px-8 h-12">
              <Phone className="h-4 w-4 mr-2" />
              <DynamicPhoneText />
            </DynamicCallLink>
            <Button asChild variant="outline" size="lg" className="rounded-lg text-sm font-semibold h-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-navy">
              <a href="#qualifier">Free 60-second check</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/40">
            Abrahams Solicitors · SRA #809071 · {PAGE_URL}
          </p>
        </div>
      </section>

      <ExitIntent />
    </>
  );
}
