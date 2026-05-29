"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual login via API
    console.log("[v0] Login attempt:", { email, redirect });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, just show a placeholder message
      setError("Login functionality coming soon. This is a placeholder page.");
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[var(--color-primary-pale)] px-4 py-12">
      <div className="w-full max-w-md rounded-[10px] border border-[var(--color-gray-border)] bg-white p-8 shadow-md">
        <h1 className="text-h1 mb-2 text-center">Log In</h1>
        <p className="mb-6 text-center text-sm text-[var(--color-gray)]">
          Welcome back to Arbeit
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[var(--color-gray)] hover:text-[var(--color-dark)]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-[var(--color-red-error)]">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mb-4 h-[48px] w-full disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Forgot Password */}
          <div className="mb-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--color-blue-info)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>

        {/* Register Links */}
        <div className="border-t border-[var(--color-gray-border)] pt-4 text-center">
          <p className="mb-2 text-sm text-[var(--color-gray)]">
            Don&apos;t have an account?
          </p>
          <div className="flex gap-3">
            <Link
              href="/register/seeker"
              className="btn btn-outline flex-1 h-[40px]"
            >
              Job Seeker
            </Link>
            <Link
              href="/register/employer"
              className="btn btn-outline flex-1 h-[40px]"
            >
              Employer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
