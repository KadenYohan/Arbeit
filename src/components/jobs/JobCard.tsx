import Link from "next/link";
import type { JobCard as JobCardType } from "@/types/job.types";

interface JobCardProps {
  job: JobCardType;
  onSave?: (jobId: string) => void;
}

// Category icons as simple SVG components
const CategoryIcon = ({ category }: { category: string }) => {
  const iconClass = "w-8 h-8 text-[var(--color-primary)]";

  switch (category) {
    case "food-beverage":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4h-2V2h2v6zM3 8h10v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm0 0V6a4 4 0 018 0v2"
          />
        </svg>
      );
    case "retail-sales":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
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
      );
  }
};

export function JobCard({ job, onSave }: JobCardProps) {
  const formatPay = () => {
    const typeLabel =
      job.payType === "hourly"
        ? "/hr"
        : job.payType === "daily"
          ? "/day"
          : "/mo";
    return `₱${job.payMin}–₱${job.payMax}${typeLabel}`;
  };

  const formatSchedule = () => {
    const days =
      job.scheduleDays.length === 7
        ? "Every day"
        : job.scheduleDays.length >= 5
          ? "Mon–Fri"
          : job.scheduleDays.join(", ");
    return `${days}, ${job.shiftFrom}–${job.shiftTo}`;
  };

  return (
    <div className="card flex flex-col overflow-hidden">
      {/* Photo Area (Placeholder with category icon) */}
      <div className="relative flex h-[120px] items-center justify-center bg-[var(--color-primary-pale)]">
        <CategoryIcon category={job.category} />

        {/* NEW Badge */}
        {job.isNew && (
          <span className="tag-new absolute top-2 right-2">NEW</span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-[16px] font-semibold text-[var(--color-dark)]">
          {job.title}
        </h3>

        {/* Company */}
        <p className="mb-3 text-[13px] text-[var(--color-gray)]">
          {job.companyName}
        </p>

        {/* Feature Tags */}
        {job.featureTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {job.featureTags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {job.featureTags.length > 3 && (
              <span className="tag">+{job.featureTags.length - 3}</span>
            )}
          </div>
        )}

        {/* Job Details */}
        <div className="mt-auto space-y-1.5 text-[13px]">
          {/* Pay */}
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary-cta)] text-[10px] text-white">
              ₱
            </span>
            <span className="font-semibold text-[var(--color-orange)]">
              {formatPay()}
            </span>
          </div>

          {/* Schedule */}
          <div className="flex items-center gap-2 text-[var(--color-gray)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formatSchedule()}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[var(--color-gray)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              {job.city}
              {job.nearestStation && ` / ${job.nearestStation}`}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onSave?.(job.id)}
            className={`btn flex-1 ${
              job.isSaved
                ? "bg-[var(--color-orange)] text-white"
                : "btn-outline"
            } h-[36px] text-[12px]`}
          >
            {job.isSaved ? "Saved" : "Save"}
          </button>
          <Link
            href={`/jobs/${job.id}`}
            className="btn btn-primary flex-1 h-[36px] text-[12px]"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}
