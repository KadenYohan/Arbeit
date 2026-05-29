"use client";

import { useState } from "react";
import Link from "next/link";
import { APPLICATION_STATUS } from "@/lib/constants";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: "RECEIVED" | "UNDER_REVIEW" | "INTERVIEW" | "HIRED" | "REJECTED";
}

// Mock applications data
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Part-time Barista / Coffee Shop Staff",
    companyName: "Brew & Bean Cafe",
    appliedAt: "2026-05-25T10:30:00Z",
    status: "UNDER_REVIEW",
  },
  {
    id: "2",
    jobId: "2",
    jobTitle: "Sales Associate / Retail Staff",
    companyName: "Fashion Hub",
    appliedAt: "2026-05-24T14:15:00Z",
    status: "INTERVIEW",
  },
  {
    id: "3",
    jobId: "3",
    jobTitle: "Data Encoder / Office Staff",
    companyName: "Tech Solutions Inc.",
    appliedAt: "2026-05-20T09:00:00Z",
    status: "RECEIVED",
  },
];

function StatusBadge({ status }: { status: Application["status"] }) {
  const statusInfo = APPLICATION_STATUS.find((s) => s.id === status);

  const colorClasses = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
        colorClasses[statusInfo?.color as keyof typeof colorClasses] ||
        colorClasses.gray
      }`}
    >
      {statusInfo?.label || status}
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ApplicationsPage() {
  const [applications] = useState<Application[]>(MOCK_APPLICATIONS);

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-h1">My Applications</h1>
          <p className="mt-1 text-sm text-[var(--color-gray)]">
            Track the status of your job applications
          </p>
        </div>

        {/* Content */}
        {applications.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-[10px] border border-[var(--color-gray-border)] bg-white md:block">
              <table className="w-full">
                <thead className="bg-[var(--color-primary-pale)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Applied On
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-t border-[var(--color-gray-border)]"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/jobs/${app.jobId}`}
                          className="text-sm font-medium text-[var(--color-blue-info)] hover:underline"
                        >
                          {app.jobTitle}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-dark)]">
                        {app.companyName}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-gray)]">
                        {formatDate(app.appliedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-[10px] border border-[var(--color-gray-border)] bg-white p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="text-sm font-medium text-[var(--color-blue-info)] hover:underline"
                    >
                      {app.jobTitle}
                    </Link>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-sm text-[var(--color-dark)]">
                    {app.companyName}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-gray)]">
                    Applied: {formatDate(app.appliedAt)}
                  </p>
                </div>
              ))}
            </div>
          </>
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-dark)]">
              No applications yet
            </h3>
            <p className="mb-4 text-sm text-[var(--color-gray)]">
              Apply to jobs to see your application history here
            </p>
            <Link href="/jobs" className="btn btn-primary h-[44px] px-6">
              Find a Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
