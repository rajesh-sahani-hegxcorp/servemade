import Link from "next/link";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProductArt } from "@/components/ui/ProductArt";

const DEFAULT_FEATURES = [
  "Full-wrap print, up to 6 colours",
  "Free artwork check and digital proof",
  "Physical printed sample before full production",
];

export interface CustomBrandingProps {
  tag?: string | null;
  heading?: string | null;
  description?: string | null;
  bullets?: Array<{ text?: string | null; id?: string | null } | string> | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  image?: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | string | null;
}

export function CustomBranding({
  tag,
  heading,
  description,
  bullets,
  ctaText,
  ctaLink,
  image,
}: CustomBrandingProps = {}) {
  const customBullets = bullets
    ?.map((b) => (typeof b === "string" ? b : b?.text || ""))
    .filter((text): text is string => Boolean(text && text.trim().length > 0));

  const displayBullets =
    customBullets && customBullets.length > 0 ? customBullets : DEFAULT_FEATURES;

  const displayTag = tag || "Custom & private label";
  const displayHeading = heading || "Your brand, from logo to loading dock.";
  const displayDescription =
    description ||
    "Send us a logo — our design team handles artwork, proofs and print setup, then we manufacture, inspect and ship under your name. Design to delivery, one accountable partner.";
  const displayCtaText = ctaText || "Start a branded order";
  const displayCtaLink = ctaLink || "/custom-packaging";

  const imageUrl = typeof image === "string" ? image : image?.url;
  const imageAlt =
    typeof image === "object" && image?.alt
      ? image.alt
      : "Custom printed paper hot cup with your brand logo";

  return (
    <section aria-labelledby="brand-h" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
      <Reveal>
        <div className="relative grid place-items-center rounded-3xl border border-line bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_70%)] p-10 shadow-card min-h-[260px]">
          {imageUrl ? (
            <div className="relative h-[220px] w-full max-w-[280px]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>
          ) : (
            <ProductArt type="cup" height={220} label="Custom printed paper hot cup with your brand logo" />
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Tag>
          <Sparkles size={14} aria-hidden="true" /> {displayTag}
        </Tag>
        <h2 id="brand-h" className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          {displayHeading}
        </h2>
        <p className="mt-4 text-ink-2">
          {displayDescription}
        </p>
        <ul className="mt-5 space-y-3">
          {displayBullets.map((feature) => (
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
            href={displayCtaLink}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
          >
            {displayCtaText}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
