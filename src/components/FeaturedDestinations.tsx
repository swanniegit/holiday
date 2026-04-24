import Link from "next/link";
import { DESTINATIONS } from "@/config/site";

const featured = DESTINATIONS.slice(0, 3);

export default function FeaturedDestinations() {
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
            Featured Destinations
          </h2>
          <p className="mt-3 text-charcoal/60 max-w-md mx-auto">
            Explore breathtaking locations handpicked by our travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(({ slug, country, name, description, bestTime, duration, image }) => (
            <div key={slug} className="bg-white rounded-sm overflow-hidden shadow-sm group">
              <div className="relative h-52 overflow-hidden bg-cream-dark">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-gold text-white text-xs px-2 py-1 font-medium">
                  {duration} days
                </div>
              </div>
              <div className="p-6">
                <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                  {country}
                </p>
                <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{name}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-4">{description}</p>
                <p className="text-gold text-xs">Best time: {bestTime}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-colors text-sm font-medium"
          >
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
