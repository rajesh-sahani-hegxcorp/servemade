import { CERTIFICATIONS } from "@/data/site";

function CertificationGroup() {
  return (
    <div className="flex shrink-0 gap-12 pr-12">
      {CERTIFICATIONS.map((cert, i) => (
        <span
          key={`${cert}-${i}`}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-bold text-ink-2"
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-brand-green"
            aria-hidden="true"
          />
          {cert}
        </span>
      ))}
    </div>
  );
}

export function CertMarquee() {
  return (
    <div
      aria-label="Certifications"
      className="overflow-hidden border-y border-line py-4"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      {/* Render an even number of copies (6 here) — not just 2 — so the
          combined width comfortably exceeds any viewport width. With only
          2 copies, a short cert list runs out of content before the loop
          point on wide screens, leaving a blank gap and a visible "jump."
          translateX(-50%) still loops correctly with any even copy count,
          since it always lands on an identical repeat of the pattern. */}
      <div className="flex w-max animate-marquee">
        <CertificationGroup />
        <CertificationGroup />
        <CertificationGroup />
        <CertificationGroup />
        <CertificationGroup />
        <CertificationGroup />
      </div>
    </div>
  );
}