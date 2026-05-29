"use client";

import { useState } from "react";
import { DISTRICTS, CITIES, TRANSIT_LINES } from "@/lib/constants";

interface AreaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: { district?: number; cities?: string[] }) => void;
  initialDistrict?: number;
}

export function AreaPanel({
  isOpen,
  onClose,
  onSearch,
  initialDistrict,
}: AreaPanelProps) {
  const [activeTab, setActiveTab] = useState<"area" | "line">("area");
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(
    initialDistrict || null
  );
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  if (!isOpen) return null;

  const cities = selectedDistrict ? CITIES[selectedDistrict] || [] : [];
  const totalJobs = selectedCities.length > 0 ? selectedCities.length * 150 : 0; // Placeholder count

  const handleCityToggle = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleSelectAllCities = () => {
    if (selectedCities.length === cities.length) {
      setSelectedCities([]);
    } else {
      setSelectedCities([...cities]);
    }
  };

  const handleSearch = () => {
    onSearch({
      district: selectedDistrict || undefined,
      cities: selectedCities.length > 0 ? selectedCities : undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedDistrict(null);
    setSelectedCities([]);
    setSelectedLine(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-full animate-[slideInRight_200ms_ease-out] bg-white shadow-2xl md:w-[480px]"
        style={{ animationFillMode: "forwards" }}
      >
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between border-b border-[var(--color-gray-border)] px-4">
          <h2 className="text-h2">Select Area</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--color-primary-pale)]"
            aria-label="Close panel"
          >
            <svg
              className="h-5 w-5"
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
        </div>

        {/* Tabs */}
        <div className="flex h-[48px] border-b border-[var(--color-gray-border)]">
          <button
            onClick={() => setActiveTab("area")}
            className={`flex-1 text-sm font-medium transition-colors ${
              activeTab === "area"
                ? "border-b-[3px] border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[var(--color-gray)]"
            }`}
          >
            By Area
          </button>
          <button
            onClick={() => setActiveTab("line")}
            className={`flex-1 text-sm font-medium transition-colors ${
              activeTab === "line"
                ? "border-b-[3px] border-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[var(--color-gray)]"
            }`}
          >
            By Line / Station
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-60px-48px-72px)] overflow-hidden">
          {activeTab === "area" ? (
            <>
              {/* Districts Column */}
              <div className="w-[35%] overflow-y-auto border-r border-[var(--color-gray-border)]">
                {DISTRICTS.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => {
                      setSelectedDistrict(district.id);
                      setSelectedCities([]);
                    }}
                    className={`flex h-[48px] w-full items-center px-4 text-left text-sm transition-colors ${
                      selectedDistrict === district.id
                        ? "bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-primary-pale)]"
                    }`}
                  >
                    {district.name}
                  </button>
                ))}
              </div>

              {/* Cities Column */}
              <div className="w-[65%] overflow-y-auto p-4">
                {selectedDistrict ? (
                  <>
                    {/* Select All */}
                    <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-md bg-[var(--color-primary-pale)] p-3">
                      <input
                        type="checkbox"
                        checked={
                          selectedCities.length === cities.length &&
                          cities.length > 0
                        }
                        onChange={handleSelectAllCities}
                        className="h-4 w-4 rounded border-[var(--color-gray-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                      />
                      <span className="text-sm font-medium">
                        All of District {selectedDistrict}
                      </span>
                      <span className="ml-auto text-xs text-[var(--color-gray-mid)]">
                        ({cities.length * 150} jobs)
                      </span>
                    </label>

                    {/* City List */}
                    {cities.map((city) => (
                      <label
                        key={city}
                        className="flex cursor-pointer items-center gap-3 border-b border-[var(--color-gray-border)] py-3 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCities.includes(city)}
                          onChange={() => handleCityToggle(city)}
                          className="h-4 w-4 rounded border-[var(--color-gray-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                        />
                        <span className="text-sm">{city}</span>
                        <span className="ml-auto text-xs text-[var(--color-gray-mid)]">
                          ({Math.floor(Math.random() * 200 + 50)} jobs)
                        </span>
                      </label>
                    ))}
                  </>
                ) : (
                  <p className="text-center text-sm text-[var(--color-gray)]">
                    Select a district to view cities
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Lines Column */}
              <div className="w-[35%] overflow-y-auto border-r border-[var(--color-gray-border)]">
                {TRANSIT_LINES.filter((line) => line.isOperational).map(
                  (line) => (
                    <button
                      key={line.id}
                      onClick={() => setSelectedLine(line.id)}
                      className={`flex h-[48px] w-full items-center px-4 text-left text-sm transition-colors ${
                        selectedLine === line.id
                          ? "bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]"
                          : "hover:bg-[var(--color-primary-pale)]"
                      }`}
                    >
                      {line.name}
                    </button>
                  )
                )}
              </div>

              {/* Stations Column */}
              <div className="w-[65%] overflow-y-auto p-4">
                {selectedLine ? (
                  <p className="text-center text-sm text-[var(--color-gray)]">
                    Station list coming soon...
                  </p>
                ) : (
                  <p className="text-center text-sm text-[var(--color-gray)]">
                    Select a line to view stations
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="absolute right-0 bottom-0 left-0 flex h-[72px] items-center justify-between border-t border-[var(--color-gray-border)] bg-white px-4">
          <div className="text-sm">
            <span className="font-medium text-[var(--color-primary)]">
              {totalJobs} jobs found
            </span>
            {(selectedCities.length > 0 || selectedLine) && (
              <button
                onClick={handleClear}
                className="ml-2 text-[var(--color-blue-info)] hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="btn btn-primary h-[48px] w-[120px]"
          >
            Search this area
          </button>
        </div>
      </div>
    </>
  );
}
