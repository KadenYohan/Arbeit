import { NextRequest, NextResponse } from "next/server";

// Mock job data - same as in parent route
const mockJobs = [
  {
    id: "J001",
    title: "Barista / Cashier / Floor Staff",
    subtitle: "Coffee Shop Part-Timer — No Experience OK!",
    companyName: "Brew & Bean Café",
    branchName: "BGC Branch",
    categoryId: "food-beverage",
    districtId: "D4",
    address: "BGC, Taguig City (near Market! Market!)",
    nearestStation: "Ayala MRT-3",
    commuteMinutes: 15,
    payType: "hourly",
    payMin: 80,
    payMax: 110,
    schedule: ["morning", "afternoon"],
    shiftHours: "07:00–22:00 (shift consultation)",
    featureFlags: [
      "no-experience-ok",
      "students-ok",
      "uniform-provided",
      "immediate-start",
      "transportation-allowance",
      "meal-allowance",
    ],
    description:
      "Join our friendly team at Brew & Bean Café! We're looking for enthusiastic part-timers to help serve our customers with great coffee and excellent service.",
    requirements: [
      "Must be at least 18 years old",
      "Good communication skills",
      "Can work in shifts",
      "No experience required - we will train you!",
    ],
    benefits: [
      "Free meals during shift",
      "Transportation allowance",
      "Flexible scheduling",
      "Employee discount on all products",
    ],
    slotsTotal: 10,
    slotsFilled: 5,
    status: "active",
    isNew: true,
    isFeatured: true,
    isUrgent: false,
    postedAt: "2026-05-21",
    employerId: "E001",
  },
  {
    id: "J002",
    title: "Karaoke Staff / Reception / Hostess",
    subtitle:
      "Jankara-style Entertainment — Hair & Nails FREELY Styled! No Resume Needed",
    companyName: "Sing Star KTV",
    branchName: "Cubao Branch",
    categoryId: "entertainment",
    districtId: "D2",
    address: "Araneta Center, Cubao, Quezon City",
    nearestStation: "Araneta Center–Cubao LRT-2",
    commuteMinutes: 3,
    payType: "hourly",
    payMin: 90,
    payMax: 130,
    schedule: ["evening", "night"],
    shiftHours: "18:00–02:00",
    featureFlags: [
      "no-experience-ok",
      "students-ok",
      "no-resume-needed",
      "hair-style-freedom",
      "tattoos-ok",
      "night-shift-ok",
    ],
    description:
      "Work in a fun, vibrant environment at Sing Star KTV! Express yourself while providing excellent service to our guests.",
    requirements: [
      "Must be at least 18 years old",
      "Friendly and outgoing personality",
      "Can work night shifts",
      "No resume needed",
    ],
    benefits: [
      "Free food during shift",
      "Tips allowed",
      "Hair & nail styling freedom",
      "Fun work environment",
    ],
    slotsTotal: 8,
    slotsFilled: 2,
    status: "active",
    isNew: false,
    isFeatured: true,
    isUrgent: true,
    postedAt: "2026-05-20",
    employerId: "E002",
  },
];

// GET /api/jobs/[id] - Get single job details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return NextResponse.json(
      { success: false, error: "Job not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: job,
  });
}

// PATCH /api/jobs/[id] - Update job (employer only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();

    // TODO: Validate user owns this job
    // TODO: Update in database

    return NextResponse.json({
      success: true,
      data: { id, ...body },
      message: "Job updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete job (employer only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // TODO: Validate user owns this job
  // TODO: Delete from database (or soft delete)

  return NextResponse.json({
    success: true,
    message: "Job deleted successfully",
  });
}
