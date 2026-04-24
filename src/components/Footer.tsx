import Link from "next/link";
import { SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-cream-dark">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 border-2 border-gold flex items-center justify-center">
              <span className="font-display text-gold text-sm font-bold leading-none">32H</span>
            </div>
          </div>
          <p className="text-sm text-charcoal/70 leading-relaxed max-w-xs">{SITE.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-charcoal font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm text-charcoal/70">
            <li>{SITE.address}</li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.social}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-charcoal font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {SITE.nav.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-charcoal/70 hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-dark py-4 text-center text-xs text-charcoal/40">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
