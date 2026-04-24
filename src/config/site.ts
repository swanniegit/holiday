export const SITE = {
  name: "32onHerold Holidays",
  tagline: "Discover the world with 32onH Holidays. We create unforgettable travel experiences tailored to your dreams and desires.",
  address: "Somerset West, Cape Town, South Africa",
  email: "travel@pjfmarkgraaff.co.za",
  social: "@32_on_herold",
  officeHours: ["Mon – Fri: 8:00 AM – 4:00 PM", "Saturday: 9:00 AM – 12:00 PM"],
  nav: [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const DESTINATIONS = [
  {
    slug: "istanbul",
    country: "Turkey",
    name: "Istanbul",
    description: "A vibrant city bridging Europe and Asia. Istanbul offers a rich tapestry of history, culture, and stunning architecture.",
    bestTime: "Spring (Apr – Jun) or Autumn",
    duration: "4–8",
    image: "/images/istanbul.jpg",
  },
  {
    slug: "mauritius",
    country: "Mauritius",
    name: "Mauritius",
    description: "An island nation known for its beaches, lagoons, and reefs. The mountainous interior includes Black River Gorges National Park.",
    bestTime: "May to December",
    duration: "7–14",
    image: "/images/mauritius.jpg",
  },
  {
    slug: "maldives",
    country: "Maldives",
    name: "Maldives",
    description: "A tropical nation in the Indian Ocean comprised of 26 ring-shaped atolls, made up of more than 1,000 coral islands.",
    bestTime: "November to April",
    duration: "7–10",
    image: "/images/maldives.jpg",
  },
  {
    slug: "zanzibar",
    country: "Zanzibar",
    name: "Zanzibar",
    description: "Discover the spice island of Zanzibar with its rich history and stunning beaches.",
    bestTime: "June to October",
    duration: "7–10",
    image: "/images/zanzibar.jpg",
  },
  {
    slug: "seychelles",
    country: "Seychelles",
    name: "Seychelles",
    description: "Explore the breathtaking islands of Seychelles with pristine beaches and marine life.",
    bestTime: "April to May",
    duration: "7–10",
    image: "/images/seychelles.jpg",
  },
  {
    slug: "phuket",
    country: "Thailand",
    name: "Phuket",
    description: "Thailand's largest island offers stunning beaches, vibrant nightlife, and rich cultural heritage.",
    bestTime: "November to April",
    duration: "7–14",
    image: "/images/phuket.jpg",
  },
  {
    slug: "belgium",
    country: "Belgium",
    name: "Belgium",
    description: "Discover charming medieval towns, world-class museums, and the finest chocolate and beer in Europe.",
    bestTime: "April to September",
    duration: "5–10",
    image: "/images/belgium.jpg",
  },
];

export const PACKAGES = [
  {
    slug: "mauritius-paradise",
    destination: "Mauritius",
    name: "Mauritius Paradise Getaway",
    description: "Experience the pristine beaches, crystal-clear waters, and luxury resorts of Mauritius.",
    image: "/images/pkg-mauritius.jpg",
  },
  {
    slug: "zanzibar-cultural",
    destination: "Zanzibar",
    name: "Zanzibar Cultural Adventure",
    description: "Discover the spice island of Zanzibar with its rich history and stunning beaches.",
    image: "/images/pkg-zanzibar.jpg",
  },
  {
    slug: "seychelles-island-hopping",
    destination: "Seychelles",
    name: "Seychelles Island Hopping",
    description: "Explore the breathtaking islands of Seychelles with pristine beaches and marine life.",
    image: "/images/pkg-seychelles.jpg",
  },
];

export const TESTIMONIALS = [
  {
    name: "Maryna van Staden",
    trip: "Phuket Island Hopper",
    quote: "Thank you 32onHerold for our unforgettable holiday in Phuket, Thailand. It was a seamless dreamlike escape and it's all because you tailored every detail to our taste. We are already planning our next trip through your travel agency.",
  },
  {
    name: "Ansa Greyvenstein",
    trip: "Unforgettable Zanzibar Magic",
    quote: "If you're dreaming of Zanzibar, stop searching and book with 32 on Herold. From start to finish, they orchestrated a flawless and unforgettable holiday. The Accommodation they selected was stunning. Every Rand was well spent. 32 on Herold didn't just organized a trip, they created memories we'll cherish forever.",
  },
  {
    name: "Anna-Mart Peens",
    trip: "Belgium Holiday",
    quote: "Our trip to Belgium planned by 32 on Herold was absolutely wonderful! Every detail was so well thought out, and we felt completely taken care of from start to finish. Thanks to their guidance we discovered hidden gems, enjoyed the most charming towns, and truly experienced the heart of Belgium. Highly recommend them!",
  },
];

export const HOTEL_CODES = [
  { code: "CAN", name: "Canonnier Beachcomber", stars: 4 },
  { code: "MAU", name: "Mauricia Beachcomber", stars: 4 },
  { code: "VIC", name: "Victoria Beachcomber", stars: 4 },
  { code: "SHA", name: "Shandrani Beachcomber", stars: 4 },
  { code: "TAB", name: "Trou aux Biches Beachcomber", stars: 5 },
  { code: "PAR", name: "Paradis Beachcomber", stars: 5 },
  { code: "DIN", name: "Dinarobin Beachcomber", stars: 5 },
  { code: "RP", name: "Royal Palm Beachcomber", stars: 5 },
];

export const DEPARTURE_CITIES = ["Cape Town", "Johannesburg", "Durban"];

export const STAR_GRADINGS = ["No Preference", "3 Star", "4 Star", "4 Star Superior", "5 Star"];
