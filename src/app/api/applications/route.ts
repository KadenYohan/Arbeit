import { NextRequest, NextResponse } from "next/server";

// Mock applications data
const mockApplications = [
  {
    id: "APP001",
    jobId: "J001",
    seekerId: "U001",
    status: "pending",
    appliedAt: "2026-05-28T10:30:00Z",
    message: "I am very interested in this position!",
  },
];

// GET /api/applications - Get applications for current user
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const jobId = searchParams.get("jobId");
  const seekerId = searchParams.get("seekerId");

  let filtered = [...mockApplications];

  if (jobId) {
    filtered = filtered.filter((app) => app.jobId === jobId);
  }

  if (seekerId) {
    filtered = filtered.filter((app) => app.seekerId === seekerId);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

// POST /api/applications - Submit new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId, message } = body;

    // TODO: Get seekerId from auth token
    // TODO: Check if already applied
    // TODO: Validate job exists and is active
    // TODO: Save to database

    const newApplication = {
      id: `APP${Date.now()}`,
      jobId,
      seekerId: "U001", // Would come from auth
      status: "pending",
      appliedAt: new Date().toISOString(),
      message: message || "",
    };

    return NextResponse.json({
      success: true,
      data: newApplication,
      message: "Application submitted successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
