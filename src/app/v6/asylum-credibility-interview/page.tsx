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
    question: "How is credibility actually assessed?",
    answer:
      "Decision-makers look at whether your account is internally consistent, whether it is consistent with the screening interview and any written statement, whether it fits the objective country-of-origin information, whether it is plausible, and whether it is supported by evidence. No single factor decides it; the assessment is made in the round.",
  },
  {
    question: "What if I make a mistake in the interview?",
    answer:
      "Errors can often be addressed afterwards in writing. Tell your solicitor as soon as possible.",
  },
  {
    question: "Can a delay in claiming asylum damage my case?",
    answer:
      "It can be a factor. Under section 8 of the Asylum and Immigration (Treatment of Claimants, etc.) Act 2004, certain behaviour — including failing to claim at the earliest reasonable opportunity — must be taken into account as potentially damaging to credibility. A genuine explanation for any delay, such as fear, trauma or lack of advice, should always be put forward.",
  },
  {
    question: "What happens after the interview?",
    answer:
      "The Home Office decides the claim. If protection is granted, you are usually given leave. If the claim is refused, you may have a right of appeal to the First-tier Tribunal (Immigration and Asylum Chamber), or you may be able to make further submissions. A solicitor can advise on the deadline and the best route.",
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

        <h2>Where the interview sits in the asylum process</h2>
        <p>
          The substantive interview is not the first step. After you claim asylum, you usually first have a <strong>screening interview</strong> &mdash; a short interview that registers your claim, takes your basic details and a brief outline of why you fear return, and deals with practical matters. The <strong>substantive interview</strong> comes later and is the detailed examination of the claim itself. Consistency between what you said at screening and what you say at the substantive interview is one of the things decision-makers look at, which is why the screening account matters even though it is brief.
        </p>

        <h2>What &ldquo;credibility&rdquo; means and how it is assessed</h2>
        <p>Credibility is the question of whether your account is believed. Decision-makers do not assess it on a single test but in the round, looking at:</p>
        <ul>
          <li><strong>Internal consistency</strong> &mdash; whether your account hangs together and is consistent across your screening interview, statement and answers.</li>
          <li><strong>Consistency with country information</strong> &mdash; whether your account fits the objective evidence about your country (Country Policy and Information Notes and country guidance).</li>
          <li><strong>Plausibility</strong> &mdash; whether the account is reasonably capable of belief, judged carefully and without unfair assumptions.</li>
          <li><strong>Supporting evidence</strong> &mdash; documents, medical or expert reports, and witness evidence where available.</li>
        </ul>

        <h2>Why credibility matters so much</h2>
        <p>
          Many asylum claims succeed or fail on credibility rather than the law itself. Inconsistencies, vague dates, or accounts that don&rsquo;t match country evidence can lead to refusal &mdash; even where the underlying fear is genuine. Careful preparation is therefore critical.
        </p>

        <h2>Section 8 and behaviour that can damage credibility</h2>
        <p>
          The law specifically requires some behaviour to be weighed against credibility. Under <strong>section 8 of the Asylum and Immigration (Treatment of Claimants, etc.) Act 2004</strong>, a decision-maker (and a tribunal on appeal) must take account, as potentially damaging to credibility, of certain conduct &mdash; for example failing to claim asylum at the earliest reasonable opportunity, using a false document, or destroying a travel document without reasonable explanation.
        </p>
        <p>
          Section 8 does not automatically defeat a claim; it is one factor among many, and there are often good reasons for the conduct it covers &mdash; trauma, fear of authorities, agents&rsquo; instructions, or a lack of early advice. Those explanations should be put forward clearly. You can read section 8 on <a href="https://www.legislation.gov.uk/ukpga/2004/19/section/8" rel="nofollow">legislation.gov.uk</a>.
        </p>

        <h2>The value of representation and an interpreter</h2>
        <p>
          You are entitled to an <strong>interpreter</strong> at the interview, and it is important that you understand and are understood in your own language and dialect &mdash; if interpretation is unclear, say so at the time. Good legal representation before the interview helps you prepare a complete and consistent account, identify the evidence that supports it, and flag any vulnerability so that appropriate adjustments are requested. A solicitor can also review the interview record afterwards and address any errors or misunderstandings in writing.
        </p>

        <h2>How to prepare</h2>
        <ul>
          <li><strong>Know your own account</strong> &mdash; dates, places, events, and the timeline of what happened.</li>
          <li><strong>Be consistent</strong> with your screening interview and any written statement.</li>
          <li><strong>Explain gaps or delays</strong> &mdash; there are often good reasons (trauma, fear, lack of advice) that should be put forward.</li>
          <li><strong>Gather supporting evidence</strong> &mdash; documents, medical or expert reports, and country evidence where relevant.</li>
          <li><strong>Request adjustments</strong> if you are vulnerable (for example a female interviewer or interpreter, or breaks).</li>
        </ul>

        <h2>What happens after the interview</h2>
        <p>
          After the substantive interview the Home Office makes a decision on the claim. There are broadly three outcomes. If your claim is accepted, you are normally <strong>granted</strong> a form of protection and given leave to remain. If it is <strong>refused</strong>, the refusal letter will explain the reasons, including any adverse credibility findings, and will usually say whether you have a <strong>right of appeal</strong> to the First-tier Tribunal (Immigration and Asylum Chamber). Where there is no in-country appeal, or after an appeal is exhausted, it may still be possible to make <strong>further submissions</strong> (a fresh claim) if there is new evidence. Appeal deadlines are short, so it is important to get advice quickly.
        </p>

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
        <h3>How is credibility actually assessed?</h3>
        <p>Decision-makers look at whether your account is internally consistent, whether it is consistent with the screening interview and any written statement, whether it fits the objective country-of-origin information, whether it is plausible, and whether it is supported by evidence. No single factor decides it; the assessment is made in the round.</p>
        <h3>What if I make a mistake in the interview?</h3>
        <p>Errors can often be addressed afterwards in writing. Tell your solicitor as soon as possible.</p>
        <h3>Can a delay in claiming asylum damage my case?</h3>
        <p>It can be a factor. Under section 8 of the Asylum and Immigration (Treatment of Claimants, etc.) Act 2004, certain behaviour &mdash; including failing to claim at the earliest reasonable opportunity &mdash; must be taken into account as potentially damaging to credibility. A genuine explanation for any delay, such as fear, trauma or lack of advice, should always be put forward.</p>
        <h3>What happens after the interview?</h3>
        <p>The Home Office decides the claim. If protection is granted, you are usually given leave. If the claim is refused, you may have a right of appeal to the First-tier Tribunal (Immigration and Asylum Chamber), or you may be able to make further submissions. A solicitor can advise on the deadline and the best route.</p>
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
