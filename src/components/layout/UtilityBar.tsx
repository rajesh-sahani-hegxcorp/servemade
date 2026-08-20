import { Truck, Globe } from "lucide-react";
import Link from "next/link";

export function UtilityBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-xs font-semibold">
        <span className="flex items-center gap-2 opacity-90">
          <Truck size={14} aria-hidden="true" /> Ships from Nhava Sheva, India — GCC ports in 5–9 days
        </span>
        <Link href="/ar" className="flex items-center gap-1.5 opacity-90 hover:opacity-100" hrefLang="ar">
          <Globe size={13} aria-hidden="true" /> EN | عربي
        </Link>
      </div>
    </div>
  );
}
