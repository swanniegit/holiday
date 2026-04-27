import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import SpecialsGrid from "@/components/SpecialsGrid";
import BeachcomberSearch from "@/components/BeachcomberSearch";
import { PACKAGES } from "@/config/site";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Browse live Beachcomber hotel specials and search real-time availability for Mauritius. Curated packages from 32onHerold Holidays, Somerset West.",
  openGraph: { title: "Travel Packages | 32onHerold", description: "Live Beachcomber specials and curated travel packages from South Africa." },
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

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
              Our Packages
            </h2>
            <p className="mt-3 text-charcoal/60 max-w-lg mx-auto">
              Hand-crafted experiences for every type of traveller
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.pageImage}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.destination}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{pkg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
