import { LegalPage } from "@/components/v6/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaints",
  description:
    "How to complain about our service or charges, and how to escalate to the Legal Ombudsman or the SRA. We do not charge for handling complaints.",
};

export default function ComplaintsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Complaints" lastUpdated="24 August 2026">
      <p>
        We aim to provide every client with a high standard of service. If we have not achieved that, we want to know.
      </p>
      <p>
        You have the right to complain about our service and about our charges. We will not charge you for handling your complaint.
      </p>

      <h2>How to complain</h2>
      <p>Please contact Imran Shah:</p>
      <ul>
        <li>Telephone: 0333 339 6004</li>
        <li>Email: <a href="mailto:info@abrahamssolicitors.co.uk">info@abrahamssolicitors.co.uk</a></li>
        <li>Post: Abrahams Solicitors, Unit 20, Listerhills Science Park, Campus Road, Bradford, BD7 1HR</li>
      </ul>
      <p>
        You can complain in any way that suits you &mdash; by phone, email, letter or in person. You do not need to use any particular form of words.
      </p>
      <p>
        If your complaint is about Imran Shah personally, it will be dealt with by Humaira Anjum, Solicitor instead.
      </p>
      <p>
        If you would find it easier to complain in another language, or need this information in another format, please tell us and we will arrange it.
      </p>

      <h2>What happens next</h2>
      <ol>
        <li>We will acknowledge your complaint within 5 working days and tell you who is dealing with it.</li>
        <li>We will investigate &mdash; reviewing your file and speaking to the people involved.</li>
        <li>We will send you a final response within 8 weeks of receiving your complaint.</li>
      </ol>
      <p>If we cannot respond within 8 weeks, we will write to you before that deadline to explain why.</p>

      <h2>If you are still unhappy &mdash; the Legal Ombudsman</h2>
      <p>
        If we have not resolved your complaint to your satisfaction within 8 weeks, you can ask the Legal Ombudsman to look at it. The Legal Ombudsman is independent of us and its service is free.
      </p>

      <h3>Time limits are strict</h3>
      <p>You must refer your complaint to the Legal Ombudsman:</p>
      <ul>
        <li>within six months of receiving our final written response; and</li>
        <li>no later than one year from the act or omission you are complaining about; or</li>
        <li>no later than one year from when you should reasonably have known there was cause for complaint.</li>
      </ul>
      <p>
        An Ombudsman can extend the one-year limits where it is fair and reasonable to do so. If you are unsure whether you are in time, contact the Legal Ombudsman rather than assuming you are not.
      </p>

      <h3>Contact the Legal Ombudsman</h3>
      <ul>
        <li>Post: Legal Ombudsman, PO Box 6167, Slough, SL1 0EH</li>
        <li>Telephone: 0300 555 0333 (10am to 4pm)</li>
        <li>Relay UK: 18001 0300 555 0333</li>
        <li>Email: <a href="mailto:enquiries@legalombudsman.org.uk">enquiries@legalombudsman.org.uk</a></li>
        <li>Website: <a href="https://www.legalombudsman.org.uk" target="_blank" rel="noopener noreferrer">www.legalombudsman.org.uk</a></li>
      </ul>

      <h3>Who can complain to the Legal Ombudsman</h3>
      <p>
        Individuals, micro-enterprises (fewer than 10 staff and turnover or balance sheet not exceeding &euro;2 million), charities, clubs and trusts with income or net assets under &pound;1 million, and personal representatives or residuary beneficiaries of an estate.
      </p>

      <h2>Alternative dispute resolution</h2>
      <p>
        Alternative complaints bodies exist which are competent to deal with complaints about legal services, should both you and we wish to use such a scheme.
      </p>
      <ul>
        <li>ADR body: ProMediate</li>
        <li>Website: <a href="https://www.promediate.co.uk" target="_blank" rel="noopener noreferrer">www.promediate.co.uk</a></li>
        <li>Do we agree to use it? <strong>No.</strong> We do not agree to use ProMediate. We expect complaints to go to the Legal Ombudsman, which provides a clear adjudication process and is free to you.</li>
      </ul>

      <h2>Complaints about a bill</h2>
      <p>
        You may also apply to the court for an assessment of the bill under Part III of the Solicitors Act 1974. The Legal Ombudsman will not consider a complaint about a bill while it is being assessed by a court.
      </p>

      <h2>Concerns about our professional conduct &mdash; the SRA</h2>
      <p>
        The Legal Ombudsman deals with complaints about service. If your concern is about our professional conduct &mdash; for example dishonesty, discrimination or a breach of the SRA&rsquo;s rules &mdash; report it to the Solicitors Regulation Authority:
      </p>
      <ul>
        <li>Website: <a href="https://www.sra.org.uk/consumers/problems/" target="_blank" rel="noopener noreferrer">www.sra.org.uk/consumers/problems/</a></li>
        <li>Telephone: 0370 606 2555</li>
        <li>Post: The Cube, 199 Wharfside Street, Birmingham, B1 1RN</li>
      </ul>
      <p>You can do this whether or not you have complained to us first.</p>
    </LegalPage>
  );
}
