// Google Maps embed — lazy-loaded iframe pointing at a search query URL.
// No API key required for the embed. If Maps ever demand one, swap
// `src` to `https://www.google.com/maps/embed/v1/place?key=…&q=…`.

type Props = {
  city: string;
  address: string;
  className?: string;
};

export function OfficeMap({ city, address, className = "" }: Props) {
  const query = encodeURIComponent(`Abrahams Solicitors ${city}, ${address}`);
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-100 bg-slate-50 ${className}`}>
      <iframe
        title={`${city} office — Google Maps`}
        src={src}
        width="100%"
        height="260"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, display: "block" }}
        allowFullScreen
      />
    </div>
  );
}
