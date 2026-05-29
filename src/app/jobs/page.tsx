"use client";

import { useState } from "react";
import { FilterBar } from "@/components/jobs/FilterBar";
import { JobFeed } from "@/components/jobs/JobFeed";
import type { JobCard as JobCardType } from "@/types/job.types";

// Mock jobs data
const MOCK_JOBS: JobCardType[] = [
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
    featureTags: ["No Experience OK", "Students OK", "Uniform Provided"],
    createdAt: new Date().toISOString(),
    isNew: true,
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
    isNew: true,
  },
  {
    id: "3",
    title: "Data Encoder / Office Staff",
    companyName: "Tech Solutions Inc.",
    category: "admin-office",
    payType: "hourly",
    payMin: 60,
    payMax: 80,
    scheduleDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shiftFrom: "9AM",
    shiftTo: "5PM",
    city: "Manila",
    featureTags: ["Immediate Start", "Flexible Hours"],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isNew: false,
  },
  {
    id: "4",
    title: "Event Staff / Usher",
    companyName: "EventPro Services",
    category: "events",
    payType: "daily",
    payMin: 700,
    payMax: 900,
    scheduleDays: ["Sat", "Sun"],
    shiftFrom: "6AM",
    shiftTo: "6PM",
    city: "Taguig",
    nearestStation: "BGC Bus",
    featureTags: ["No Experience OK", "Transportation Allowance", "Daily Pay"],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isNew: false,
  },
  {
    id: "5",
    title: "Academic Tutor / Part-time Teacher",
    companyName: "Learning Center PH",
    category: "education",
    payType: "hourly",
    payMin: 150,
    payMax: 250,
    scheduleDays: ["Mon", "Wed", "Fri"],
    shiftFrom: "4PM",
    shiftTo: "8PM",
    city: "Mandaluyong",
    featureTags: ["Students OK", "Flexible Hours"],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    isNew: false,
  },
  {
    id: "6",
    title: "Warehouse Packer / Logistics Staff",
    companyName: "QuickShip Logistics",
    category: "logistics",
    payType: "daily",
    payMin: 500,
    payMax: 600,
    scheduleDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shiftFrom: "6AM",
    shiftTo: "2PM",
    city: "Caloocan",
    featureTags: ["No Experience OK", "Immediate Start"],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    isNew: false,
  },
  {
    id: "7",
    title: "Customer Service Representative",
    companyName: "Call Center Co.",
    category: "customer-service",
    payType: "hourly",
    payMin: 80,
    payMax: 120,
    scheduleDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    shiftFrom: "2PM",
    shiftTo: "10PM",
    city: "Pasig",
    nearestStation: "Ortigas MRT-3",
    featureTags: ["No Experience OK", "Night Shift OK"],
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    isNew: false,
  },
  {
    id: "8",
    title: "Spa Receptionist / Front Desk",
    companyName: "Zen Spa & Wellness",
    category: "beauty-wellness",
    payType: "daily",
    payMin: 600,
    payMax: 700,
    scheduleDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
    shiftFrom: "10AM",
    shiftTo: "7PM",
    city: "Makati",
    featureTags: ["Uniform Provided", "Meal Allowance"],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    isNew: false,
  },
];

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs] = useState<JobCardType[]>(MOCK_JOBS);

  const totalPages = Math.ceil(jobs.length / 20);

  const handleFilterChange = (filters: Record<string, unknown>) => {
    console.log("[v0] Filter changed:", filters);
    // TODO: Implement actual filtering via API
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-6">
      <div className="mx-auto max-w-[1200px] px-4">
        <h1 className="text-h1 mb-6">Find Part-Time Jobs</h1>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            onFilterChange={handleFilterChange}
            jobCount={jobs.length}
          />
        </div>

        {/* Job Feed */}
        <JobFeed
          jobs={jobs}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
