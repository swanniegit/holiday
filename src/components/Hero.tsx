import Link from "next/link";

interface Cta {
  label: string;
  href: string;
  variant: "primary" | "ghost";
}

interface HeroProps {
  title: string;
  titleGold?: string;
  subtitle: string;
  image: string;
  ctas?: Cta[];
  overlay?: "light" | "medium" | "dark";
}

export default function Hero({
  title,
  titleGold,
  subtitle,
  image,
  ctas,
  overlay = "medium",
}: HeroProps) {
  const overlayClass = {
    light: "bg-black/25",
    medium: "bg-black/40",
    dark: "bg-black/55",
  }[overlay];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-display leading-tight">
          <span className="block font-normal text-white text-5xl md:text-6xl">
            {title}
          </span>
          {titleGold && (
            <span className="block italic font-semibold text-gold-light text-6xl md:text-8xl mt-1">
              {titleGold}
            </span>
          )}
        </h1>
        <p className="mt-6 text-sm md:text-base text-white/85 max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
        {ctas && ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {ctas.map(({ label, href, variant }) => (
              <Link
                key={href}
                href={href}
                className={
                  variant === "primary"
                    ? "px-7 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-dark transition-colors"
                    : "px-7 py-3 border border-white/70 text-white text-sm hover:bg-white/10 transition-colors"
                }
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
