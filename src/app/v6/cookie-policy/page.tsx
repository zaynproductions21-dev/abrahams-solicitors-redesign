import { LegalPage } from "@/components/v6/legal-page";
import { CookiePreferencesControl } from "@/components/v6/cookie-preferences-control";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Which cookies Abrahams Solicitors uses, which require consent, and how to change your cookie choices at any time.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie policy" lastUpdated="24 August 2026">
      <h2>What cookies are</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They let the site remember things about your visit.
      </p>

      <h2>Cookies we use</h2>

      <h3>Strictly necessary &mdash; always on</h3>
      <p>These are needed for the site to work. They do not require your consent.</p>
      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="py-2 pr-4 font-semibold text-slate-900">Cookie</th>
            <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
            <th className="py-2 font-semibold text-slate-900">Expires</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-slate-100">
          <tr>
            <td className="pr-4"><code>abrahams-cookie-consent-v1</code></td>
            <td className="pr-4">Remembers your cookie choices so we do not ask again</td>
            <td>12 months</td>
          </tr>
        </tbody>
      </table>

      <h3>Analytics &mdash; only with your consent</h3>
      <p>These help us understand how visitors use the site so we can improve it.</p>
      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="py-2 pr-4 font-semibold text-slate-900">Cookie</th>
            <th className="py-2 pr-4 font-semibold text-slate-900">Provider</th>
            <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
            <th className="py-2 font-semibold text-slate-900">Expires</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-slate-100">
          <tr>
            <td className="pr-4"><code>_ga</code>, <code>_ga_7WFT79HX1N</code>, <code>_ga_RVNGLQ146F</code></td>
            <td className="pr-4">Google Analytics 4</td>
            <td className="pr-4">Counts visits and shows how the site is used</td>
            <td>Up to 2 years</td>
          </tr>
          <tr>
            <td className="pr-4"><code>_gcl_au</code>, <code>_gcl_ls</code></td>
            <td className="pr-4">Google Ads</td>
            <td className="pr-4">Measures which adverts led to an enquiry</td>
            <td>Up to 90 days</td>
          </tr>
          <tr>
            <td className="pr-4"><code>_uetsid</code>, <code>_uetvid</code>, <code>_uetmsclkid</code></td>
            <td className="pr-4">Microsoft Advertising (Bing UET)</td>
            <td className="pr-4">Measures which adverts led to an enquiry</td>
            <td>Up to 13 months</td>
          </tr>
          <tr>
            <td className="pr-4"><code>_clck</code>, <code>_clsk</code></td>
            <td className="pr-4">Microsoft Clarity</td>
            <td className="pr-4">Records how pages are used so we can improve them</td>
            <td>Up to 1 year</td>
          </tr>
          <tr>
            <td className="pr-4"><code>ph_&lt;project id&gt;_posthog</code></td>
            <td className="pr-4">PostHog</td>
            <td className="pr-4">Product analytics</td>
            <td>Up to 1 year</td>
          </tr>
        </tbody>
      </table>

      <h3>Marketing &mdash; only with your consent</h3>
      <table className="w-full border-collapse text-sm mb-6">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="py-2 pr-4 font-semibold text-slate-900">Cookie</th>
            <th className="py-2 pr-4 font-semibold text-slate-900">Provider</th>
            <th className="py-2 pr-4 font-semibold text-slate-900">Purpose</th>
            <th className="py-2 font-semibold text-slate-900">Expires</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-slate-100">
          <tr>
            <td className="pr-4"><code>_fbp</code>, <code>_fbc</code></td>
            <td className="pr-4">Meta (Facebook)</td>
            <td className="pr-4">Measures advertising performance</td>
            <td>Up to 90 days</td>
          </tr>
          <tr>
            <td className="pr-4"><code>_ttp</code>, <code>_tt_enable_cookie</code>, <code>ttcsid</code>, <code>ttcsid_*</code></td>
            <td className="pr-4">TikTok</td>
            <td className="pr-4">Measures advertising performance</td>
            <td>Up to 13 months</td>
          </tr>
          <tr>
            <td className="pr-4"><code>abrahams_gclid</code>, <code>abrahams_gbraid</code>, <code>abrahams_wbraid</code>, <code>abrahams_msclkid</code></td>
            <td className="pr-4">Abrahams Solicitors</td>
            <td className="pr-4">Records which advert brought you to the site</td>
            <td>90 days</td>
          </tr>
          <tr>
            <td className="pr-4"><code>abrahams_utm_source</code>, <code>abrahams_utm_medium</code>, <code>abrahams_utm_campaign</code>, <code>abrahams_utm_content</code>, <code>abrahams_utm_term</code></td>
            <td className="pr-4">Abrahams Solicitors</td>
            <td className="pr-4">Records which campaign brought you to the site</td>
            <td>90 days</td>
          </tr>
          <tr>
            <td className="pr-4"><code>abrahams_traffic_source</code></td>
            <td className="pr-4">Abrahams Solicitors</td>
            <td className="pr-4">Records which network brought you to the site</td>
            <td>90 days</td>
          </tr>
        </tbody>
      </table>

      <h2 id="preferences">Your choices</h2>
      <p>
        We do not set analytics or marketing cookies unless you agree. When you first visit, you can accept or reject them. Rejecting is as easy as accepting.
      </p>
      <p>You can change your mind at any time.</p>
      <CookiePreferencesControl />
      <p>
        You can also block or delete cookies through your browser settings, though the site may not work properly if you block strictly necessary cookies.
      </p>

      <h2>More information</h2>
      <p>
        For how we handle personal data generally, see our <a href="/privacy-policy/">privacy notice</a>. To complain about cookies or electronic marketing, contact the Information Commissioner&rsquo;s Office at{" "}
        <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a> or on 0303 123 1113.
      </p>
    </LegalPage>
  );
}
