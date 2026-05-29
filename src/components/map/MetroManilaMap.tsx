"use client";

import { useState } from "react";
import { DISTRICTS } from "@/lib/constants";

interface MetroManilaMapProps {
  onDistrictClick: (districtId: number) => void;
  jobCounts?: Record<number, number>;
}

export function MetroManilaMap({
  onDistrictClick,
  jobCounts = { 1: 347, 2: 892, 3: 421, 4: 1204 },
}: MetroManilaMapProps) {
  const [hoveredDistrict, setHoveredDistrict] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 400 450"
        className="w-full"
        aria-label="Metro Manila District Map"
      >
        {/* District 3 - North */}
        <g
          onClick={() => onDistrictClick(3)}
          onMouseEnter={() => setHoveredDistrict(3)}
          onMouseLeave={() => setHoveredDistrict(null)}
          className="cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M50 30 L350 30 L350 140 L200 160 L50 140 Z"
            fill={
              hoveredDistrict === 3
                ? "var(--color-primary-light)"
                : "var(--color-primary-pale)"
            }
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <text
            x="200"
            y="75"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[13px] font-semibold"
          >
            D3
          </text>
          <rect x="170" y="90" width="60" height="24" rx="4" fill="white" />
          <text
            x="200"
            y="107"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[11px] font-medium"
          >
            {jobCounts[3]} jobs
          </text>
        </g>

        {/* District 1 - Manila (Center-West) */}
        <g
          onClick={() => onDistrictClick(1)}
          onMouseEnter={() => setHoveredDistrict(1)}
          onMouseLeave={() => setHoveredDistrict(null)}
          className="cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M50 140 L200 160 L200 300 L50 280 Z"
            fill={
              hoveredDistrict === 1
                ? "var(--color-primary-light)"
                : "var(--color-primary-pale)"
            }
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <text
            x="125"
            y="200"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[13px] font-semibold"
          >
            D1
          </text>
          <rect x="95" y="215" width="60" height="24" rx="4" fill="white" />
          <text
            x="125"
            y="232"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[11px] font-medium"
          >
            {jobCounts[1]} jobs
          </text>
        </g>

        {/* District 2 - Inner East */}
        <g
          onClick={() => onDistrictClick(2)}
          onMouseEnter={() => setHoveredDistrict(2)}
          onMouseLeave={() => setHoveredDistrict(null)}
          className="cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M200 160 L350 140 L350 300 L200 300 Z"
            fill={
              hoveredDistrict === 2
                ? "var(--color-primary-light)"
                : "var(--color-primary-pale)"
            }
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <text
            x="275"
            y="200"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[13px] font-semibold"
          >
            D2
          </text>
          <rect x="245" y="215" width="60" height="24" rx="4" fill="white" />
          <text
            x="275"
            y="232"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[11px] font-medium"
          >
            {jobCounts[2]} jobs
          </text>
        </g>

        {/* District 4 - South */}
        <g
          onClick={() => onDistrictClick(4)}
          onMouseEnter={() => setHoveredDistrict(4)}
          onMouseLeave={() => setHoveredDistrict(null)}
          className="cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M50 280 L200 300 L350 300 L350 420 L50 420 Z"
            fill={
              hoveredDistrict === 4
                ? "var(--color-primary-light)"
                : "var(--color-primary-pale)"
            }
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <text
            x="200"
            y="350"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[13px] font-semibold"
          >
            D4
          </text>
          <rect x="170" y="365" width="60" height="24" rx="4" fill="white" />
          <text
            x="200"
            y="382"
            textAnchor="middle"
            className="fill-[var(--color-primary)] text-[11px] font-medium"
          >
            {jobCounts[4]} jobs
          </text>
        </g>
      </svg>

      {/* District Labels */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {DISTRICTS.map((district) => (
          <button
            key={district.id}
            onClick={() => onDistrictClick(district.id)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              hoveredDistrict === district.id
                ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                : "bg-[var(--color-primary-pale)] text-[var(--color-gray)]"
            }`}
          >
            D{district.id}: {district.shortName}
          </button>
        ))}
      </div>
    </div>
  );
}
