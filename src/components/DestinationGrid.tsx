"use client";

import { useState } from "react";
import { DESTINATIONS } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";
import DestinationCard from "@/components/DestinationCard";

const ALL = "All Countries";
const countries = [ALL, ...Array.from(new Set(DESTINATIONS.map((d) => d.country)))];

export default function DestinationGrid() {
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ name: string; country: string } | null>(null);

  const filtered = DESTINATIONS.filter((d) => {
    const matchCountry = filter === ALL || d.country === filter;
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <section className="bg-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-cream-dark text-sm text-charcoal focus:outline-none focus:border-gold w-64 rounded-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                filter === c
                  ? "bg-gold border-gold text-white"
                  : "border-cream-dark text-charcoal hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-charcoal/50 text-center py-12">No destinations match your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <DestinationCard
                key={dest.slug}
                {...dest}
                variant="grid"
                onEnquire={() => setSelected({ name: dest.name, country: dest.country })}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <EnquiryModal
          packageName={selected.name}
          destination={selected.country}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
