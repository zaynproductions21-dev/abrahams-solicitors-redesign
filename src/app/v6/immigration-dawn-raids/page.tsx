/**
 * /immigration-dawn-raids/ — informational satellite for "immigration dawn
 * raid" / "what to do in a dawn raid". Conversion target is the emergency
 * page; this explains rights and links UP to it (no cannibalisation).
 * Drafted in PublishOS, humanised, signed off by Imran Shah (SRA #509359).
 */

import type { Metadata } from "next";
import { LegalPage } from "@/components/v6/legal-page";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/v6/jsonld";

export const metadata: Metadata = {
  title: "Immigration Dawn Raids: Your Rights and What to Do | Abrahams",
  description:
    "Immigration Enforcement can visit homes and businesses, often early in the morning. Know your rights during a dawn raid and what to do — and what not to do. SRA-regulated firm #809071.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/immigration-dawn-raids/" },
  openGraph: {
    title: "Immigration Dawn Raids: Your Rights and What to Do | Abrahams",
    description:
      "Your rights during an immigration enforcement visit — what to do, what not to sign, and how to get urgent help. UK immigration solicitors.",
    url: "https://www.abrahamssolicitors.co.uk/immigration-dawn-raids/",
    type: "article",
    locale: "en_GB",
  },
};

const faqs = [
  {
    question: "Do immigration officers always need a warrant?",
    answer:
      "Not always — it depends on the type and basis of the visit. You can still ask to see identification and the legal basis.",
  },
  {
    question: "Can I refuse to answer questions?",
    answer:
      "You are generally not obliged to answer questions that could incriminate you, and you can ask to speak to a solicitor first.",
  },
  {
    question: "Should I sign anything officers put in front of me?",
    answer:
      "Be very careful. Do not sign documents you do not understand, and in particular do not sign anything agreeing to leave the UK voluntarily without first taking legal advice. Signing the wrong document can have serious consequences for your immigration position. Ask to speak to a solicitor before signing.",
  },
  {
    question: "What usually happens after a dawn raid?",
    answer:
      "Depending on the circumstances, a person may be arrested and taken into immigration detention, served with an IS91/IS91R setting out the reasons for detention, and given removal directions. From detention, the route out is usually a bail application, and a solicitor can also check whether the detention is lawful.",
  },
  {
    question: "What should an employer do during a right-to-work visit?",
    answer:
      "Stay cooperative, ask for ID, keep records of the visit, and take legal advice before responding to any penalty notice.",
  },
];

export default function ImmigrationDawnRaidsPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/" },
          { name: "Immigration Dawn Raids", url: "https://www.abrahamssolicitors.co.uk/immigration-dawn-raids/" },
        ])}
      />
      <LegalPage eyebrow="Immigration" title="Immigration Dawn Raids: Your Rights and What to Do" lastUpdated="5 June 2026">
        <h2>What an immigration dawn raid is</h2>
        <p>
          A &ldquo;dawn raid&rdquo; is an Immigration Enforcement visit, often made early in the morning, to a home or business &mdash; to question, arrest or detain people suspected of immigration offences, or to carry out a <strong>right-to-work</strong> inspection at a business. Officers may attend with or without a warrant depending on the type of visit.
        </p>
        <p>These visits are stressful and fast-moving, so knowing your rights in advance matters.</p>

        <h2>The powers officers use</h2>
        <p>
          Immigration officers exercise powers given to them under the Immigration Acts. Broadly, a visit may take place either <strong>with a warrant</strong> &mdash; obtained from a court to enter and search premises &mdash; or, in some circumstances, <strong>without a warrant</strong> where the law allows it, for example certain business or right-to-work inspections, or where there is power to arrest. Officers can have powers to enter, search premises, and search and arrest individuals, but those powers have limits and conditions attached to them.
        </p>
        <p>
          Because the basis of a visit affects what officers are entitled to do, it is reasonable and sensible to ask, calmly, to see identification and to understand the legal basis on which they are attending.
        </p>

        <h2>Your rights during a visit</h2>
        <ul>
          <li><strong>Ask to see identification and any warrant.</strong> You can ask officers to show ID and explain the legal basis for the visit.</li>
          <li><strong>You do not have to answer questions</strong> beyond what you are legally required to provide. You can say you wish to speak to a solicitor first.</li>
          <li><strong>You have the right to legal advice.</strong> Ask to contact a solicitor.</li>
          <li><strong>Do not sign anything you do not understand</strong>, and do not sign documents agreeing to leave the UK voluntarily without advice.</li>
          <li><strong>Stay calm, be polite, and do not obstruct officers</strong> &mdash; but you are not obliged to volunteer information that could harm your position.</li>
        </ul>

        <h2>What typically follows a visit</h2>
        <p>Where officers act on a visit, the sequence that follows often includes some or all of:</p>
        <ul>
          <li><strong>Arrest</strong> of a person suspected of an immigration offence or who is liable to removal;</li>
          <li><strong>Detention</strong> under immigration powers;</li>
          <li>service of an <a href="/is91r-notice-of-detention/">IS91/IS91R</a> setting out the reasons for detention; and</li>
          <li><strong>removal directions</strong> in due course where removal is intended.</li>
        </ul>
        <p>Each of these steps can be examined and, where appropriate, challenged &mdash; which is why getting a solicitor involved quickly matters.</p>

        <h2>If you are detained</h2>
        <p>
          If you are taken into immigration detention, you can access free initial advice through the <a href="/detained-duty-advice-scheme/">Detained Duty Advice Scheme (DDAS)</a>, and a solicitor can help you apply for <a href="/bail401-immigration-bail/">immigration bail (BAIL401)</a> and challenge the lawfulness of your detention.
        </p>

        <h2>Practical steps to take immediately</h2>
        <ul>
          <li><strong>Stay calm and do not obstruct officers</strong>, but do not volunteer information that could harm your position.</li>
          <li><strong>Ask to call a solicitor</strong> as early as you can.</li>
          <li><strong>Note what happens</strong> &mdash; the time, officers&rsquo; names or numbers, and what is said and done.</li>
          <li><strong>Do not sign anything</strong> you do not understand, especially a voluntary departure document, without advice.</li>
          <li><strong>Tell a family member or friend</strong> where you are so they can help arrange representation if you are detained.</li>
        </ul>

        <h2>For businesses: illegal-working civil penalties</h2>
        <p>
          If officers attend your workplace for a right-to-work check, you may face a <strong>civil penalty</strong> for each worker found without the right to work, unless you can show a <strong>statutory excuse</strong> from having carried out compliant right-to-work checks before employment began. The penalty regime sits under the illegal-working provisions of the Immigration Acts, and penalty levels and the detail of the checks change over time &mdash; check the current position on GOV.UK.
        </p>
        <p>
          If you receive a <strong>civil penalty notice</strong>, there is usually a process to object and then to appeal, with deadlines. Keep records of the visit and your right-to-work documentation, and take advice before responding so any statutory-excuse argument is properly made within time.
        </p>

        <h2>How Abrahams Solicitors can help</h2>
        <p>
          We act urgently for individuals and businesses affected by immigration enforcement &mdash; advising on rights during a visit, representing detained clients, applying for bail, and defending employer civil penalties. For an urgent situation, see our <a href="/emergency-immigration-solicitor/">emergency immigration help</a> or <a href="/contact-us/">contact us</a>. We provide advice and representation; we do not guarantee any particular outcome.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>Do immigration officers always need a warrant?</h3>
        <p>Not always &mdash; it depends on the type and basis of the visit. You can still ask to see identification and the legal basis.</p>
        <h3>Can I refuse to answer questions?</h3>
        <p>You are generally not obliged to answer questions that could incriminate you, and you can ask to speak to a solicitor first.</p>
        <h3>Should I sign anything officers put in front of me?</h3>
        <p>Be very careful. Do not sign documents you do not understand, and in particular do not sign anything agreeing to leave the UK voluntarily without first taking legal advice. Signing the wrong document can have serious consequences for your immigration position. Ask to speak to a solicitor before signing.</p>
        <h3>What usually happens after a dawn raid?</h3>
        <p>Depending on the circumstances, a person may be arrested and taken into immigration detention, served with an IS91/IS91R setting out the reasons for detention, and given removal directions. From detention, the route out is usually a bail application, and a solicitor can also check whether the detention is lawful.</p>
        <h3>What should an employer do during a right-to-work visit?</h3>
        <p>Stay cooperative, ask for ID, keep records of the visit, and take legal advice before responding to any penalty notice.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
