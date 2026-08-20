import { CERTIFICATIONS } from "@/data/site";

export function CertMarquee() {
  // Duplicate the list once so the CSS animation can loop seamlessly at -50%.
  const looped = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <div
      aria-label="Certifications"
      className="overflow-hidden border-y border-line py-4"
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <div className="flex w-max animate-marquee gap-12">
        {looped.map((cert, i) => (
          <span key={`${cert}-${i}`} className="flex items-center gap-2 text-sm font-bold text-ink-2">
            <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden="true" />
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}
