import Link from "next/link";
import { SITE } from "@/config/site";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="max-w-lg">
        <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-6">
          <span className="font-display text-gold text-xl font-bold leading-none">32H</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-charcoal font-semibold mb-4">
          {SITE.name}
        </h1>

        <p className="text-charcoal/60 leading-relaxed mb-10 max-w-sm mx-auto">
          {SITE.tagline}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/destinations"
            className="px-7 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors"
          >
            Explore Destinations
          </Link>
          <Link
            href="/packages"
            className="px-7 py-3 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
          >
            View Packages
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3 border border-charcoal/30 text-charcoal text-sm font-medium hover:border-charcoal transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
