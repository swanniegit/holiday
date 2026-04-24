"use client";

import { useState } from "react";
import { DESTINATIONS } from "@/config/site";
import EnquiryModal from "@/components/EnquiryModal";

const ALL = "All Countries";
const countries = [ALL, ...Array.from(new Set(DESTINATIONS.map((d) => d.country)))];

export default function DestinationGrid() {
  const [filter, setFilter] = useState(ALL);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ name: string; country: string } | null>(null);

  const filtered = DESTINATIONS.filter((d) => {
    const matchCountry = filter === ALL || d.country === filter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <section className="py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-cream-dark text-sm text-charcoal focus:outline-none focus:border-gold w-64"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 text-sm border transition-colors ${
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map(({ slug, country, name, description, bestTime, duration, image }) => (
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
                  <div className="absolute top-3 right-3 bg-gold text-white text-xs px-2 py-1 font-medium">
                    {duration} days
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">{country}</p>
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{name}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-4">{description}</p>
                  <p className="text-gold text-xs mb-5">Best time: {bestTime}</p>
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
