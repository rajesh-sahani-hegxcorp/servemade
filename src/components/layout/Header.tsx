"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PRIMARY_NAV } from "@/data/site";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
                                return (
                                  <li key={idx}>
                                    <Link
                                      href={subItem.href || "#"}
                                      className="block py-1 text-xs font-semibold text-ink-2 transition-colors hover:text-brand-green-dark hover:translate-x-0.5 transform transition-transform duration-100"
                                    >
                                      {subItem.name}
                                    </Link>
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
        <div className="border-t border-line bg-white px-5 py-3 md:hidden">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3 py-2.5 font-semibold text-ink-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

interface MegaMenuColItem {
  name: string;
  href?: string;
  isHeading?: boolean;
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
      { name: "Bagasse Round Bowl", href: "/products/bagasse-round-bowl" },
      { name: "Bagasse Square Bowl", href: "/products/bagasse-square-bowl" },
      { name: "Bagasse Round Plate", href: "/products/bagasse-round-plate" },
      { name: "Bagasse 3-CP Meal Plate", href: "/products/bagasse-3-compartment-combo-meal-plate" },
      { name: "Bagasse 4-CP Meal Tray", href: "/products/bagasse-4-compartment-meal-tray" },
      { name: "Bagasse 5-CP Meal Tray", href: "/products/bagasse-5-compartment-meal-tray" },
      { name: "Bagasse 3-CP Round Plate", href: "/products/bagasse-3-compartment-round-plate" },
      { name: "Bagasse 4-CP Round Plate", href: "/products/bagasse-4-compartment-round-plate" },
      { name: "Bagasse 3-CP Square Plate", href: "/products/bagasse-3-compartment-square-plate" }
    ]
  },
  {
    title: "Paper Cups",
    href: "/categories/paper-cups",
    items: [
      { name: "Single Wall Paper Cup", href: "/products/single-wall-paper-cup" },
      { name: "Double-Wall Paper Cup", href: "/products/double-wall-paper-cup" },
      { name: "Ripple Wall Paper Cup", href: "/products/ripple-paper-cup" }
    ]
  },
  {
    title: "Grab & Go",
    href: "/categories/cups-lids",
    items: [
      { name: "Plain Round Container", href: "/products/plain-round-paper-container-with-lid" },
      { name: "Kraft Round Container", href: "/products/kraft-round-paper-container-with-lid" }
    ]
  },
  {
    title: "Biodegradable Containers",
    href: "/categories/biodegradable-containers",
    items: [
      { isHeading: true, name: "Pizza Boxes" },
      { name: "Top-Folding Pizza Box", href: "/products/top-folding-pizza-box" },
      { name: "3-Ply Corrugated Pizza Box", href: "/products/3-ply-corrugated-pizza-box" },
      { name: "3-Ply Garlic Bread Box", href: "/products/3-ply-corrugated-garlic-bread-box" },
      { isHeading: true, name: "Trays & Bowls" },
      { name: "Plain Rect. Food Box", href: "/products/plain-rectangular-food-box" },
      { name: "Kraft Boat Tray", href: "/products/kraft-boat-tray" },
      { name: "Kraft Paper Bowl", href: "/products/kraft-paper-bowl-with-pet-lid" },
      { name: "Bagasse Rect. Container", href: "/products/bagasse-rectangular-container" },
      { name: "Bagasse Clamshell", href: "/products/bagasse-clamshell" }
    ]
  },
  {
    title: "Carry Bags",
    href: "/categories/carry-bags",
    items: [
      { name: "Kraft Paper Bags", href: "/products/kraft-paper-bags" }
    ]
  },
  {
    title: "Cutlery & Straws",
    href: "/categories/cutlery-straws",
    items: [
      { isHeading: true, name: "Cutlery & Straws" },
      { name: "Paper Straw", href: "/products/paper-straw" },
      { name: "Wooden Spoon", href: "/products/wooden-spoon" },
      { name: "Wooden Spoon/Fork", href: "/products/wooden-spoon-fork" },
      { name: "Bamboo Fruit Fork", href: "/products/bamboo-fruit-fork" },
      { name: "Toothpick", href: "/products/toothpick" },
      { isHeading: true, name: "Sticks & Skewers" },
      { name: "Bamboo Stick", href: "/products/bamboo-stick" },
      { name: "Gun Skewer", href: "/products/gun-skewer" },
      { name: "Chopsticks", href: "/products/chopsticks" },
      { name: "Coffee Stirrer", href: "/products/coffee-stirrer" },
      { name: "Round Liquor Stirrer", href: "/products/round-liquor-stirrer" }
    ]
  }
];
