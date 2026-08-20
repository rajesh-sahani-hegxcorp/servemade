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
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-brand-green-light hover:text-brand-green-dark"
            >
              {item.label}
            </a>
          ))}
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
