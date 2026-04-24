"use client";

import { useState, FormEvent } from "react";
import type { QuoteRequest, QuoteResponse, RoomOption, AirOption } from "@/types/beachcomber";
import { HOTEL_CODES, DEPARTURE_CITIES } from "@/config/site";

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

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(amount);
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", { dateStyle: "short", timeStyle: "short" });
}

function RoomCard({ room, quoteRef, transferRef, gdsRef, onQuoteSent }: {
  room: RoomOption;
  quoteRef: string;
  transferRef: string;
  gdsRef: string;
  onQuoteSent: () => void;
}) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailData, setEmailData] = useState({ firstname: "", surname: "", emailAddress: "", mobilePhone: "" });
  const [sendStatus, setSendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSendQuote(e: FormEvent) {
    e.preventDefault();
    setSendStatus("loading");
    try {
      const res = await fetch("/api/beachcomber/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteRequestObjRef: quoteRef,
          quoteRefList: room.sendQuoteReferences,
          gdsRequestReference: gdsRef,
          transferProductRef: transferRef,
          ...emailData,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSendStatus("success");
      onQuoteSent();
    } catch {
      setSendStatus("error");
    }
  }

  const lowestPkg = room.packages?.reduce((min, p) =>
    p.pricePerPersonZARFrom < min.pricePerPersonZARFrom ? p : min, room.packages[0]);

  return (
    <div className="border border-cream-dark p-5 rounded-sm">
      <div className="flex items-start gap-4">
        {room.productImages?.[0] && (
          <img
            src={room.productImages[0].imageURL}
            alt={room.accomProductName}
            className="w-24 h-20 object-cover rounded-sm shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-charcoal">{room.accomProductName}</h4>
          <p className="text-xs text-charcoal/50 mt-0.5">{room.roomAllocation} · {room.numberOfNights} nights</p>
          {room.accSpecial1 && (
            <span className="inline-block mt-1 text-xs bg-gold/10 text-gold px-2 py-0.5">{room.accSpecial1}</span>
          )}
          {lowestPkg && (
            <p className="mt-2 font-semibold text-charcoal">
              {formatZAR(lowestPkg.pricePerPersonZARFrom)}{" "}
              <span className="text-xs font-normal text-charcoal/50">pp · {lowestPkg.packageDesc}</span>
            </p>
          )}
        </div>
      </div>

      {!showEmailForm ? (
        <button
          onClick={() => setShowEmailForm(true)}
          className="mt-4 w-full py-2 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
        >
          Email This Quote
        </button>
      ) : sendStatus === "success" ? (
        <p className="mt-4 text-green-600 text-sm font-medium text-center">Quote sent successfully!</p>
      ) : (
        <form onSubmit={handleSendQuote} className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="First name" value={emailData.firstname}
              onChange={(e) => setEmailData((d) => ({ ...d, firstname: e.target.value }))}
              className="border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
            <input required type="text" placeholder="Surname" value={emailData.surname}
              onChange={(e) => setEmailData((d) => ({ ...d, surname: e.target.value }))}
              className="border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          </div>
          <input required type="email" placeholder="Email address" value={emailData.emailAddress}
            onChange={(e) => setEmailData((d) => ({ ...d, emailAddress: e.target.value }))}
            className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          <input required type="tel" placeholder="Mobile number" value={emailData.mobilePhone}
            onChange={(e) => setEmailData((d) => ({ ...d, mobilePhone: e.target.value }))}
            className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
          {sendStatus === "error" && <p className="text-red-500 text-xs">Failed to send. Please try again.</p>}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setShowEmailForm(false)}
              className="py-2 border border-cream-dark text-charcoal text-sm hover:border-charcoal transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={sendStatus === "loading"}
              className="py-2 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-60">
              {sendStatus === "loading" ? "Sending…" : "Send Quote"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function FlightCard({ flight }: { flight: AirOption }) {
  return (
    <div className="border border-cream-dark p-4 rounded-sm text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-charcoal">{flight.operatingCarrier}</span>
        <span className="text-xs text-charcoal/40">{flight.cabin}</span>
      </div>
      <div className="flex items-center gap-3 mt-2 text-charcoal/70">
        <span>{flight.fromArpt} → {flight.toArpt}</span>
        <span className="text-charcoal/40">·</span>
        <span>{formatDateTime(flight.depDateTime)}</span>
      </div>
    </div>
  );
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
      const payload: QuoteRequest = {
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
              {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-charcoal/60 mb-1.5">Children</label>
            <select value={form.nbrChildren} onChange={(e) => update("nbrChildren", Number(e.target.value))}
              className="w-full border border-cream-dark bg-white px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold">
              {[0,1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
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
        <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-sm rounded-sm">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl text-charcoal font-semibold">{results.hotelName}</h3>
            <p className="text-charcoal/60 text-sm mt-1">{results.hotelDescription}</p>
            {results.hotelImages?.[0] && (
              <img src={results.hotelImages[0].imageURL} alt={results.hotelName}
                className="mt-4 w-full h-56 object-cover rounded-sm" />
            )}
          </div>

          {results.airGDS && results.airGDS.length > 0 && (
            <div>
              <h4 className="font-display text-lg text-charcoal font-semibold mb-3">Flights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.airGDS.map((f, i) => <FlightCard key={i} flight={f} />)}
              </div>
            </div>
          )}

          {results.roomOptions && results.roomOptions.length > 0 && (
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
