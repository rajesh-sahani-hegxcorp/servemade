import type { ProductCategory } from "@/types";

export const CATEGORIES: ProductCategory[] = [
  {
    art: "plate",
    name: "Biodegradable Products",
    href: "/categories/plates-bowls",
    description: "Dine-in, events, catering",
    moq: "20k",
    image: "/images/products/plates-bowls.jpg",
  },
  {
    art: "cup",
    name: "Paper Cups",
    href: "/categories/paper-cups",
    description: "Single wall, double wall and ripple insulated paper cups",
    image: "/images/products/paper-cups.jpg",
  },
  {
    art: "coldcup",
    name: "Grab & Go",
    href: "/categories/cups-lids",
    description: "Hot, cold and everything between",
    moq: "50k",
  },
  {
    art: "clam",
    name: "Biodegradable Containers",
    href: "/categories/biodegradable-containers",
    description: "Meals that travel well",
    moq: "10k",
    image: "/images/products/takeaway-boxes.jpg",
  },
  {
    art: "bag",
    name: "Carry Bags",
    href: "/categories/carry-bags",
    description: "Strong handles, big branding",
    moq: "30k",
    image: "/images/products/paper-bags.jpg",
  },
  {
    art: "cutlery",
    name: "Cutlery & Straws",
    href: "/categories/cutlery-straws",
    description: "The plastic-free finish",
    moq: "50k",
    image: "/images/products/wooden-cutlery.jpg",
  },
];

