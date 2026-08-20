"use client";

import { ProductArt } from "@/components/ui/ProductArt";
import { CupGalleryArt, CUP_VIEWS, type CupView } from "@/components/product/CupGalleryArt";
import type { Product } from "@/types";

interface Props {
  product: Product;
  view: CupView;
  onViewChange: (view: CupView) => void;
}

export function ProductGallery({ product, view, onViewChange }: Props) {
  const badges = (
    <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-green-dark shadow-card">
        🌱 Compostable
      </span>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-blue-dark shadow-card">
        ★ Best-seller
      </span>
    </div>
  );

  if (product.gallery.type === "static") {
    return (
      <div className="md:sticky md:top-24">
        <div className="relative grid h-96 place-items-center overflow-hidden rounded-3xl border border-line bg-[radial-gradient(85%_105%_at_50%_106%,#EAF5EF,white_74%)]">
          {badges}
          <ProductArt type={product.gallery.art} height={280} label={product.name} />
        </div>
      </div>
    );
  }

  const activeLabel = CUP_VIEWS.find((v) => v.key === view)?.label ?? "";

  return (
    <div className="md:sticky md:top-24">
      <div className="relative grid h-96 place-items-center overflow-hidden rounded-3xl border border-line bg-[radial-gradient(85%_105%_at_50%_106%,#EAF5EF,white_74%)]">
        {badges}
        <CupGalleryArt view={view} height={310} label={`${product.name} — ${activeLabel.toLowerCase()}`} />
        <span className="absolute bottom-3.5 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-3 shadow-card">
          {activeLabel}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2.5" role="group" aria-label="Product views">
        {CUP_VIEWS.map((v) => (
          <button
            key={v.key}
            onClick={() => onViewChange(v.key)}
            aria-label={`Show ${v.label.toLowerCase()}`}
            aria-pressed={view === v.key}
            className={`grid h-20 place-items-center rounded-2xl border-2 transition-all ${
              view === v.key ? "border-brand-green bg-brand-green-light" : "border-line bg-surface-off"
            }`}
          >
            <CupGalleryArt view={v.key} height={54} label="" />
          </button>
        ))}
      </div>
    </div>
  );
}
