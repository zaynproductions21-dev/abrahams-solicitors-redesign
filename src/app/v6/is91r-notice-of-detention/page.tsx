/**
 * /is91r-notice-of-detention/ — informational page targeting "IS91R" /
 * "notice of detention" / "reasons for detention" (near-zero competition).
 * Drafted in PublishOS, humanised, signed off by Imran Shah (SRA #509359).
 */

import type { Metadata } from "next";
import { LegalPage } from "@/components/v6/legal-page";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/v6/jsonld";

export const metadata: Metadata = {
  title: "IS91R: The Notice of Immigration Detention Explained | Abrahams",
  description:
    "An IS91R is the notice that tells a detained person why they are being held under immigration powers. What it means, why it matters, and what you can do. SRA-regulated firm #809071.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/is91r-notice-of-detention/" },
  openGraph: {
    title: "IS91R: The Notice of Immigration Detention Explained | Abrahams",
    description:
      "An IS91R sets out why someone is detained under immigration powers — and detention can be challenged. UK immigration solicitors.",
    url: "https://www.abrahamssolicitors.co.uk/is91r-notice-of-detention/",
    type: "article",
    locale: "en_GB",
  },
};

const faqs = [
  {
    question: "Is an IS91R the same as a removal decision?",
    answer:
      "No. It explains the reasons for detention. A removal decision is separate, though the two can be connected.",
  },
  {
    question: "What is the difference between an IS91 and an IS91R?",
    answer:
      "The IS91 is the detention authority — the document that authorises and records the detention, held by the detaining location. The IS91R is the written notice given to the detained person setting out the reasons and factors behind the decision to detain. You should normally receive an IS91R; the IS91 sits with the detaining authority.",
  },
  {
    question: "What reasons are usually given on an IS91R?",
    answer:
      "The form sets out the power to detain and selects from standard reasons and factors — for example that removal is imminent, that there is a risk of absconding, that the person has insufficient close ties to make it likely they will stay in one place, or that they have previously failed to comply with conditions. A solicitor checks whether those stated reasons are actually justified on the facts.",
  },
  {
    question: "Can detention be challenged?",
    answer:
      "Yes — detention must be lawful and justified. The reasons on the IS91R can be tested through a bail application or a legal challenge.",
  },
  {
    question: "How long can someone be detained under immigration powers?",
    answer:
      "There is no fixed maximum, but detention is constrained by the Hardial Singh principles: a person may only be detained for a period that is reasonable in all the circumstances, and only where removal is realistically in prospect within that period. If those limits are exceeded, continued detention can become unlawful.",
  },
  {
    question: "How soon should we act?",
    answer: "As soon as possible — get advice the same day where you can.",
  },
];

