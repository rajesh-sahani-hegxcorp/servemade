"use client";

import { useCart } from "@/context/CartContext";

export function Toast() {
  const { toast } = useCart();

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-card-lg transition-transform"
      style={{ transform: toast ? "translate(-50%,0)" : "translate(-50%,90px)" }}
    >
      {toast || "·"}
    </div>
  );
}
