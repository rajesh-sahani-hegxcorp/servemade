export interface ShippingOption {
  value: "FOB" | "CIF" | "DDP";
  label: string;
  note: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { value: "FOB", label: "We arrange freight", note: "FOB — you book shipping" },
  { value: "CIF", label: "Ship to my port", note: "CIF — freight included" },
  { value: "DDP", label: "Deliver to my door", note: "DDP — everything handled" },
];
