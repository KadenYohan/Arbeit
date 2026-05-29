import { NextRequest, NextResponse } from "next/server";

// Mock user data
const mockUsers = [
  {
    id: "U001",
    type: "seeker",
    phone: "09171234567",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria@example.com",
    preferredDistricts: ["D1", "D2", "D4"],
    preferredCategories: ["food-beverage", "retail"],
  },
  {
    id: "E001",
    type: "employer",
    phone: "09189876543",
    companyName: "Brew & Bean Café",
    contactPerson: "John Smith",
    email: "hr@brewandbean.ph",
    businessType: "food-beverage",
    tinNumber: "123-456-789-000",
  },
];

// POST /api/auth/login - Login with phone + OTP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    // TODO: Validate OTP from SMS provider
    // For demo, accept any 6-digit OTP
    if (!otp || otp.length !== 6) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Find user by phone
    const user = mockUsers.find((u) => u.phone === phone);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // TODO: Generate real JWT token
    const token = `demo_token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          type: user.type,
          phone: user.phone,
        },
        token,
      },
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
