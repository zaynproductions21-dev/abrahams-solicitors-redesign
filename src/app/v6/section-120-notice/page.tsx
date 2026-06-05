/**
 * /section-120-notice/ — informational page targeting "section 120 notice" /
 * "one-stop notice" (near-zero competition, high intent). Content drafted in
 * PublishOS, humanised, and signed off by Imran Shah (Director, SRA #509359).
 * Server component: exports its own metadata + JSON-LD (FAQ + breadcrumb).
 */

import type { Metadata } from "next";
import { LegalPage } from "@/components/v6/legal-page";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/v6/jsonld";

export const metadata: Metadata = {
  title: "What Is a Section 120 Notice? One-Stop Notice Explained | Abrahams",
  description:
    "A Section 120 (one-stop) notice requires you to state every reason you should be allowed to stay in the UK. What it means, your deadline, and what to do. SRA-regulated firm #809071.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/section-120-notice/" },
  openGraph: {
    title: "What Is a Section 120 Notice? One-Stop Notice Explained | Abrahams",
    description:
      "A Section 120 one-stop notice requires you to state every ground to stay in the UK. What it means and what to do — UK immigration solicitors.",
    url: "https://www.abrahamssolicitors.co.uk/section-120-notice/",
    type: "article",
    locale: "en_GB",
  },
};

const faqs = [
  {
    question: "What happens if I ignore a Section 120 notice?",
    answer:
      "You could lose the chance to raise important grounds later, and the Home Office may proceed on the information it already has. Get advice immediately.",
  },
  {
    question: "Can I add new reasons after I've replied?",
    answer:
      "Possibly, but later grounds can be treated as a 'new matter' that needs Home Office consent. It is far safer to include everything in your first response.",
  },
  {
    question: "Is a Section 120 notice the same as a refusal?",
    answer:
      "No. It is a request for your full grounds to remain, often issued alongside or before a decision.",
  },
];

export default function Section120NoticePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/" },
          { name: "Section 120 Notice", url: "https://www.abrahamssolicitors.co.uk/section-120-notice/" },
        ])}
      />
      <LegalPage eyebrow="Immigration" title="What Is a Section 120 Notice? (One-Stop Notice Explained)" lastUpdated="5 June 2026">
        <h2>What a Section 120 notice is</h2>
        <p>
          A Section 120 notice is what&rsquo;s called a &ldquo;one-stop&rdquo; notice. It&rsquo;s issued under section 120 of the Nationality, Immigration and Asylum Act 2002. When the Home Office sends you one, they&rsquo;re asking you to do something specific &mdash; set out <strong>every reason</strong> you believe you should be allowed to stay in the UK, in a single statement. That includes every ground on which you say a decision to remove you would be unlawful.
        </p>
        <p>Put simply: they want you to put all your cards on the table at once. No saving arguments for later.</p>

        <h2>Why it matters</h2>
        <p>
          If you receive a Section 120 notice and you have additional grounds to remain &mdash; perhaps a human-rights claim, a family-life situation or a protection claim &mdash; you&rsquo;re expected to raise them in your response. Leave something out and try to raise it later, and the Home Office may treat it as a <strong>&ldquo;new matter&rdquo;</strong> that can only be considered with their consent, or seek to limit your appeal rights.
        </p>
        <p>That&rsquo;s why you can&rsquo;t ignore a one-stop notice or dash off a quick reply. What you include &mdash; and what you leave out &mdash; can affect your case and any later appeal.</p>

        <h2>What to do if you receive one</h2>
        <ul>
          <li><strong>Check the deadline first.</strong> You must respond within the time stated on the notice.</li>
          <li><strong>List every ground that applies</strong> &mdash; protection/asylum, human rights (Article 8 family and private life), medical grounds, or any other reason to stay.</li>
          <li><strong>Gather supporting evidence</strong> where you can.</li>
          <li><strong>Get advice before responding</strong> &mdash; an incomplete or incorrect response is difficult to fix later.</li>
        </ul>

        <h2>How Abrahams Solicitors can help</h2>
        <p>
          Our immigration team can review your Section 120 notice, identify every ground that applies to your circumstances, and prepare a full, properly-evidenced response within the deadline. We can also advise on how the notice affects any appeal. <a href="/contact-us/">Speak to our immigration team</a> or see our <a href="/immigration-solicitors/">immigration services</a>. We provide advice and representation; we do not guarantee any particular outcome.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>What happens if I ignore a Section 120 notice?</h3>
        <p>You could lose the chance to raise important grounds later, and the Home Office may proceed on the information it already has. Get advice immediately.</p>
        <h3>Can I add new reasons after I&rsquo;ve replied?</h3>
        <p>Possibly, but later grounds can be treated as a &ldquo;new matter&rdquo; that needs Home Office consent. It&rsquo;s far safer to include everything in your first response.</p>
        <h3>Is a Section 120 notice the same as a refusal?</h3>
        <p>No. It&rsquo;s a request for your full grounds to remain, often issued alongside or before a decision.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
