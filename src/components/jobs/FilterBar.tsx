"use client";

import { useState } from "react";
import {
  CATEGORIES,
  SCHEDULE_OPTIONS,
  FEATURE_TAGS,
  PAY_TYPES,
  PAY_MINIMUMS,
} from "@/lib/constants";

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
  jobCount?: number;
}

export function FilterBar({ onFilterChange, jobCount = 0 }: FilterBarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [payType, setPayType] = useState<string>("any");
  const [payMin, setPayMin] = useState<number>(0);
  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleScheduleToggle = (scheduleId: string) => {
    setSelectedSchedule((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((s) => s !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSearch = () => {
    onFilterChange?.({
      categories: selectedCategories,
      payType: payType !== "any" ? payType : undefined,
      payMin: payMin > 0 ? payMin : undefined,
      schedule: selectedSchedule,
      features: selectedFeatures,
    });
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setPayType("any");
    setPayMin(0);
    setSelectedSchedule([]);
    setSelectedFeatures([]);
  };

  return (
    <div className="rounded-[10px] border border-[var(--color-gray-border)] bg-white p-4">
      {/* Area Row */}
      <div className="mb-4 border-b border-[var(--color-gray-border)] pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-dark)]">
            Area
          </span>
          <button className="btn btn-outline h-[32px] px-3 text-[12px]">
            Change Area
          </button>
        </div>
        <p className="mt-2 text-sm text-[var(--color-gray)]">
          All Metro Manila
        </p>
      </div>

      {/* Job Type Row */}
      <div className="mb-4 border-b border-[var(--color-gray-border)] pb-4">
        <span className="mb-2 block text-sm font-medium text-[var(--color-dark)]">
          Job Type
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 5).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`tag cursor-pointer transition-colors ${
                selectedCategories.includes(category.id)
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                  : "hover:bg-[var(--color-primary-pale)]"
              }`}
            >
              {category.name}
            </button>
          ))}
          <button className="tag cursor-pointer hover:bg-[var(--color-primary-pale)]">
            More...
          </button>
        </div>
      </div>

      {/* Pay Row */}
      <div className="mb-4 border-b border-[var(--color-gray-border)] pb-4">
        <span className="mb-2 block text-sm font-medium text-[var(--color-dark)]">
          Pay (Min)
        </span>
        <div className="flex flex-wrap gap-3">
          <select
            value={payType}
            onChange={(e) => setPayType(e.target.value)}
            className="input h-[36px] w-auto"
          >
            <option value="any">Any Type</option>
            {PAY_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={payMin}
            onChange={(e) => setPayMin(Number(e.target.value))}
            className="input h-[36px] w-auto"
          >
            {PAY_MINIMUMS.map((min) => (
              <option key={min.value} value={min.value}>
                {min.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule Row */}
      <div className="mb-4 border-b border-[var(--color-gray-border)] pb-4">
        <span className="mb-2 block text-sm font-medium text-[var(--color-dark)]">
          Schedule
        </span>
        <div className="flex flex-wrap gap-2">
          {SCHEDULE_OPTIONS.map((schedule) => (
            <label
              key={schedule.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedSchedule.includes(schedule.id)}
                onChange={() => handleScheduleToggle(schedule.id)}
                className="h-4 w-4 rounded border-[var(--color-gray-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="text-sm">{schedule.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features Row */}
      <div className="mb-4">
        <span className="mb-2 block text-sm font-medium text-[var(--color-dark)]">
          Features
        </span>
        <div className="flex flex-wrap gap-2">
          {FEATURE_TAGS.slice(0, 5).map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`tag cursor-pointer transition-colors ${
                selectedFeatures.includes(feature.id)
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                  : "hover:bg-[var(--color-primary-pale)]"
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Actions */}
      <div className="flex items-center justify-between rounded-md border-l-4 border-[var(--color-primary)] bg-[var(--color-primary-pale)] p-3">
        <div>
          <span className="font-semibold text-[var(--color-primary)]">
            {jobCount.toLocaleString()} jobs match
          </span>
          <button
            onClick={handleClear}
            className="ml-2 text-sm text-[var(--color-blue-info)] hover:underline"
          >
            Clear All
          </button>
        </div>
        <button onClick={handleSearch} className="btn btn-primary h-[48px] px-8">
          Search
        </button>
      </div>
    </div>
  );
}
