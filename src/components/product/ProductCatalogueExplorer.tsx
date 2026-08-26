"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X, PackageSearch, RotateCcw } from "lucide-react";
import { ProductCardGrid } from "@/components/product/ProductCardGrid";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

const CATEGORIES = [
  { slug: "all", label: "All Products" },
  { slug: "plates-bowls", label: "Biodegradable Products" },
  { slug: "paper-cups", label: "Paper Cups" },
  { slug: "cups-lids", label: "Grab & Go" },
  { slug: "biodegradable-containers", label: "Biodegradable Containers" },
  { slug: "carry-bags", label: "Carry Bags" },
  { slug: "cutlery-straws", label: "Cutlery & Straws" },
];

export function ProductCatalogueExplorer({ products }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Debounce search query by 150ms for responsive, lag-free live typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim().toLowerCase());
    }, 150);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Query filter (matches product name, category name, or variant sizes/dimensions)
      if (debouncedQuery) {
        const nameMatch = product.name.toLowerCase().includes(debouncedQuery);
        const categoryMatch = product.categoryName.toLowerCase().includes(debouncedQuery);
        const sourceCatMatch = product.sourceSheetCategory
          ? product.sourceSheetCategory.toLowerCase().includes(debouncedQuery)
          : false;
        const variantMatch = product.variants.some(
          (v) =>
            v.size.toLowerCase().includes(debouncedQuery) ||
            (v.dimension && v.dimension.toLowerCase().includes(debouncedQuery))
        );

        if (!nameMatch && !categoryMatch && !sourceCatMatch && !variantMatch) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, debouncedQuery]);

  function handleClear() {
    setSearchInput("");
    setDebouncedQuery("");
  }

  function handleResetAll() {
    setSearchInput("");
    setDebouncedQuery("");
    setSelectedCategory("all");
  }

  return (
    <div className="mt-8">
      {/* Sticky search & category filtering header */}
      <div className="sticky top-16 z-20 -mx-5 mb-8 border-y border-line bg-white/95 px-5 py-4 backdrop-blur-md transition-all shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Live Search Bar */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-3">
              <Search size={18} aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") handleClear();
              }}
              placeholder="Search products by name, category, size (e.g. 'paper cup', 'pizza box', '8 oz')..."
              className="w-full rounded-2xl border-2 border-line bg-surface-off py-2.5 pl-10 pr-10 text-sm font-semibold text-ink transition-all placeholder:text-ink-3 focus:border-brand-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-green-light"
              aria-label="Search product catalogue"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink-3 transition-colors hover:text-ink"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-line hover:bg-ink-3/20">
                  <X size={14} />
                </div>
              </button>
            )}
          </div>

          {/* Result count pill */}
          <div className="flex items-center justify-between text-xs font-bold text-ink-3 md:justify-end">
            <span>
              Showing <b className="text-brand-blue-dark">{filteredProducts.length}</b> of {products.length} products
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mx-auto mt-3.5 flex max-w-6xl gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex whitespace-nowrap items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-brand-green text-white shadow-sm"
                    : "border border-line bg-white text-ink-2 hover:border-brand-green/40 hover:bg-surface-off"
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                    isActive ? "bg-white/20 text-white" : "bg-surface-off text-ink-3"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid or Friendly Empty State */}
      {filteredProducts.length > 0 ? (
        <ProductCardGrid products={filteredProducts} />
      ) : (
        <div className="my-12 rounded-3xl border-2 border-dashed border-line bg-surface-off p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-card">
            <PackageSearch size={28} className="text-brand-green-dark" />
          </div>
          <h3 className="mt-4 text-xl font-extrabold text-ink">No products found</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-2">
            {debouncedQuery
              ? `No items match "${searchInput}"${
                  selectedCategory !== "all"
                    ? ` in ${CATEGORIES.find((c) => c.slug === selectedCategory)?.label}`
                    : ""
                }. Try checking your spelling or search for broader keywords.`
              : "No products available in this category."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
            >
              <RotateCcw size={14} /> Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
