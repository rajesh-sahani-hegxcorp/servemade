"use client";

import { useState, useEffect } from "react";
import { Search, Clock, ShieldCheck, BadgeCheck, ArrowRight, Leaf } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FOODS } from "@/data/foods";
import { useCart } from "@/context/CartContext";
import DriftWallRaw from "@/components/DriftWall";

const DriftWall = DriftWallRaw as React.ComponentType<any>;

const DRIFT_WALL_ITEMS = [
  { image: "/images/products/plates-bowls.jpg", title: "Bagasse Plates & Bowls" },
  { image: "/images/products/paper-cups.jpg", title: "Double & Ripple Wall Paper Cups" },
  { image: "/images/products/takeaway-boxes.jpg", title: "Biodegradable Meal Boxes" },
  { image: "/images/products/paper-bags.jpg", title: "Kraft Paper Carry Bags" },
  { image: "/images/products/wooden-cutlery.jpg", title: "Birchwood Cutlery & Straws" },
  { image: "/images/products/disposal_1_upscaled.png", title: "Compostable Compartment Plates" },
  { image: "/images/products/Gemini_Generated_Image_3fyk553fyk553fyk_upscaled-Photoroom.png", title: "Eco Food Containers" },
  { image: "/images/products/Gemini_Generated_Image_b892k8b892k8b892-Photoroom_upscaled.png", title: "Paper Cups & Lids" },
  { image: "/images/products/Gemini_Generated_Image_yt7ec6yt7ec6yt7e-Photoroom_upscaled.png", title: "Kraft Salad Bowls" },
];

export interface CategoryKit {
  id: string;
  label: string;
  kitName: string;
  items: string;
  itemCount: string;
  materialBadge: string;
  certBadge: string;
  image: string;
  productNames: string[];
}

export const CATEGORY_KITS: CategoryKit[] = [
  {
    id: "coffee-tea",
    label: "Coffee & tea",
    kitName: "Coffee & tea kit",
    items: "Paper hot cups, fibre lids, wooden stirrers",
    itemCount: "3 products",
    materialBadge: "PLA-lined kraft paper",
    certBadge: "Home compostable · EN13432",
    image: "/images/products/paper-cups.jpg",
    productNames: ["Paper Hot Cups", "Fibre Lids", "Wooden Stirrers"],
  },
  {
    id: "pizza-bakes",
    label: "Pizza & bakes",
    kitName: "Pizza & bakes kit",
    items: "Kraft boxes, carry bags, wooden cutlery",
    itemCount: "3 products",
    materialBadge: "Recycled kraft paperboard",
    certBadge: "FSC-certified · Recyclable",
    image: "/images/products/takeaway-boxes.jpg",
    productNames: ["Kraft Boxes", "Carry Bags", "Wooden Cutlery"],
  },
  {
    id: "salads-bowls",
    label: "Salads & bowls",
    kitName: "Salads & bowls kit",
    items: "Bagasse bowls, fibre lids, wooden cutlery",
    itemCount: "3 products",
    materialBadge: "100% sugarcane bagasse",
    certBadge: "Home compostable · BPI certified",
    image: "/images/products/Gemini_Generated_Image_yt7ec6yt7ec6yt7e-Photoroom_upscaled.png",
    productNames: ["Bagasse Bowls", "Fibre Lids", "Wooden Cutlery"],
  },
  {
    id: "soups-curries",
    label: "Soups & curries",
    kitName: "Soups & curries kit",
    items: "Bagasse bowls, leakproof fibre lids, carry bags",
    itemCount: "3 products",
    materialBadge: "Heavy-duty sugarcane bagasse",
    certBadge: "Leak-resistant · ASTM D6400",
    image: "/images/products/plates-bowls.jpg",
    productNames: ["Bagasse Bowls", "Fibre Lids", "Carry Bags"],
  },
  {
    id: "burgers-wraps",
    label: "Burgers & wraps",
    kitName: "Burgers & wraps kit",
    items: "Bagasse clamshells, carry bags, paper straws",
    itemCount: "3 products",
    materialBadge: "Unbleached bagasse fibre",
    certBadge: "Compostable · Plastic-free",
    image: "/images/products/disposal_1_upscaled.png",
    productNames: ["Clamshells", "Carry Bags", "Paper Straws"],
  },
  {
    id: "juices-shakes",
    label: "Juices & shakes",
    kitName: "Juices & shakes kit",
    items: "Clear cold cups, paper straws, domed lids",
    itemCount: "3 products",
    materialBadge: "Plant-based PLA & paper",
    certBadge: "EN13432 · 100% Bio-based",
    image: "/images/products/Gemini_Generated_Image_b892k8b892k8b892-Photoroom_upscaled.png",
    productNames: ["Clear Cold Cups", "Paper Straws", "Fibre Lids"],
  },
  {
    id: "desserts",
    label: "Desserts",
    kitName: "Desserts kit",
    items: "Bagasse dessert plates, wooden cutlery, pastry boxes",
    itemCount: "3 products",
    materialBadge: "Sugarcane pulp & birchwood",
    certBadge: "Biodegradable · Food contact safe",
    image: "/images/products/wooden-cutlery.jpg",
    productNames: ["Bagasse Plates", "Wooden Cutlery", "Kraft Boxes"],
  },
];

