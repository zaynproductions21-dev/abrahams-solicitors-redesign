// Server-safe data for /immigration-solicitors/.
//
// Extracted from the client component so the FAQ array can be consumed by
// BOTH the interactive accordion (client) AND the FAQPage JSON-LD schema
// (rendered on the server in page.tsx). Keeping the array here avoids
// duplicating the copy and stops the schema generation from being shipped
// as client JavaScript.

export const PAGE_URL = "https://www.abrahamssolicitors.co.uk/immigration-solicitors/";
export const LAST_REVIEWED = "June 2026";

export const FAQS = [
  {
    question: "How much does an immigration solicitor cost?",
    answer:
      "We work on fixed fees, agreed in writing before any work starts — so you know the total cost before we begin. Most spouse visa, FLR(M), ILR and citizenship applications start from £750 to £900 plus VAT, with the UKVI government fee and Immigration Health Surcharge paid separately to the Home Office. Complex cases (previous refusal, gap in leave, dependants, judicial review) are quoted individually after a free 30-minute scoping call. Interest-free payment plans are available across most matters.",
  },
  {
    question: "Is the first call really free?",
    answer:
      "Yes — the first 30 minutes is free, with no obligation. You speak directly to a qualified solicitor (not a call handler or a junior paralegal). We use the call to identify the right route, flag any complications, and give you a written fixed-fee quote afterwards if you want to instruct. If we can't help you, we'll tell you straight and point you to who can.",
  },
  {
    question: "What's the difference between an immigration solicitor and an OISC adviser?",
    answer:
      "Solicitors are regulated by the SRA and can act on every category of immigration work — applications, appeals, judicial review, High Court and Upper Tribunal proceedings. OISC-regulated advisers are authorised at three levels; only Level 3 advisers can take appeals to Tribunal. For straightforward applications either is fine. For refusals, appeals, urgent injunctions, or anything that may reach a court, you need an SRA-regulated solicitor.",
  },
  {
    question: "Do I have to come to your office or can we work remotely?",
    answer:
      "Almost all of our immigration work is done remotely. We use phone, video (Zoom, WhatsApp), and secure document upload — we don't require you to travel to our office for any application work. We have offices in London and Bradford if you prefer face-to-face meetings, but it's not necessary. We act for clients across England and Wales, plus UK nationals and partners overseas filing for entry clearance.",
  },
  {
    question: "What happens on a visa refusal — how fast do I need to act?",
    answer:
      "Appeal deadlines are short: 14 days from the date on the refusal letter if you're in the UK, 28 days if you're overseas, 5 working days if you're detained. Out-of-time appeals are possible with an exceptional reason (medical emergency, bereavement, catastrophic service failure) but weaken with every day. If a deadline is within 7 days, call us today on 0203 355 9823. The earlier we have the refusal letter, the more options remain on the table.",
  },
] as const;
