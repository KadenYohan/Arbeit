import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/register/employer - Register new employer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      phone,
      companyName,
      contactPerson,
      email,
      businessType,
      tinNumber,
      address,
    } = body;

    // Validate required fields
    if (!phone || !companyName || !contactPerson || !businessType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Check if phone/company already registered
    // TODO: Send OTP for verification
    // TODO: Save to database
    // TODO: Queue for manual verification (business documents)

    const newEmployer = {
      id: `E${Date.now()}`,
      type: "employer",
      phone,
      companyName,
      contactPerson,
      email,
      businessType,
      tinNumber,
      address,
      verified: false, // Requires manual verification
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newEmployer,
      message:
        "Registration submitted. Please verify your phone number. Business verification may take 1-2 business days.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
