"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock applicant data
const mockApplicants = [
  {
    id: "A001",
    name: "Maria Santos",
    phone: "0917-***-**89",
    appliedAt: "2026-05-28",
    status: "pending" as const,
    experience: "1 year in retail",
    availability: "Weekdays, Weekends",
  },
  {
    id: "A002",
    name: "Juan Dela Cruz",
    phone: "0918-***-**45",
    appliedAt: "2026-05-27",
    status: "shortlisted" as const,
    experience: "Fresh graduate",
    availability: "Flexible",
  },
  {
    id: "A003",
    name: "Ana Reyes",
    phone: "0919-***-**12",
    appliedAt: "2026-05-26",
    status: "rejected" as const,
    experience: "2 years in F&B",
    availability: "Night shift only",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  hired: "bg-blue-100 text-blue-800",
};

const statusLabels = {
  pending: "Pending Review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

export default function ApplicantsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const [applicants, setApplicants] = useState(mockApplicants);
  const [filter, setFilter] = useState<string>("all");

  const filteredApplicants =
    filter === "all"
      ? applicants
      : applicants.filter((a) => a.status === filter);

  const updateStatus = (
    applicantId: string,
    newStatus: "pending" | "shortlisted" | "rejected" | "hired"
  ) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/employer/listings" className="hover:text-primary">
            My Job Listings
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Applicants</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Applicants for Job
            </h1>
            <p className="text-muted-foreground mt-1">
              {applicants.length} total applicants
            </p>
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
          >
            <option value="all">All Applicants</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {filteredApplicants.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                No applicants found with this filter.
              </p>
            </div>
          ) : (
            filteredApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {applicant.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {applicant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {applicant.phone}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusColors[applicant.status]
                        }`}
                      >
                        {statusLabels[applicant.status]}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Experience:
                        </span>
                        <p className="text-foreground">{applicant.experience}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Availability:
                        </span>
                        <p className="text-foreground">
                          {applicant.availability}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied:</span>
                        <p className="text-foreground">{applicant.appliedAt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {applicant.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(applicant.id, "shortlisted")
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateStatus(applicant.id, "rejected")}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {applicant.status === "shortlisted" && (
                      <button
                        onClick={() => updateStatus(applicant.id, "hired")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Mark as Hired
                      </button>
                    )}
                    <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
