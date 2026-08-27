import { LegalPage } from "@/components/v6/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraud warning",
  description:
    "Read this before sending money to anyone claiming to be from Abrahams Solicitors. Our bank details do not change. Call us on 0203 355 9823 to check.",
};

export default function FraudWarningPage() {
  return (
    <LegalPage eyebrow="Client safety" title="Fraud warning" lastUpdated="24 August 2026">
      <p>Please read this before sending money to anyone claiming to be from this firm.</p>

      <h2>We will never email you to say our bank details have changed</h2>
      <p><strong>Our bank details do not change.</strong></p>
      <p>
        If you receive an email, text or message saying our account details have changed, it is a fraud. Do not act on it. Do not reply to it.
      </p>
      <p>
        Call us on 0203 355 9823 to check &mdash; using the number on this page, not a number given in the message.
      </p>
      <p>
        Fraudsters intercept emails between solicitors and clients, copy our branding, and send convincing payment requests. Money sent to a fraudulent account is very often unrecoverable.
      </p>

      <h2>Before you send us any money</h2>
      <ul>
        <li>Telephone us on 0203 355 9823 to confirm the account details.</li>
        <li>Use the number on this website &mdash; never a number from an email or letter you were sent.</li>
        <li>If anything feels rushed or unusual, stop and call us.</li>
      </ul>
      <p>
        We will never ask you to send money urgently, outside office hours, or to an account in a different name.
      </p>

      <h2>Beware of people posing as immigration advisers</h2>
      <p>Only people who are regulated may give you immigration advice. Check who you are dealing with:</p>
      <ul>
        <li>Solicitors &mdash; check the <a href="https://www.sra.org.uk/consumers/register/" target="_blank" rel="noopener noreferrer">SRA register</a></li>
        <li>Other immigration advisers &mdash; check the <a href="https://www.gov.uk/find-an-immigration-adviser" target="_blank" rel="noopener noreferrer">IAA register</a></li>
      </ul>
      <p>Be very careful of anyone who:</p>
      <ul>
        <li>guarantees your application will succeed &mdash; nobody can guarantee that;</li>
        <li>asks for cash, or payment to a personal account;</li>
        <li>refuses to give you a written client care letter or a receipt;</li>
        <li>claims to have contacts inside the Home Office; or</li>
        <li>asks you to sign a blank or incomplete form.</li>
      </ul>

      <h2>Beware of fake Home Office contact</h2>
      <p>
        The Home Office will not telephone you demanding immediate payment, threaten you with immediate arrest or removal to obtain money, or ask you to pay by voucher, gift card or cryptocurrency.
      </p>
      <p>If you receive a call like this, hang up and call us.</p>

      <h2>If you think you have been targeted</h2>
      <ol>
        <li>Contact us immediately on 0203 355 9823.</li>
        <li>Contact your bank straight away &mdash; speed matters.</li>
        <li>
          Report it to Action Fraud at{" "}
          <a href="https://www.actionfraud.police.uk" target="_blank" rel="noopener noreferrer">www.actionfraud.police.uk</a>{" "}
          or on 0300 123 2040.
        </li>
      </ol>
      <p>You will not be in trouble with us for reporting this, and it will not affect your case.</p>
    </LegalPage>
  );
}
