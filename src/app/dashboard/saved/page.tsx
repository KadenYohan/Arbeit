"use client";

import { useState } from "react";
import Link from "next/link";
import { JobCard } from "@/components/jobs/JobCard";
import type { JobCard as JobCardType } from "@/types/job.types";

// Mock saved jobs data
const MOCK_SAVED_JOBS: JobCardType[] = [
  {
    id: "1",
    title: "Part-time Barista / Coffee Shop Staff",
    companyName: "Brew & Bean Cafe",
    category: "food-beverage",
    payType: "hourly",
    payMin: 75,
    payMax: 90,
    scheduleDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shiftFrom: "7AM",
    shiftTo: "3PM",
    city: "Makati",
    nearestStation: "Ayala MRT-3",
    featureTags: ["No Experience OK", "Students OK"],
    createdAt: new Date().toISOString(),
    isNew: false,
    isSaved: true,
  },
  {
    id: "2",
    title: "Sales Associate / Retail Staff",
    companyName: "Fashion Hub",
    category: "retail-sales",
    payType: "daily",
    payMin: 550,
    payMax: 650,
    scheduleDays: ["Sat", "Sun"],
    shiftFrom: "10AM",
    shiftTo: "9PM",
    city: "Quezon City",
    nearestStation: "Cubao MRT-3",
    featureTags: ["No Experience OK", "Meal Allowance"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isNew: false,
    isSaved: true,
  },
];

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<JobCardType[]>(MOCK_SAVED_JOBS);

  const handleRemove = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    // TODO: Call API to remove from saved jobs
    console.log("[v0] Removing job from saved:", jobId);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-h1">Saved Jobs</h1>
          <span className="text-sm text-[var(--color-gray)]">
            {savedJobs.length}/50 jobs saved
          </span>
        </div>

        {/* Limit Warning */}
        {savedJobs.length >= 50 && (
          <div className="mb-6 rounded-md border border-[var(--color-orange)] bg-orange-50 p-3 text-sm text-[var(--color-orange)]">
            You&apos;ve reached the 50 job save limit. Remove some to add more.
          </div>
        )}

        {/* Content */}
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {savedJobs.map((job) => (
              <div key={job.id} className="relative">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(job.id)}
                  className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-red-error)] text-white shadow-md hover:bg-red-700"
                  aria-label="Remove from saved"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="mb-4 h-16 w-16 text-[var(--color-gray-mid)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-dark)]">
              No saved jobs yet
            </h3>
            <p className="mb-4 text-sm text-[var(--color-gray)]">
              Save jobs you&apos;re interested in to view them later
            </p>
            <Link href="/jobs" className="btn btn-primary h-[44px] px-6">
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
