export interface QuantityOption {
  label: string; // "50k pcs"
  note: string; // "base rate"
}

export interface QuantityTier {
  quantityLabel: string; // "250,000"
  tierName: string; // "Growth"
  savingsLabel: string; // "Save ~9%"
  description: string;
  isBestValue: boolean;
}

/** Multipliers applied to a product's baseMoq to build its quantity ladder. */
const TIER_MULTIPLIERS = [1, 5, 10] as const; // -> base, 5x base, 10x base; 4th tier is "full container"
const TIER_SAVINGS_PERCENT = [0, 9, 16] as const;

function formatQuantity(n: number): string {
  return n.toLocaleString("en-US");
}

/** Compact "50k" / "250k" / "1.2M" style label for the step-selector chips. */
function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

/** Builds the 4 quantity-selector chips (e.g. "50k pcs" / "250k pcs" / "500k pcs" / "Full container"). */
export function buildQuantityOptions(baseMoq: number): QuantityOption[] {
  const notes = ["base rate", `save ~${TIER_SAVINGS_PERCENT[1]}%`, `save ~${TIER_SAVINGS_PERCENT[2]}%`];
  const options = TIER_MULTIPLIERS.map((multiplier, i) => ({
    label: `${formatCompact(baseMoq * multiplier)} pcs`,
    note: notes[i] ?? "",
  }));
  options.push({ label: "Full container", note: "best rate" });
  return options;
}

/** Builds the 4 pricing-tier cards shown on the "Order quantities" tab. */
export function buildQuantityTiers(baseMoq: number): QuantityTier[] {
  const tiers: QuantityTier[] = TIER_MULTIPLIERS.map((multiplier, i) => {
    const quantity = baseMoq * multiplier;
    const savings = TIER_SAVINGS_PERCENT[i];
    return {
      quantityLabel: formatQuantity(quantity),
      tierName: ["Starter", "Growth", "Volume"][i] ?? "Tier",
      savingsLabel: savings === 0 ? "Base rate" : `Save ~${savings}%`,
      description: [
        "Great for trying us out or single-location buyers.",
        "The sweet spot for small chains and distributors.",
        "For regular importers with steady demand.",
      ][i] ?? "",
      isBestValue: false,
    };
  });

  tiers.push({
    quantityLabel: "Full container",
    tierName: "20 ft FCL",
    savingsLabel: "Best rate + lowest freight",
    description: `≈ ${formatCompact(baseMoq * 40)} units — the cheapest landed cost per piece.`,
    isBestValue: true,
  });

  return tiers;
}
