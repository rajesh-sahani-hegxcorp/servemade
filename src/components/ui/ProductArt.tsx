import type { ReactNode } from "react";
import type { ProductArtType } from "@/types";

const INK_2 = "#5C666D";
const CREAM = "#EFE7D4";
const CREAM_2 = "#E2D7BC";
const BLUE = "#2C5F8A";
const GREEN = "#2E8B57";

/** Each entry is the inner <g> markup for one product illustration. */
const ILLUSTRATIONS: Record<ProductArtType, ReactNode> = {
  cup: (
    <g>
      <path d="M76 44h68l-8 106a8 8 0 0 1-8 7H92a8 8 0 0 1-8-7Z" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <ellipse cx="110" cy="44" rx="34" ry="10" fill="#F6F1E4" stroke={INK_2} strokeWidth="1.4" />
      <rect x="84" y="86" width="52" height="24" rx="5" fill={BLUE} />
      <path d="M106 103c0-4.6 2.6-7.2 8.5-8.3-1 5-3.4 7.5-8.5 8.3Z" fill="#fff" />
    </g>
  ),
  clam: (
    <g>
      <rect x="34" y="88" width="152" height="42" rx="8" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <rect x="34" y="52" width="152" height="38" rx="8" fill={CREAM_2} stroke={INK_2} strokeWidth="1.4" />
      <rect x="98" y="124" width="24" height="7" rx="3" fill="#D5C9A8" />
    </g>
  ),
  bowl: (
    <g>
      <path d="M40 78a70 62 0 0 0 140 0Z" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <ellipse cx="110" cy="78" rx="70" ry="19" fill={CREAM_2} stroke={INK_2} strokeWidth="1.4" />
    </g>
  ),
  plate: (
    <g>
      <ellipse cx="110" cy="98" rx="86" ry="30" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <ellipse cx="110" cy="100" rx="58" ry="18" fill={CREAM_2} />
    </g>
  ),
  coldcup: (
    <g>
      <path d="M80 42h60l-7 108a8 8 0 0 1-8 7H95a8 8 0 0 1-8-7Z" fill="#EBF2F8" stroke={BLUE} strokeWidth="1.4" />
      <ellipse cx="110" cy="42" rx="30" ry="9" fill="#fff" stroke={BLUE} strokeWidth="1.4" />
      <path d="M98 22v92" stroke={GREEN} strokeWidth="7" strokeLinecap="round" transform="rotate(8 110 88)" />
    </g>
  ),
  box: (
    <g>
      <path d="M52 70l24-20h92l-24 20Z" fill={CREAM_2} stroke={INK_2} strokeWidth="1.4" />
      <path d="M144 70l24-20v66l-24 20Z" fill="#D5C7A6" stroke={INK_2} strokeWidth="1.4" />
      <rect x="52" y="70" width="92" height="66" rx="4" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
    </g>
  ),
  bag: (
    <g>
      <path d="M148 46l18-11v104l-18 11Z" fill="#DACBA9" stroke={INK_2} strokeWidth="1.4" />
      <rect x="60" y="46" width="88" height="104" rx="3" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <path d="M85 45q19-24 38 0" fill="none" stroke={INK_2} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  cutlery: (
    <g stroke={INK_2} strokeWidth="1.2" fill={CREAM}>
      <path d="M72 40v18M79 40v18M86 40v18" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 55q9 12 0 22l3 66h6l3-66q9-10 0-22" />
      <ellipse cx="112" cy="52" rx="12" ry="18" />
      <path d="M108 68l2 74h5l2-74" />
      <path d="M138 40q14 7 12 32h-11 M136 70l3 72h5l2-72" />
    </g>
  ),
  straw: (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={62 + i * 23}
          y="30"
          width="9"
          height="128"
          rx="4.5"
          fill={CREAM}
          stroke={INK_2}
          strokeWidth="1.2"
          transform={`rotate(${(i - 2) * 4} ${66 + i * 23} 94)`}
        />
      ))}
    </g>
  ),
  lid: (
    <g>
      <ellipse cx="110" cy="96" rx="72" ry="23" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <ellipse cx="110" cy="94" rx="38" ry="11" fill={CREAM_2} stroke={INK_2} strokeWidth="1.1" />
    </g>
  ),
};

export function ProductArt({
  type,
  height = 96,
  label,
}: {
  type: ProductArtType;
  height?: number;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 180"
      style={{ height, width: "auto" }}
      role="img"
      aria-label={label ?? `${type} product illustration`}
    >
      {ILLUSTRATIONS[type]}
    </svg>
  );
}
