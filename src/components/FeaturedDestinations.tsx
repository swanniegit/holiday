"use client";

import Link from "next/link";
import { useState } from "react";
import { DESTINATIONS } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";

const featured = DESTINATIONS.slice(0, 3);

export default function FeaturedDestinations() {
  const [selected, setSelected] = useState<{ name: string; country: string } | null>(null);
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
            Featured Destinations
          </h2>
          <p className="mt-3 text-charcoal/55 text-sm max-w-md mx-auto">
            Explore breathtaking locations handpicked by our travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(({ slug, country, flag, name, rating, description, bestTime, image }) => (
            <div key={slug} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating badge — top right */}
                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow">
                  <span className="text-white text-xs font-bold leading-none">{rating}</span>
                </div>
                {/* Flag + country — bottom left */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full">
                  <span>{flag}</span>
                  <span className="font-medium">{country}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                  {country}
                </p>
                <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{name}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-4 line-clamp-3">
                  {description}
                </p>
                <p className="text-gold text-xs font-medium mb-5">
                  Best time: {bestTime} →
                </p>
                <button
                  onClick={() => setSelected({ name, country })}
                  className="w-full py-2.5 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
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
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors rounded-sm"
          >
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
