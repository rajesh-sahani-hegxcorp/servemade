import { Download, FileText, Recycle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Resource {
  icon: LucideIcon;
  title: string;
  href: string;
  description: string;
  cta: string;
}

export const RESOURCES: Resource[] = [
  {
    icon: Download,
    title: "2026 Product Catalogue",
    href: "/resources/catalogue",
    description: "Every product, size, MOQ and carton spec in one PDF.",
    cta: "Download PDF",
  },
  {
    icon: FileText,
    title: "Materials, explained",
    href: "/resources/materials-guide",
    description: "Bagasse vs kraft vs PLA — what each is, and where it wins.",
    cta: "Read the guide",
  },
  {
    icon: Recycle,
    title: "Composting made simple",
    href: "/resources/composting-guide",
    description: "What 'commercially compostable' really means for your city.",
    cta: "Read the guide",
  },
];
