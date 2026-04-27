import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: "Read what our travellers say about 32onHerold Holidays. Real stories, real experiences — from Mauritius to Zanzibar and beyond.",
  openGraph: { title: "Client Reviews | 32onHerold", description: "Testimonials from South African travellers who trusted us with their holidays." },
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
