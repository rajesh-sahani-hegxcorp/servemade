"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { PRIMARY_NAV } from "@/data/site";
import { useCart } from "@/context/CartContext";

interface FlyoutOption {
  label: string;
  href: string;
}

interface MegaMenuColItem {
  name: string;
  href?: string;
  isHeading?: boolean;
  flyoutOptions?: FlyoutOption[];
}

interface MegaMenuCol {
  title: string;
  href?: string;
  items: MegaMenuColItem[];
}

const MEGA_MENU_COLUMNS: MegaMenuCol[] = [
  {
    title: "Biodegradable Products",
    href: "/categories/plates-bowls",
    items: [
      {
        name: "Bagasse Bowl",
        href: "/products/bagasse-round-bowl",
        flyoutOptions: [
          { label: "Round", href: "/products/bagasse-round-bowl?shape=Round" },
          { label: "Square", href: "/products/bagasse-round-bowl?shape=Square" },
        ],
      },
      {
        name: "Bagasse Round Plate",
        href: "/products/bagasse-round-plate",
        flyoutOptions: [
          { label: "Plain", href: "/products/bagasse-round-plate?compartment=Plain" },
          { label: "3-Compartment", href: "/products/bagasse-round-plate?compartment=3-Compartment" },
          { label: "4-Compartment", href: "/products/bagasse-round-plate?compartment=4-Compartment" },
        ],
      },
      { name: "Bagasse 3-CP Square Plate", href: "/products/bagasse-3-compartment-square-plate" },
      { name: "Bagasse 3-CP Meal Plate", href: "/products/bagasse-3-compartment-combo-meal-plate" },
      { name: "Bagasse 4-CP Meal Tray", href: "/products/bagasse-4-compartment-meal-tray" },
      { name: "Bagasse 5-CP Meal Tray", href: "/products/bagasse-5-compartment-meal-tray" },
    ],
  },
  {
    title: "Paper Cups",
    href: "/categories/paper-cups",
    items: [
      { name: "Single Wall Paper Cup", href: "/products/single-wall-paper-cup" },
      { name: "Double-Wall Paper Cup", href: "/products/double-wall-paper-cup" },
      { name: "Ripple Wall Paper Cup", href: "/products/ripple-paper-cup" },
    ],
  },
  {
    title: "Grab & Go",
    href: "/categories/cups-lids",
    items: [
      { name: "Plain Round Container", href: "/products/plain-round-paper-container-with-lid" },
      { name: "Kraft Round Container", href: "/products/kraft-round-paper-container-with-lid" },
    ],
  },
  {
    title: "Biodegradable Containers",
    href: "/categories/biodegradable-containers",
    items: [
      {
        name: "Round Bowl with Lid",
        href: "/products/round-bowl-with-lid",
        flyoutOptions: [
          { label: "Bagasse", href: "/products/round-bowl-with-lid?material=Bagasse" },
          { label: "Cornstarch", href: "/products/round-bowl-with-lid?material=Cornstarch" },
        ],
      },
      {
        name: "Meal Tray with Lid",
        href: "/products/meal-tray-with-lid",
        flyoutOptions: [
          { label: "2-Compartment", href: "/products/meal-tray-with-lid?compartments=2" },
          { label: "3-Compartment", href: "/products/meal-tray-with-lid?compartments=3" },
          { label: "4-Compartment", href: "/products/meal-tray-with-lid?compartments=4" },
          { label: "5-Compartment", href: "/products/meal-tray-with-lid?compartments=5" },
        ],
      },
      {
        name: "Rectangle Container with Lid",
        href: "/products/rectangle-container-with-lid",
        flyoutOptions: [
          { label: "Bagasse", href: "/products/rectangle-container-with-lid?material=Bagasse" },
          { label: "Cornstarch", href: "/products/rectangle-container-with-lid?material=Cornstarch" },
        ],
      },
      { name: "Bagasse Clamshell", href: "/products/bagasse-clamshell" },
      { name: "Kraft Boat Tray", href: "/products/kraft-boat-tray" },
      { name: "Kraft Paper Bowl with PET Lid", href: "/products/kraft-paper-bowl-with-pet-lid" },
    ],
  },
  {
    title: "Carry Bags",
    href: "/categories/carry-bags",
    items: [{ name: "Kraft Paper Bags", href: "/products/kraft-paper-bags" }],
  },
  {
    title: "Cutlery & Straws",
    href: "/categories/cutlery-straws",
    items: [
      { isHeading: true, name: "Cutlery & Straws" },
      { name: "Paper Straw", href: "/products/paper-straw" },
      { name: "Wooden Spoon", href: "/products/wooden-spoon" },
      { name: "Wooden Spoon/Fork", href: "/products/wooden-spoonfork" },
      { name: "Bamboo Fruit Fork", href: "/products/bamboo-fruit-fork" },
      { name: "Toothpick", href: "/products/toothpick" },
      { isHeading: true, name: "Sticks & Skewers" },
      { name: "Bamboo Stick", href: "/products/bamboo-stick" },
      { name: "Gun Skewer", href: "/products/gun-skewer" },
      { name: "Chopsticks", href: "/products/chopsticks" },
      { name: "Coffee Stirrer", href: "/products/coffee-stirrer" },
      { name: "Round Liquor Stirrer", href: "/products/round-liquor-stirrer" },
    ],
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const { items } = useCart();
  const count = items.length;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-6xl items-center gap-5 px-5">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight" aria-label="Serve Made home">
          <svg width="28" height="28" viewBox="0 0 30 30" role="img" aria-label="Serve Made logo">
            <rect width="30" height="30" rx="9" fill="#2E8B57" />
            <path d="M9 21c0-6.5 4-10.5 12-12-1.5 8.5-5.5 12-12 12Z" fill="#fff" />
          </svg>
          Serve Made
        </Link>

        <nav className="ml-auto hidden gap-1 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            if (item.label === "Products") {
              return (
                <div key={item.label} className="group">
                  <Link
                    href="/products"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-brand-green-light hover:text-brand-green-dark inline-flex items-center gap-1.5"
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className="transition-transform group-hover:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </Link>

                  {/* Full-width Mega Menu Dropdown */}
                  <div className="absolute left-0 right-0 top-full z-50 w-screen max-w-full border-t border-line bg-white shadow-xl transition-all duration-200 ease-out opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                    <div className="mx-auto max-w-6xl px-5 py-8">
                      <div className="grid grid-cols-6 gap-6 text-left">
                        {MEGA_MENU_COLUMNS.map((col) => (
                          <div key={col.title} className="flex flex-col">
                            <h3 className="text-xs font-black uppercase tracking-wider text-brand-green-dark border-b border-line pb-2 mb-3">
                              {col.href ? (
                                <Link href={col.href} className="hover:underline">
                                  {col.title}
                                </Link>
                              ) : (
                                col.title
                              )}
                            </h3>
                            <ul className="space-y-1">
                              {col.items.map((subItem, idx) => {
                                if (subItem.isHeading) {
                                  return (
                                    <li
                                      key={idx}
                                      className="text-[10px] font-extrabold uppercase tracking-wider text-ink-3 pt-3 pb-1 border-b border-dashed border-line first:pt-0"
                                    >
                                      {subItem.name}
                                    </li>
                                  );
                                }

                                const hasFlyout = Boolean(subItem.flyoutOptions && subItem.flyoutOptions.length > 0);

                                return (
                                  <li key={idx} className={hasFlyout ? "relative group/flyout" : ""}>
                                    <Link
                                      href={subItem.href || "#"}
                                      className={`flex items-center justify-between py-1 text-xs font-semibold text-ink-2 transition-colors hover:text-brand-green-dark hover:translate-x-0.5 transform transition-transform duration-100 ${
                                        hasFlyout ? "pr-1" : ""
                                      }`}
                                    >
                                      <span>{subItem.name}</span>
                                      {hasFlyout && (
                                        <ChevronRight
                                          size={11}
                                          className="text-ink-3/70 transition-transform group-hover/flyout:translate-x-0.5 group-hover/flyout:text-brand-green-dark"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </Link>

                                    {/* Desktop Hover Flyout Submenu */}
                                    {hasFlyout && subItem.flyoutOptions && (
                                      <div className="absolute left-full top-0 -mt-1.5 ml-1 z-50 min-w-[152px] rounded-xl border border-line bg-white/98 backdrop-blur-md p-1.5 shadow-xl transition-all duration-150 ease-out opacity-0 translate-x-1 invisible pointer-events-none group-hover/flyout:opacity-100 group-hover/flyout:translate-x-0 group-hover/flyout:visible group-hover/flyout:pointer-events-auto focus-within:opacity-100 focus-within:translate-x-0 focus-within:visible focus-within:pointer-events-auto before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3">
                                        <div className="px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider text-ink-3/80 border-b border-line/60 mb-1">
                                          Select Option
                                        </div>
                                        <ul className="space-y-0.5">
                                          {subItem.flyoutOptions.map((opt, optIdx) => (
                                            <li key={optIdx}>
                                              <Link
                                                href={opt.href}
                                                className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:bg-brand-green-light hover:text-brand-green-dark focus:bg-brand-green-light focus:text-brand-green-dark"
                                              >
                                                <span>{opt.label}</span>
                                                <span className="text-[10px] text-brand-green">→</span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Mega Menu Footer Banner for Custom Packaging */}
                      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs font-bold">
                        <span className="text-ink-2">
                          Need custom sizing, shapes, or private-label embossing?
                        </span>
                        <Link
                          href="/custom-packaging"
                          className="text-brand-green-dark hover:underline flex items-center gap-1"
                        >
                          Explore Custom & Private Label →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-brand-green-light hover:text-brand-green-dark"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <Link
          href="/quote"
          className="relative hidden rounded-full border-2 border-line px-4 py-2 text-sm font-bold sm:block"
        >
          My quote
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-green px-1 text-xs font-bold text-white">
              {count}
            </span>
          )}
        </Link>

        <Link
          href="/quote"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-2 text-sm font-bold text-white shadow-cta transition-transform hover:-translate-y-0.5"
        >
          Get a quote
        </Link>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border-2 border-line md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-line bg-white px-5 py-4 md:hidden">
          <div className="space-y-2">
            {/* Products Accordion on Mobile */}
            <div className="rounded-2xl border border-line bg-surface-off/60 p-3">
              <div className="flex items-center justify-between pb-2 border-b border-line/60">
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold text-ink-1 hover:text-brand-green-dark"
                >
                  All Products
                </Link>
              </div>

              <div className="mt-2 space-y-3">
                {MEGA_MENU_COLUMNS.map((col) => {
                  const isCatExpanded = mobileExpandedCat === col.title;
                  return (
                    <div key={col.title} className="text-xs">
                      <button
                        type="button"
                        onClick={() => setMobileExpandedCat(isCatExpanded ? null : col.title)}
                        className="flex w-full items-center justify-between py-1.5 font-extrabold text-brand-green-dark"
                      >
                        <span>{col.title}</span>
                        <ChevronDown
                          size={13}
                          className={`transition-transform ${isCatExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isCatExpanded && (
                        <ul className="ml-2 mt-1 space-y-1.5 border-l-2 border-brand-green/20 pl-2.5 pb-2">
                          {col.items.map((subItem, idx) => {
                            if (subItem.isHeading) {
                              return (
                                <li
                                  key={idx}
                                  className="text-[10px] font-black uppercase tracking-wider text-ink-3 pt-1"
                                >
                                  {subItem.name}
                                </li>
                              );
                            }

                            const hasFlyout = Boolean(subItem.flyoutOptions && subItem.flyoutOptions.length > 0);
                            const isItemExpanded = mobileExpandedItem === subItem.name;

                            return (
                              <li key={idx} className="py-0.5">
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={subItem.href || "#"}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-medium text-ink-2 hover:text-brand-green-dark"
                                  >
                                    {subItem.name}
                                  </Link>
                                  {hasFlyout && (
                                    <button
                                      type="button"
                                      onClick={() => setMobileExpandedItem(isItemExpanded ? null : subItem.name)}
                                      className="p-1 text-ink-3 hover:text-brand-green-dark"
                                      aria-label={`Expand ${subItem.name} options`}
                                    >
                                      <ChevronDown
                                        size={12}
                                        className={`transition-transform ${isItemExpanded ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </div>

                                {hasFlyout && isItemExpanded && subItem.flyoutOptions && (
                                  <div className="ml-2 mt-1.5 rounded-lg bg-white p-1.5 border border-line/80 space-y-1">
                                    {subItem.flyoutOptions.map((opt, optIdx) => (
                                      <Link
                                        key={optIdx}
                                        href={opt.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded px-2 py-1 text-[11px] font-semibold text-ink-2 hover:bg-brand-green-light hover:text-brand-green-dark"
                                      >
                                        ↳ {opt.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other Primary Nav Items */}
            {PRIMARY_NAV.filter((item) => item.label !== "Products").map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 font-semibold text-ink-2 hover:bg-brand-green-light hover:text-brand-green-dark"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
