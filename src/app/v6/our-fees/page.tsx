import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { TrustBadges } from "@/components/v6/trust-badges";
import { DynamicCallLink, DynamicPhoneText } from "@/components/v6/dynamic-phone";
import { HOURLY_RATES, fmtGbp } from "@/lib/hourly-rates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/our-fees/" },
  title: "Immigration — our prices",
  description:
    "What our immigration services cost. Fixed fees, published hourly rates, and Home Office disbursements set out separately. Approved by Imran Shah, COLP, 30 September 2026.",
};

// Compliance page — WEB-PRICE-IMM v1.1, approved by Imran Shah, COLP,
// 30 September 2026. Base copy from
// Abrahams-CCL-ToB-v2-2026-08-21/review-pack/website/
// web-price-transparency-v1.0.docx + DEV-ADDENDUM-vat-confirmed.md;
// v1.1 additions from ~/Downloads/web-price-transparency-v1.1.md +
// WEBSITE-BRIEF-v2.3.md (published hourly rates + early-termination
// position + "Who will do your work" restructured to admission dates
// with paralegal caseworkers named and supervision spelled out).
//
// SRA Transparency Rule 1.5 checklist covered here:
//   - total cost / range of costs (main fee table + hourly rates)
//   - basis of charges — fixed fees AND hourly rates
//   - disbursements + VAT on them
//   - whether VAT is included in the stated fees (four-row place of supply)
//   - services included ("What we do for you")
//   - key stages and typical timescales
//   - qualifications and experience — admission DATES not typed years
//     (a typed "14 years' PQE" rots silently; an admission date is
//     independently checkable on the SRA register)
//
// The four-row VAT place-of-supply table must be reproduced in full —
// do not collapse to "prices exclude VAT" (rows 3 and 4 are
// counter-intuitive and pull in opposite directions; removing them
// would make the page wrong for asylum and no-leave clients). Do not
// use the words "exempt", "zero-rated" or "VAT free" anywhere on this
// page.
//
// Hourly rates read from `hourly-rates.json` at the repo root, which is
// mirrored to the CRM at `config/hourly-rates.json`. TOB-IMM clause 9.4
// commits the firm to annual review — update BOTH mirrors together,
// file a new schedule_id, and run `npm run check:fees`.

const th = "py-2.5 px-3 text-left font-semibold text-slate-900 border-b border-slate-200 text-sm";
const td = "py-2.5 px-3 align-top text-sm text-slate-700 border-b border-slate-100";

