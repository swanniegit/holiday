"use client";

import { useState } from "react";
import { DESTINATIONS } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";
import DestinationCard from "@/components/DestinationCard";
import SectionHeading from "@/components/SectionHeading";
import OutlineLink from "@/components/OutlineLink";

const featuredSlugs = ["mauritius", "maldives", "istanbul"];
const featured = featuredSlugs.map((s) => DESTINATIONS.find((d) => d.slug === s)!);

export default function FeaturedDestinations() {
  const [selected, setSelected] = useState<{ name: string; country: string } | null>(null);

  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Featured Destinations"
          subtitle="Explore breathtaking locations handpicked by our travel experts"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((dest) => (
            <DestinationCard
              key={dest.slug}
              {...dest}
              variant="featured"
              onEnquire={() => setSelected({ name: dest.name, country: dest.country })}
            />
          ))}
        </div>

        {selected && (
          <EnquiryModal
            packageName={selected.name}
            destination={selected.country}
            onClose={() => setSelected(null)}
          />
        )}

        <div className="text-center mt-10">
          <OutlineLink href="/destinations">View All Destinations</OutlineLink>
        </div>
      </div>
    </section>
  );
}
