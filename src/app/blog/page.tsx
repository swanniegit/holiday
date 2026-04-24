import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Travel tips, destination guides, and inspiration from 32onHerold Holidays.",
};

export default function BlogPage() {
  return (
    <>
      <Hero
        title="Travel"
        titleGold="Inspiration"
        subtitle="Tips, guides, and stories to fuel your next adventure."
        image="/images/blog-hero.jpg"
        overlay="dark"
      />
      <section className="py-20 px-6 text-center text-charcoal/50">
        <p className="text-lg">Blog posts coming soon.</p>
      </section>
    </>
  );
}
