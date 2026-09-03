"use client";

import { useState } from "react";
import { Check, FileText } from "lucide-react";
import { buildQuantityTiers } from "@/lib/pricing";
import { slugify } from "@/lib/utils";
import type { Product } from "@/types";

const TAB_LABELS = ["Overview", "Specifications", "Order quantities", "Certifications"] as const;

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState(0);
  const tiers = buildQuantityTiers(product.baseMoq);

  const hasCompartments = Boolean(product.variants && product.variants.some((v) => v.compartments));
  const hasMaterials = Boolean(product.materials && product.materials.length > 1);
  const hasCompartmentOptions = Boolean(product.compartmentOptions && product.compartmentOptions.length > 1);
  const derivedShapeOptions =
    product.shapeOptions && product.shapeOptions.length > 0
      ? product.shapeOptions
      : Array.from(new Set(product.variants?.map((v) => v.shape).filter(Boolean) as string[]));
  const hasShapeOptions = Boolean(derivedShapeOptions.length > 1);

  let sizeList = "";
  if (hasCompartmentOptions) {
    const optMap = new Map<string, string[]>();
    product.variants.forEach((v) => {
      const opt = v.compartmentOption || "Standard";
      const list = optMap.get(opt) || [];
      const label = v.dimension && !["not stated", "round", "rectangular", "square", "boat"].includes(v.dimension.toLowerCase())
        ? v.dimension
        : v.size;
      if (!list.includes(label)) list.push(label);
      optMap.set(opt, list);
    });
    sizeList = Array.from(optMap.entries())
      .map(([opt, sizes]) => `${opt}: ${sizes.join(", ")}`)
      .join(" · ");
  } else if (hasShapeOptions) {
    const shapeMap = new Map<string, string[]>();
    product.variants.forEach((v) => {
      const shape = v.shape || "Standard";
      const list = shapeMap.get(shape) || [];
      const ozNum = v.capacityOz != null ? Number(v.capacityOz) : null;
      const ozFormatted =
        ozNum != null ? (Number.isInteger(ozNum) ? `${ozNum}` : `${parseFloat(ozNum.toFixed(1))}`) : null;
      const label = ozFormatted ? `${ozFormatted} oz` : v.size;
      if (!list.includes(label)) list.push(label);
      shapeMap.set(shape, list);
    });
    sizeList = Array.from(shapeMap.entries())
      .map(([shape, sizes]) => `${shape}: ${sizes.join(", ")}`)
      .join(" · ");
  } else if (hasCompartments) {
    const compMap = new Map<number, string[]>();
    product.variants.forEach((v) => {
      if (v.compartments) {
        const shapes = compMap.get(v.compartments) || [];
        if (v.shape && !shapes.includes(v.shape)) shapes.push(v.shape);
        compMap.set(v.compartments, shapes);
      }
    });
    sizeList = Array.from(compMap.entries())
      .map(([comp, shapes]) => (shapes.length > 0 ? `${comp} Compartment (${shapes.join(", ")})` : `${comp} Compartment`))
      .join(" · ");
  } else if (hasMaterials) {
    const matMap = new Map<string, string[]>();
    product.variants.forEach((v) => {
      const mat = v.material || "Standard";
      const list = matMap.get(mat) || [];
      const ozNum = v.capacityOz != null ? Number(v.capacityOz) : null;
      const ozFormatted =
        ozNum != null ? (Number.isInteger(ozNum) ? `${ozNum}` : `${parseFloat(ozNum.toFixed(1))}`) : null;
      const label = ozFormatted ? `${ozFormatted} oz` : v.size;
      if (!list.includes(label)) list.push(label);
      matMap.set(mat, list);
    });
    sizeList = Array.from(matMap.entries())
      .map(([mat, sizes]) => `${mat}: ${sizes.join(", ")}`)
      .join(" · ");
  } else if (product.variants && product.variants.length > 0) {
    sizeList = product.variants
      .map((v) => {
        if (v.dimension && !["not stated", "round", "rectangular", "square", "boat"].includes(v.dimension.toLowerCase())) {
          return v.size !== v.dimension ? `${v.size} (${v.dimension})` : v.dimension;
        }
        return v.size;
      })
      .join(" · ");
  } else {
    sizeList = product.sizes.map((s) => s.label).join(" · ");
  }

  const specLabel = hasCompartments
    ? "Compartment Configurations"
    : product.variantType === "capacity"
    ? "Sizes / Capacities"
    : "Sizes / Dimensions";

  const productSpecs: [string, string][] = [
    ["Material", product.material],
    [specLabel, sizeList],
    ...(product.heatRating ? ([["Heat rating", product.heatRating]] as [string, string][]) : []),
    ...(product.lidFit ? ([["Lid fit", product.lidFit]] as [string, string][]) : []),
    ["Printing", product.printing],
    ["End of life", product.endOfLife],
  ];

  const logisticsSpecs: [string, string][] = [
    ...(product.cartonPack ? ([["Carton pack", product.cartonPack]] as [string, string][]) : []),
    ...(product.cartonVolume ? ([["Carton volume", product.cartonVolume]] as [string, string][]) : []),
    ...(product.hsCode ? ([["HS code", product.hsCode]] as [string, string][]) : []),
    ["Production time", product.leadTime],
    ["Ships from", product.shipsFrom],
    ["Shipping options", "FOB · CIF · DDP — your choice"],
  ];

  return (
    <>
      <div className="border-y border-line bg-surface-off">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5" role="tablist" aria-label="Product information">
          {TAB_LABELS.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className="whitespace-nowrap border-b-[3px] px-5 pb-4 pt-5 text-sm font-bold transition-colors"
              style={{
                color: tab === i ? "#1F6B41" : "#5C666D",
                borderBottomColor: tab === i ? "#2E8B57" : "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-11">
        {tab === 0 && (
          <div className="grid gap-10 md:grid-cols-2" role="tabpanel">
            {product.overview.map((col, i) => (
              <div key={col.heading}>
                <h2 className="text-xl font-extrabold">{col.heading}</h2>
                <p className="mt-3 text-sm text-ink-2">{col.body}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-2">
                  {col.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5">
                      <span
                        className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full"
                        style={{ background: i === 0 ? "#EAF5EF" : "#EBF2F8" }}
                      >
                        <Check size={12} className={i === 0 ? "text-brand-green-dark" : "text-brand-blue-dark"} aria-hidden="true" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div className="grid gap-8 md:grid-cols-2" role="tabpanel" id="specifications">
            <SpecTable heading="Product specifications" rows={productSpecs} />
            <SpecTable heading="Packing & logistics" rows={logisticsSpecs} />
            <p className="text-xs text-ink-3 md:col-span-2">
              Values shown are typical; exact figures are confirmed on your quotation and datasheet.
            </p>
          </div>
        )}

        {tab === 2 && (
          <div role="tabpanel">
            <h2 className="text-xl font-extrabold">Order quantities & rates</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-2">
              Simple rule: the more you order, the less each piece costs. Pick the tier that fits your storage and
              cash flow — exact prices come on your quote.
            </p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <div
                  key={tier.tierName}
                  className={`relative rounded-3xl border-2 bg-white p-5 text-center transition-all hover:-translate-y-1 ${
                    tier.isBestValue ? "border-brand-green shadow-card" : "border-line"
                  }`}
                >
                  {tier.isBestValue && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-3 py-0.5 text-xs font-bold text-white">
                      Best value
                    </span>
                  )}
                  <b className="block text-xl text-brand-blue-dark">{tier.quantityLabel}</b>
                  <div className="mt-0.5 text-xs font-bold uppercase tracking-wide text-ink-3">{tier.tierName}</div>
                  <span className="mt-2.5 inline-block rounded-full bg-brand-green-light px-3 py-1 text-xs font-bold text-brand-green-dark">
                    {tier.savingsLabel}
                  </span>
                  <p className="mt-2.5 text-xs text-ink-2">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 3 && (
          <div role="tabpanel">
            <h2 className="text-xl font-extrabold">Certified & documented</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-2">
              Every order ships with the certificates your market requires. Full documents are attached to your
              quotation.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {product.certifications.map((cert) => (
                <a
                  key={cert.name}
                  href={`/certificates/${slugify(cert.name)}.pdf`}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left transition-all hover:-translate-y-0.5"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-green-light">
                    <FileText size={20} className="text-brand-green-dark" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <b className="block text-sm">{cert.name}</b>
                    <span className="text-xs font-semibold text-ink-3">{cert.note} · PDF</span>
                  </span>
                  <span className="text-sm font-bold text-brand-green-dark">Preview →</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SpecTable({ heading, rows }: { heading: string; rows: [string, string][] }) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-extrabold">{heading}</h2>
      <table className="w-full overflow-hidden rounded-2xl border border-line text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={label}>
              <th
                scope="row"
                className={`w-2/5 bg-surface-off px-4 py-3 text-left font-bold text-ink-2 ${i ? "border-t border-line" : ""}`}
              >
                {label}
              </th>
              <td className={`px-4 py-3 font-semibold ${i ? "border-t border-line" : ""}`}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
