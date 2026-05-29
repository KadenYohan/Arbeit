"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FEATURE_TAGS } from "@/lib/constants";

// Mock job data (would come from API in real implementation)
const MOCK_JOB = {
  id: "1",
  title: "Part-time Barista / Coffee Shop Staff",
  companyName: "Brew & Bean Cafe",
  companyCity: "Makati",
  industry: "Food & Beverage",
  companyDescription:
    "Brew & Bean Cafe is a cozy coffee shop serving premium specialty coffee and pastries. We pride ourselves on excellent customer service and a welcoming atmosphere.",
  category: "Food & Beverage",
  subCategory: "Cafe Staff",
  payType: "hourly" as const,
  payMin: 75,
  payMax: 90,
  scheduleDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  shiftFrom: "7:00 AM",
  shiftTo: "3:00 PM",
  workPeriod: "Regular Part-time",
  district: 4,
  city: "Makati",
  streetAddress: "123 Ayala Avenue, Makati City",
  nearestStation: "Ayala MRT-3 (5 min walk)",
  featureTags: ["no-experience", "students-ok", "uniform-provided", "meal-allowance"],
  requirementsNotes: "Must be willing to work on weekdays. Basic English communication skills required.",
  description: `We are looking for enthusiastic part-time baristas to join our team at Brew & Bean Cafe BGC branch!

**What you'll do:**
- Prepare and serve coffee, tea, and other beverages
- Operate espresso machines and other coffee equipment
- Take customer orders and handle payments
- Maintain cleanliness of the work area
- Assist with food preparation and serving

**What we offer:**
- Competitive hourly rate with tips
- Free meals during shift
- Uniform provided
- Flexible scheduling
- Fun and friendly work environment
- Opportunity to learn barista skills

This is a great opportunity for students or anyone looking for flexible part-time work!`,
  status: "ACTIVE" as const,
  createdAt: "2026-05-21T08:00:00Z",
  viewCount: 342,
};

