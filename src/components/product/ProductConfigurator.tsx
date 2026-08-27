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
import type { Product, ProductVariant } from "@/types";

import Link from "next/link";
import { useRouter } from "next/navigation";

function formatPackedStat(v?: ProductVariant): string {
  if (!v) return "Standard carton";
  if (v.qtyPerBox && v.qtyPerPkt) {
    return `${v.qtyPerBox.toLocaleString()} / box · ${v.qtyPerPkt.toLocaleString()} / pkt`;
  }
  if (v.qtyPerBox) {
    return `${v.qtyPerBox.toLocaleString()} / box`;
  }
  if (v.qtyPerPkt) {
    return `${v.qtyPerPkt.toLocaleString()} / pkt`;
  }
  return "Standard carton";
}

function getVariantDisplayLabel(v: ProductVariant, variantType: "capacity" | "dimension"): string {
  if (v.compartmentOption) {
    const dim = v.dimension && !["not stated", "round", "rectangular", "square", "boat"].includes(v.dimension.toLowerCase())
      ? v.dimension
      : v.size;
    return `${v.compartmentOption} (${dim})`;
  }
  if (v.compartments) {
    if (v.compartments === 2 && v.shape) {
      return `2 Compartment (${v.shape})`;
    }
    return `${v.compartments} Compartment`;
  }
  if (variantType === "capacity") {
    if (v.material) {
      if (v.capacityOz && v.size && !v.size.includes("oz")) {
        return `${v.material} — ${Math.round(v.capacityOz)} oz (${v.size})`;
      }
      return `${v.material} — ${v.size}`;
    }
    if (v.capacityOz && v.size && !v.size.includes("oz")) {
      return `${Math.round(v.capacityOz)} oz (${v.size})`;
    }
    return v.size;
  }
  if (v.dimension && !["not stated", "round", "rectangular", "square", "boat"].includes(v.dimension.toLowerCase())) {
    return v.dimension;
  }
  return v.size;
}

