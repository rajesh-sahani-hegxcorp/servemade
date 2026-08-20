import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProductArt } from "@/components/ui/ProductArt";

const FEATURES = [
  "Full-wrap print, up to 6 colours",
  "Free artwork check and digital proof",
  "Physical printed sample before full production",
];

export function CustomBranding() {
  return (
    <section aria-labelledby="brand-h" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
      <Reveal>
        <div className="grid place-items-center rounded-3xl border border-line bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_70%)] p-10 shadow-card">
          <ProductArt type="cup" height={220} label="Custom printed paper hot cup with your brand logo" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Tag>
          <Sparkles size={14} aria-hidden="true" /> Custom & private label
        </Tag>
        <h2 id="brand-h" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Your brand, from logo to loading dock.
        </h2>
        <p className="mt-4 text-ink-2">
          Send us a logo — our design team handles artwork, proofs and print setup, then we manufacture,
          inspect and ship under your name. Design to delivery, one accountable partner.
        </p>
        <ul className="mt-5 space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm font-semibold text-ink-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-green-light">
                <Check size={12} className="text-brand-green-dark" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link
            href="/custom-packaging"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
          >
            Start a branded order
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
