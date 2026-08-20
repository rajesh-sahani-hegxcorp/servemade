"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useReveal } from "@/hooks/useReveal";

export function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const { ref, isVisible } = useReveal();
  const value = useCountUp(to, isVisible);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
