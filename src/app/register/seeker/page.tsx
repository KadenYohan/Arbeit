"use client";

import { useState } from "react";
import Link from "next/link";
import { CITIES, DISTRICTS } from "@/lib/constants";

export default function SeekerRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    homeCity: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get all cities from all districts
  const allCities = Object.values(CITIES).flat().sort();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual registration via API
    console.log("[v0] Seeker registration:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to OTP verification
      window.location.href = "/verify-otp?email=" + encodeURIComponent(formData.email);
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[var(--color-primary-pale)] px-4 py-12">
      <div className="w-full max-w-md rounded-[10px] border border-[var(--color-gray-border)] bg-white p-8 shadow-md">
        <h1 className="text-h1 mb-2 text-center">Create Job Seeker Account</h1>
        <p className="mb-6 text-center text-sm text-[var(--color-gray)]">
          Start finding part-time jobs in Metro Manila
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name Row */}
          <div className="mb-4 flex gap-3">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
              >
                First Name <span className="text-[var(--color-red-error)]">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
              >
                Last Name <span className="text-[var(--color-red-error)]">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
            >
              Email <span className="text-[var(--color-red-error)]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              Password <span className="text-[var(--color-red-error)]">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                minLength={8}
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

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
            >
              Phone Number <span className="text-[var(--color-gray-mid)]">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09XX XXX XXXX"
              className="input"
            />
          </div>

          {/* Home City */}
          <div className="mb-4">
            <label
              htmlFor="homeCity"
              className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
            >
              Home City <span className="text-[var(--color-red-error)]">*</span>
            </label>
            <select
              id="homeCity"
              name="homeCity"
              value={formData.homeCity}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select your city</option>
              {allCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-[var(--color-gray)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-blue-info)] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Employer Link */}
        <div className="mt-4 border-t border-[var(--color-gray-border)] pt-4 text-center">
          <p className="text-sm text-[var(--color-gray)]">
            Looking to hire?{" "}
            <Link
              href="/register/employer"
              className="text-[var(--color-blue-info)] hover:underline"
            >
              Register as an employer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
