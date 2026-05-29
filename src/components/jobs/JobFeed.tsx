"use client";

import { JobCard } from "./JobCard";
import type { JobCard as JobCardType } from "@/types/job.types";

interface JobFeedProps {
  jobs: JobCardType[];
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function JobFeed({
  jobs,
  currentPage,
  totalPages,
  onPageChange,
}: JobFeedProps) {
  if (jobs.length === 0) {
    return (
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="mb-2 text-lg font-semibold text-[var(--color-dark)]">
          No jobs found
        </h3>
        <p className="text-sm text-[var(--color-gray)]">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Job Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline h-[40px] w-[40px] disabled:opacity-50"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 7) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 2) return true;
              return false;
            })
            .map((page, index, arr) => {
              // Add ellipsis
              if (index > 0 && page - arr[index - 1] > 1) {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="flex h-[40px] w-[40px] items-center justify-center text-[var(--color-gray)]"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={`btn h-[40px] w-[40px] ${
                    currentPage === page
                      ? "btn-primary"
                      : "btn-outline hover:bg-[var(--color-primary-pale)]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-outline h-[40px] w-[40px] disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
