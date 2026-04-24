import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PopularPackages from "@/components/PopularPackages";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero
        title="Discover Your"
        titleGold="Next Adventure"
        subtitle="Experience the world like never before with our carefully curated travel packages and expert guidance. Your journey begins here."
        image="/images/hero.jpg"
        ctas={[
          { label: "Explore Packages →", href: "/packages", variant: "primary" },
          { label: "View Destinations", href: "/destinations", variant: "ghost" },
        ]}
      />
      <FeaturedDestinations />
      <PopularPackages />
      <Testimonials />
      <CTA />
    </>
  );
}
