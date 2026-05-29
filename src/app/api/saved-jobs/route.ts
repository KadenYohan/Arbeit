import { NextRequest, NextResponse } from "next/server";

// Mock saved jobs data
const mockSavedJobs: { seekerId: string; jobId: string; savedAt: string }[] = [];

// GET /api/saved-jobs - Get saved jobs for current user
export async function GET(request: NextRequest) {
  // TODO: Get seekerId from auth token
  const seekerId = "U001";

  const saved = mockSavedJobs.filter((s) => s.seekerId === seekerId);

  return NextResponse.json({
    success: true,
    data: saved,
    total: saved.length,
  });
}

// POST /api/saved-jobs - Save a job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId } = body;

    // TODO: Get seekerId from auth token
    const seekerId = "U001";

    // TODO: Check if already saved
    // TODO: Save to database

    const savedJob = {
      seekerId,
      jobId,
      savedAt: new Date().toISOString(),
    };

    mockSavedJobs.push(savedJob);

    return NextResponse.json({
      success: true,
      data: savedJob,
      message: "Job saved successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save job" },
      { status: 500 }
    );
  }
}

// DELETE /api/saved-jobs - Unsave a job
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobId } = body;

    // TODO: Get seekerId from auth token
    // TODO: Remove from database

    return NextResponse.json({
      success: true,
      message: "Job removed from saved list",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to remove saved job" },
      { status: 500 }
    );
  }
}