export function ProductConfigurator({ product }: { product: Product }) {
  const router = useRouter();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials?.[0] ?? "");
  const [selectedCompartmentOption, setSelectedCompartmentOption] = useState<string>(product.compartmentOptions?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] ?? "");
  const [selectedCompartment, setSelectedCompartment] = useState<number>(() => {
    const firstComp = product.variants?.find((v) => v.compartments)?.compartments;
    return firstComp ?? 2;
  });
  const [selectedShape, setSelectedShape] = useState<string>("Round");
  const [qtyIndex, setQtyIndex] = useState(0);
  const [shipping, setShipping] = useState<ShippingOption["value"]>("FOB");
  const [branded, setBranded] = useState(false);
  const [view, setView] = useState<CupView>("plain");
  const { addItems } = useCart();

  const isBowlFamily = product.slug === "bagasse-round-bowl" || product.slug === "bagasse-square-bowl";
  const currentShape = product.slug === "bagasse-square-bowl" ? "square" : "round";

  const isCompartmentFamily = Boolean(product.variants && product.variants.some((v) => v.compartments));
  const hasMaterials = Boolean(product.materials && product.materials.length > 1);
  const hasCompartmentOptions = Boolean(product.compartmentOptions && product.compartmentOptions.length > 1);

  const activeVariants = hasCompartmentOptions
    ? product.variants.filter((v) => v.compartmentOption === selectedCompartmentOption)
    : hasMaterials
    ? product.variants.filter((v) => v.material === selectedMaterial)
    : product.variants && product.variants.length > 0
    ? product.variants
    : [];

  const hasMultipleSizes = activeVariants.length > 1;

  const selectedVariant = isCompartmentFamily
    ? product.variants.find((v) => v.compartments === selectedCompartment && (selectedCompartment !== 2 || v.shape === selectedShape)) ??
      product.variants[0]
    : activeVariants[sizeIndex] ?? activeVariants[0] ?? product.variants[0];

  const variantLabel = selectedVariant ? getVariantDisplayLabel(selectedVariant, product.variantType) : "";

  const quantityOptions = buildQuantityOptions(product.baseMoq || 50000);
  const quantity = quantityOptions[qtyIndex] ?? quantityOptions[0];
  const shipInfo = SHIPPING_OPTIONS.find((s) => s.value === shipping) ?? SHIPPING_OPTIONS[0];

  const moqDisplay = product.moqPieces ? `${product.moqPieces.toLocaleString()} ${product.moqUnit}` : "TBD";
  const packedDisplay = formatPackedStat(selectedVariant);
  const leadTimeDisplay = product.leadTime ? product.leadTime.split("(")[0]?.trim() || "2–3 weeks" : "2–3 weeks";

  const quickFacts = [
    { value: moqDisplay, label: "Minimum order" },
    { value: leadTimeDisplay, label: "Production" },
    { value: packedDisplay, label: "Packed" },
    { value: product.printing?.startsWith("Not printable") ? "No" : "Yes", label: "Custom print" },
  ];

  let stepCounter = 1;
  const compartmentOptionStepNum = hasCompartmentOptions ? stepCounter++ : 0;
  const compartmentStepNum = isCompartmentFamily ? stepCounter++ : 0;
  const shapeSubStepNum = isCompartmentFamily && selectedCompartment === 2 ? stepCounter++ : 0;
  const materialStepNum = hasMaterials ? stepCounter++ : 0;
  const shapeStepNum = isBowlFamily ? stepCounter++ : 0;
  const colorStepNum = product.colors && product.colors.length > 1 ? stepCounter++ : 0;
  const sizeStepNum = (!isCompartmentFamily && (hasMultipleSizes || isBowlFamily || hasMaterials || hasCompartmentOptions)) ? stepCounter++ : 0;
  const qtyStepNum = stepCounter++;
  const shipStepNum = stepCounter++;
  const brandStepNum = product.printing !== "Not printable — natural fibre finish only" ? stepCounter++ : 0;

  function setBranding(next: boolean) {
    setBranded(next);
    if (product.gallery.type === "cup") setView(next ? "branded" : "plain");
  }

  function addToQuote() {
    const details = [
      selectedColor || null,
      variantLabel || null,
      quantity?.label ?? null,
      branded ? "branded" : null,
    ]
      .filter(Boolean)
      .join(", ");

    const label = `${product.name} — ${details}`;
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

          {/* 4-stat spec row with dynamic Packed and placeholder TBD MOQ */}
          <dl className="mt-4 flex flex-wrap gap-2.5">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-line bg-surface-off px-4 py-2 text-center">
                <dd className="m-0 block text-sm font-extrabold text-brand-blue-dark">{fact.value}</dd>
                <dt className="text-xs font-semibold text-ink-3">{fact.label}</dt>
              </div>
            ))}
          </dl>

          {/* Meal Tray Compartment Step 1: Compartment Count Selector */}
          {isCompartmentFamily && (
            <div className="mt-7">
              <StepLabel n={compartmentStepNum} hint="select compartment layout">
                Choose compartment count
              </StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Compartment count">
                {[2, 3, 4, 5].map((count) => {
                  const isActive = selectedCompartment === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        setSelectedCompartment(count);
                        if (count === 2 && !selectedShape) setSelectedShape("Round");
                      }}
                      className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                        isActive
                          ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                          : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                      }`}
                    >
                      {count} Compartment
                    </button>
                  );
                })}
              </div>

              {/* Sub-selector for 2-compartment only */}
              {selectedCompartment === 2 && (
                <div className="mt-5">
                  <StepLabel n={shapeSubStepNum} hint="choose 2-compartment shape">
                    Choose shape
                  </StepLabel>
                  <div className="flex flex-wrap gap-2.5" role="group" aria-label="2-compartment shape">
                    {(["Round", "Rectangle"] as const).map((shape) => {
                      const isActive = selectedShape === shape;
                      return (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setSelectedShape(shape)}
                          className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                            isActive
                              ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                              : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                          }`}
                        >
                          {shape}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Compartment Options Step (e.g. Bagasse Round Plate: Plain, 3-Compartment, 4-Compartment) */}
          {hasCompartmentOptions && (
            <div className="mt-7">
              <StepLabel n={compartmentOptionStepNum} hint="choose plain or divided">
                Choose compartment
              </StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Plate compartment style">
                {product.compartmentOptions!.map((opt) => {
                  const isActive = selectedCompartmentOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSelectedCompartmentOption(opt);
                        setSizeIndex(0);
                      }}
                      className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                        isActive
                          ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                          : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Material Two-Step Selector (e.g. Round Bowl with Lid, Rectangle Container with Lid) */}
          {hasMaterials && (
            <div className="mt-7">
              <StepLabel n={materialStepNum} hint="select container material">
                Choose material
              </StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Container material">
                {product.materials!.map((mat) => {
                  const isActive = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => {
                        setSelectedMaterial(mat);
                        setSizeIndex(0);
                      }}
                      className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                        isActive
                          ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                          : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                      }`}
                    >
                      {mat === "Bagasse" ? "Sugarcane Bagasse" : mat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bowl Two-Level Step 1: Shape Selector */}
          {isBowlFamily && (
            <div className="mt-7">
              <StepLabel n={shapeStepNum} hint="choose bowl shape">
                Choose shape
              </StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Bowl shape">
                <button
                  type="button"
                  onClick={() => {
                    if (currentShape !== "round") router.push("/products/bagasse-round-bowl");
                  }}
                  className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                    currentShape === "round"
                      ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                      : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                  }`}
                >
                  Round <span className="text-xs font-normal text-ink-3 ml-1">(6oz, 8oz, 12oz)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentShape !== "square") router.push("/products/bagasse-square-bowl");
                  }}
                  className={`rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all ${
                    currentShape === "square"
                      ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                      : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                  }`}
                >
                  Square <span className="text-xs font-normal text-ink-3 ml-1">(4oz)</span>
                </button>
              </div>
            </div>
          )}

          {/* Optional Color Selector (e.g. Double Wall Paper Cup) */}
          {product.colors && product.colors.length > 1 && (
            <div className="mt-7">
              <StepLabel n={colorStepNum} hint="select cup color">
                Choose cup color
              </StepLabel>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Cup color">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color;
                  const isWhite = color.toLowerCase().includes("white");
                  const isBrown = color.toLowerCase().includes("brown") || color.toLowerCase().includes("kraft");
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                        isActive
                          ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                          : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full border ${
                          isWhite
                            ? "bg-white border-ink-3/40"
                            : isBrown
                            ? "bg-[#C49A6C] border-[#A0784D]"
                            : "bg-surface-off border-line"
                        }`}
                        aria-hidden="true"
                      />
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size / Dimension selector (not shown for compartment-only family) */}
          {!isCompartmentFamily && (hasMultipleSizes || isBowlFamily || hasMaterials) && (
            <div className="mt-7">
              <StepLabel
                n={sizeStepNum}
                hint={
                  product.variantType === "capacity"
                    ? `most buyers start with ${activeVariants[1]?.size ?? activeVariants[0]?.size}`
                    : `${activeVariants.length} options available`
                }
              >
                {product.variantType === "capacity" ? "Choose your size" : "Select size / dimensions"}
              </StepLabel>

              {product.variantType === "capacity" ? (
                /* Capacity-style pill buttons */
                <div className="flex flex-wrap gap-2.5" role="group" aria-label="Size capacity">
                  {activeVariants.map((v, i) => {
                    const pillTitle = v.capacityOz ? `${Math.round(v.capacityOz)} oz` : v.size;
                    const pillNote = v.capacityMl && v.capacityOz ? `${v.capacityMl} mL` : (v.dimension ?? undefined);
                    return (
                      <StepOption
                        key={`${v.material || "m"}-${v.size}-${v.dimension}-${i}`}
                        grow
                        active={sizeIndex === i}
                        onClick={() => setSizeIndex(i)}
                        note={pillNote}
                      >
                        {pillTitle}
                      </StepOption>
                    );
                  })}
                </div>
              ) : (
                /* Distinct Dimension selector variant (flexible multi-column grid) */
                <div
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                  role="group"
                  aria-label="Product dimensions"
                >
                  {activeVariants.map((v, i) => {
                    const isCleanDim =
                      v.dimension &&
                      !["not stated", "round", "rectangular", "square", "boat"].includes(v.dimension.toLowerCase());
                    const displayTitle = isCleanDim ? v.dimension : v.size;
                    const displaySub =
                      isCleanDim && v.size !== v.dimension
                        ? v.size
                        : v.dimension && v.dimension !== v.size && !["not stated"].includes(v.dimension.toLowerCase())
                        ? v.dimension
                        : undefined;

                    return (
                      <button
                        key={`${v.size}-${v.dimension}-${i}`}
                        onClick={() => setSizeIndex(i)}
                        aria-pressed={sizeIndex === i}
                        className={`rounded-2xl border-2 px-3.5 py-3 text-left transition-all ${
                          sizeIndex === i
                            ? "border-brand-green bg-brand-green-light text-brand-green-dark shadow-sm"
                            : "border-line bg-white text-ink-2 hover:border-brand-green/40"
                        }`}
                      >
                        <span className="block text-sm font-bold text-ink">{displayTitle}</span>
                        {displaySub && (
                          <span
                            className={`mt-0.5 block text-xs font-semibold ${
                              sizeIndex === i ? "text-brand-green-dark" : "text-ink-3"
                            }`}
                          >
                            {displaySub}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Order quantity ladder */}
          <div className="mt-6">
            <StepLabel n={qtyStepNum} hint="bigger orders = better rates">
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

          {/* Shipping */}
          <div className="mt-6">
            <StepLabel n={shipStepNum}>How should we ship it?</StepLabel>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Shipping terms">
              {SHIPPING_OPTIONS.map((s) => (
                <StepOption key={s.value} active={shipping === s.value} onClick={() => setShipping(s.value)} note={s.note}>
                  {s.label}
                </StepOption>
              ))}
            </div>
          </div>

          {/* Branding */}
          {brandStepNum > 0 && (
            <div className="mt-6">
              <StepLabel n={brandStepNum}>Add your branding?</StepLabel>
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

          {/* Selection summary */}
          <dl className="mt-7 rounded-2xl bg-brand-blue-light p-5" aria-live="polite">
            <Row
              k="Your selection"
              v={`${selectedColor ? `${selectedColor} · ` : ""}${variantLabel ? `${variantLabel} · ` : ""}${quantity?.label ?? ""}`}
            />
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

