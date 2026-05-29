import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/send-otp - Send OTP to phone number
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body;

    // Validate phone format (Philippine mobile number)
    const phoneRegex = /^(09|\+639)\d{9}$/;
    if (!phone || !phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // TODO: Generate 6-digit OTP
    // TODO: Store OTP with expiration (5 minutes)
    // TODO: Send via SMS provider (Semaphore, etc.)

    // For demo, always succeed
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // In production, never return the OTP!
      // This is only for demo/testing
      demo_otp: "123456",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
