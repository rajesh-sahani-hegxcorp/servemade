import type { LucideIcon } from "lucide-react";

/** Keys of the hand-drawn SVG illustrations in components/ui/ProductArt.tsx */
export type ProductArtType =
  | "cup"
  | "clam"
  | "bowl"
  | "plate"
  | "coldcup"
  | "box"
  | "bag"
  | "cutlery"
  | "straw"
  | "lid";

export interface FoodProfile {
  icon: LucideIcon;
  label: string;
  kit: ProductArtType[];
  names: [string, string, string];
}

export interface ProductCategory {
  art: ProductArtType;
  name: string;
  href: string;
  description: string;
  moq: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  who: string;
  org: string;
}

export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
}

/** Payload accepted by POST /api/quote */
export interface QuoteRequestInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  message?: string;
  source?: string;
  items: { label: string; quantityHint?: string }[];
}

/* ─── Product detail page types ─── */

export interface ProductSize {
  label: string; // "8 oz"
  note: string; // "espresso & small"
}

export interface ProductVariant {
  size: string; // "240 mL", "4 in", "3 compartment"
  dimension: string | null; // "110 mm diameter", "4 in square", etc.
  capacityMl: number | null;
  capacityOz: number | null;
  qtyPerBox: number | null;
  qtyPerPkt: number | null;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface OverviewColumn {
  heading: string;
  body: string;
  bullets: string[];
}

export interface CertRef {
  name: string;
  note: string;
}

/** A quick fact chip shown under the H1 (e.g. "50k pieces" / "Minimum order"). */
export interface QuickFact {
  value: string;
  label: string;
}

/**
 * Gallery is a discriminated union: "cup" products get the interactive,
 * procedurally-drawn multi-view art (plain/branded/with-lid/stacked) from
 * CupGalleryArt.tsx; everything else falls back to a single static
 * ProductArt illustration with no view-switcher.
 */
export type ProductGallery =
  | { type: "cup" }
  | { type: "static"; art: ProductArtType };

export interface Product {
  slug: string; // "double-wall-paper-cup" — used in the URL /products/[slug]
  name: string;
  categorySlug: string; // links back to /categories/[categorySlug]
  categoryName: string;
  sourceSheetCategory?: string;
  variantType: "capacity" | "dimension";
  variants: ProductVariant[];
  moqPieces: number | null; // null for TBD
  tagline: string; // one-line, used in <meta description> and OG tags
  summary: string; // answer-first paragraph (AEO)
  ratingLabel: string;
  quickFacts?: QuickFact[];
  sizes: ProductSize[];
  baseMoq: number; // 50000 — quantity tiers/options are derived from this, see lib/pricing.ts
  moqUnit: string; // "pieces"
  material: string;
  printing: string;
  endOfLife: string;
  heatRating?: string;
  lidFit?: string;
  cartonPack?: string;
  cartonVolume?: string;
  hsCode?: string;
  leadTime: string;
  shipsFrom: string;
  overview: OverviewColumn[];
  certifications: CertRef[];
  faqs: Faq[];
  relatedSlugs: string[];
  gallery: ProductGallery;
  isDraftCopy?: boolean; // [DRAFT — verify] flag for factual/claims review
}

