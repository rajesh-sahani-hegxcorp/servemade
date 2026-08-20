"use client";

import { useState } from "react";
import { Star, Clock, Package, ShieldCheck } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { StepLabel } from "@/components/product/StepLabel";
import { StepOption } from "@/components/product/StepOption";
import { MobileStickyBar } from "@/components/product/MobileStickyBar";
import { Tag } from "@/components/ui/Tag";
import { buildQuantityOptions } from "@/lib/pricing";
import { SHIPPING_OPTIONS, type ShippingOption } from "@/data/shippingOptions";
import { useCart } from "@/context/CartContext";
import type { CupView } from "@/components/product/CupGalleryArt";
import type { Product } from "@/types";

export function ProductConfigurator({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [qtyIndex, setQtyIndex] = useState(0);
  const [shipping, setShipping] = useState<ShippingOption["value"]>("FOB");
  const [branded, setBranded] = useState(false);
  const [view, setView] = useState<CupView>("plain");
  const { addItems } = useCart();

  const quantityOptions = buildQuantityOptions(product.baseMoq);
  const size = product.sizes[sizeIndex] ?? product.sizes[0];
  const quantity = quantityOptions[qtyIndex] ?? quantityOptions[0];
  const shipInfo = SHIPPING_OPTIONS.find((s) => s.value === shipping) ?? SHIPPING_OPTIONS[0];

  function setBranding(next: boolean) {
    setBranded(next);
    if (product.gallery.type === "cup") setView(next ? "branded" : "plain");
  }

  function addToQuote() {
    const label = `${product.name} — ${size?.label ?? ""}, ${quantity?.label ?? ""}${branded ? ", branded" : ""}`;
    addItems([label], "✓ Added to your quote");
  }

  function requestSample() {
    addItems([`${product.name} — sample`], "✓ Sample request added");
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="grid gap-9 py-7 md:grid-cols-2 md:items-start">
        <ProductGallery product={product} view={view} onViewChange={setView} />

        <div>
          <Tag blue>{product.categoryName}</Tag>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-2">
            <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#2E8B57" stroke="none" aria-hidden="true" />
              ))}
            </span>
            {product.ratingLabel}
          </div>

          {/* Answer-first summary (AEO) */}
          <p className="mt-4 text-ink-2">{product.summary}</p>

          <dl className="mt-4 flex flex-wrap gap-2.5">
            {product.quickFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-line bg-surface-off px-4 py-2 text-center">
                <dd className="m-0 block text-sm font-extrabold text-brand-blue-dark">{fact.value}</dd>
                <dt className="text-xs font-semibold text-ink-3">{fact.label}</dt>
              </div>
            ))}
          </dl>

          {product.sizes.length > 1 && (
            <div className="mt-7">
              <StepLabel n={1} hint={`most buyers start with ${product.sizes[1]?.label ?? product.sizes[0]?.label}`}>
                Choose your size
              </StepLabel>
              <div className="flex gap-2.5" role="group" aria-label="Size">
                {product.sizes.map((s, i) => (
                  <StepOption key={s.label} grow active={sizeIndex === i} onClick={() => setSizeIndex(i)} note={s.note}>
                    {s.label}
                  </StepOption>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <StepLabel n={product.sizes.length > 1 ? 2 : 1} hint="bigger orders = better rates">
              How many do you need?
            </StepLabel>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Order quantity">
              {quantityOptions.map((q, i) => (
                <StepOption key={q.label} grow active={qtyIndex === i} onClick={() => setQtyIndex(i)} note={q.note}>
                  {q.label}
                </StepOption>
              ))}
            </div>
            {qtyIndex > 0 && (
              <p className="mt-2.5 rounded-xl bg-brand-green-light px-3.5 py-2.5 text-sm font-semibold text-brand-green-dark" role="status">
                {qtyIndex === quantityOptions.length - 1
                  ? "🎉 Container orders get our best rate — and the lowest freight per piece."
                  : `💡 This tier saves roughly ${qtyIndex === 1 ? "9" : "16"}% per piece vs. the starter quantity.`}
              </p>
            )}
          </div>

          <div className="mt-6">
            <StepLabel n={product.sizes.length > 1 ? 3 : 2}>How should we ship it?</StepLabel>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Shipping terms">
              {SHIPPING_OPTIONS.map((s) => (
                <StepOption key={s.value} active={shipping === s.value} onClick={() => setShipping(s.value)} note={s.note}>
                  {s.label}
                </StepOption>
              ))}
            </div>
          </div>

          {product.printing !== "Not printable — natural fibre finish only" && (
            <div className="mt-6">
              <StepLabel n={product.sizes.length > 1 ? 4 : 3}>Add your branding?</StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Branding">
                <StepOption active={!branded} onClick={() => setBranding(false)}>
                  Plain
                </StepOption>
                <StepOption active={branded} onClick={() => setBranding(true)} note="design support included">
                  Print my logo
                </StepOption>
              </div>
            </div>
          )}

          <dl className="mt-7 rounded-2xl bg-brand-blue-light p-5" aria-live="polite">
            <Row k="Your selection" v={`${size?.label ?? ""} · ${quantity?.label ?? ""}`} />
            <Row k="Shipping" v={`${shipInfo?.label} (${shipInfo?.value})`} />
            <Row k="Branding" v={branded ? "Custom printed" : "Plain"} />
            <Row k="Typical lead time" v={product.leadTime} />
          </dl>

          <div className="mt-5 hidden gap-3 md:flex">
            <button
              onClick={addToQuote}
              className="flex-1 rounded-full bg-brand-green px-7 py-4 font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
            >
              Add to my quote
            </button>
            <button
              onClick={requestSample}
              className="flex-1 rounded-full border-2 border-line px-7 py-4 font-bold transition-transform hover:-translate-y-0.5"
            >
              Request a sample
            </button>
          </div>

          <ul className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-ink-2">
            <li className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-green" aria-hidden="true" /> Pricing within 1 business day
            </li>
            <li className="flex items-center gap-1.5">
              <Package size={14} className="text-brand-green" aria-hidden="true" /> Samples before you commit
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-green" aria-hidden="true" /> 4-stage quality checks
            </li>
          </ul>
        </div>
      </div>

      <MobileStickyBar onAddToQuote={addToQuote} onRequestSample={requestSample} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <dt className="text-ink-2">{k}</dt>
      <dd className="m-0 font-extrabold text-brand-blue-dark">{v}</dd>
    </div>
  );
}
