export const CERTIFICATIONS: string[] = [
  "FDA food-contact",
  "EU 10/2011",
  "FSC® certified paper",
  "EN 13432 compostable",
  "ISO 9001 facilities",
  "HACCP",
];

export const PRIMARY_NAV: { label: string; href: string }[] = [
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Resources", href: "#resources" },
];

export const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Biodegradable Products", href: "/categories/plates-bowls" },
      { label: "Paper Cups", href: "/categories/paper-cups" },
      { label: "Grab & Go", href: "/categories/cups-lids" },
      { label: "Takeaway Containers", href: "/categories/takeaway-boxes" },
      { label: "Carry Bags", href: "/categories/carry-bags" },
      { label: "Cutlery & Straws", href: "/categories/cutlery-straws" },
      { label: "Custom & Private Label", href: "/custom-packaging" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Why us", href: "/why-serve-made" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Request a quote", href: "/quote" },
      { label: "Ask for samples", href: "/samples" },
      { label: "Download catalogue", href: "/resources/catalogue" },
    ],
  },
];

export const COMPANY_DESCRIPTION =
  "Serve Made is an India-based B2B exporter of certified compostable food packaging — bagasse tableware, paper cups, takeaway boxes, bags, cutlery and straws — serving importers, distributors and food-service groups across the GCC and beyond.";
