"use client";

import { useEffect, useState } from "react";

/** Eases a value from 0 up to `target` over `durationMs`, starting once `trigger` becomes true. */
export function useCountUp(target: number, trigger: boolean, durationMs = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | undefined;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [trigger, target, durationMs]);

  return value;
}
