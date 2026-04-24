import { LegalPage } from "@/components/v6/legal-page";

export const metadata = { title: "Website Legal Notice" };

export default function WebsiteLegalNoticePage() {
  return (
    <LegalPage eyebrow="Legal" title="Website Legal Notice" lastUpdated="24 April 2026">
      <h2>About this website</h2>
      <p>
        This website is operated by Abrahams (Yorkshire) Limited, a company registered in England &amp; Wales. We are authorised and regulated by the Solicitors Regulation Authority (SRA number 809071). Our registered office is Suite 10, Atlas House, 1 King Street, London EC2V 8AU.
      </p>

      <h2>Not legal advice</h2>
      <p>
        Information on this website is general in nature. It is not, and is not intended to be, legal advice on which you should act. Please get in touch before making any decisions so we can give advice tailored to your circumstances.
      </p>

      <h2>Accuracy</h2>
      <p>
        We try to keep everything here accurate and up to date, but laws, fees and procedures change. We don&rsquo;t guarantee the site is free from errors or always current. We won&rsquo;t be liable for any loss arising from use of the site.
      </p>

      <h2>Links to third-party sites</h2>
      <p>
        Where we link to external sites we do so for information only. We don&rsquo;t control those sites and aren&rsquo;t responsible for their content or availability.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site (text, images, branding, design) is owned by or licensed to Abrahams (Yorkshire) Limited and protected by UK and international copyright law. You may view, print and download content for personal, non-commercial use. You may not reproduce, republish or distribute any content without our prior written permission.
      </p>

      <h2>Jurisdiction</h2>
      <p>
        This notice is governed by English law. Any dispute will be subject to the exclusive jurisdiction of the courts of England and Wales.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about the site or content: <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a> or 020 3488 0512.
      </p>
    </LegalPage>
  );
}
