import type { Metadata } from "next";
import Hero from "@/components/Hero";
import DestinationGrid from "@/components/DestinationGrid";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore Mauritius, Zanzibar, Seychelles, Maldives, Bali, Istanbul and more with 32onHerold Holidays. Handpicked destinations for every type of traveller.",
  openGraph: { title: "Travel Destinations | 32onHerold", description: "Handpicked destinations across the Indian Ocean, Asia and Europe." },
};

export default function DestinationsPage() {
  return (
    <>
      <Hero
        title="Explore Amazing"
        titleGold="Destinations"
        subtitle="Discover breathtaking locations around the world, each offering unique experiences and unforgettable memories waiting to be made."
        image="/images/destinations-hero.jpg"
        overlay="dark"
      />
      <DestinationGrid />
    </>
  );
}