export default function OurFeesPage() {
  return (
    <>
      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.15em] mb-4">Our Fees</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Immigration &mdash; our prices
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
            Last updated: 30 September 2026. Fixed fees, agreed in writing before you commit to anything. Hourly rates published below for the small number of matters we charge by the hour.
          </p>
        </div>
      </section>

      <TrustBadges />

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-base text-slate-600 leading-relaxed">
            This page sets out what our immigration services cost. It covers applications made to the Home Office. Prices are reviewed regularly, and Home Office fees usually change each spring.
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            If your matter is not listed here, or you would like a quote for something more complex, please call us on <DynamicCallLink className="text-brand-red font-semibold hover:underline"><DynamicPhoneText /></DynamicCallLink> and we will give you a figure before you commit to anything.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Our fees</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We work on an agreed fee basis for most immigration applications. An agreed fee cannot be increased, and it is agreed with you in writing before we start.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Service</th>
                  <th className={th}>Our fee (excluding VAT)</th>
                  <th className={th}>VAT at 20%</th>
                  <th className={th}>Total for a UK-resident client</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>Spouse / partner visa application</td><td className={td}>From £900</td><td className={td}>From £180</td><td className={td}><strong>From £1,080</strong></td></tr>
                <tr><td className={td}>Visa extension</td><td className={td}>From £900</td><td className={td}>From £180</td><td className={td}><strong>From £1,080</strong></td></tr>
                <tr><td className={td}>Indefinite leave to remain</td><td className={td}>From £750</td><td className={td}>From £150</td><td className={td}><strong>From £900</strong></td></tr>
                <tr><td className={td}>British citizenship</td><td className={td}>From £600</td><td className={td}>From £120</td><td className={td}><strong>From £720</strong></td></tr>
                <tr><td className={td}>Visit visa</td><td className={td}>From £500</td><td className={td}>From £100</td><td className={td}><strong>From £600</strong></td></tr>
                <tr><td className={td}>Visa refusal appeal</td><td className={td}>From £1,250</td><td className={td}>From £250</td><td className={td}><strong>From £1,500</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-lg font-bold text-slate-900">If we charge by the hour</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Almost all of our immigration work is charged at a fixed fee, agreed with you in writing before we start. Where we agree instead that work will be charged by the hour, these are our rates. They also apply where we calculate a charge for work already carried out if you end an agreement early.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Who is doing the work</th>
                  <th className={th}>Hourly rate</th>
                  <th className={th}>VAT at 20%</th>
                  <th className={th}>Total for a UK-resident client</th>
                </tr>
              </thead>
              <tbody>
                {HOURLY_RATES.rates.map((r) => (
                  <tr key={r.grade_key}>
                    <td className={td}>{r.grade_label}</td>
                    <td className={td}>{fmtGbp(r.hourly_rate)}</td>
                    <td className={td}>{fmtGbp(r.vat_at_20)}</td>
                    <td className={td}><strong>{fmtGbp(r.total_uk_resident)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Time is recorded in units of {HOURLY_RATES.unit_of_time_recording}. Where a paralegal caseworker is dealing with your matter day to day, a solicitor supervises the file and remains responsible for the work. <strong>There is no separate charge for supervision.</strong>
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We review these rates once a year and will tell you in writing before any increase takes effect.
          </p>

          <h3 className="mt-10 text-lg font-bold text-slate-900">If you end the agreement early</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            If you instruct us and then decide not to go ahead, you pay for the work we have already done, as a proportion of your agreed fee. <strong>You will never pay more than that proportion, however much time has been spent.</strong>
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Your Client Care Letter sets out, stage by stage, exactly what that proportion is and what it comes to in pounds for your matter &mdash; before you decide whether to instruct us. The charge for opening your file and completing identity checks is limited to <strong>&pound;200 for each applicant</strong>.
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Once the work is complete &mdash; your application submitted, your legal representations ready to send, or your written advice sent &mdash; no refund is due.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-5 sm:p-6">
            <p className="text-base text-slate-700 leading-relaxed">
              <strong>These are &ldquo;from&rdquo; prices.</strong> They are the starting fee for a straightforward matter of that type, and they exclude VAT. Because the fee is a starting figure, the VAT and the total are starting figures too. We give you an exact quote, in writing, before you commit to anything.
            </p>
          </div>

          <p className="mt-6 text-base text-slate-600 leading-relaxed">
            Where a matter is more complex than the description above &mdash; for example where there is a previous refusal, a criminal record, a gap in immigration history, or an unusual financial position &mdash; we will tell you before we start, and we will agree a different fee with you in writing.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">VAT</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We are VAT registered. Our VAT registration number is <strong>GB491643276</strong>.
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            <strong>Whether VAT is charged on our fees depends on where you are treated as living for VAT purposes.</strong> This is a rule about the place of supply of legal services, not a discount or an exemption &mdash; and it means the same application can cost different amounts for different clients.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Your situation</th>
                  <th className={th}>UK VAT on our fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={td}>You live <strong>outside the UK</strong> &mdash; for example a spouse or visit visa applicant applying from abroad</td>
                  <td className={td}><strong>No UK VAT</strong></td>
                </tr>
                <tr>
                  <td className={td}>You live <strong>in the UK</strong> and hold permission to be here, or you are British or settled</td>
                  <td className={td}><strong>20%</strong></td>
                </tr>
                <tr>
                  <td className={td}>You are <strong>in the UK but have never been granted permission to remain</strong> &mdash; including while an asylum claim is pending</td>
                  <td className={td}><strong>No UK VAT</strong></td>
                </tr>
                <tr>
                  <td className={td}>You <strong>were granted permission which has since expired or been revoked</strong>, and your immigration position is not yet concluded</td>
                  <td className={td}><strong>20%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-base text-slate-600 leading-relaxed">
            The table above shows VAT at 20%, which is the position for most clients living in the UK. <strong>If no UK VAT applies to you, you pay the fee in the &ldquo;our fee&rdquo; column and nothing more &mdash; there is no VAT to add.</strong>
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            <strong>Who pays the bill does not change this.</strong> If you are applying from abroad and a family member in the UK pays our invoice, you remain our client and the treatment follows your position, not theirs. If instead we are instructed by, and act for, the UK-based sponsor rather than the applicant, VAT is charged in the normal way. <strong>We will confirm in writing which applies to you before you commit to anything.</strong>
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            If your circumstances change during your matter &mdash; in particular if you are granted permission to remain &mdash; the VAT position may change from that point, and we will tell you.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">What is not included</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">Our fee covers the work described below. It does not include:</p>
          <ul className="mt-4 list-disc pl-6 space-y-1.5 text-base text-slate-600 leading-relaxed">
            <li>any appeal, administrative review or judicial review following a refusal;</li>
            <li>any separate application for a dependant not named in your quote;</li>
            <li>any application for British citizenship or naturalisation;</li>
            <li>advice on tax, or on the law of any country other than England and Wales; or</li>
            <li>Home Office fees, the Immigration Health Surcharge, or other disbursements &mdash; see below.</li>
          </ul>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">If you need any of these, we will give you a separate written quote first.</p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Disbursements</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Disbursements are payments we make to others on your behalf. They are in addition to our fees.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Disbursement</th>
                  <th className={th}>Amount</th>
                  <th className={th}>VAT</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>Home Office application fee &mdash; indefinite leave to remain</td><td className={td}>£3,226</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Home Office application fee &mdash; partner, outside the UK</td><td className={td}>£2,064</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Home Office application fee &mdash; partner, inside the UK</td><td className={td}>£1,407</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Immigration Health Surcharge</td><td className={td}>£1,035 per year, per adult</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Immigration Health Surcharge &mdash; child under 18</td><td className={td}>£776 per year</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Biometric enrolment</td><td className={td}>£0 to £200</td><td className={td}>May carry VAT</td></tr>
                <tr><td className={td}>Home Office super priority service (in the UK, optional)</td><td className={td}>£1,000</td><td className={td}>No VAT</td></tr>
                <tr><td className={td}>Home Office priority service (outside the UK, optional)</td><td className={td}>£500</td><td className={td}>No VAT</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Home Office fees and the Immigration Health Surcharge are set by the Government, not by us. They change from time to time, usually in the spring. The amount you pay is the amount in force on the day your application is submitted. The figures above are those in force from 8 April 2026, and are due for review by 1 April 2027 &mdash; call us if you are reading this after that date and we have not yet updated it.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">What we do for you</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">For a standard application, our fee covers:</p>
          <ol className="mt-4 list-decimal pl-6 space-y-2 text-base text-slate-600 leading-relaxed">
            <li><strong>Initial assessment</strong> &mdash; reviewing your circumstances and confirming which route applies to you and whether you meet the requirements.</li>
            <li><strong>Document review</strong> &mdash; checking your evidence against Home Office requirements and telling you what is missing.</li>
            <li><strong>Preparing the application</strong> &mdash; completing the application form and preparing any supporting representations.</li>
            <li><strong>Submission</strong> &mdash; submitting the application and arranging your biometrics appointment.</li>
            <li><strong>Correspondence with the Home Office</strong> &mdash; responding on your behalf to any queries before a decision.</li>
            <li><strong>The decision</strong> &mdash; advising you on the decision when it is received.</li>
          </ol>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We will also give you our written assessment of the prospects of success of your application, including any weaknesses, once we have reviewed your documents.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">How long it takes</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            These are Home Office processing times, not ours. They are targets and not guarantees, and complex cases take longer.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={th}>Application</th>
                  <th className={th}>Usual timescale</th>
                  <th className={th}>With the optional priority service</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>Partner &mdash; applying from outside the UK</td><td className={td}>Around 12 weeks</td><td className={td}>Up to 30 working days</td></tr>
                <tr><td className={td}>Partner &mdash; applying from inside the UK</td><td className={td}>Around 8 weeks</td><td className={td}>Usually next working day</td></tr>
                <tr><td className={td}>Indefinite leave to remain</td><td className={td}>Up to 6 months</td><td className={td}>Usually next working day</td></tr>
                <tr><td className={td}>Fee waiver</td><td className={td}>Around 4 to 8 weeks</td><td className={td}>Not available</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            There is no next-working-day super priority service for family or settlement applications made from outside the UK.
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our own work &mdash; preparing and submitting your application &mdash; begins as soon as we have your documents. We agree a timetable with you at the outset, and the main variable is how quickly documents reach us.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Who will do your work</h2>

          <h3 className="mt-6 text-lg font-bold text-slate-900">Solicitors</h3>
          <div className="mt-4 space-y-6">
            <div>
              <p className="text-base font-bold text-slate-900">Imran Shah &mdash; Solicitor and Director, Immigration &amp; Litigation</p>
              <p className="mt-1 text-base text-slate-600 leading-relaxed">
                Admitted as a solicitor of England and Wales on <strong>16 April 2012</strong>. Regulated by the SRA, SRA number 509359. Imran leads the immigration team.
              </p>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Humaira Anjum &mdash; Consultant Solicitor, Immigration &amp; Litigation</p>
              <p className="mt-1 text-base text-slate-600 leading-relaxed">
                Admitted as a solicitor of England and Wales on <strong>22 September 2021</strong>. Regulated by the SRA, SRA number 663190. Humaira supervises our paralegal caseworkers.
              </p>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Sannah Khatoon &mdash; Solicitor, Litigation &amp; Housing Disrepair</p>
              <p className="mt-1 text-base text-slate-600 leading-relaxed">
                Admitted as a solicitor of England and Wales on <strong>15 January 2021</strong>. Regulated by the SRA, SRA number 654258.
              </p>
            </div>
          </div>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            You can check any of our solicitors on the <a href="https://www.sra.org.uk/consumers/register/" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">SRA register</a>.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Paralegal caseworkers</h3>
          <div className="mt-4 space-y-6">
            <div>
              <p className="text-base font-bold text-slate-900">Esha Shah &mdash; Paralegal caseworker, Immigration</p>
              <p className="mt-1 text-base text-slate-600 leading-relaxed">
                Over 5 years&rsquo; experience in immigration casework.
              </p>
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Aqsa Ullah &mdash; Paralegal caseworker, Immigration</p>
              <p className="mt-1 text-base text-slate-600 leading-relaxed">
                Over 5 years&rsquo; experience in immigration casework.
              </p>
            </div>
          </div>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Esha and Aqsa are paralegal caseworkers. They are not solicitors, and their work is supervised by <strong>Humaira Anjum</strong>, Consultant Solicitor, who remains accountable for it.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Supervision</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Esha Shah and Aqsa Ullah are supervised by <strong>Humaira Anjum</strong>, Consultant Solicitor. Imran Shah and Sannah Khatoon are responsible for their own files.
          </p>

          <h3 className="mt-8 text-lg font-bold text-slate-900">Who will handle your matter</h3>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Depending on the type and complexity of your matter, your day-to-day contact may be a solicitor or a paralegal caseworker. <strong>Your Client Care Letter tells you exactly who is handling your matter, what their role is, and which solicitor supervises them.</strong> If you would prefer a solicitor to handle your matter throughout, please tell us at the outset and we will confirm whether that is possible and what it would cost.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Complaints</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            If you are unhappy with our service or our charges, please see our <Link href="/complaints/" className="text-brand-red font-semibold hover:underline">complaints procedure</Link>. Our complaints service is free.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-slate-900">Regulatory information</h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Abrahams Solicitors is the trading style of Abrahams (Yorkshire) Ltd, registered in England and Wales, company number 12942685. Registered office: Unit 20, Listerhills Science Park, Campus Road, Bradford, BD7 1HR. VAT number GB491643276.
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Authorised and regulated by the Solicitors Regulation Authority, SRA number 809071.
          </p>
        </div>
      </section>

      <section className="bg-brand-navy py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Get your written quote</h2>
          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto">
            Speak to us about your case and we will confirm your fixed fee, VAT position and any disbursements in writing before you commit to anything.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red-dark text-white rounded-xl text-base h-13 px-8">
              <Link href="/contact-us/">Request a quote</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg" className="rounded-xl text-base h-13">
              <DynamicCallLink className="inline-flex items-center"><Phone className="h-4 w-4 mr-2" /><DynamicPhoneText /></DynamicCallLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
