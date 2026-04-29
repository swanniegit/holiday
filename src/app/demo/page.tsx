"use client";

import { useState } from "react";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function DemoPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">Client preview</p>
        <h1 className="font-display text-3xl text-charcoal font-semibold mb-4">
          Newsletter Popup — Demo
        </h1>
        <p className="text-charcoal/60 text-sm leading-relaxed mb-8">
          This popup appears automatically 2.5 seconds after a first-time visitor lands on any page.
          It shows once per browser and never again after that.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors"
        >
          Show popup again
        </button>

        <div className="mt-10 text-left bg-white border border-cream-dark rounded-sm p-6 text-sm text-charcoal/70 space-y-2">
          <p className="font-semibold text-charcoal text-xs uppercase tracking-widest mb-3">How it works</p>
          <p>• Appears 2.5 s after the first page load — not on every visit.</p>
          <p>• Once closed or subscribed, the browser remembers and never shows it again.</p>
          <p>• Subscribers are saved in the database and you receive an email notification for each signup.</p>
          <p>• T&amp;C displayed: air &amp; land packages booked through 32onH&nbsp;–&nbsp;Holidays only.</p>
        </div>
      </div>

      {open && (
        <NewsletterPopup forceVisible onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
