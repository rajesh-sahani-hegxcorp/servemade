"use client";

import { useReveal } from "@/hooks/useReveal";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(18px)",
        transition: `opacity .6s ${delay}s, transform .6s ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
