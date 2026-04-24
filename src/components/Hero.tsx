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
    light: "bg-black/30",
    medium: "bg-black/45",
    dark: "bg-black/60",
  }[overlay];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto animate-fade-up">
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-tight">
          {title}
          {titleGold && (
            <>
              <br />
              <span className="text-gold-light italic">{titleGold}</span>
            </>
          )}
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/90 max-w-xl mx-auto">{subtitle}</p>
        {ctas && ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {ctas.map(({ label, href, variant }) => (
              <Link
                key={href}
                href={href}
                className={
                  variant === "primary"
                    ? "px-6 py-3 bg-gold text-white font-medium hover:bg-gold-dark transition-colors"
                    : "px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors"
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
