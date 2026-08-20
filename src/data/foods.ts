import { Coffee, Pizza, Salad, Soup, Sandwich, CupSoda, Cookie } from "lucide-react";
import type { FoodProfile } from "@/types";

export const FOODS: FoodProfile[] = [
  { icon: Coffee, label: "Coffee & tea", kit: ["cup", "lid", "straw"], names: ["Paper Hot Cups", "Fibre Lids", "Wooden Stirrers"] },
  { icon: Pizza, label: "Pizza & bakes", kit: ["box", "bag", "cutlery"], names: ["Kraft Boxes", "Carry Bags", "Wooden Cutlery"] },
  { icon: Salad, label: "Salads & bowls", kit: ["bowl", "lid", "cutlery"], names: ["Bagasse Bowls", "Fibre Lids", "Wooden Cutlery"] },
  { icon: Soup, label: "Soups & curries", kit: ["bowl", "lid", "bag"], names: ["Bagasse Bowls", "Fibre Lids", "Carry Bags"] },
  { icon: Sandwich, label: "Burgers & wraps", kit: ["clam", "bag", "straw"], names: ["Clamshells", "Carry Bags", "Paper Straws"] },
  { icon: CupSoda, label: "Juices & shakes", kit: ["coldcup", "straw", "lid"], names: ["Clear Cold Cups", "Paper Straws", "Fibre Lids"] },
  { icon: Cookie, label: "Desserts", kit: ["plate", "cutlery", "box"], names: ["Bagasse Plates", "Wooden Cutlery", "Kraft Boxes"] },
];
