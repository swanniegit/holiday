import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Website disclaimer and terms of use for 32onHerold Holidays.",
};

const sections = [
  {
    n: "01",
    title: "General Information",
    body: "The content on this website is provided for general information and enquiry purposes only. It does not constitute a binding offer, confirmed booking, or contractual agreement. All travel arrangements are subject to availability and formal confirmation in writing by 32onHerold Holidays.",
  },
  {
    n: "02",
    title: "Pricing & Availability",
    body: "All prices displayed on this website — including live quotes generated through our Beachcomber search tool — are indicative only and subject to change without notice. Prices are quoted in South African Rand (ZAR) unless otherwise stated.",
    highlight:
      "Live prices sourced from the Beachcomber API reflect real-time availability at the time of search. These prices are not guaranteed until a formal booking confirmation and deposit receipt have been issued by 32onHerold Holidays.",
    extra:
      "Seasonal surcharges, fuel levies, port taxes, and other third-party fees may apply and will be communicated at time of booking confirmation.",
  },
  {
    n: "03",
    title: "Quotes & Booking Confirmation",
    body: "Emailed quotes generated through this website are not confirmed bookings. A booking is only confirmed once:",
    list: [
      "A written booking confirmation has been issued by 32onHerold Holidays, and",
      "The required deposit or full payment has been received and receipted.",
    ],
    extra:
      "32onHerold Holidays reserves the right to withdraw or amend any quote prior to formal confirmation.",
  },
  {
    n: "04",
    title: "Travel Documents & Visas",
    body: "It is the sole responsibility of each traveller to ensure they hold valid travel documents for their destination, including:",
    list: [
      "A valid passport with sufficient remaining validity (typically 6 months beyond return date)",
      "Applicable visas and entry permits",
      "Any required transit documentation",
    ],
    extra:
      "32onHerold Holidays will not be held liable for any costs, losses, or denied boarding arising from incomplete or invalid travel documentation.",
  },
  {
    n: "05",
    title: "Travel Insurance",
    body: "Comprehensive travel insurance is strongly recommended for all bookings. 32onHerold Holidays does not arrange travel insurance unless specifically requested and agreed upon in writing. We accept no liability for medical expenses, cancellation costs, lost luggage, or other losses that would ordinarily be covered by travel insurance.",
  },
  {
    n: "06",
    title: "Third-party Suppliers",
    body: "32onHerold Holidays acts as an agent for third-party service providers including but not limited to Beachcomber Hotels & Resorts, airlines, transfer companies, and tour operators. All bookings with third-party suppliers are subject to that supplier's own terms and conditions.",
    extra:
      "32onHerold Holidays is not responsible for the acts, omissions, or failure to perform of any third-party supplier.",
  },
  {
    n: "07",
    title: "Health & Vaccinations",
    body: "Travellers are responsible for ensuring they meet all health entry requirements for their destination, including recommended or mandatory vaccinations, medical certificates, and health declarations. We recommend consulting a travel health clinic or your GP well in advance of departure.",
  },
  {
    n: "08",
    title: "Force Majeure",
    body: "32onHerold Holidays shall not be liable for any failure or delay in performance arising from circumstances beyond our reasonable control, including but not limited to natural disasters, extreme weather, acts of government, civil unrest, strikes, pandemics, or airline cancellations. In such events, 32onHerold Holidays will make reasonable efforts to assist clients but cannot guarantee refunds or alternative arrangements beyond what suppliers make available.",
  },
  {
    n: "09",
    title: "Accuracy of Information",
    body: "While we take care to ensure the information on this website is accurate and up to date, 32onHerold Holidays makes no representations or warranties of any kind regarding the completeness, accuracy, or fitness for purpose of the content. Destination information, hotel descriptions, and imagery are provided in good faith and may not reflect current conditions.",
  },
  {
    n: "10",
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by South African law, 32onHerold Holidays' total liability to any client shall not exceed the total value of the booking in question. We shall not be liable for any indirect, incidental, or consequential loss or damage arising from your use of this website or our services.",
  },
  {
    n: "11",
    title: "Copyright",
    body: "All content on this website — including text, images, logos, and destination descriptions — is the property of 32onHerold Holidays unless otherwise attributed, and may not be reproduced or used without written permission.",
  },
  {
    n: "12",
    title: "Governing Law",
    body: "This disclaimer is governed by the laws of the Republic of South Africa. Any disputes arising from the use of this website or our services shall be subject to the jurisdiction of the courts of the Western Cape.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="pt-16">
      <div className="bg-charcoal py-16 text-center">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Legal</p>
        <h1 className="font-display text-4xl text-white font-normal">Website Disclaimer</h1>
        <p className="text-sm text-white/40 mt-3">Last updated: April 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-base text-charcoal/70 border-l-4 border-gold pl-5 mb-16 leading-relaxed">
          By accessing and using the 32onHerold Holidays website, you accept and agree to be bound
          by the terms set out in this disclaimer. Please read it carefully before making use of our
          services or submitting an enquiry.
        </p>

        <div className="space-y-12">
          {sections.map((s) => (
            <div key={s.n}>
              <p className="text-xs tracking-widest uppercase text-gold mb-2">{s.n}</p>
              <h2 className="font-display text-xl text-charcoal font-normal border-b border-cream-dark pb-2 mb-4">
                {s.title}
              </h2>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-3">{s.body}</p>
              {s.list && (
                <ul className="list-disc pl-5 mb-3 space-y-1">
                  {s.list.map((item) => (
                    <li key={item} className="text-sm text-charcoal/70">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.highlight && (
                <div className="bg-cream border-l-4 border-gold px-5 py-4 text-sm text-charcoal/60 my-4">
                  {s.highlight}
                </div>
              )}
              {s.extra && (
                <p className="text-sm text-charcoal/70 leading-relaxed">{s.extra}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-cream-dark text-center">
          <p className="text-sm text-charcoal/50">Questions about this disclaimer?</p>
          <p className="text-sm text-charcoal/50 mt-1">
            Contact us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">
              {SITE.email}
            </a>
          </p>
          <p className="text-xs text-charcoal/30 mt-4">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
