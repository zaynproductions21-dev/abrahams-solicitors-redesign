/**
 * /asylum-credibility-interview/ — informational page targeting the asylum
 * substantive interview + credibility assessment (underserved, high intent).
 * Drafted in PublishOS, humanised, signed off by Imran Shah (SRA #509359).
 */

import type { Metadata } from "next";
import { LegalPage } from "@/components/v6/legal-page";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/v6/jsonld";

export const metadata: Metadata = {
  title: "The Asylum Substantive Interview & Credibility Assessment | Abrahams",
  description:
    "The substantive asylum interview is where the Home Office assesses your claim and your credibility. What to expect and how to prepare. SRA-regulated firm #809071.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/asylum-credibility-interview/" },
  openGraph: {
    title: "The Asylum Substantive Interview & Credibility Assessment | Abrahams",
    description:
      "How the asylum substantive interview and credibility assessment work, and how to prepare. UK immigration & asylum solicitors.",
    url: "https://www.abrahamssolicitors.co.uk/asylum-credibility-interview/",
    type: "article",
    locale: "en_GB",
  },
};

const faqs = [
  {
    question: "Can my solicitor attend the asylum interview?",
    answer:
      "Arrangements vary; a solicitor can advise on attendance and, importantly, prepare you beforehand and review the interview record.",
  },
  {
    question: "What if I make a mistake in the interview?",
    answer:
      "Errors can often be addressed afterwards in writing. Tell your solicitor as soon as possible.",
  },
  {
    question: "What is a credibility finding?",
    answer:
      "It is the decision-maker's assessment of whether your account is believed. It is central to most asylum decisions.",
  },
];

export default function AsylumCredibilityInterviewPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/" },
          { name: "Asylum Credibility Interview", url: "https://www.abrahamssolicitors.co.uk/asylum-credibility-interview/" },
        ])}
      />
      <LegalPage eyebrow="Asylum" title="The Asylum Substantive Interview and Credibility Assessment" lastUpdated="5 June 2026">
        <h2>What the substantive asylum interview is</h2>
        <p>
          After you claim asylum in the UK, the Home Office holds a <strong>substantive interview</strong> &mdash; the main interview where you explain, in detail, why you fear returning to your country and why you need protection.
        </p>
        <p>
          A central part of the decision is the <strong>credibility assessment</strong>: whether your account is accepted as consistent, plausible and supported. Decision-makers look at internal consistency, how your account matches country information (CPIN / country guidance), and whether you claimed at the earliest reasonable opportunity.
        </p>

        <h2>Why credibility matters so much</h2>
        <p>
          Many asylum claims succeed or fail on credibility rather than the law itself. Inconsistencies, vague dates, or accounts that don&rsquo;t match country evidence can lead to refusal &mdash; even where the underlying fear is genuine. Careful preparation is therefore critical.
        </p>

        <h2>How to prepare</h2>
        <ul>
          <li><strong>Know your own account</strong> &mdash; dates, places, events, and the timeline of what happened.</li>
          <li><strong>Be consistent</strong> with your screening interview and any written statement.</li>
          <li><strong>Explain gaps or delays</strong> &mdash; there are often good reasons (trauma, fear, lack of advice) that should be put forward.</li>
          <li><strong>Gather supporting evidence</strong> &mdash; documents, medical or expert reports, and country evidence where relevant.</li>
          <li><strong>Request adjustments</strong> if you are vulnerable (for example a female interviewer or interpreter, or breaks).</li>
        </ul>

        <h2>Related protections</h2>
        <p>
          If your situation involves trafficking or modern slavery, a separate process &mdash; the National Referral Mechanism (NRM) &mdash; may apply alongside your asylum claim. If your claim is refused, you may be able to appeal or make further submissions (a fresh claim).
        </p>

        <h2>How Abrahams Solicitors can help</h2>
        <p>
          We prepare clients thoroughly for the substantive interview &mdash; building a detailed witness statement, advising on evidence, identifying vulnerability adjustments, and representing you through decision, appeal or fresh claim. <a href="/contact-us/">Talk to our asylum team</a> or see our <a href="/immigration-solicitors/">immigration services</a>. We provide advice and representation; we do not guarantee any particular outcome.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>Can my solicitor attend the asylum interview?</h3>
        <p>Arrangements vary; a solicitor can advise on attendance and, importantly, prepare you beforehand and review the interview record.</p>
        <h3>What if I make a mistake in the interview?</h3>
        <p>Errors can often be addressed afterwards in writing. Tell your solicitor as soon as possible.</p>
        <h3>What is a credibility finding?</h3>
        <p>It&rsquo;s the decision-maker&rsquo;s assessment of whether your account is believed. It&rsquo;s central to most asylum decisions.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
