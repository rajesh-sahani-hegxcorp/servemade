import type React from "react";

const INK_2 = "#5C666D";
const CREAM = "#EFE7D4";
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
  logo = false,
  lid = false,
}: {
  x?: number;
  y?: number;
  scale?: number;
  logo?: boolean;
  lid?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M76 44h68l-8 106a8 8 0 0 1-8 7H92a8 8 0 0 1-8-7Z" fill={CREAM} stroke={INK_2} strokeWidth="1.4" />
      <ellipse cx="110" cy="44" rx="34" ry="10" fill="#F6F1E4" stroke={INK_2} strokeWidth="1.4" />
      {logo && (
        <>
          <rect x="84" y="86" width="52" height="24" rx="5" fill={BLUE} />
          <path d="M106 103c0-4.6 2.6-7.2 8.5-8.3-1 5-3.4 7.5-8.5 8.3Z" fill="#fff" />
        </>
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
  const views: Record<CupView, React.ReactNode> = {
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
