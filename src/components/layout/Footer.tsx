import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary-deep)] py-8 text-white">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <span className="text-[24px] font-[800] tracking-[-0.5px]">
              ARBEIT
            </span>
            <p className="mt-1 text-sm text-white/70">
              Metro Manila&apos;s #1 Part-Time Job Platform
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              Contact
            </Link>
            <Link
              href="/employer/post-job"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              For Employers
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/20" />

        {/* Copyright */}
        <div className="text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Arbeit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
