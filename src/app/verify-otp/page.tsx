"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or last input
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual OTP verification via API
    console.log("[v0] OTP verification:", { email, otp: otpCode });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    // TODO: Implement actual OTP resend via API
    console.log("[v0] Resending OTP to:", email);

    setResendCooldown(60);
    setError("");
  };

  if (isVerified) {
    return (
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[var(--color-primary-pale)] px-4 py-12">
        <div className="w-full max-w-md rounded-[10px] border border-[var(--color-gray-border)] bg-white p-8 text-center shadow-md">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
              <svg
                className="h-8 w-8 text-[var(--color-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-h1 mb-2">Email Verified!</h1>
          <p className="mb-6 text-sm text-[var(--color-gray)]">
            Your account has been successfully created. You can now start using
            Arbeit.
          </p>
          <Link href="/login" className="btn btn-primary h-[48px] w-full">
            Continue to Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-[var(--color-primary-pale)] px-4 py-12">
      <div className="w-full max-w-md rounded-[10px] border border-[var(--color-gray-border)] bg-white p-8 shadow-md">
        <h1 className="text-h1 mb-2 text-center">Verify Your Email</h1>
        <p className="mb-6 text-center text-sm text-[var(--color-gray)]">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-[var(--color-dark)]">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Inputs */}
          <div className="mb-6 flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="h-14 w-12 rounded-md border border-[var(--color-gray-border)] text-center text-2xl font-semibold focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-[var(--color-red-error)]">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || otp.join("").length !== 6}
            className="btn btn-primary mb-4 h-[48px] w-full disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-sm text-[var(--color-gray)]">
              Didn&apos;t receive the code?{" "}
              {resendCooldown > 0 ? (
                <span className="text-[var(--color-gray-mid)]">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[var(--color-blue-info)] hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>
        </form>

        {/* Expiry Note */}
        <div className="mt-6 rounded-md bg-[var(--color-primary-pale)] p-3 text-center text-xs text-[var(--color-gray)]">
          The verification code expires in 10 minutes
        </div>
      </div>
    </div>
  );
}
