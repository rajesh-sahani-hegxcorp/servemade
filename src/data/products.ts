import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    slug: "paper-hot-cups",
    name: "Paper Hot Cups",
    categorySlug: "cups-lids",
    categoryName: "Cups & Lids",
    tagline: "Double-wall compostable paper hot cups with plant-based lining.",
    summary:
      "Double-wall insulated cups that keep drinks hot and hands comfortable — no sleeve needed. FSC® paper with a plant-based lining, so the whole cup is commercially compostable. Minimum order 50,000 pieces; production 3–4 weeks.",
    ratingLabel: "Loved by cafés & coffee chains across the GCC",
    quickFacts: [
      { value: "50k pieces", label: "Minimum order" },
      { value: "3–4 weeks", label: "Production" },
      { value: "1,000 / carton", label: "Packed" },
      { value: "Yes", label: "Custom print" },
    ],
    sizes: [
      { label: "8 oz", note: "espresso & small" },
      { label: "12 oz", note: "standard coffee" },
      { label: "16 oz", note: "large & lattes" },
    ],
    baseMoq: 50000,
    moqUnit: "pieces",
    material: "Double-wall FSC® kraft, plant-based lining",
    printing: "Full-wrap, 1–6 colours, matte or gloss",
    endOfLife: "Commercially compostable (certified)",
    heatRating: "Drinks up to 100 °C",
    lidFit: "80 / 90 mm — fibre & CPLA lids",
    cartonPack: "1,000 cups per carton",
    cartonVolume: "0.12 – 0.16 m³ by size",
    hsCode: "4823.69",
    leadTime: "3–4 weeks (+ print setup if branded)",
    shipsFrom: "Nhava Sheva (Mumbai), India",
    overview: [
      {
        heading: "Why cafés choose this cup",
        body: "The double-wall build traps insulating air between two paper layers — drinks stay hot longer and the cup is comfortable to hold without a sleeve. The lining is plant-based, which is what makes the whole cup commercially compostable.",
        bullets: [
          "No sleeve needed — comfortable with hot drinks",
          "Leak-resistant rolled rim, works with our fibre lids",
          "Full-wrap printing in up to 6 colours",
          "Pairs with fibre lids and stirrers for a plastic-free serve",
        ],
      },
      {
        heading: "What happens after you order",
        body: "You approve a physical sample and artwork first. Production runs 3–4 weeks with checks at four stages, and you're updated at every milestone — confirmed, in production, inspected, shipped, arriving.",
        bullets: [
          "Milestone updates by email or WhatsApp — your choice",
          "Photo report of your finished order before it ships",
          "A named contact who knows your account",
        ],
      },
    ],
    certifications: [
      { name: "FDA food-contact", note: "US market compliance" },
      { name: "EU 10/2011", note: "European food-contact" },
      { name: "FSC® certificate", note: "Responsible paper sourcing" },
      { name: "Compostability", note: "EN 13432 certified" },
      { name: "ISO 9001", note: "Facility quality system" },
      { name: "Product datasheet", note: "Full specs & sizes" },
    ],
    faqs: [
      {
        question: "Can I mix sizes in one order?",
        answer:
          "Yes — 8, 12 and 16 oz can share one minimum order and one container. Tell us the split and we price it as a single order.",
      },
      {
        question: "How does custom printing work?",
        answer:
          "Send a logo or artwork; we return a free digital proof, then a physical printed sample for sign-off before full production begins.",
      },
      {
        question: "What arrives with my order?",
        answer:
          "Your goods plus a packing list, commercial invoice and the full certification pack — and a photo report taken before dispatch.",
      },
      {
        question: "What is the minimum order quantity?",
        answer: "50,000 cups. Rates improve at 250,000, 500,000 and full-container (about 2 million cups) tiers.",
      },
    ],
    relatedSlugs: ["fibre-cup-lids", "cup-sleeves", "paper-straws"],
    gallery: { type: "cup" },
  },
  {
    slug: "fibre-cup-lids",
    name: "Fibre Cup Lids",
    categorySlug: "cups-lids",
    categoryName: "Cups & Lids",
    tagline: "Plastic-free sip lids that fit our hot cups exactly.",
    summary:
      "Moulded fibre lids sized to fit our 8, 12 and 16 oz hot cups with a secure snap-fit and a raised sip lip. Commercially compostable alongside the cup — no separation needed at end of life.",
    ratingLabel: "The default pairing for our hot cup range",
    quickFacts: [
      { value: "50k pieces", label: "Minimum order" },
      { value: "2–3 weeks", label: "Production" },
      { value: "2,000 / carton", label: "Packed" },
      { value: "No", label: "Custom print" },
    ],
    sizes: [
      { label: "80mm", note: "fits 8 oz" },
      { label: "90mm", note: "fits 12 / 16 oz" },
    ],
    baseMoq: 50000,
    moqUnit: "pieces",
    material: "Moulded bagasse fibre",
    printing: "Not printable — natural fibre finish only",
    endOfLife: "Commercially compostable (certified)",
    lidFit: "Snap-fit to 80mm and 90mm rims",
    cartonPack: "2,000 lids per carton",
    cartonVolume: "0.09 m³",
    hsCode: "4823.70",
    leadTime: "2–3 weeks",
    shipsFrom: "Nhava Sheva (Mumbai), India",
    overview: [
      {
        heading: "Why buyers pair these with our cups",
        body: "Sized and toleranced against our own hot cup rims, so the fit is snug without special-ordering both from different mills. One supplier, one carton, one lead time for the whole serve.",
        bullets: [
          "Secure snap-fit — no popping off in transit",
          "Raised sip lip reduces spill risk",
          "Same certification pack as the cups",
        ],
      },
      {
        heading: "Ordering alongside cups",
        body: "Most buyers add lids to the same purchase order as their cup order so both ship in one container. Mention this on your quote request and we'll consolidate freight automatically.",
        bullets: ["Consolidated freight with cup orders", "Matched lead times so nothing waits on the other"],
      },
    ],
    certifications: [
      { name: "FDA food-contact", note: "US market compliance" },
      { name: "EU 10/2011", note: "European food-contact" },
      { name: "Compostability", note: "EN 13432 certified" },
      { name: "ISO 9001", note: "Facility quality system" },
    ],
    faqs: [
      {
        question: "Do these fit cups from other suppliers?",
        answer:
          "Usually, since 80/90mm rims are a common industry standard — but we can only guarantee fit against our own cups. Ask for a sample to check.",
      },
      {
        question: "What is the minimum order quantity?",
        answer: "50,000 lids. The same volume-tier discounts as our cups apply.",
      },
    ],
    relatedSlugs: ["paper-hot-cups", "paper-straws"],
    gallery: { type: "static", art: "lid" },
  },
  {
    slug: "cup-sleeves",
    name: "Cup Sleeves",
    categorySlug: "cups-lids",
    categoryName: "Cups & Lids",
    tagline: "Extra branding space, or heat comfort for single-wall cups.",
    summary:
      "Corrugated kraft sleeves that slip over single-wall cups for heat comfort, or over double-wall cups as extra branding real estate. Printed full-wrap in up to 4 colours.",
    ratingLabel: "A low-cost way to add branding to any cup order",
    quickFacts: [
      { value: "50k pieces", label: "Minimum order" },
      { value: "2–3 weeks", label: "Production" },
      { value: "2,500 / carton", label: "Packed" },
      { value: "Yes", label: "Custom print" },
    ],
    sizes: [{ label: "Standard", note: "fits 8–16 oz cups" }],
    baseMoq: 50000,
    moqUnit: "pieces",
    material: "Corrugated FSC® kraft",
    printing: "Full-wrap, 1–4 colours",
    endOfLife: "Commercially compostable (certified)",
    cartonPack: "2,500 sleeves per carton",
    cartonVolume: "0.08 m³",
    hsCode: "4808.10",
    leadTime: "2–3 weeks",
    shipsFrom: "Nhava Sheva (Mumbai), India",
    overview: [
      {
        heading: "Why add sleeves to an order",
        body: "Cheapest square inch of branding in the range, and a practical add-on if you'd rather run single-wall cups to save on unit cost while still keeping hands comfortable.",
        bullets: ["Lowest-cost branded surface we offer", "Works with single-wall or double-wall cups"],
      },
      {
        heading: "What happens after you order",
        body: "Same proofing process as our cups — digital proof, then a physical printed sample before full production.",
        bullets: ["Free digital proof", "Physical sample before production run"],
      },
    ],
    certifications: [
      { name: "FSC® certificate", note: "Responsible paper sourcing" },
      { name: "Compostability", note: "EN 13432 certified" },
    ],
    faqs: [
      {
        question: "Will these fit any cup?",
        answer: "They're cut for the standard 8–16 oz taper used across our cup range and most industry-standard cups.",
      },
    ],
    relatedSlugs: ["paper-hot-cups"],
    gallery: { type: "static", art: "cup" },
  },
  {
    slug: "paper-straws",
    name: "Paper Straws",
    categorySlug: "cutlery-straws",
    categoryName: "Cutlery & Straws",
    tagline: "Food-safe straws that hold their shape.",
    summary:
      "Multi-ply paper straws engineered to resist sogging for the length of a typical drink. Standard and jumbo (smoothie) widths, plain or printed.",
    ratingLabel: "A frequent add-on to cold cup and juice orders",
    quickFacts: [
      { value: "100k pieces", label: "Minimum order" },
      { value: "2–3 weeks", label: "Production" },
      { value: "5,000 / carton", label: "Packed" },
      { value: "Yes", label: "Custom print" },
    ],
    sizes: [
      { label: "Standard", note: "sodas & juices" },
      { label: "Jumbo", note: "smoothies & shakes" },
    ],
    baseMoq: 100000,
    moqUnit: "pieces",
    material: "Multi-ply food-grade paper",
    printing: "Spiral print, 1–2 colours",
    endOfLife: "Commercially compostable (certified)",
    cartonPack: "5,000 straws per carton",
    cartonVolume: "0.1 m³",
    hsCode: "4823.90",
    leadTime: "2–3 weeks",
    shipsFrom: "Nhava Sheva (Mumbai), India",
    overview: [
      {
        heading: "Built to actually hold up",
        body: "Multi-ply construction resists the sogging that gives paper straws a bad reputation — tested to hold shape for the length of a typical drink.",
        bullets: ["Multi-ply construction resists sogging", "Standard and jumbo widths in one order"],
      },
      {
        heading: "Ordering alongside cups",
        body: "Frequently ordered alongside our cold cups and juice-serve kits to consolidate freight into one container.",
        bullets: ["Consolidated freight with cup orders", "Same certification pack as the rest of the range"],
      },
    ],
    certifications: [
      { name: "FDA food-contact", note: "US market compliance" },
      { name: "Compostability", note: "EN 13432 certified" },
    ],
    faqs: [
      {
        question: "What is the minimum order quantity?",
        answer: "100,000 straws — smaller than a cup order, since a smaller batch still fills a production run.",
      },
    ],
    relatedSlugs: ["paper-hot-cups", "fibre-cup-lids"],
    gallery: { type: "static", art: "straw" },
  },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function resolveRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs.map(findProduct).filter((p): p is Product => Boolean(p));
}