export default function JobDetailPage() {
  const params = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const job = MOCK_JOB; // TODO: Fetch from API using params.id

  const formatPay = () => {
    const typeLabel =
      job.payType === "hourly"
        ? "per hour"
        : job.payType === "daily"
          ? "per day"
          : "per month";
    return `₱${job.payMin}–₱${job.payMax} ${typeLabel}`;
  };

  const getFeatureLabel = (tagId: string) => {
    const tag = FEATURE_TAGS.find((t) => t.id === tagId);
    return tag?.label || tagId;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-[var(--color-gray)]">
          <Link href="/jobs" className="hover:text-[var(--color-blue-info)]">
            Jobs
          </Link>
          <span className="mx-2">/</span>
          <span>{job.category}</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-dark)]">{job.title}</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Column - Job Details */}
          <div className="flex-[65]">
            {/* Header */}
            <div className="mb-6">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="tag-new">NEW</span>
              </div>
              <h1 className="text-h1 mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 text-[13px]">
                <Link
                  href={`/jobs?employer=${job.id}`}
                  className="text-[var(--color-blue-info)] hover:underline"
                >
                  {job.companyName}
                </Link>
                <span className="text-[var(--color-gray)]">|</span>
                <span className="text-[var(--color-gray)]">{job.category}</span>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {job.featureTags.map((tagId) => (
                <span key={tagId} className="tag">
                  {getFeatureLabel(tagId)}
                </span>
              ))}
            </div>

            {/* Info Table */}
            <div className="mb-6 overflow-hidden rounded-[10px] border border-[var(--color-gray-border)]">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="w-[30%] bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Job Category
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {job.category} / {job.subCategory}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Pay
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--color-orange)]">
                      {formatPay()}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Working Hours
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {job.scheduleDays.join(", ")} | {job.shiftFrom}–{job.shiftTo}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Work Period
                    </td>
                    <td className="px-4 py-3 text-sm">{job.workPeriod}</td>
                  </tr>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Location
                    </td>
                    <td className="px-4 py-3 text-sm">{job.streetAddress}</td>
                  </tr>
                  <tr className="border-b border-[var(--color-gray-border)]">
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Nearest Station
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-blue-info)]">
                      {job.nearestStation}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[var(--color-primary-pale)] px-4 py-3 text-sm font-medium">
                      Requirements
                    </td>
                    <td className="px-4 py-3 text-sm">{job.requirementsNotes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <h2 className="text-h2 mb-4">Job Description</h2>
              <div className="prose prose-sm max-w-none text-[var(--color-dark)]">
                {job.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Apply Buttons (Mobile) */}
            <div className="mb-6 space-y-3 lg:hidden">
              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary h-[56px] w-full text-[16px]"
              >
                Apply Now
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`btn h-[48px] w-full ${
                  isSaved
                    ? "bg-[var(--color-orange)] text-white"
                    : "btn-outline"
                }`}
              >
                {isSaved ? "Saved" : "Save this job"}
              </button>
            </div>

            {/* How to Apply */}
            <div className="mb-6 rounded-[10px] border border-[var(--color-gray-border)] bg-[var(--color-primary-pale)] p-4">
              <h2 className="text-h2 mb-2">How to Apply</h2>
              <p className="text-sm text-[var(--color-dark)]">
                Apply via this website by clicking the &quot;Apply Now&quot; button. You will
                need to log in or create an account to submit your application.
              </p>
            </div>

            {/* About the Company */}
            <div className="rounded-[10px] border border-[var(--color-gray-border)] p-4">
              <h2 className="text-h2 mb-2">About the Company</h2>
              <p className="mb-1 font-medium text-[var(--color-dark)]">
                {job.companyName}
              </p>
              <p className="mb-2 text-sm text-[var(--color-gray)]">
                {job.companyCity} | {job.industry}
              </p>
              <p className="mb-3 text-sm text-[var(--color-dark)]">
                {job.companyDescription}
              </p>
              <Link
                href={`/jobs?employer=${job.id}`}
                className="text-sm text-[var(--color-blue-info)] hover:underline"
              >
                View other jobs by this employer &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column - Sticky Apply Panel (Desktop) */}
          <div className="hidden flex-[35] lg:block">
            <div className="sticky top-[80px] rounded-[10px] border border-[var(--color-gray-border)] bg-white p-4 shadow-md">
              <p className="mb-1 font-semibold text-[var(--color-dark)]">
                {job.companyName}
              </p>
              <p className="mb-1 text-[13px] text-[var(--color-gray)]">
                {job.companyCity}
              </p>
              <p className="mb-4 text-[13px] text-[var(--color-gray)]">
                {job.industry}
              </p>

              <div className="h-px bg-[var(--color-gray-border)] mb-4" />

              <button
                onClick={() => setShowApplyModal(true)}
                className="btn btn-primary mb-3 h-[48px] w-full"
              >
                Apply Now
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`btn h-[44px] w-full ${
                  isSaved
                    ? "bg-[var(--color-orange)] text-white"
                    : "btn-outline"
                }`}
              >
                {isSaved ? "Saved" : "Save this job"}
              </button>

              <p className="mt-4 text-center text-[11px] text-[var(--color-gray-mid)]">
                Application is free. No account needed to browse, but required
                to apply.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[14px] bg-white p-6">
            <h2 className="text-h2 mb-4">Apply for {job.title}</h2>

            <div className="mb-4 rounded-md bg-[var(--color-primary-pale)] p-3">
              <p className="text-sm text-[var(--color-gray)]">
                Please log in to submit your application.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn btn-outline flex-1 h-[44px]"
              >
                Cancel
              </button>
              <Link
                href={`/login?redirect=/jobs/${params.id}`}
                className="btn btn-primary flex-1 h-[44px]"
              >
                Log In to Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
