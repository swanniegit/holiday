"use client";

import { useState } from "react";
import MauritiusSpecialPopup from "@/components/MauritiusSpecialPopup";

export default function DemoPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-3">Client preview</p>
        <h1 className="font-display text-3xl text-charcoal font-semibold mb-4">
          Mauritius May Special — Demo
        </h1>
        <p className="text-charcoal/60 text-sm leading-relaxed mb-8">
          This popup appears automatically when a visitor lands on the site.
          Click below to preview it again.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors"
        >
          Show popup again
        </button>
      </div>

      {open && <MauritiusSpecialPopup onClose={() => setOpen(false)} />}
    </div>
  );
}
