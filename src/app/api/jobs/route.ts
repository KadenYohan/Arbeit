import { NextRequest, NextResponse } from "next/server";

// Mock data - replace with database queries
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
    slotsTotal: 10,
    slotsFilled: 5,
    status: "active",
    isNew: true,
    isFeatured: true,
    isUrgent: false,
    postedAt: "2026-05-21",
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
    slotsTotal: 8,
    slotsFilled: 2,
    status: "active",
    isNew: false,
    isFeatured: true,
    isUrgent: true,
    postedAt: "2026-05-20",
  },
];

// GET /api/jobs - List jobs with optional filters
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const categoryId = searchParams.get("categoryId");
  const districtId = searchParams.get("districtId");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");

  let filteredJobs = [...mockJobs];

  // Apply filters
  if (categoryId) {
    filteredJobs = filteredJobs.filter((job) => job.categoryId === categoryId);
  }

  if (districtId) {
    filteredJobs = filteredJobs.filter((job) => job.districtId === districtId);
  }

  if (featured === "true") {
    filteredJobs = filteredJobs.filter((job) => job.isFeatured);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.subtitle.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredJobs,
    total: filteredJobs.length,
  });
}

// POST /api/jobs - Create a new job (employer only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Validate user is authenticated employer
    // TODO: Validate request body
    // TODO: Save to database

    const newJob = {
      id: `J${Date.now()}`,
      ...body,
      status: "active",
      isNew: true,
      postedAt: new Date().toISOString().split("T")[0],
      slotsFilled: 0,
    };

    return NextResponse.json({
      success: true,
      data: newJob,
      message: "Job posted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create job" },
      { status: 500 }
    );
  }
}
