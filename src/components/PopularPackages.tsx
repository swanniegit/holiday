"use client";

import { useState } from "react";
import Image from "next/image";
import { PACKAGES } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";
import SectionHeading from "@/components/SectionHeading";
import OutlineLink from "@/components/OutlineLink";

export default function PopularPackages() {
  const [selected, setSelected] = useState<{ name: string; destination: string } | null>(null);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Popular Packages"
          subtitle="Carefully crafted travel experiences for every type of adventurer"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map(({ slug, destination, name, description, image }) => (
            <div key={slug} className="rounded-2xl overflow-hidden border border-cream-dark group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">
                  {destination}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-charcoal font-semibold mb-2">{name}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-6">{description}</p>
                <button
                  onClick={() => setSelected({ name, destination })}
                  className="w-full py-2.5 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <OutlineLink href="/packages">View All Packages</OutlineLink>
        </div>
      </div>

      {selected && (
        <EnquiryModal
          packageName={selected.name}
          destination={selected.destination}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
