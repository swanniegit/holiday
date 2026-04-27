import Link from "next/link";

interface OutlineLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function OutlineLink({ href, children }: OutlineLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-white transition-colors rounded-sm"
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
}
