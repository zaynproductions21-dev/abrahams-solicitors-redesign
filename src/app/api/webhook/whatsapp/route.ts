import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppInboundNotification } from "@/lib/email";

/**
 * Twilio WhatsApp inbound webhook for Abrahams Solicitors.
 *
 * Fires whenever a client sends a WhatsApp message to the firm's
 * number (+447476548311). Twilio POSTs an application/x-www-form-
 * urlencoded body with the sender, the message, and up to 10
 * attached media URLs. We parse that, fire a Brevo notification
 * email to the duty-solicitor inbox (same NOTIFY_EMAIL used for
 * web form submissions), and return a bare empty TwiML so Twilio
 * does not auto-reply. The actual conversation lives in the firm's
 * WhatsApp Business inbox; this endpoint only exists to make sure
 * nobody misses a message because they weren't in the WhatsApp app
 * at the moment it arrived.
 *
 * Configure in Twilio Console once:
 *   Phone Numbers → +447476548311 → Messaging → "A MESSAGE COMES IN"
 *   webhook: https://www.abrahamssolicitors.co.uk/api/webhook/whatsapp
 *   method:  POST
 *
 * Fields Twilio sends (we read):
 *   From         — e.g. "whatsapp:+447123456789"
 *   To           — e.g. "whatsapp:+447476548311"
 *   Body         — the text content (may be empty for media-only msgs)
 *   ProfileName  — the sender's display name on WhatsApp (may be blank)
 *   NumMedia     — "0" through "10"
 *   MediaUrl0..N — Twilio-hosted media URLs (require Twilio Basic Auth)
 *   MessageSid   — "SMxxxxxxxx..."
 */

export async function POST(req: NextRequest) {
  // Always 200 + TwiML — Twilio retries on non-2xx, and we don't want
  // the firm to miss alerts because of a transient Brevo blip.
  const ack = new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
    {
      status: 200,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    },
  );

  try {
    const form = await req.formData();
    const rawFrom = (form.get("From") as string | null) ?? "";
    const rawTo = (form.get("To") as string | null) ?? "";
    const body = ((form.get("Body") as string | null) ?? "").trim();
    const profileName = ((form.get("ProfileName") as string | null) ?? "").trim();
    const messageSid = (form.get("MessageSid") as string | null) ?? "unknown";
    const numMedia = parseInt(((form.get("NumMedia") as string | null) ?? "0"), 10) || 0;

    const mediaUrls: string[] = [];
    for (let i = 0; i < Math.min(numMedia, 10); i++) {
      const u = form.get(`MediaUrl${i}`) as string | null;
      if (u) mediaUrls.push(u);
    }

    // Strip the "whatsapp:" prefix from Twilio's From/To.
    const fromPhone = rawFrom.replace(/^whatsapp:/, "");
    const toPhone = rawTo.replace(/^whatsapp:/, "");

    // Only forward messages addressed to the Abrahams WhatsApp number.
    // Twilio sandbox and other numbers that happen to share creds should
    // not trigger housing-intake emails.
    if (toPhone !== "+447476548311") {
      return ack;
    }

    if (!body && mediaUrls.length === 0) {
      // Nothing to notify about — unusual but Twilio can send empty
      // callbacks for delivery receipts or status pings.
      return ack;
    }

    await sendWhatsAppInboundNotification({
      fromPhone,
      profileName,
      text: body,
      mediaUrls,
      twilioMessageSid: messageSid,
    });
  } catch {
    // Swallow — Twilio should still get a 200 even if Brevo throws, so
    // it does not keep retrying the same message forever and
    // double-notifying when the next attempt succeeds.
  }

  return ack;
}

// Twilio sends OPTIONS probes in some configurations; return 200 so the
// configured endpoint does not read as "unreachable" in the console.
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
