import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Tag({ children, blue }: { children: ReactNode; blue?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold",
        blue ? "bg-brand-blue-light text-brand-blue-dark" : "bg-brand-green-light text-brand-green-dark"
      )}
    >
      {children}
    </span>
  );
}
