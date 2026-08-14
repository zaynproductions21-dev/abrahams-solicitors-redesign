import { LegalPage } from "@/components/v6/legal-page";

export const metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy" lastUpdated="14 August 2026">
      <p>
        This cookie policy explains what cookies and similar technologies are, how we use them on abrahamssolicitors.co.uk, and the choices you have.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the site remember things about your visit — for example, whether you&rsquo;re logged in or which analytics consent you&rsquo;ve given.
      </p>

      <h2>Cookies we use</h2>

      <h3>Strictly necessary</h3>
      <p>Set without asking; needed for the site to work or to remember your consent choice.</p>
      <ul>
        <li><strong>abrahams-cookie-consent-v1</strong> &mdash; remembers your cookie consent choice so we don&rsquo;t keep asking. Stored in local storage, not shared.</li>
        <li><strong>abrahams_gclid, abrahams_gbraid, abrahams_wbraid, abrahams_msclkid</strong> &mdash; click identifiers from Google Ads and Microsoft Ads, used to attribute enquiries back to the ad you clicked. Set only if you arrived from an ad.</li>
        <li><strong>abrahams_utm_source, abrahams_utm_medium, abrahams_utm_campaign, abrahams_utm_content, abrahams_utm_term</strong> &mdash; campaign tags from ad platforms, used to attribute enquiries to the specific campaign, ad group and keyword you clicked.</li>
        <li><strong>abrahams_traffic_source</strong> &mdash; remembers which ad network you arrived from so we can show the right phone number for call tracking.</li>
      </ul>

      <h3>Analytics (limited mode without consent, full mode with consent)</h3>
      <p>These providers run in Google&rsquo;s Consent Mode v2. Without your consent they receive aggregated, non-identifying signals only, with no cookies stored on your device. With your consent they set cookies as listed:</p>
      <ul>
        <li><strong>Google Analytics 4</strong> &mdash; helps us understand which pages people visit and how they found us. Cookies: <code>_ga</code>, <code>_ga_7WFT79HX1N</code>, <code>_ga_RVNGLQ146F</code>.</li>
        <li><strong>Google Ads</strong> conversion tracking + remarketing &mdash; confirms whether ads led to enquiries; retargets past visitors on Google properties. Cookies: <code>_gcl_au</code>, <code>_gcl_ls</code>.</li>
        <li><strong>Microsoft Advertising (Bing UET)</strong> &mdash; same as Google Ads for our Microsoft campaigns. Cookies: <code>_uetsid</code>, <code>_uetvid</code>, <code>_uetmsclkid</code>.</li>
      </ul>

      <h3>Marketing / behavioural pixels (only with consent)</h3>
      <ul>
        <li><strong>Meta / Facebook Pixel</strong> &mdash; attributes leads and retargets past visitors on Facebook and Instagram. Cookies: <code>_fbp</code>, <code>_fbc</code>.</li>
        <li><strong>TikTok Pixel</strong> &mdash; attributes leads and retargets past visitors on TikTok. Cookies: <code>_ttp</code>, <code>_tt_enable_cookie</code>, <code>ttcsid</code>, <code>ttcsid_*</code>.</li>
      </ul>

      <h3>Session recording and product analytics (only with consent)</h3>
      <p>Both of these tools are configured to mask all form inputs and text at the DOM level, so even with your consent they do not receive the actual content you type into consultation forms or free-text case descriptions.</p>
      <ul>
        <li><strong>Microsoft Clarity</strong> &mdash; heatmaps and anonymised session recordings so we can spot where the site confuses visitors. Cookies: <code>_clck</code>, <code>_clsk</code>.</li>
        <li><strong>PostHog</strong> &mdash; product analytics on which parts of the site help visitors find their answer. Cookies: <code>ph_&lt;project id&gt;_posthog</code>. Loaded through our own domain so no third party sees your visits directly.</li>
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
