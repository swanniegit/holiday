import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gold py-20 text-center text-white px-6">
      <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
        Ready to Start Your Journey?
      </h2>
      <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg">
        Let us help you create memories that will last a lifetime. Contact us today to start
        planning your perfect adventure.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white font-medium hover:bg-black transition-colors"
      >
        Get Started Today
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </section>
  );
}
