"use client";

import { useState, FormEvent } from "react";
import { DEPARTURE_CITIES, STAR_GRADINGS } from "@/config/site";
import type { EnquiryPayload } from "@/types/beachcomber";

interface EnquiryModalProps {
  packageName?: string;
  destination?: string;
  onClose: () => void;
}

const ADULTS_OPTIONS = [1, 2, 3, 4, 5, 6];
const CHILDREN_OPTIONS = [0, 1, 2, 3, 4];

export default function EnquiryModal({ packageName, destination, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState<EnquiryPayload>({
    packageName,
    name: "",
    surname: "",
    travelDates: "",
    adults: 2,
    children: 0,
    departureCity: "",
    budget: "",
    starGrading: "",
    specialOccasion: "",
    additionalInfo: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: keyof EnquiryPayload, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg h-full overflow-y-auto shadow-xl animate-fade-in">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-charcoal font-semibold">Travel Enquiry</h2>
              {packageName && destination && (
                <p className="text-gold text-sm mt-1">
                  {packageName} – {destination}
                </p>
              )}
            </div>
            <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-charcoal font-semibold mb-2">Enquiry Sent!</h3>
              <p className="text-charcoal/60 text-sm">We&apos;ll be in touch within 24 hours.</p>
              <button onClick={onClose} className="mt-6 px-6 py-2.5 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <section>
                <h3 className="font-display text-charcoal font-semibold flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Surname *</label>
                    <input
                      required
                      type="text"
                      value={form.surname}
                      onChange={(e) => update("surname", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-charcoal font-semibold flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Travel Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Preferred Travel Dates *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., December 2024 or 15-25 Dec 2024"
                      value={form.travelDates}
                      onChange={(e) => update("travelDates", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-charcoal/60 mb-1.5">Number of Adults *</label>
                      <select
                        value={form.adults}
                        onChange={(e) => update("adults", Number(e.target.value))}
                        className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                      >
                        {ADULTS_OPTIONS.map((n) => (
                          <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-charcoal/60 mb-1.5">Number of Children</label>
                      <select
                        value={form.children}
                        onChange={(e) => update("children", Number(e.target.value))}
                        className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                      >
                        {CHILDREN_OPTIONS.map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-charcoal font-semibold flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Travel Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Departure City in South Africa *</label>
                    <select
                      required
                      value={form.departureCity}
                      onChange={(e) => update("departureCity", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="">Select departure city</option>
                      {DEPARTURE_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Budget (ZAR)</label>
                    <input
                      type="text"
                      placeholder="e.g., R50,000 – R80,000"
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Accommodation Star Grading</label>
                    <select
                      value={form.starGrading}
                      onChange={(e) => update("starGrading", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="">Select star grading</option>
                      {STAR_GRADINGS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60 mb-1.5">Special Occasion</label>
                    <input
                      type="text"
                      placeholder="e.g., Honeymoon, Anniversary, Birthday"
                      value={form.specialOccasion}
                      onChange={(e) => update("specialOccasion", e.target.value)}
                      className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-charcoal font-semibold flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Additional Information
                </h3>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1.5">Additional Requirements or Questions</label>
                  <textarea
                    rows={4}
                    placeholder="Any special requirements, dietary restrictions, accessibility needs, or questions…"
                    value={form.additionalInfo}
                    onChange={(e) => update("additionalInfo", e.target.value)}
                    className="w-full border border-cream-dark px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold resize-none"
                  />
                </div>
              </section>

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 border border-cream-dark text-charcoal text-sm font-medium hover:border-charcoal transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send Enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
