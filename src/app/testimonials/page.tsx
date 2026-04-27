import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real stories from travelers who trusted 32onHerold Holidays with their adventures.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Hero
        title="Stories From"
        titleGold="Our Travelers"
        subtitle="Real experiences from real people who trusted us with their most precious memories."
        image="/images/testimonials-hero.jpg"
        overlay="dark"
      />
      <Testimonials />
    </>
  );
}
