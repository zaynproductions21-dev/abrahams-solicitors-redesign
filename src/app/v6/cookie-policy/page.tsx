import { LegalPage } from "@/components/v6/legal-page";

export const metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy" lastUpdated="24 April 2026">
      <p>
        This cookie policy explains what cookies and similar technologies are, how we use them on abrahamssolicitors.co.uk, and the choices you have.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the site remember things about your visit — for example, whether you&rsquo;re logged in or which analytics consent you&rsquo;ve given.
      </p>

      <h2>Cookies we use</h2>
      <h3>Strictly necessary</h3>
      <ul>
        <li><strong>abrahams-cookie-consent-v1</strong> — remembers your cookie consent choice so we don&rsquo;t keep asking. Stored in local storage, not shared.</li>
      </ul>

      <h3>Analytics (only with consent)</h3>
      <ul>
        <li><strong>Google Analytics</strong> via Google Tag Manager — helps us understand which pages people visit and how they found us, so we can improve the site. No personally identifying content is stored.</li>
        <li><strong>Google Ads</strong> conversion tracking — if you arrived from a Google ad, we use this to confirm the ad did its job.</li>
      </ul>

      <h2>How to control cookies</h2>
      <p>
        When you first visit the site you&rsquo;ll see a banner. You can accept or decline non-essential cookies there. To change your choice later, clear your browser&rsquo;s storage for our site and reload — the banner will reappear.
      </p>
      <p>
        Most browsers also let you block or delete cookies through their settings. Blocking all cookies may prevent parts of the site from working as expected.
      </p>

      <h2>Third-party cookies</h2>
      <p>
        Some pages embed third-party content (for example, our WhatsApp button, Google reviews, Skeepers reviews widget). These third parties may set their own cookies when their content loads. We have no control over those cookies — please check each provider&rsquo;s own policies.
      </p>

      <h2>Questions</h2>
      <p>
        Email us at <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a> if you have any questions about this policy.
      </p>
    </LegalPage>
  );
}
