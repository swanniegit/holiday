interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-14">
      <h2 className="font-display text-4xl md:text-5xl text-charcoal font-semibold">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-charcoal/55 text-sm max-w-md mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
