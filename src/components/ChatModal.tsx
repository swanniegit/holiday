"use client";

import { useState, FormEvent } from "react";

interface ChatModalProps {
  onClose: () => void;
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end px-0 sm:px-6 sm:pb-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:w-96 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-display text-xl text-charcoal font-semibold">Let&apos;s Chat</h2>
              <p className="text-charcoal/50 text-xs mt-0.5">We&apos;ll get back to you within a few hours.</p>
            </div>
            <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal transition-colors mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-charcoal font-semibold mb-1">Message sent!</p>
              <p className="text-charcoal/50 text-sm">We&apos;ll be in touch soon.</p>
              <button onClick={onClose} className="mt-5 px-5 py-2 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors rounded-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Name *</label>
                  <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
                    className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs text-charcoal/60 mb-1">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                  className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-xs text-charcoal/60 mb-1">Message *</label>
                <textarea required rows={3} value={form.message} onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us where you'd like to go or ask us anything…"
                  className="w-full border border-cream-dark px-3 py-2 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold resize-none" />
              </div>
              {status === "error" && <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === "loading"}
                className="w-full py-2.5 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-60">
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
