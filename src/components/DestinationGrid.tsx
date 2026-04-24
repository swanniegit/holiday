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
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            {filtered.map(({ slug, country, flag, name, rating, description, bestTime, image }) => (
              <div key={slug} className="bg-white rounded-2xl overflow-hidden border border-cream-dark group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow">
                    <span className="text-white text-xs font-bold">{rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full">
                    <span>{flag}</span>
                    <span className="font-medium">{country}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{country}</p>
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{name}</h3>
                  <p className="text-charcoal/55 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
                  <p className="text-gold text-xs font-medium mb-5">Best time: {bestTime} →</p>
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
