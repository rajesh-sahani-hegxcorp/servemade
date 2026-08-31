import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toast } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { siteUrl } from "@/lib/utils";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Serve Made — Certified Sustainable Food Packaging, Exported from India",
    template: "%s · Serve Made",
  },
  description:
    "B2B supplier of compostable plates, cups, takeaway boxes and cutlery. Clear MOQs from 10k pieces, FDA/EU/FSC® certified, quotes within one business day. India → GCC in 5–9 days.",
  alternates: {
    canonical: siteUrl("/"),
    languages: { en: siteUrl("/"), ar: siteUrl("/ar/") },
  },
  openGraph: {
    title: "Serve Made — Sustainable Packaging, Made Simple",
    description: "Certified compostable food packaging with clear MOQs and 1-day quotes.",
    type: "website",
    locale: "en_AE",
    images: [{ url: "/og/serve-made-home.png", width: 1200, height: 630, alt: "Serve Made sustainable food packaging range" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="min-h-screen font-sans text-base leading-relaxed">
        <CartProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <UtilityBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <Toast />
        </CartProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
    </html>
  );
}
