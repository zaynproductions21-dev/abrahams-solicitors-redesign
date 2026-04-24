import { ExternalLink, Shield, Star } from "lucide-react";

type Badge = {
  label: string;
  sublabel: string;
  rating?: string;
  reviews?: string;
  href: string;
  icon: "sra" | "google" | "reviewsolicitors" | "skeepers";
};

const SKEEPERS_SVG = "https://widgets.rr.skeepers.io/generated/05e45d6a-f5da-d744-cde2-d610aceec3fd/fd0dfd26-c4d2-409b-a4bb-a261f728096d.svg";

const BADGES: Badge[] = [
  {
    label: "SRA Regulated",
    sublabel: "Solicitors Regulation Authority",
    rating: "#809071",
    href: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=809071",
    icon: "sra",
  },
  {
    label: "Google Reviews",
    sublabel: "Verified client reviews",
    rating: "5.0",
    reviews: "5-star rated",
    href: "https://search.google.com/local/reviews?placeid=ChIJ8zDryFHne0gRkR-nvRs1aNE",
    icon: "google",
  },
  {
    label: "ReviewSolicitors",
    sublabel: "Independent legal reviews",
    rating: "5.0",
    reviews: "19 reviews",
    href: "https://www.reviewsolicitors.co.uk/west-yorkshire/bradford/abrahams-yorkshire-limited",
    icon: "reviewsolicitors",
  },
  {
    label: "Verified Reviews",
    sublabel: "Independent client feedback",
    href: SKEEPERS_SVG,
    icon: "skeepers",
  },
];

function BadgeIcon({ kind }: { kind: Badge["icon"] }) {
  if (kind === "skeepers") {
    return (
      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SKEEPERS_SVG} alt="Skeepers Verified Reviews" className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  if (kind === "google") {
    return (
      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>
    );
  }
  if (kind === "sra") {
    return (
      <div className="w-10 h-10 rounded-lg bg-[#0b3d91]/5 border border-[#0b3d91]/15 flex items-center justify-center shrink-0">
        <Shield className="w-5 h-5 text-[#0b3d91]" strokeWidth={2.4} />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-brand-red/8 border border-brand-red/15 flex items-center justify-center shrink-0">
      <Star className="w-5 h-5 text-brand-red fill-brand-red" />
    </div>
  );
}

function BadgeStars({ rating }: { rating: string }) {
  const n = parseFloat(rating);
  if (isNaN(n)) return null;
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map(i => (
        <Star key={i} className={`h-3 w-3 ${i < Math.round(n) ? "text-brand-red fill-brand-red" : "text-slate-200 fill-slate-200"}`} />
      ))}
      <span className="ml-1.5 text-xs font-bold text-slate-900">{rating}</span>
    </div>
  );
}

export function TrustBadges() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {BADGES.map(b => (
            <a
              key={b.label}
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-brand-red/20 hover:bg-slate-50/60 transition-colors"
            >
              <BadgeIcon kind={b.icon} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-bold text-slate-900 leading-tight">{b.label}</p>
                  <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-brand-red transition-colors" />
                </div>
                {b.icon === "sra" ? (
                  <p className="text-[11px] text-slate-400 mt-0.5">Firm {b.rating}</p>
                ) : b.rating ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <BadgeStars rating={b.rating} />
                    {b.reviews && <span className="text-[11px] text-slate-400">· {b.reviews}</span>}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.sublabel}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