export default function Is91rPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/" },
          { name: "IS91R Notice of Detention", url: "https://www.abrahamssolicitors.co.uk/is91r-notice-of-detention/" },
        ])}
      />
      <LegalPage eyebrow="Immigration" title="IS91R: The Notice of Immigration Detention Explained" lastUpdated="5 June 2026">
        <h2>What an IS91R is</h2>
        <p>
          The IS91R is the &ldquo;Notice to Detainee &mdash; Reasons for Detention&rdquo;. You&rsquo;ll be given this document when you&rsquo;ve been detained under immigration powers. It sets out:
        </p>
        <ul>
          <li>the <strong>power</strong> under which you&rsquo;re detained,</li>
          <li>the <strong>reasons</strong> for the decision to detain you, and</li>
          <li>the <strong>factors</strong> the Home Office says are relevant (for example a risk of absconding or imminent removal).</li>
        </ul>
        <p>It is usually issued alongside the IS91 (the detention authority document held by the detaining location).</p>

        <h2>IS91 vs IS91R: the difference</h2>
        <p>
          It helps to keep two documents apart. The <strong>IS91</strong> is the <em>detention authority</em> &mdash; the internal document that authorises the detaining location to hold the person. It is the legal instruction to detain. The <strong>IS91R</strong> is the <em>written reasons</em> notice given <em>to the detainee</em> &mdash; it tells the person, in writing, why they are being held.
        </p>
        <p>
          You should normally be given an IS91R when you are detained. If a detained person has not received written reasons, that is itself something a solicitor will want to look at, because people are entitled to know the basis on which they are being deprived of their liberty.
        </p>

        <h2>The standard reasons on the form</h2>
        <p>The IS91R sets out the statutory power to detain and then identifies the reasons and factors the Home Office relies on. These are drawn from a standard list, and commonly include:</p>
        <ul>
          <li>that <strong>removal is imminent</strong>;</li>
          <li>that there is a <strong>risk of absconding</strong> if released;</li>
          <li>that the person has <strong>insufficient close ties</strong> (for example a settled address or family) to make it likely they will stay in one place; and</li>
          <li>that the person has <strong>previously failed to comply</strong> with conditions or has used deception.</li>
        </ul>
        <p>The value of the notice is that it pins the Home Office to a stated case &mdash; which can then be tested against the actual facts.</p>

        <h2>Detention and the Hardial Singh principles</h2>
        <p>
          Immigration detention is not open-ended. The courts have long held, under what are known as the <strong>Hardial Singh principles</strong>, that the power to detain is limited: a person may be detained only for a period that is <strong>reasonable in all the circumstances</strong>, and only where <strong>removal is realistically in prospect</strong> within that period. The Home Office must also act with reasonable diligence to effect removal. If detention drifts beyond what is reasonable, or removal is no longer realistically achievable, continued detention can become unlawful even if it was lawful at the start.
        </p>

        <h2>Detention reviews and the route out</h2>
        <p>
          Detention is meant to be reviewed at regular intervals, and the justification for holding someone should be kept under review as time passes. For most people, the practical route out of detention is a <a href="/bail401-immigration-bail/">bail application (BAIL401)</a>, which can be made to the First-tier Tribunal. Where detention is unlawful &mdash; rather than simply ripe for bail &mdash; the lawfulness of detention can be challenged by judicial review.
        </p>

        <h2>How a solicitor challenges the stated reasons</h2>
        <p>
          A solicitor will scrutinise each reason on the IS91R against the evidence: is removal genuinely imminent, or is there an obstacle that makes it unrealistic? Does the person in fact have close ties and a fixed address that undercut an &ldquo;absconding&rdquo; risk? Is the detention review history sound? Where the stated reasons do not hold up &mdash; or detention has simply gone on too long under the Hardial Singh principles &mdash; the solicitor can press for release through bail or, in the right case, challenge unlawful detention directly.
        </p>

        <h2>Why it matters</h2>
        <p>
          The IS91R is important because immigration detention must be lawful and justified. The reasons and factors set out on the notice are the Home Office&rsquo;s stated basis for holding you &mdash; and they can be <strong>challenged</strong> if detention is unlawful, has lasted unreasonably long, or is no longer justified.
        </p>
        <p>Reviewing the IS91R is often the first thing a solicitor does when assessing whether detention can be challenged or whether to apply for bail.</p>

        <h2>What to do if you (or a relative) receive an IS91R</h2>
        <ul>
          <li><strong>Keep the document safe</strong> and note the date detention began.</li>
          <li><strong>Get legal advice quickly</strong> &mdash; through the <a href="/detained-duty-advice-scheme/">Detained Duty Advice Scheme (DDAS)</a> or by instructing a solicitor.</li>
          <li><strong>Consider bail</strong> &mdash; a solicitor can prepare an <a href="/bail401-immigration-bail/">immigration bail (BAIL401)</a> application.</li>
          <li><strong>Consider whether detention is lawful</strong> &mdash; including how long it has lasted and whether removal is realistically imminent.</li>
        </ul>

        <h2>How Abrahams Solicitors can help</h2>
        <p>
          We review the IS91R and detention papers, advise on whether detention can be challenged, and act quickly on bail applications and unlawful-detention claims. If someone you know has just been detained, see our <a href="/emergency-immigration-solicitor/">emergency immigration help</a> or <a href="/contact-us/">contact us</a>. We provide advice and representation; we do not guarantee release or any particular outcome.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>Is an IS91R the same as a removal decision?</h3>
        <p>No. It explains the reasons for <em>detention</em>. A removal decision is separate, though the two can be connected.</p>
        <h3>What is the difference between an IS91 and an IS91R?</h3>
        <p>The IS91 is the detention authority &mdash; the document that authorises and records the detention, held by the detaining location. The IS91R is the written notice given to the detained person setting out the reasons and factors behind the decision to detain. You should normally receive an IS91R; the IS91 sits with the detaining authority.</p>
        <h3>What reasons are usually given on an IS91R?</h3>
        <p>The form sets out the power to detain and selects from standard reasons and factors &mdash; for example that removal is imminent, that there is a risk of absconding, that the person has insufficient close ties to make it likely they will stay in one place, or that they have previously failed to comply with conditions. A solicitor checks whether those stated reasons are actually justified on the facts.</p>
        <h3>Can detention be challenged?</h3>
        <p>Yes &mdash; detention must be lawful and justified. The reasons on the IS91R can be tested through a bail application or a legal challenge.</p>
        <h3>How long can someone be detained under immigration powers?</h3>
        <p>There is no fixed maximum, but detention is constrained by the Hardial Singh principles: a person may only be detained for a period that is reasonable in all the circumstances, and only where removal is realistically in prospect within that period. If those limits are exceeded, continued detention can become unlawful.</p>
        <h3>How soon should we act?</h3>
        <p>As soon as possible &mdash; get advice the same day where you can.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
