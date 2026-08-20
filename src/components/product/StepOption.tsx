import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  note?: string;
  grow?: boolean;
}

export function StepOption({ active, onClick, children, note, grow }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-2xl border-2 px-4 py-3 text-center text-sm font-semibold transition-all",
        grow && "flex-1",
        active ? "border-brand-green bg-brand-green-light text-brand-green-dark" : "border-line bg-white text-ink-2"
      )}
      style={grow ? { minWidth: 96 } : undefined}
    >
      {children}
      {note && (
        <small className={cn("mt-0.5 block text-xs font-semibold", active ? "text-brand-green-dark" : "text-ink-3")}>
          {note}
        </small>
      )}
    </button>
  );
}
