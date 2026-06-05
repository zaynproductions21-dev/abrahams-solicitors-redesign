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
    question: "Can detention be challenged?",
    answer:
      "Yes — detention must be lawful and justified. The reasons on the IS91R can be tested through a bail application or a legal challenge.",
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
        <h3>Can detention be challenged?</h3>
        <p>Yes &mdash; detention must be lawful and justified. The reasons on the IS91R can be tested through a bail application or a legal challenge.</p>
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
