"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import type { QuoteRequest, QuoteResponse } from "@/types/beachcomber";
import { HOTEL_CODES, DEPARTURE_CITIES } from "@/config/site";
import RoomCard from "@/components/beachcomber/RoomCard";
import FlightCard from "@/components/beachcomber/FlightCard";

const DEFAULT_FORM: Partial<QuoteRequest> = {
  hotelCode: "",
  dateDeparture: "",
  dateReturn: "",
  departureCity: "",
  includeAir: "true",
  flightAdvanced: "All Airlines",
  flightCabin: "Cheapest",
  honeymoonRates: "false",
  repeaterRates: "false",
  weddingRates: "false",
  weddingDate: "1901-01-01T00:00:00Z",
  nbrAdults: 2,
  nbrChildren: 0,
  nbrInfants: 0,
};

function toISO(dateStr: string) {
  return dateStr ? `${dateStr}T00:00:00Z` : "";
}

export default function BeachcomberSearch() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [results, setResults] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const payload = {
        ...DEFAULT_FORM,
        ...form,
        dateDeparture: toISO(form.dateDeparture as string),
        dateReturn: toISO(form.dateReturn as string),
      } as QuoteRequest;

      const res = await fetch("/api/beachcomber/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.errorMsg) throw new Error(data.errorMsg || data.error || "Search failed");
      setResults(data as QuoteResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  const minDate = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="bg-cream p-6 rounded-sm space-y-5">
        <h3 className="font-display text-xl text-charcoal font-semibold">Search Live Availability</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Hotel</label>
            <select required value={form.hotelCode} onChange={(e) => update("hotelCode", e.target.value)}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
              <option value="">Select hotel</option>
              {HOTEL_CODES.map(({ code, name, stars }) => (
                <option key={code} value={code}>{name} ({stars}★)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Departure Date</label>
            <input required type="date" min={minDate} value={form.dateDeparture as string}
              onChange={(e) => update("dateDeparture", e.target.value)}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Return Date</label>
            <input required type="date" min={minDate} value={form.dateReturn as string}
              onChange={(e) => update("dateReturn", e.target.value)}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Departure City</label>
            <select required value={form.departureCity as string} onChange={(e) => update("departureCity", e.target.value)}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
              <option value="">Select city</option>
              {DEPARTURE_CITIES.map((c) => <option key={c} value={c.toUpperCase()}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Adults</label>
            <select value={form.nbrAdults} onChange={(e) => update("nbrAdults", Number(e.target.value))}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Children</label>
            <select value={form.nbrChildren} onChange={(e) => update("nbrChildren", Number(e.target.value))}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
              {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-charcoal">
              <input type="checkbox" checked={form.honeymoonRates === "true"}
                onChange={(e) => update("honeymoonRates", e.target.checked ? "true" : "false")}
                className="accent-gold w-4 h-4" />
              Honeymoon rates
            </label>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-charcoal">
              <input type="checkbox" checked={form.repeaterRates === "true"}
                onChange={(e) => update("repeaterRates", e.target.checked ? "true" : "false")}
                className="accent-gold w-4 h-4" />
              Repeater rates
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="px-8 py-3 bg-gold text-white font-medium hover:bg-gold-dark transition-colors disabled:opacity-60">
          {loading ? "Searching…" : "Search Availability"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm rounded-sm">{error}</div>
      )}

      {results && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl text-charcoal font-semibold">{results.hotelName}</h3>
            <p className="text-charcoal/60 text-sm mt-1">{results.hotelDescription}</p>
            {results.hotelImages?.[0] && (
              <div className="relative mt-4 w-full h-56">
                <Image src={results.hotelImages[0].imageURL} alt={results.hotelName} fill className="object-cover rounded-sm" />
              </div>
            )}
          </div>

          {results.airGDS?.length > 0 && (
            <div>
              <h4 className="font-display text-lg text-charcoal font-semibold mb-3">Flights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.airGDS.map((f, i) => <FlightCard key={i} flight={f} />)}
              </div>
            </div>
          )}

          {results.roomOptions?.length > 0 && (
            <div>
              <h4 className="font-display text-lg text-charcoal font-semibold mb-3">Room Options</h4>
              <div className="space-y-4">
                {results.roomOptions.map((room, i) => (
                  <RoomCard
                    key={i}
                    room={room}
                    quoteRef={results.quoteRef}
                    transferRef={results.transferProductRef}
                    gdsRef={results.airGDS?.[0]?.requestReference ?? ""}
                    onQuoteSent={() => {}}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
