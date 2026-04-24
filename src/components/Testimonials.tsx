import Link from "next/link";
import { TESTIMONIALS } from "@/config/site";

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const avatars = [null, null, "https://picsum.photos/seed/annamart/80/80"];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">
            What Our Travelers Say
          </h2>
          <p className="mt-3 text-charcoal/55 text-sm max-w-lg mx-auto">
            Real experiences from real travelers who trusted us with their adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, trip, quote }, i) => (
            <div key={name} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col">
              <Stars />
              <blockquote className="text-charcoal/65 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                {avatars[i] ? (
                  <img
                    src={avatars[i]!}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : null}
                <div className={avatars[i] ? "" : "w-full text-center"}>
                  <p className="font-semibold text-charcoal text-sm">{name}</p>
                  <p className="text-gold text-xs mt-0.5">{trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Read More Reviews
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
