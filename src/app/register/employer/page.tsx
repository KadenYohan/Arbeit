"use client";

import { useState } from "react";
import Link from "next/link";
import { CITIES, CATEGORIES } from "@/lib/constants";

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "200+", label: "200+ employees" },
];

export default function EmployerRegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    companyCity: "",
    companySize: "",
    description: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get all cities from all districts
  const allCities = Object.values(CITIES).flat().sort();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: Implement actual registration via API
    console.log("[v0] Employer registration:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to OTP verification
      window.location.href = "/verify-otp?email=" + encodeURIComponent(formData.email);
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[var(--color-primary-pale)] px-4 py-12">
      <div className="w-full max-w-lg rounded-[10px] border border-[var(--color-gray-border)] bg-white p-8 shadow-md">
        <h1 className="text-h1 mb-2 text-center">Create Employer Account</h1>
        <p className="mb-6 text-center text-sm text-[var(--color-gray)]">
          Start posting part-time jobs on Arbeit
        </p>

        <form onSubmit={handleSubmit}>
          {/* Personal Info Section */}
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-[var(--color-primary)]">
              Your Information
            </h2>

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
                placeholder="you@company.com"
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
          </div>

          {/* Company Info Section */}
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-[var(--color-primary)]">
              Company Information
            </h2>

            {/* Company Name */}
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
              >
                Company Name <span className="text-[var(--color-red-error)]">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            {/* Industry */}
            <div className="mb-4">
              <label
                htmlFor="industry"
                className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
              >
                Industry <span className="text-[var(--color-red-error)]">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Select industry</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Company City & Size Row */}
            <div className="mb-4 flex gap-3">
              <div className="flex-1">
                <label
                  htmlFor="companyCity"
                  className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
                >
                  Company City <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <select
                  id="companyCity"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select city</option>
                  {allCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="companySize"
                  className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
                >
                  Company Size <span className="text-[var(--color-red-error)]">*</span>
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select size</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-[var(--color-dark)]"
              >
                Brief Description{" "}
                <span className="text-[var(--color-gray-mid)]">(optional, 500 chars max)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                placeholder="Tell job seekers about your company..."
                className="input resize-none"
              />
              <p className="mt-1 text-right text-xs text-[var(--color-gray-mid)]">
                {formData.description.length}/500
              </p>
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
            {isLoading ? "Creating account..." : "Create Employer Account"}
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

        {/* Seeker Link */}
        <div className="mt-4 border-t border-[var(--color-gray-border)] pt-4 text-center">
          <p className="text-sm text-[var(--color-gray)]">
            Looking for a job?{" "}
            <Link
              href="/register/seeker"
              className="text-[var(--color-blue-info)] hover:underline"
            >
              Register as a job seeker
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
