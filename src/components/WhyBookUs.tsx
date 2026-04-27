import SectionHeading from "@/components/SectionHeading";

const REASONS = [
  {
    title: "Personalised Itineraries",
    description: "Every trip is tailored to you — your budget, travel style, and dream experiences. No cookie-cutter packages.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    ),
  },
  {
    title: "Expert Local Knowledge",
    description: "We know the destinations we sell. Our first-hand experience means better hotels, hidden gems, and real insider tips.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "End-to-End Support",
    description: "From the first enquiry to the moment you return home, we handle flights, transfers, accommodation, and everything in between.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
  },
  {
    title: "Trusted & Transparent",
    description: "No hidden fees, no surprises. We're upfront about costs and give you honest advice — even if it means a simpler trip.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
];

export default function WhyBookUs() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Book With Us"
          subtitle="We've been crafting unforgettable journeys for South African travellers since day one"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map(({ title, description, icon }) => (
            <div key={title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icon}
                </svg>
              </div>
              <h3 className="font-display text-lg text-charcoal font-semibold mb-3">{title}</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
