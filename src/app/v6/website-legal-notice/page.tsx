import { LegalPage } from "@/components/v6/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal notices",
  description:
    "Regulatory and company information for Abrahams Solicitors: registered office, company number, SRA number, VAT and ICO registration.",
};

export default function LegalNoticesPage() {
  return (
    <LegalPage eyebrow="Legal" title="Legal notices" lastUpdated="24 August 2026">
      <h2>Who we are</h2>
      <p>
        Abrahams Solicitors is the trading style of Abrahams (Yorkshire) Ltd, a limited company registered in England and Wales.
      </p>
      <ul>
        <li>Company number: 12942685</li>
        <li>Incorporated: 12 October 2020, England and Wales</li>
        <li>Registered office: Unit 20, Listerhills Science Park, Campus Road, Bradford, BD7 1HR</li>
        <li>VAT number: GB491643276</li>
        <li>ICO registration: ZB638524</li>
        <li>Telephone: 0203 355 9823</li>
        <li>Email: <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a></li>
      </ul>
      <p>A list of Directors is available for inspection at our registered office.</p>

      <h2>Our offices</h2>
      <p>
        <strong>Bradford (registered office)</strong><br />
        Unit 20, Listerhills Science Park, Campus Road, Bradford, BD7 1HR<br />
        Monday to Friday, 9.00am to 5.00pm &middot; 0333 339 6004
      </p>
      <p>
        <strong>London</strong><br />
        Suite 10, Atlas House, 1 King Street, London EC2V 8AU<br />
        Monday to Friday, 9.00am to 5.00pm, by appointment only &middot; 0203 355 9823
      </p>

      <h2>Regulatory information</h2>
      <p>
        Abrahams Solicitors is authorised and regulated by the Solicitors Regulation Authority, SRA number 809071.
      </p>
      <p>
        Our professional title is solicitor, granted in England and Wales. We are subject to the SRA Standards and Regulations, including the SRA Code of Conduct, which can be found at{" "}
        <a href="https://www.sra.org.uk" target="_blank" rel="noopener noreferrer">www.sra.org.uk</a>.
      </p>
      <p>
        The term &ldquo;partner&rdquo; where used refers to a Director, Employee or Consultant of the firm with equivalent standing and qualifications. It does not imply that any person is carrying on business in partnership for the purposes of the Partnership Act 1890.
      </p>

      <h2>Professional indemnity insurance</h2>
      <p>
        We carry professional indemnity insurance in accordance with the SRA Indemnity Insurance Rules. Details of our insurers and the territorial coverage of that insurance are available on request from our registered office.
      </p>

      <h2>Complaints</h2>
      <p>Please see our <a href="/complaints/">complaints page</a>.</p>

      <h2>Content on this website</h2>
      <p>
        The content of this website is provided for general information only. It is not legal advice and should not be relied on as legal advice. Immigration law and the Immigration Rules change frequently, and information that was accurate when published may not be accurate when you read it. You should always take advice on your own circumstances before acting.
      </p>
      <p>We accept no liability for any loss arising from reliance on the content of this website.</p>
      <p>
        Reading this website, or contacting us through it, does not create a solicitor-client relationship. We only act for you once we have agreed to do so in writing and you have received our Client Care Letter and Terms of Business.
      </p>

      <h2>Copyright</h2>
      <p>
        The content of this website is &copy; Abrahams (Yorkshire) Ltd unless otherwise stated. You may view and print pages for your own use. You may not reproduce or republish any part of this website without our written permission.
      </p>

      <h2>Links to other websites</h2>
      <p>
        Where we link to another website, we do so for convenience. We do not control those sites and are not responsible for their content.
      </p>

      <h2>Governing law</h2>
      <p>
        These notices are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.
      </p>
    </LegalPage>
  );
}
