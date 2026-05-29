"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MetroManilaMap } from "@/components/map/MetroManilaMap";
import { AreaPanel } from "@/components/map/AreaPanel";
import { CategoryGrid } from "@/components/jobs/CategoryGrid";
import { JobCard } from "@/components/jobs/JobCard";
import type { JobCard as JobCardType } from "@/types/job.types";

// Mock recent jobs data
const MOCK_RECENT_JOBS: JobCardType[] = [
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

export default function HomePage() {
  const [isAreaPanelOpen, setIsAreaPanelOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);

  const handleDistrictClick = (districtId: number) => {
    setSelectedDistrict(districtId);
    setIsAreaPanelOpen(true);
  };

  const handleAreaSearch = (filters: {
    district?: number;
    cities?: string[];
  }) => {
    // TODO: Navigate to jobs page with filters
    const params = new URLSearchParams();
    if (filters.district) params.set("district", filters.district.toString());
    if (filters.cities?.length)
      params.set("cities", filters.cities.join(","));
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#E8F5E9] py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left Column - Map */}
            <div className="flex-[6]">
              <h1 className="text-h1 mb-6">Find Jobs Near You</h1>
              <MetroManilaMap onDistrictClick={handleDistrictClick} />
              <Link
                href="/jobs"
                className="mt-4 inline-block text-sm text-[var(--color-blue-info)] hover:underline"
              >
                Or browse all jobs &rarr;
              </Link>
            </div>

            {/* Right Column - Categories */}
            <div className="flex-[4]">
              <h2 className="text-h2 mb-4">Browse by Job Type</h2>
              <CategoryGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Recently Posted Jobs Section */}
      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-h2">Recently Posted Jobs</h2>
            <Link
              href="/jobs"
              className="text-sm text-[var(--color-blue-info)] hover:underline"
            >
              View all jobs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_RECENT_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Area Panel */}
      <AreaPanel
        isOpen={isAreaPanelOpen}
        onClose={() => setIsAreaPanelOpen(false)}
        onSearch={handleAreaSearch}
        initialDistrict={selectedDistrict || undefined}
      />
      </main>
      
      <Footer />
    </div>
  );
}
