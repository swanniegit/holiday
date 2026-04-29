"use client";

interface Props {
  onClose?: () => void;
}

export default function MauritiusSpecialPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">

        {/* Background: beach image + sunset gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dest-mauritius.jpg')" }}
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(170deg, rgba(8,70,90,0.82) 0%, rgba(14,116,144,0.65) 40%, rgba(217,119,6,0.70) 72%, rgba(194,65,12,0.85) 100%)"
        }} />

        {/* Palm silhouettes — bottom corners */}
        <svg className="absolute bottom-0 left-0 h-40 w-28 opacity-60 pointer-events-none" viewBox="0 0 120 200" fill="none">
          <path d="M40 200 Q42 140 38 100 Q20 80 0 70 Q18 72 36 90 Q30 60 10 40 Q28 55 38 82 Q34 50 22 28 Q36 48 40 78 Q40 50 32 30 Q42 54 42 80 Q46 54 38 32 Q50 56 44 82 Q50 60 46 38 Q54 62 46 88 Q58 70 62 50 Q58 76 48 92 Q52 120 50 200Z" fill="#0f172a"/>
        </svg>
        <svg className="absolute bottom-0 right-0 h-40 w-28 opacity-60 pointer-events-none" viewBox="0 0 120 200" fill="none" style={{ transform: "scaleX(-1)" }}>
          <path d="M40 200 Q42 140 38 100 Q20 80 0 70 Q18 72 36 90 Q30 60 10 40 Q28 55 38 82 Q34 50 22 28 Q36 48 40 78 Q40 50 32 30 Q42 54 42 80 Q46 54 38 32 Q50 56 44 82 Q50 60 46 38 Q54 62 46 88 Q58 70 62 50 Q58 76 48 92 Q52 120 50 200Z" fill="#0f172a"/>
        </svg>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10 px-8 pt-10 pb-8 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">🌺 Mauritius May Special</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl font-bold text-white leading-tight mb-5 drop-shadow-lg">
            ✨ Book Your Mauritius<br />Escape &amp; Save{" "}
            <span className="text-amber-300">7%!</span> ✨
          </h2>

          {/* Body */}
          <p className="text-white/90 text-sm leading-relaxed mb-2">
            Reserve your next Mauritius trip in May and enjoy an<br />
            <strong className="text-white">additional 7% discount</strong> on us.
          </p>
          <p className="text-cyan-200 text-sm mb-7">
            🌴 Valid for travel between <strong>June 2026 – June 2027</strong>.
          </p>

          {/* CTA */}
          <a
            href="/packages#live-quotes"
            onClick={onClose}
            className="inline-block w-full py-3.5 rounded-xl font-semibold text-white text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(90deg, #0891b2, #0e7490)" }}
          >
            👉 Book Now &amp; Save More
          </a>

          {/* T&C + urgency */}
          <p className="text-white/50 text-xs mt-4 leading-relaxed">
            T&amp;Cs apply. Discount applies to land packages only, not airfare.
          </p>
          <p className="text-amber-300/80 text-xs mt-1 font-medium">
            ⏳ Offer valid until 4 June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
