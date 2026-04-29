import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatButton from "@/components/ChatButton";
import NewsletterPopup from "@/components/NewsletterPopup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const BASE = "https://32onh.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "32onH - Holidays | Curated Travel Experiences from South Africa",
    template: "%s | 32onH",
  },
  description:
    "Expert travel packages to Mauritius, Zanzibar, Seychelles, Maldives, Bali and more. Personalised itineraries crafted by 32onH - Holidays, based in Somerset West, Cape Town.",
  keywords: [
    "travel agency Somerset West",
    "travel agent Cape Town",
    "Mauritius holiday packages South Africa",
    "Zanzibar travel packages",
    "Seychelles holidays",
    "luxury travel South Africa",
    "32onH - Holidays",
    "Beachcomber hotels South Africa",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    title: "32onH - Holidays | Curated Travel Experiences",
    description: "Personalised travel packages to Mauritius, Zanzibar, Seychelles and beyond. Based in Somerset West, Cape Town.",
    url: BASE,
    siteName: "32onH - Holidays",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "32onH - Holidays – Curated Travel from Cape Town" }],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "32onH - Holidays | Curated Travel Experiences",
    description: "Personalised travel packages to Mauritius, Zanzibar, Seychelles and beyond.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_TOKEN_HERE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "32onH - Holidays",
  url: BASE,
  email: "travel@pjfmarkgraaff.co.za",
  description: "Personalised travel packages to Mauritius, Zanzibar, Seychelles, Maldives and more. Based in Somerset West, Cape Town, South Africa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Somerset West",
    addressRegion: "Western Cape",
    addressCountry: "ZA",
  },
  areaServed: { "@type": "Country", name: "South Africa" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Travel Packages",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Trip", name: "Mauritius Packages" } },
      { "@type": "Offer", itemOffered: { "@type": "Trip", name: "Zanzibar Packages" } },
      { "@type": "Offer", itemOffered: { "@type": "Trip", name: "Seychelles Packages" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero.jpg" />
      </head>
      <body className="font-sans text-charcoal bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatButton />
        <NewsletterPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
