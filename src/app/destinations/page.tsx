import type { Metadata } from "next";
import Hero from "@/components/Hero";
import DestinationGrid from "@/components/DestinationGrid";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore breathtaking destinations around the world with 32onHerold Holidays.",
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
