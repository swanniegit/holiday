"use client";

interface DestinationCardProps {
  slug: string;
  country: string;
  flag: string;
  name: string;
  rating: string;
  description: string;
  bestTime: string;
  image: string;
  variant?: "featured" | "grid";
  onEnquire: () => void;
}

export default function DestinationCard({
  country, flag, name, rating, description, bestTime, image,
  variant = "grid", onEnquire,
}: DestinationCardProps) {
  const cardClass = variant === "featured"
    ? "bg-white rounded-2xl overflow-hidden shadow-sm group"
    : "bg-white rounded-2xl overflow-hidden border border-cream-dark group";

  return (
    <div className={cardClass}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow">
          <span className="text-white text-xs font-bold leading-none">{rating}</span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full">
          <span>{flag}</span>
          <span className="font-medium">{country}</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">{country}</p>
        <h3 className="font-display text-xl text-charcoal font-semibold mb-2">{name}</h3>
        <p className="text-charcoal/55 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
        <p className="text-gold text-xs font-medium mb-5">Best time: {bestTime} →</p>
        <button
          onClick={onEnquire}
          className="w-full py-2.5 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}
