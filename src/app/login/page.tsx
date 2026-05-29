"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-[#E8F5E9] px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold text-[#1B5E20] mb-2 text-center">
            Log In
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600">
            Welcome back to Arbeit
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-900"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-900"
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
                  className="w-full px-3 py-2.5 pr-16 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#43A047] hover:bg-[#2E7D32] text-white font-semibold rounded-md transition-colors disabled:opacity-50 mb-4"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            {/* Forgot Password */}
            <div className="mb-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-[#1565C0] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Register Links */}
          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="mb-3 text-sm text-gray-600">
              Don&apos;t have an account?
            </p>
            <div className="flex gap-3">
              <Link
                href="/register/seeker"
                className="flex-1 h-10 flex items-center justify-center border border-[#2E7D32] text-[#2E7D32] font-semibold text-sm rounded-md hover:bg-[#E8F5E9] transition-colors"
              >
                Job Seeker
              </Link>
              <Link
                href="/register/employer"
                className="flex-1 h-10 flex items-center justify-center border border-[#2E7D32] text-[#2E7D32] font-semibold text-sm rounded-md hover:bg-[#E8F5E9] transition-colors"
              >
                Employer
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
