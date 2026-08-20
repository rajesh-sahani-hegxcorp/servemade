"use client";

import { useState } from "react";
import { Search, Clock, ShieldCheck, BadgeCheck, ArrowRight, Leaf } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/ui/ProductArt";
import { FOODS } from "@/data/foods";
import { useCart } from "@/context/CartContext";

export function Hero() {
  const [query, setQuery] = useState("");
  const [foodIndex, setFoodIndex] = useState(0);
  const { addItems } = useCart();

  const matches = FOODS.filter((f) => f.label.toLowerCase().includes(query.toLowerCase()));
  // FOODS is a static, non-empty array (see data/foods.ts), so this fallback never
  // actually triggers — it just satisfies noUncheckedIndexedAccess.
  const activeFood = FOODS[foodIndex] ?? FOODS[0];
  if (!activeFood) return null;

  const addKitToQuote = () => {
    addItems(activeFood.names, `✓ ${activeFood.label} kit added to your quote`);
  };

  return (
    <section aria-labelledby="hero-h" className="bg-gradient-to-b from-surface-off to-white to-80%">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:py-16">
        {/* Copy + pack finder */}
        <div>
          <Tag>
            <Leaf size={14} aria-hidden="true" /> Certified sustainable · Made in India
          </Tag>
          <h1 id="hero-h" className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Great packaging starts with <span className="text-brand-green">what you serve.</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-2">
            Tell us the food — we&apos;ll show the exact plates, cups and boxes that fit it, with clear
            minimum orders and pricing back in one business day.
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
                onChange={(e) => setQuery(e.target.value)}
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
                    onClick={() => {
                      setFoodIndex(index);
                      setQuery("");
                    }}
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

          <ul className="mt-5 flex flex-wrap items-center gap-5 text-sm font-semibold text-ink-2">
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

        {/* Live kit card */}
        <div className="rounded-3xl border border-line bg-white shadow-card-lg" aria-live="polite">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <b className="text-base">Your {activeFood.label.toLowerCase()} kit</b>
            <Tag blue>3 products</Tag>
          </div>
          <div className="grid grid-cols-3 gap-2 px-5 py-6">
            {activeFood.kit.map((artType, i) => (
              <div
                key={artType + i}
                className="animate-floaty rounded-2xl bg-[radial-gradient(90%_110%_at_50%_108%,#EAF5EF,white_72%)] p-3 text-center"
                style={{ animationDuration: `${4 + i}s` }}
              >
                <ProductArt type={artType} height={72} label={activeFood.names[i]} />
                <div className="mt-1 text-xs font-bold text-ink-2">{activeFood.names[i]}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 border-t border-line px-5 py-4">
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
