/**
 * /detained-duty-advice-scheme/ — informational satellite for "DDAS" /
 * "detained duty advice scheme". Conversion target is the emergency page;
 * this page explains the scheme and links UP to it (no cannibalisation).
 * Drafted in PublishOS, humanised, signed off by Imran Shah (SRA #509359).
 */

import type { Metadata } from "next";
import { LegalPage } from "@/components/v6/legal-page";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/components/v6/jsonld";

export const metadata: Metadata = {
  title: "The Detained Duty Advice Scheme (DDAS): Free Detention Advice | Abrahams",
  description:
    "The Detained Duty Advice Scheme (DDAS) gives people in UK immigration removal centres access to free, independent legal advice. How it works and how to get further help. SRA-regulated firm #809071.",
  alternates: { canonical: "https://www.abrahamssolicitors.co.uk/detained-duty-advice-scheme/" },
  openGraph: {
    title: "The Detained Duty Advice Scheme (DDAS): Free Detention Advice | Abrahams",
    description:
      "Free, independent legal advice for people held in UK immigration removal centres — how the DDAS works and what happens next. UK immigration solicitors.",
    url: "https://www.abrahamssolicitors.co.uk/detained-duty-advice-scheme/",
    type: "article",
    locale: "en_GB",
  },
};

const faqs = [
  {
    question: "Is DDAS advice really free?",
    answer:
      "The initial duty appointment is free regardless of means. Ongoing representation may be covered by legal aid or arranged privately.",
  },
  {
    question: "Can my family arrange a solicitor while I'm detained?",
    answer:
      "Yes. A family member can instruct a solicitor on your behalf to visit or call you.",
  },
  {
    question: "How quickly can I get a bail application in?",
    answer:
      "Bail can often be applied for promptly. Speak to a solicitor as soon as possible so it can be prepared properly.",
  },
];

export default function DdasPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://www.abrahamssolicitors.co.uk/" },
          { name: "Immigration", url: "https://www.abrahamssolicitors.co.uk/immigration-solicitors/" },
          { name: "Detained Duty Advice Scheme", url: "https://www.abrahamssolicitors.co.uk/detained-duty-advice-scheme/" },
        ])}
      />
      <LegalPage eyebrow="Immigration" title="The Detained Duty Advice Scheme (DDAS): Free Legal Advice in Immigration Detention" lastUpdated="5 June 2026">
        <h2>What the DDAS is</h2>
        <p>
          The Detained Duty Advice Scheme (DDAS) gives people detained in immigration removal centres (IRCs) in England access to <strong>free, independent legal advice</strong>, regardless of means. Immigration solicitors and advisers attend the centre on a rota to provide it.
        </p>
        <p>A DDAS appointment gives you a short initial session &mdash; typically around 30 minutes &mdash; to talk through your situation and get first advice on your options.</p>

        <h2>Who can use it</h2>
        <p>Anyone held in a participating immigration removal centre can request a DDAS appointment, irrespective of nationality or ability to pay for the initial session.</p>

        <h2>What happens in a DDAS appointment</h2>
        <ul>
          <li>A brief, confidential discussion of why you are detained and your immigration history.</li>
          <li>Initial advice on possible next steps &mdash; for example a bail application, challenging detention, or progressing an asylum or human-rights claim.</li>
          <li>Signposting to ongoing representation where your case qualifies.</li>
        </ul>
        <p>The session is short, so it helps to have your detention papers, any Home Office letters, and a brief timeline ready.</p>

        <h2>After the first appointment</h2>
        <p>
          The duty session is a starting point, not full representation. To take your case forward &mdash; for example to prepare an <a href="/bail401-immigration-bail/">immigration bail (BAIL401)</a> application or challenge the lawfulness of your detention &mdash; you will usually need ongoing legal help, which may be covered by legal aid depending on your case and means.
        </p>

        <h2>How Abrahams Solicitors can help</h2>
        <p>
          We advise and represent people in immigration detention &mdash; from urgent bail applications to challenging detention and progressing the underlying claim. If you or a loved one has just been detained, see our <a href="/emergency-immigration-solicitor/">emergency immigration help</a> or <a href="/contact-us/">contact us</a>. We provide advice and representation; we do not guarantee release or any particular outcome.
        </p>

        <h2>Frequently asked questions</h2>
        <h3>Is DDAS advice really free?</h3>
        <p>The initial duty appointment is free regardless of means. Ongoing representation may be covered by legal aid or arranged privately.</p>
        <h3>Can my family arrange a solicitor while I&rsquo;m detained?</h3>
        <p>Yes. A family member can instruct a solicitor on your behalf to visit or call you.</p>
        <h3>How quickly can I get a bail application in?</h3>
        <p>Bail can often be applied for promptly. Speak to a solicitor as soon as possible so it can be prepared properly.</p>

        <h2>Who reviewed this page</h2>
        <p>
          Reviewed for legal accuracy by <a href="/our-team/">Imran Shah</a>, Director and SRA-regulated solicitor (SRA No. 509359, admitted 2012), for Abrahams Solicitors &mdash; an SRA-regulated firm (firm No. 809071). This page is general information about UK immigration procedure and is not a substitute for tailored legal advice.
        </p>
      </LegalPage>
    </>
  );
}
