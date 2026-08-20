import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ghost?: boolean;
  small?: boolean;
}

/** Pill-shaped call-to-action button. Use <Link> + these classes directly for navigation; this is for in-page actions. */
export function Button({ children, ghost, small, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-transform hover:-translate-y-0.5 active:scale-95",
        small ? "px-5 py-2 text-sm" : "px-7 py-4",
        ghost
          ? "border-2 border-line bg-white text-ink"
          : "border-none bg-brand-green text-white shadow-cta",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
