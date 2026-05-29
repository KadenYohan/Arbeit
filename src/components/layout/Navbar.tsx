"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const userRole: "SEEKER" | "EMPLOYER" | "ADMIN" | null = null;

  return (
    <nav className="sticky top-0 z-50 h-[60px] bg-[var(--color-primary)] shadow-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-[32px] font-[800] tracking-[-0.5px] text-white"
            style={{ letterSpacing: "-0.5px" }}
          >
            ARBEIT
          </span>
          <span className="hidden text-[12px] text-white/80 md:block">
            Metro Manila
            <br />
            Part-Time Jobs
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 justify-center px-8 md:flex">
          <form className="flex w-full max-w-[480px]" action="/jobs">
            <input
              type="text"
              name="q"
              placeholder="Job title, store name, keyword..."
              className="input h-[40px] flex-1 rounded-r-none border-r-0"
            />
            <button
              type="submit"
              className="btn btn-primary h-[40px] w-[80px] rounded-l-none"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-white/80">
                {userRole === "SEEKER"
                  ? "Job Seeker"
                  : userRole === "EMPLOYER"
                    ? "Employer"
                    : "Admin"}
              </span>
              <Link
                href={
                  userRole === "EMPLOYER"
                    ? "/employer/listings"
                    : "/dashboard/applications"
                }
                className="text-sm font-medium text-white hover:underline"
              >
                My Account
              </Link>
              <button className="btn btn-outline h-[32px] border-white px-4 text-white hover:bg-white/10">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-outline h-[32px] border-white px-4 text-white hover:bg-white/10"
              >
                Log In
              </Link>
              <Link
                href="/register/seeker"
                className="btn h-[32px] bg-white px-4 text-[var(--color-primary)] hover:bg-white/90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-white md:hidden">
          <div className="flex flex-col p-4">
            {/* Mobile Search */}
            <form className="mb-4 flex" action="/jobs">
              <input
                type="text"
                name="q"
                placeholder="Job title, store name, keyword..."
                className="input h-[44px] flex-1 rounded-r-none border-r-0"
              />
              <button
                type="submit"
                className="btn btn-primary h-[44px] w-[80px] rounded-l-none"
              >
                Search
              </button>
            </form>

            <Link
              href="/jobs"
              className="border-b border-[var(--color-gray-border)] py-3 text-[var(--color-dark)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="/employer/post-job"
              className="border-b border-[var(--color-gray-border)] py-3 text-[var(--color-dark)]"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Job
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/applications"
                  className="border-b border-[var(--color-gray-border)] py-3 text-[var(--color-dark)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button className="mt-4 w-full py-3 text-left text-[var(--color-red-error)]">
                  Log Out
                </button>
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="btn btn-outline h-[44px] w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register/seeker"
                  className="btn btn-primary h-[44px] w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
