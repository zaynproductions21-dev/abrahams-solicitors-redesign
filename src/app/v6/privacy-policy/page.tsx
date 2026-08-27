import { LegalPage } from "@/components/v6/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Abrahams Solicitors collects and uses your personal data, our lawful bases, who we share it with, how long we keep it, and your rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy notice" lastUpdated="24 August 2026">
      <p>
        This notice explains how Abrahams Solicitors collects and uses your personal data, and what rights you have. It applies to clients, prospective clients, and visitors to our website.
      </p>

      <h2>Who we are</h2>
      <p>
        Abrahams Solicitors is the trading style of Abrahams (Yorkshire) Ltd, company number 12942685, registered office Unit 20, Listerhills Science Park, Campus Road, Bradford, West Yorkshire, BD7 1HR.
      </p>
      <p>
        We are the &ldquo;controller&rdquo; of your personal data. We are registered with the Information Commissioner&rsquo;s Office, registration number ZB638524.
      </p>
      <p>
        Data protection contact: Imran Shah, Director (data protection contact),{" "}
        <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a>.
      </p>

      <h2>What data we collect</h2>
      <p>
        If you are a client or prospective client: your name, contact details, date of birth, nationality, immigration and travel history, passport and identity document details, family and relationship details, employment and income details, financial information, and details of your accommodation.
      </p>
      <p>
        <strong>Special category and criminal offence data.</strong> Because of the nature of immigration work, we may also need to process:
      </p>
      <ul>
        <li>health information, where it is relevant to your application, an exemption, or a request for reasonable adjustments;</li>
        <li>information about your religious or political beliefs, or sexual orientation, where these are relevant to a claim;</li>
        <li>information about criminal convictions, cautions or allegations, where these are relevant to the suitability requirements of the Immigration Rules.</li>
      </ul>
      <p>
        If you visit our website: technical data including your IP address, browser type, and pages visited. See our{" "}
        <a href="/cookie-policy/">cookie policy</a>.
      </p>

      <h2>Where we get it</h2>
      <p>
        Mostly from you. We may also receive data from your sponsor or family member where they are involved in your application, from a previous legal representative where you authorise us to obtain your file, from the Home Office and HM Courts and Tribunals Service, and from identity verification and credit reference agencies.
      </p>

      <h2>Why we use it, and our lawful basis</h2>
      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="py-2 pr-4 font-semibold text-slate-900">What we use it for</th>
            <th className="py-2 font-semibold text-slate-900">Lawful basis</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-slate-100">
          <tr><td className="pr-4">Providing legal services to you</td><td>Performance of a contract</td></tr>
          <tr><td className="pr-4">Verifying your identity, and anti-money laundering checks</td><td>Legal obligation (Money Laundering Regulations 2017)</td></tr>
          <tr><td className="pr-4">Special category data in your application</td><td>Article 9(2)(f) &mdash; establishment, exercise or defence of legal claims</td></tr>
          <tr><td className="pr-4">Criminal offence data relevant to suitability</td><td>Schedule 1, Data Protection Act 2018 &mdash; legal claims and legal advice</td></tr>
          <tr><td className="pr-4">Keeping records, file reviews, supervision, audit</td><td>Legitimate interests &mdash; running a regulated practice properly</td></tr>
          <tr><td className="pr-4">Responding to complaints, and to our regulators</td><td>Legal obligation; legitimate interests</td></tr>
          <tr><td className="pr-4">Recording calls answered by our outsourced provider</td><td>Legitimate interests &mdash; quality, training, complaints, staff protection</td></tr>
          <tr><td className="pr-4">Marketing, where you have asked to hear from us</td><td>Consent</td></tr>
        </tbody>
      </table>
      <p>
        Where we rely on consent, you can withdraw it at any time. Where we rely on legitimate interests, you can object &mdash; see &ldquo;Your rights&rdquo;.
      </p>

      <h2>Who we share it with</h2>
      <ul>
        <li>the Home Office / UK Visas and Immigration, and where relevant HM Courts and Tribunals Service;</li>
        <li>UKVCAS, TLScontact or VFS Global, in connection with biometrics and document scanning;</li>
        <li>barristers and experts we instruct on your matter;</li>
        <li>interpreters and translators, where used;</li>
        <li>our IT, case management and secure storage providers, under written contract;</li>
        <li>our auditors, insurers, and compliance consultants, under confidentiality agreements;</li>
        <li>our regulators &mdash; the SRA and the Legal Ombudsman &mdash; where required.</li>
      </ul>
      <p>We do not sell your data, and we do not share it for anyone else&rsquo;s marketing.</p>

      <h2>Sending data outside the UK</h2>
      <p>
        We do not routinely transfer your personal data outside the United Kingdom. Where a transfer is necessary &mdash; for example where you are applying from abroad and documents must be sent to a visa application centre &mdash; we ensure an appropriate safeguard recognised under the UK GDPR is in place.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your file for at least six years from the date your matter is closed, in line with our retention policy and our professional obligations. After that we destroy paper files securely and delete electronic records.
      </p>
      <p>
        Anti-money laundering records are kept for five years from the end of our relationship, as required by the Money Laundering Regulations 2017.
      </p>
      <p>Complaints records are kept for at least six years.</p>

      <h2>Your rights</h2>
      <p>
        You have the right to: be informed; access your data; have inaccurate data corrected; have data erased; restrict processing; object to processing; data portability; and to object to automated decision-making including profiling.
      </p>
      <p>
        These rights are not absolute &mdash; for example we cannot delete data we are legally obliged to keep. If we cannot meet your request we will tell you why.
      </p>
      <p>
        To exercise any right, contact <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a>. We will respond within one month.
      </p>

      <h2>Complaining to the ICO</h2>
      <p>If you are unhappy with how we handle your data you can complain to the Information Commissioner&rsquo;s Office:</p>
      <ul>
        <li>Website: <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a></li>
        <li>Helpline: 0303 123 1113</li>
        <li>Post: Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
      </ul>
      <p>We would ask you to raise it with us first so we have the chance to put it right.</p>

      <h2>Changes</h2>
      <p>We review this notice regularly. The date at the top shows when it was last updated.</p>
    </LegalPage>
  );
}
