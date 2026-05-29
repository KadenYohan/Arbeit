import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/register/seeker - Register new job seeker
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, firstName, lastName, preferredDistricts, preferredCategories } = body;

    // Validate required fields
    if (!phone || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Check if phone already registered
    // TODO: Send OTP for verification
    // TODO: Save to database

    const newUser = {
      id: `U${Date.now()}`,
      type: "seeker",
      phone,
      firstName,
      lastName,
      preferredDistricts: preferredDistricts || [],
      preferredCategories: preferredCategories || [],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "Registration successful. Please verify your phone number.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
