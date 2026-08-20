import type { ReactNode } from "react";

export function StepLabel({ n, children, hint }: { n: number; children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-blue text-xs font-bold text-white">
        {n}
      </span>
      <b className="text-base">{children}</b>
      {hint && <span className="ml-auto text-xs font-semibold text-ink-3">{hint}</span>}
    </div>
  );
}
