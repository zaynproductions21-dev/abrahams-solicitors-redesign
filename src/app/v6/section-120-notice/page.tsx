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
    question: "What is a Statement of Additional Grounds?",
    answer:
      "It is the document you use to respond to a section 120 notice. On it you set out, in one place, every ground on which you say you should be allowed to stay and every reason your removal would be unlawful — for example asylum, human rights, or family and private life. It is your chance to put all your arguments on the record.",
  },
  {
    question: "Can I add new reasons after I've replied?",
    answer:
      "Possibly, but later grounds can be treated as a 'new matter' that needs Home Office consent. It is far safer to include everything in your first response.",
  },
  {
    question: "What is section 96 and how can it lose me an appeal right?",
    answer:
      "Section 96 of the Nationality, Immigration and Asylum Act 2002 allows the Home Office to certify a later claim or ground where it could and should have been raised in response to an earlier one-stop notice. If a ground is certified under section 96, you may lose the right to appeal on that ground. That is precisely why a section 120 response should be complete and on time.",
  },
  {
    question: "Is a Section 120 notice the same as a refusal?",
    answer:
      "No. It is a request for your full grounds to remain, often issued alongside or before a decision.",
  },
  {
    question: "How long do I have to respond to a Section 120 notice?",
    answer:
      "You must respond within the time stated on the notice itself. Deadlines vary and can be short, so check the notice carefully and the current guidance on GOV.UK, and get advice quickly so a full response can be prepared in time.",
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

        <h2>The Statement of Additional Grounds</h2>
        <p>
          The way you respond to a section 120 notice is by completing a <strong>Statement of Additional Grounds</strong>. This is the document on which you set out, in a single place, <strong>all</strong> the grounds on which you say you should be allowed to stay in the UK, and all the reasons you say a decision to remove you would be unlawful.
        </p>
        <p>
          The point of the statement is comprehensiveness. It should capture every relevant ground &mdash; protection (asylum), human rights (Article 8 family and private life, Article 3), medical grounds, and any other basis &mdash; together with the facts and, where possible, the evidence behind each one. Treat it as your one opportunity to put your complete case on the record.
        </p>

        <h2>Why later grounds can be certified under section 96</h2>
        <p>
          The reason a section 120 notice is so important is the &ldquo;one-stop&rdquo; appeal regime that sits behind it. Under <strong>section 96 of the Nationality, Immigration and Asylum Act 2002</strong>, the Home Office can <em>certify</em> a later claim or ground where you were served with a one-stop notice and the new ground could and should have been raised at that stage but was not. The effect of a section 96 certificate can be to <strong>remove your right of appeal</strong> on that ground.
        </p>
        <p>
          In other words, grounds raised late can be treated as exactly that &mdash; late &mdash; and shut out of an appeal. That is the mechanism the one-stop system uses to discourage people from holding arguments back. You can read sections 96 and 120 on <a href="https://www.legislation.gov.uk/ukpga/2002/41/contents" rel="nofollow">legislation.gov.uk</a>.
        </p>

        <h2>How to respond properly and on time</h2>
        <ul>
          <li><strong>Note the deadline immediately</strong> &mdash; the time to respond is stated on the notice and can be short.</li>
          <li><strong>Identify every ground</strong> that applies to you, not just the most obvious one.</li>
          <li><strong>Put the facts and evidence behind each ground</strong>, rather than naming grounds in the abstract.</li>
          <li><strong>Keep a copy</strong> of what you submit and proof that it was sent in time.</li>
          <li><strong>Get advice before you respond</strong> &mdash; an incomplete statement is hard to fix once the deadline has passed.</li>
        </ul>

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
        <h3>What is a Statement of Additional Grounds?</h3>
        <p>It is the document you use to respond to a section 120 notice. On it you set out, in one place, every ground on which you say you should be allowed to stay and every reason your removal would be unlawful &mdash; for example asylum, human rights, or family and private life. It is your chance to put all your arguments on the record.</p>
        <h3>Can I add new reasons after I&rsquo;ve replied?</h3>
        <p>Possibly, but later grounds can be treated as a &ldquo;new matter&rdquo; that needs Home Office consent. It&rsquo;s far safer to include everything in your first response.</p>
        <h3>What is section 96 and how can it lose me an appeal right?</h3>
        <p>Section 96 of the Nationality, Immigration and Asylum Act 2002 allows the Home Office to certify a later claim or ground where it could and should have been raised in response to an earlier one-stop notice. If a ground is certified under section 96, you may lose the right to appeal on that ground. That is precisely why a section 120 response should be complete and on time.</p>
        <h3>Is a Section 120 notice the same as a refusal?</h3>
        <p>No. It&rsquo;s a request for your full grounds to remain, often issued alongside or before a decision.</p>
        <h3>How long do I have to respond to a Section 120 notice?</h3>
        <p>You must respond within the time stated on the notice itself. Deadlines vary and can be short, so check the notice carefully and the current guidance on GOV.UK, and get advice quickly so a full response can be prepared in time.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
