import type { Metadata } from "next";
import { Resources } from "@/components/home/Resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides on materials, composting and the full Serve Made product catalogue.",
};

export default function ResourcesIndexPage() {
  return <Resources />;
}
