"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { RatesRate, RatesResponse } from "@/types/beachcomber";
import EnquiryModal from "@/components/EnquiryModal";
import { formatZAR, formatDate } from "@/lib/format";
import { getCheapestPackage } from "@/lib/beachcomber-utils";

function SpecialCard({ rate, onEnquire }: { rate: RatesRate; onEnquire: () => void }) {
  const image = rate.hotelImages?.[0]?.imageURL;
  const lowestPackage = getCheapestPackage(rate.packages);

  return (
    <div className="border border-cream-dark rounded-sm overflow-hidden group">
      <div className="relative h-52 bg-cream-dark overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={rate.hotelName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3 bg-gold text-white text-xs px-2 py-1 font-medium">
          {rate.country}
        </div>
        {rate.numberOfNights > 0 && (
          <div className="absolute top-3 right-3 bg-charcoal text-white text-xs px-2 py-1">
            {rate.numberOfNights} nights
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">
          {rate.departFrom || "South Africa"}
        </p>
        <h3 className="font-display text-lg text-charcoal font-semibold mb-1">{rate.hotelName}</h3>
        <p className="text-charcoal/50 text-xs mb-3">{rate.accomProductName}</p>
        {rate.travelFromDate && rate.travelToDate && (
          <p className="text-charcoal/60 text-xs mb-4">
            {formatDate(rate.travelFromDate)} – {formatDate(rate.travelToDate)}
          </p>
        )}
        {lowestPackage && (
          <p className="text-charcoal font-semibold text-sm mb-1">
            From {formatZAR(lowestPackage.pricePerPersonZARFrom)} <span className="text-xs font-normal text-charcoal/50">per person</span>
          </p>
        )}
        {lowestPackage && (
          <p className="text-xs text-charcoal/40 mb-5">{lowestPackage.packageDesc}</p>
        )}
        <button
          onClick={onEnquire}
          className="w-full py-2.5 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}

export default function SpecialsGrid() {
  const [rates, setRates] = useState<RatesRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<RatesRate | null>(null);

  useEffect(() => {
    fetch("/api/beachcomber/rates")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<RatesResponse>;
      })
      .then((data) => setRates(data.beachcomberRates ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-cream-dark rounded-sm overflow-hidden animate-pulse">
            <div className="h-52 bg-cream-dark" />
            <div className="p-6 space-y-3">
              <div className="h-3 bg-cream-dark rounded w-1/3" />
              <div className="h-4 bg-cream-dark rounded w-2/3" />
              <div className="h-3 bg-cream-dark rounded w-1/2" />
              <div className="h-10 bg-cream-dark rounded mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-charcoal/60">
        <p>Unable to load specials at this time. Please try again later.</p>
        <p className="text-xs mt-2 text-charcoal/40">Error: {error}</p>
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div className="text-center py-12 text-charcoal/60">
        <p>No specials available at this time. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rates.map((rate) => (
          <SpecialCard key={rate.identity} rate={rate} onEnquire={() => setSelected(rate)} />
        ))}
      </div>

      {selected && (
        <EnquiryModal
          packageName={selected.hotelName}
          destination={selected.country}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
