import { LegalPage } from "@/components/v6/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "How we work to make our website and services accessible, adjustments available on request, and how to tell us if something is not working.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage eyebrow="Legal" title="Accessibility statement" lastUpdated="24 August 2026">
      <p>
        We want everyone to be able to use our website and our services, whatever their circumstances.
      </p>

      <h2>Our website</h2>
      <p>
        We have not yet carried out a formal accessibility audit of this website against the Web Content Accessibility Guidelines, so we cannot claim that it fully conforms. We are working towards it, and we will update this statement when that assessment has been done.
      </p>
      <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>

      <h2>Our documents</h2>
      <p>
        We are working to make sure the documents we publish can be read by screen readers. If you find a document you cannot access &mdash; for example a PDF that will not read aloud &mdash; tell us and we will send you an accessible version.
      </p>

      <h2>Getting help from us in other ways</h2>
      <p>You do not have to use our website to deal with us. If it is easier for you, we can:</p>
      <ul>
        <li>speak to you by telephone on 0203 355 9823;</li>
        <li>arrange an interpreter, if English is not your first language;</li>
        <li>provide documents in large print, or another format;</li>
        <li>allow longer appointments, or let a family member or supporter join you;</li>
        <li>meet you in person at our office; or</li>
        <li>communicate with you by post rather than email.</li>
      </ul>
      <p>
        Please just ask. You will not be treated differently for asking, and there is no charge for these adjustments.
      </p>

      <h2>If something is not working</h2>
      <p>If you have a problem using this site, or you cannot access something you need, contact us:</p>
      <ul>
        <li>Email: <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a></li>
        <li>Telephone: 0203 355 9823</li>
        <li>Post: Abrahams Solicitors, Unit 20, Listerhills Science Park, Campus Road, Bradford, BD7 1HR</li>
      </ul>
      <p>Tell us what you were trying to do and what went wrong, and we will help and try to fix it.</p>

      <h2>If you are not happy with our response</h2>
      <p>
        If you have raised an accessibility problem and are not satisfied with how we handled it, please use our <a href="/complaints/">complaints procedure</a>.
      </p>
      <p>
        You can also contact the Equality Advisory and Support Service (EASS) at{" "}
        <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer">www.equalityadvisoryservice.com</a>{" "}
        or on 0808 800 0082.
      </p>
    </LegalPage>
  );
}
