import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SpecialsGrid from "@/components/SpecialsGrid";
import BeachcomberSearch from "@/components/BeachcomberSearch";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Browse Beachcomber hotel specials and search live availability for Mauritius.",
};

export default function PackagesPage() {
  return (
    <>
      <Hero
        title="Travel Packages"
        titleGold="Made for You"
        subtitle="Discover our carefully curated travel packages designed to give you the perfect balance of adventure, comfort, and unforgettable experiences."
        image="/images/packages-hero.jpg"
        overlay="dark"
      />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
              Beachcomber Specials
            </h2>
            <p className="mt-3 text-charcoal/60 max-w-lg mx-auto">
              Live packages from Beachcomber Hotels — Mauritius&apos; finest resorts
            </p>
          </div>
          <SpecialsGrid />
        </div>
      </section>

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
              Search Live Rates
            </h2>
            <p className="mt-3 text-charcoal/60 max-w-lg mx-auto">
              Choose your hotel, dates, and party size — get an instant quote emailed directly to you
            </p>
          </div>
          <BeachcomberSearch />
        </div>
      </section>
    </>
  );
}
