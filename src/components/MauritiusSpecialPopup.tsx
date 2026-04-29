"use client";

import { useState } from "react";
import EnquiryModal from "@/components/EnquiryModal";

interface Props {
  onClose?: () => void;
}

export default function MauritiusSpecialPopup({ onClose }: Props) {
  const [showEnquiry, setShowEnquiry] = useState(false);

  if (showEnquiry) {
    return (
      <EnquiryModal
        packageName="Mauritius Paradise Getaway"
        destination="Mauritius"
        onClose={() => { setShowEnquiry(false); onClose?.(); }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md shadow-2xl rounded-sm overflow-hidden">

        {/* Gold accent bar */}
        <div className="h-1 bg-gold w-full" />

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-charcoal/30 hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">Mauritius May Special</p>

          <h2 className="font-display text-2xl text-charcoal font-semibold leading-snug mb-2">
            Book Your Mauritius Escape<br />&amp; Save <span className="text-gold">7%!</span>
          </h2>

          <p className="text-charcoal/60 text-sm leading-relaxed mb-1">
            Reserve your next Mauritius trip in May and enjoy an{" "}
            <strong className="text-charcoal">additional 7% discount</strong> on us.
          </p>
          <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
            Valid for travel between <strong className="text-charcoal">June 2026 – June 2027</strong>.
          </p>

          <a
            href="/packages#live-quotes"
            onClick={onClose}
            className="block w-full py-3 bg-gold text-white text-sm font-medium text-center hover:bg-gold-dark transition-colors"
          >
            Get Live Quote Now
          </a>
          <button
            onClick={() => setShowEnquiry(true)}
            className="block w-full py-3 mt-2 border border-gold text-gold text-sm font-medium text-center hover:bg-cream transition-colors"
          >
            Enquire Here
          </button>

          <p className="text-charcoal/40 text-xs mt-4 leading-relaxed">
            T&amp;Cs apply. Discount applies to land packages only, not airfare.
          </p>
          <p className="text-gold/70 text-xs mt-1 font-medium">
            Offer valid until 4 June 2026
          </p>

          <button
            onClick={onClose}
            className="mt-3 text-xs text-charcoal/30 hover:text-charcoal/60 transition-colors underline"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
