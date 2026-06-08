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
    question: "Who is eligible for a DDAS appointment?",
    answer:
      "Anyone held in a participating immigration removal centre can request a duty appointment, irrespective of nationality or means. The initial session is open to detained people generally; what differs from person to person is whether ongoing representation afterwards is funded by legal aid, which depends on your case and your means.",
  },
  {
    question: "Does legal aid cover ongoing detention and bail work?",
    answer:
      "It may. Legal aid for detained immigration and bail work is administered by the Legal Aid Agency and generally depends on a means test and a merits test. The thresholds change, so check the current position on GOV.UK and the Legal Aid Agency, and ask a solicitor whether your case qualifies.",
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

        <h2>Who can use it and where it operates</h2>
        <p>Anyone held in a participating immigration removal centre can request a DDAS appointment, irrespective of nationality or ability to pay for the initial session.</p>
        <p>
          The scheme operates in immigration removal centres in England, with appointments delivered by immigration solicitors and advisers who attend on a rota. The scheme is administered through the <strong>Legal Aid Agency</strong>, which contracts the providers who staff the surgeries. Because the centre estate and the providers change over time, you can confirm the current arrangements at a particular centre via GOV.UK.
        </p>

        <h2>The free surgery vs ongoing representation</h2>
        <p>
          It is important to understand the difference between the two things the scheme involves. The <strong>duty surgery appointment</strong> is a short, free session &mdash; typically around half an hour &mdash; available regardless of means. Its job is to give you first advice and to identify your options, not to run your whole case.
        </p>
        <p>
          <strong>Ongoing representation</strong> &mdash; preparing and presenting a bail application, challenging detention, or progressing an asylum or human-rights claim &mdash; is a separate step. It may be taken on by the duty provider or another solicitor, and it may be funded by legal aid where your case qualifies, or arranged privately.
        </p>

        <h2>How legal aid applies to detained work</h2>
        <p>
          Legal aid for detained immigration and bail work is administered by the <strong>Legal Aid Agency</strong> and generally turns on two tests: a <strong>means test</strong> (your financial circumstances) and a <strong>merits test</strong> (whether the case is sufficiently strong to justify funding). The detailed thresholds and the categories of work in scope can change, so it is best to <strong>check the current position on GOV.UK and with the Legal Aid Agency</strong>, and to ask a solicitor to assess whether you qualify in your particular case.
        </p>

        <h2>How to access a surgery</h2>
        <p>
          If you are detained, you can ask staff at the immigration removal centre to book you onto the duty advice surgery, or a family member or friend outside can help arrange advice. Bringing your detention papers and any Home Office letters to the appointment makes the short session far more productive.
        </p>

        <h2>What a solicitor does after the surgery</h2>
        <p>
          Following the duty session, a solicitor who takes your case on can prepare and run a <a href="/bail401-immigration-bail/">bail application (BAIL401)</a>, advise on and challenge the lawfulness of your detention, and progress the underlying immigration or asylum claim &mdash; gathering evidence, drafting statements, and representing you at any hearing. The surgery is the entry point; sustained representation is what carries the case forward.
        </p>

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
        <h3>Who is eligible for a DDAS appointment?</h3>
        <p>Anyone held in a participating immigration removal centre can request a duty appointment, irrespective of nationality or means. The initial session is open to detained people generally; what differs from person to person is whether ongoing representation afterwards is funded by legal aid, which depends on your case and your means.</p>
        <h3>Does legal aid cover ongoing detention and bail work?</h3>
        <p>It may. Legal aid for detained immigration and bail work is administered by the Legal Aid Agency and generally depends on a means test and a merits test. The thresholds change, so check the current position on GOV.UK and the Legal Aid Agency, and ask a solicitor whether your case qualifies.</p>
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