const DEFAULT_KIT: CategoryKit = CATEGORY_KITS[0]!;

export interface HeroProps {
  heading?: string | null;
  subheading?: string | null;
}

export function Hero({ heading, subheading }: HeroProps = {}) {
  const [query, setQuery] = useState("");
  const [foodIndex, setFoodIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const { addItems } = useCart();

  // Auto-rotation every ~3.5s when not locked by chip click or active search query
  useEffect(() => {
    if (isLocked || query.trim().length > 0) return;
    const timer = setInterval(() => {
      setFoodIndex((prev) => (prev + 1) % CATEGORY_KITS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isLocked, query]);

  const matches = FOODS.filter((f) => f.label.toLowerCase().includes(query.toLowerCase()));
  const activeKit: CategoryKit = CATEGORY_KITS[foodIndex] ?? DEFAULT_KIT;

  const handleSearchChange = (val: string) => {
    setQuery(val);
    const trimmed = val.trim().toLowerCase();
    if (trimmed === "") {
      setIsLocked(false);
    } else {
      setIsLocked(true);
      const matchIdx = CATEGORY_KITS.findIndex(
        (k) =>
          k.label.toLowerCase().includes(trimmed) ||
          k.kitName.toLowerCase().includes(trimmed) ||
          k.items.toLowerCase().includes(trimmed) ||
          k.productNames.some((p) => p.toLowerCase().includes(trimmed))
      );
      if (matchIdx !== -1) {
        setFoodIndex(matchIdx);
      }
    }
  };

  const handleChipClick = (index: number) => {
    setFoodIndex(index);
    setQuery("");
    setIsLocked(true);
  };

  const addKitToQuote = () => {
    addItems(activeKit.productNames, `✓ ${activeKit.label} kit added to your quote`);
  };

  return (
    <section
      aria-labelledby="hero-h"
      className="relative min-h-[calc(100vh-106px)] overflow-hidden bg-gradient-to-b from-surface-off to-white to-80%"
      data-field-path="hero"
    >
      <style>{`
        @keyframes heroKitSlideIn {
          0% {
            opacity: 0;
            transform: translate3d(14px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-hero-kit {
          animation: heroKitSlideIn 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* DriftWall Diagonal Background Showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full overflow-hidden select-none md:w-[70%]"
        style={{
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 5% 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 15%, rgba(0, 0, 1) 40%, rgba(0, 0, 1) 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.4) 15%, rgba(0, 0, 1) 40%, rgba(0, 0, 1) 100%)",
        }}
      >
        <DriftWall
          items={DRIFT_WALL_ITEMS as any}
          columns={7}
          tileWidth={160}
          tileHeight={115}
          gap={14}
          radius={10}
          speed={15}
          direction="up"
          variance={0.3}
          parallax={0}
          lift={0}
          pauseOnHover={false}
          dim={0.4}
          fade={0.7}
          grayscale={true}
          overlayColor="#F7F9F8"
        />
      </div>

      <div className="relative z-10 min-h-[calc(100vh-106px)] mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-16">
        {/* Copy + pack finder */}
        <div>
          <Tag>
            <Leaf size={14} aria-hidden="true" /> Certified sustainable · Made in India
          </Tag>
          <h1 id="hero-h" className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-[50px] md:leading-[1.15]">
            {heading || (
              <>
                Great packaging starts with <span className="text-brand-green">what you serve.</span>
              </>
            )}
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-2">
            {subheading || (
              <>
                Tell us the food — we&apos;ll show the exact plates, cups and boxes that fit it, with clear
                minimum orders and pricing back in one business day.
              </>
            )}
          </p>

          <div className="mt-7 rounded-3xl border border-line bg-white p-4 shadow-card" role="search">
            <div className="flex items-center gap-3 rounded-2xl border-2 border-line px-4 py-3">
              <Search size={18} className="text-ink-3" aria-hidden="true" />
              <label htmlFor="finder" className="sr-only">
                Search packaging by food type
              </label>
              <input
                id="finder"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="What do you pack? Try 'coffee' or 'salads'…"
                className="w-full bg-transparent text-base font-medium text-ink outline-none"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {matches.map((f) => {
                const index = FOODS.indexOf(f);
                const active = index === foodIndex;
                const Icon = f.icon;
                return (
                  <button
                    key={f.label}
                    onClick={() => handleChipClick(index)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition-all ${
                      active
                        ? "border-brand-green bg-brand-green-light text-brand-green-dark"
                        : "border-line bg-white text-ink-2"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {f.label}
                  </button>
                );
              })}
              {matches.length === 0 && (
                <span className="px-2 py-2 text-sm font-medium text-ink-3">
                  No match — but our team will find it. Just ask for a quote.
                </span>
              )}
            </div>
          </div>

          <ul
            className="mt-5 flex flex-wrap items-center gap-5 text-sm font-semibold text-ink-2"
            data-field-path="trustBadges"
          >
            <li className="flex items-center gap-1.5">
              <Clock size={15} className="text-brand-green" aria-hidden="true" /> Quote in 1 day
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-brand-green" aria-hidden="true" /> Samples first
            </li>
            <li className="flex items-center gap-1.5">
              <BadgeCheck size={15} className="text-brand-green" aria-hidden="true" /> Independently certified
            </li>
          </ul>
        </div>

        {/* Dynamic Live kit card */}
        <div className="rounded-3xl border border-line bg-white shadow-card-lg overflow-hidden" aria-live="polite">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <b className="text-base text-ink">Your {activeKit.label.toLowerCase()} kit</b>
            <Tag blue>{activeKit.itemCount}</Tag>
          </div>

          {/* Animated Showcase Body */}
          <div key={activeKit.id} className="animate-hero-kit px-5 py-5">
            {/* Representative Product Photo */}
            <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-surface-off border border-line">
              <img
                src={activeKit.image}
                alt={activeKit.kitName}
                className="h-full w-full object-cover"
                loading="eager"
                draggable={false}
              />
            </div>

            {/* Description */}
            <p className="mt-3.5 text-sm font-medium text-ink-2 leading-snug">
              {activeKit.items}
            </p>

            {/* Badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-green/20 bg-brand-green-light px-2.5 py-1 text-xs font-semibold text-brand-green-dark">
                {activeKit.materialBadge}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#E8DFD7] bg-[#F5EFEB] px-2.5 py-1 text-xs font-semibold text-[#785C42]">
                {activeKit.certBadge}
              </span>
            </div>

            {/* Dot Rotation Indicators */}
            <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
              {CATEGORY_KITS.map((k, idx) => (
                <span
                  key={k.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === foodIndex
                      ? "w-5 bg-brand-green"
                      : "w-1.5 bg-line-dark/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Card Actions */}
          <div className="flex items-center gap-3 border-t border-line px-5 py-4 bg-white">
            <Button small onClick={addKitToQuote}>
              Add kit to my quote
            </Button>
            <a href="/products" className="flex items-center gap-1 text-sm font-bold text-brand-green-dark">
              See details <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
