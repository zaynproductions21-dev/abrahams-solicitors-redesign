/**
 * SRA Clickable Digital Badge
 *
 * How to replace with the real Yoshki badge:
 * 1. Log into mySRA -> My Organisations -> Office details.
 *    Make sure abrahamssolicitors.co.uk (and any preview/Vercel domains)
 *    are listed. Wait ~24 hours for SRA to sync to Yoshki.
 * 2. Request / receive the embed snippet from Yoshki (sra@yoshki.com
 *    or via yoshki.com/sra). It will look like:
 *      <iframe src="https://cdn.yoshki.com/iframe/XXXXX.html"
 *              width="140" height="150" frameborder="0" />
 * 3. Set NEXT_PUBLIC_SRA_BADGE_IFRAME to that src in Vercel env vars,
 *    OR paste the full src string into YOSHKI_SRC below. The component
 *    will swap the placeholder for the official badge automatically.
 *
 * Note: Yoshki validates the Referer header against the domain you
 * registered in mySRA. The badge only renders on the registered domain.
 */

const YOSHKI_SRC: string | undefined = process.env.NEXT_PUBLIC_SRA_BADGE_IFRAME;

function todayDisplay(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}

export function SraBadge() {
  if (YOSHKI_SRC) {
    return (
      <a
        href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=809071"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label="SRA regulated law firm — click to verify"
      >
        <iframe
          src={YOSHKI_SRC}
          width={140}
          height={150}
          frameBorder={0}
          scrolling="no"
          style={{ border: 0, display: "block" }}
          title="SRA Digital Badge"
        />
      </a>
    );
  }

  // Fallback placeholder — matches the Yoshki visual design so the
  // footer still looks complete before the real iframe is available.
  return (
    <a
      href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=809071"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col justify-between gap-3 w-[200px] bg-white text-slate-900 rounded-lg shadow-md px-4 py-3 hover:shadow-lg transition-shadow"
      aria-label="SRA regulated law firm — click to verify"
    >
      <div className="flex items-start gap-3">
        {/* Shield mark */}
        <svg viewBox="0 0 32 38" className="h-9 w-8 shrink-0" aria-hidden="true">
          <path d="M16 1 L30 6 V20 C30 28 24 34 16 37 C8 34 2 28 2 20 V6 Z" fill="#0b3d91" />
          <path d="M16 4 L27 8 V19 C27 26 22 31 16 33.5 C10 31 5 26 5 19 V8 Z" fill="#fff" />
          <path d="M11 15 L19 15 L19 22 L26 22 L19 29 Z" fill="#dc2626" />
          <path d="M7 16 L19 16 L19 22" stroke="#0b3d91" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="leading-tight">
          <p className="text-[9px] font-semibold tracking-[0.08em] text-slate-500 uppercase">Regulated by</p>
          <p className="text-[13px] font-black tracking-tight uppercase leading-[1.1] mt-0.5">
            Solicitors<br />Regulation<br />Authority
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-slate-700 uppercase">
          <svg viewBox="0 0 10 10" className="h-2 w-2 fill-current"><path d="M0 5l5-5v3h5v4H5v3z" /></svg>
          Learn more
        </span>
        <span className="text-[10px] font-semibold text-slate-400 tracking-wide">{todayDisplay()}</span>
      </div>
    </a>
  );
}
