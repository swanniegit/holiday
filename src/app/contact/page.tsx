import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with 32onHerold Holidays to start planning your perfect adventure.",
};

const INFO = [
  {
    label: "Visit Us",
    value: SITE.address,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Follow Us",
    value: SITE.social,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: "Office Hours",
    value: SITE.officeHours.join("\n"),
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get in Touch"
        titleGold="Let's Plan Your Journey"
        subtitle="Ready to embark on your next adventure? Contact our travel experts today and let us help you create the perfect travel experience."
        image="/images/contact-hero.jpg"
        overlay="medium"
      />

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {INFO.map(({ label, value, href, icon }) => (
              <div key={label} className="bg-white p-8 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {icon}
                </div>
                <h3 className="font-display text-charcoal font-semibold">{label}</h3>
                {href ? (
                  <a href={href} className="text-charcoal/60 text-sm hover:text-gold transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-charcoal/60 text-sm whitespace-pre-line">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
