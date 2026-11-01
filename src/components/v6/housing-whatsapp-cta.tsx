"use client";

/**
 * HousingWhatsAppCTA — scenario-aware WhatsApp handoff for the
 * housing disrepair scenario sub-pages (/damp-and-mould-claim/,
 * /leaks-and-water-damage/, /pest-infestation-claim/).
 *
 * Reuses the firm's +447476548311 Twilio + WhatsApp Business number
 * (same inbox as the exit-intent WhatsApp handoff in PR #47).
 *
 * Unlike the emergency-immigration WhatsApp CTA, housing disrepair
 * photos are evidence of the problem (visible damp patch, mould on
 * walls, water-damaged ceiling, droppings) — NOT government documents
 * — so the Google Ads "government documents and official services"
 * policy that constrains the immigration copy does not apply here.
 * The pre-fill text can and should mention photos directly, because
 * that is the single most useful artefact a visitor can send.
 */

type Props = {
  /** Which sub-page the CTA renders on — governs the pre-fill opener. */
  scenario: "damp-mould" | "leaks" | "pests";
};

const WA_NUMBER = "447476548311";

const SCENARIO_OPENERS: Record<Props["scenario"], string> = {
  "damp-mould":
    "Hi Abrahams, I have damp and mould in my home and want to send some photos. I rent from: ",
  leaks:
    "Hi Abrahams, I have a leak / water damage in my home and want to send some photos. I rent from: ",
  pests:
    "Hi Abrahams, I have a pest or vermin problem in my home and want to send some photos. I rent from: ",
};

export function HousingWhatsAppCTA({ scenario }: Props) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    SCENARIO_OPENERS[scenario],
  )}`;
  return (
    <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200">
      <p className="text-sm sm:text-base font-bold text-slate-900 mb-1">
        Have photos? Send them on WhatsApp.
      </p>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
        One tap opens WhatsApp with our chat ready — attach the photos and we review before the callback. No form, no account.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-ab-whatsapp={`housing-${scenario}`}
        className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DAD4F] text-white rounded-lg text-sm font-bold px-4 h-11 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.52 5.26l-.999 3.648 3.969-1.041zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        Send photos on WhatsApp
      </a>
      <p className="mt-2.5 text-[11px] text-slate-500 leading-snug">
        SRA-regulated firm #809071. No win, no fee for most clients.
      </p>
    </div>
  );
}
