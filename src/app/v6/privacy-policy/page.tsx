import { LegalPage } from "@/components/v6/legal-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" lastUpdated="24 April 2026">
      <p>
        Abrahams (Yorkshire) Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a law firm authorised and regulated by the Solicitors Regulation Authority (SRA number 809071). This policy explains how we collect, use and protect your personal data when you visit abrahamssolicitors.co.uk or engage us as your solicitor.
      </p>

      <h2>Who we are (data controller)</h2>
      <p>
        Abrahams (Yorkshire) Limited, Suite 10, Atlas House, 1 King Street, London EC2V 8AU. You can contact us at <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a> or on 0203 355 9823. We are registered with the Information Commissioner&rsquo;s Office (ICO).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Contact details you give us (name, email, phone, postal address)</li>
        <li>Information about your case or enquiry that you share with us</li>
        <li>Identification documents we need to meet anti-money laundering rules</li>
        <li>Correspondence between you and us</li>
        <li>Technical data (IP address, browser type, pages visited) via cookies</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To provide legal services and run your matter</li>
        <li>To confirm your identity and meet our regulatory duties</li>
        <li>To bill you and keep accounting records</li>
        <li>To respond to enquiries and book consultations</li>
        <li>To improve our website and services</li>
      </ul>

      <h2>Lawful basis</h2>
      <p>
        We process personal data on one or more of these bases: performance of a contract with you, compliance with a legal obligation (anti-money laundering, SRA rules, tax), your explicit consent for marketing, and our legitimate interest in running and improving our practice.
      </p>

      <h2>Sharing</h2>
      <p>
        We share your information only when necessary: with counsel, courts, regulators, interpreters, medical experts, ID-verification providers, and our IT suppliers who act on our instructions. We do not sell your personal data.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Case files are retained for at least six years after the matter closes (the minimum most insurers require). Client identification records are kept for five years after the end of the business relationship. Marketing preferences are kept until you unsubscribe.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct, delete or restrict the personal data we hold about you, object to processing, or ask for a copy in a portable format. Email <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a> to exercise any of these rights. You can also complain to the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        See our <a href="/v6/cookie-policy/">Cookie Policy</a> for the full list of cookies used on this site and how to control them.
      </p>

      <h2>Changes</h2>
      <p>
        We&rsquo;ll post material changes on this page and update the &ldquo;last updated&rdquo; date at the top.
      </p>
    </LegalPage>
  );
}
