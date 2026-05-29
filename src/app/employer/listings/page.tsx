"use client";

import { useState } from "react";
import Link from "next/link";
import { LISTING_STATUS } from "@/lib/constants";

interface Listing {
  id: string;
  title: string;
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "DEACTIVATED";
  postedAt: string;
  expiresAt: string;
  applicationsCount: number;
}

// Mock listings data
const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Part-time Barista / Coffee Shop Staff",
    status: "ACTIVE",
    postedAt: "2026-05-20T10:00:00Z",
    expiresAt: "2026-06-03T10:00:00Z",
    applicationsCount: 12,
  },
  {
    id: "2",
    title: "Sales Associate / Retail Staff",
    status: "PENDING",
    postedAt: "2026-05-28T14:00:00Z",
    expiresAt: "2026-06-11T14:00:00Z",
    applicationsCount: 0,
  },
  {
    id: "3",
    title: "Event Coordinator / Part-time",
    status: "EXPIRED",
    postedAt: "2026-05-01T09:00:00Z",
    expiresAt: "2026-05-15T09:00:00Z",
    applicationsCount: 8,
  },
];

function StatusBadge({ status }: { status: Listing["status"] }) {
  const statusInfo = LISTING_STATUS.find((s) => s.id === status);

  const colorClasses = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    darkgray: "bg-gray-200 text-gray-600",
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

export default function EmployerListingsPage() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [showDeactivateModal, setShowDeactivateModal] = useState<string | null>(
    null
  );

  const handleDeactivate = (listingId: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === listingId
          ? { ...listing, status: "DEACTIVATED" as const }
          : listing
      )
    );
    setShowDeactivateModal(null);
    // TODO: Call API to deactivate listing
    console.log("[v0] Deactivating listing:", listingId);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-h1">My Job Listings</h1>
            <p className="mt-1 text-sm text-[var(--color-gray)]">
              Manage your posted job listings
            </p>
          </div>
          <Link
            href="/employer/post-job"
            className="btn btn-primary h-[44px] px-6"
          >
            Post New Job
          </Link>
        </div>

        {/* Content */}
        {listings.length > 0 ? (
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
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Posted
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Expires
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Applications
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-dark)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr
                      key={listing.id}
                      className="border-t border-[var(--color-gray-border)]"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/jobs/${listing.id}`}
                          className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-blue-info)]"
                        >
                          {listing.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={listing.status} />
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-gray)]">
                        {formatDate(listing.postedAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-gray)]">
                        {formatDate(listing.expiresAt)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--color-dark)]">
                        {listing.applicationsCount}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/employer/listings/${listing.id}/applicants`}
                            className="btn btn-outline h-[32px] px-3 text-[11px]"
                          >
                            View Applicants
                          </Link>
                          {listing.status === "ACTIVE" && (
                            <button
                              onClick={() => setShowDeactivateModal(listing.id)}
                              className="btn h-[32px] border border-[var(--color-red-error)] bg-transparent px-3 text-[11px] text-[var(--color-red-error)] hover:bg-red-50"
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-[10px] border border-[var(--color-gray-border)] bg-white p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <Link
                      href={`/jobs/${listing.id}`}
                      className="text-sm font-medium text-[var(--color-dark)]"
                    >
                      {listing.title}
                    </Link>
                    <StatusBadge status={listing.status} />
                  </div>
                  <div className="mb-3 flex justify-between text-xs text-[var(--color-gray)]">
                    <span>Posted: {formatDate(listing.postedAt)}</span>
                    <span>{listing.applicationsCount} applications</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/employer/listings/${listing.id}/applicants`}
                      className="btn btn-outline flex-1 h-[36px] text-[12px]"
                    >
                      View Applicants
                    </Link>
                    {listing.status === "ACTIVE" && (
                      <button
                        onClick={() => setShowDeactivateModal(listing.id)}
                        className="btn h-[36px] border border-[var(--color-red-error)] bg-transparent px-3 text-[12px] text-[var(--color-red-error)]"
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note about editing */}
            <div className="mt-6 rounded-md bg-[var(--color-primary-pale)] p-3 text-center text-sm text-[var(--color-gray)]">
              Need to make changes to a listing? Contact support at{" "}
              <a
                href="mailto:support@arbeit.ph"
                className="text-[var(--color-blue-info)] hover:underline"
              >
                support@arbeit.ph
              </a>
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold text-[var(--color-dark)]">
              No job listings yet
            </h3>
            <p className="mb-4 text-sm text-[var(--color-gray)]">
              Post your first job listing to start receiving applications
            </p>
            <Link
              href="/employer/post-job"
              className="btn btn-primary h-[44px] px-6"
            >
              Post a Job
            </Link>
          </div>
        )}
      </div>

      {/* Deactivate Confirmation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-[10px] bg-white p-6">
            <h2 className="text-h2 mb-2">Deactivate Listing?</h2>
            <p className="mb-4 text-sm text-[var(--color-gray)]">
              This will remove your listing from search results. You cannot undo
              this action.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(null)}
                className="btn btn-outline flex-1 h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeactivate(showDeactivateModal)}
                className="btn flex-1 h-[44px] bg-[var(--color-red-error)] text-white hover:bg-red-700"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
