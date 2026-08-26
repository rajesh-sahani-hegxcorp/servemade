import type { ReactNode } from "react";

const INK_2 = "#5C666D";
const BLUE = "#2C5F8A";

export type CupView = "plain" | "branded" | "withlid" | "stacked";

export const CUP_VIEWS: { key: CupView; label: string }[] = [
  { key: "plain", label: "Plain cup" },
  { key: "branded", label: "With your logo" },
  { key: "withlid", label: "With fibre lid" },
  { key: "stacked", label: "The full set" },
];

function Cup({
  x = 0,
  y = 0,
  scale = 1,
  logo,
  lid,
}: {
  x?: number;
  y?: number;
  scale?: number;
  logo?: boolean;
  lid?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-34 0h68l-8 110a8 8 0 0 1-8 7h-36a8 8 0 0 1-8-7Z" fill="#EFE7D4" stroke={INK_2} strokeWidth="1.4" />
      <path d="M-30 40h60M-28 74h56" stroke="#DDD2B6" strokeWidth="1.4" />
      {logo && (
        <g>
          <rect x="-28" y="44" width="56" height="27" rx="6" fill={BLUE} />
          <path d="M-4 62c0-5.5 3-8.5 10-9.8-1.2 5.8-4 8.8-10 9.8Z" fill="#fff" />
          <text x="0" y="40" textAnchor="middle" fontFamily="Figtree" fontSize="7.5" fontWeight="700" fill={INK_2}>
            YOUR BRAND
          </text>
        </g>
      )}
      {lid ? (
        <g>
          <ellipse cx="0" cy="-7" rx="38" ry="11" fill="#F6F1E4" stroke={INK_2} strokeWidth="1.4" />
          <ellipse cx="0" cy="-9" rx="22" ry="6.5" fill="#E4DAC0" stroke={INK_2} strokeWidth="1.1" />
          <ellipse cx="21" cy="-8" rx="6" ry="3.2" fill="#CFC2A0" stroke={INK_2} strokeWidth=".9" />
        </g>
      ) : (
        <ellipse cx="0" cy="0" rx="34" ry="10" fill="#F6F1E4" stroke={INK_2} strokeWidth="1.4" />
      )}
    </g>
  );
}

export function CupGalleryArt({ view, height = 300, label }: { view: CupView; height?: number; label?: string }) {
  const views: Record<CupView, ReactNode> = {
    plain: <Cup y={-52} />,
    branded: <Cup y={-52} logo />,
    withlid: <Cup y={-48} logo lid />,
    stacked: (
      <>
        <Cup x={-52} y={-38} scale={0.8} />
        <Cup x={52} y={-38} scale={0.8} logo />
        <Cup y={-64} scale={0.9} logo lid />
      </>
    ),
  };

  return (
    <svg viewBox="-130 -130 260 260" style={{ height, width: "auto" }} role="img" aria-label={label ?? "Paper hot cup"}>
      {views[view]}
    </svg>
  );
}
