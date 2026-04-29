"use client";

import { useEffect, useState, FormEvent } from "react";

const STORAGE_KEY = "32onh_newsletter_seen";

interface NewsletterPopupProps {
  forceVisible?: boolean;
  onClose?: () => void;
}

export default function NewsletterPopup({ forceVisible, onClose }: NewsletterPopupProps = {}) {
  const [visible, setVisible] = useState(forceVisible ?? false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (forceVisible) return;
    if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [forceVisible]);

  function dismiss() {
    if (!forceVisible) localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    onClose?.();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />
      <div className="relative bg-white w-full max-w-md shadow-2xl rounded-sm overflow-hidden">
        {/* Gold accent bar */}
        <div className="h-1 bg-gold w-full" />

        <div className="p-8">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-charcoal/30 hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-charcoal font-semibold mb-2">You&apos;re in!</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Your <span className="text-gold font-semibold">7% discount</span> is locked in. Simply mention
                your newsletter signup when you book your next Beachcomber air &amp; land package through us.
              </p>
              <button
                onClick={dismiss}
                className="mt-6 px-6 py-2.5 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors"
              >
                Start exploring
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">Exclusive offer</p>
              <h2 className="font-display text-2xl text-charcoal font-semibold leading-snug mb-2">
                Save 7% on your<br />Beachcomber holiday
              </h2>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                Join our newsletter and unlock a <strong className="text-charcoal">7% discount</strong> on any
                Beachcomber air &amp; land package booked through us.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-cream-dark px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold"
                />
                {status === "error" && (
                  <p className="text-red-500 text-xs">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Subscribing…" : "Claim my 7% discount"}
                </button>
              </form>

              <p className="text-charcoal/40 text-xs mt-4 leading-relaxed">
                T&amp;C: Discount applies to Beachcomber air &amp; land packages booked directly through 32onH&nbsp;-&nbsp;Holidays.
                Cannot be combined with other promotions.
              </p>

              <button
                onClick={dismiss}
                className="mt-3 text-xs text-charcoal/30 hover:text-charcoal/60 transition-colors underline"
              >
                No thanks
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
