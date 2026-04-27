import { TESTIMONIALS } from "@/config/site";
import SectionHeading from "@/components/SectionHeading";
import OutlineLink from "@/components/OutlineLink";

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

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="What Our Travelers Say"
          subtitle="Real experiences from real travelers who trusted us with their adventures"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, trip, quote }) => (
            <div key={name} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col">
              <Stars />
              <blockquote className="text-charcoal/65 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-charcoal text-sm">{name}</p>
                <p className="text-gold text-xs mt-0.5">{trip}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <OutlineLink href="/testimonials">Read More Reviews</OutlineLink>
        </div>
      </div>
    </section>
  );
}
