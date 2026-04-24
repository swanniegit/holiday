"use client";

import Link from "next/link";
import { useState } from "react";
import { PACKAGES } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";

export default function PopularPackages() {
  const [selected, setSelected] = useState<{ name: string; destination: string } | null>(null);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
            Popular Packages
          </h2>
          <p className="mt-3 text-charcoal/60 max-w-md mx-auto">
            Carefully crafted travel experiences for every type of adventurer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map(({ slug, destination, name, description, image }) => (
            <div key={slug} className="border border-cream-dark rounded-sm overflow-hidden group">
              <div className="relative h-52 bg-cream-dark overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 font-medium">
                  {destination}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-charcoal font-semibold mb-2">{name}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-5">{description}</p>
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
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-colors text-sm font-medium"
          >
            View All Packages
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
