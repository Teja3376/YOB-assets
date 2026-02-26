"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/features/auth/otp-input";
import { authAPI } from "@/lib/api-client";
import AuthLayout from "@/components/layout/auth-layout";

function OTPPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState<string>("");
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOTPComplete = (completedOtp: string) => {
    setOtp(completedOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      // Call verify OTP API

      const response = await authAPI.verifyOTP({ otp: otp, email: email });
      console.log("OTP verification successful:", response);

      // Update tokens if new ones are provided
      if (response.data?.accessToken && response.data?.refreshToken) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
      }

      // Check status and redirect accordingly
      const userData = response.data?.user;
      const kycStatus = userData?.kycStatus;
      const issuerStatus = response.data?.issuerStatus;

      if (kycStatus && kycStatus !== "approved") {
        router.push("/kyb");
      } else if (issuerStatus !== "approved") {
        router.push("/apply");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return;

    setResendLoading(true);
    setError("");

    try {
      // Call resend OTP API
      await authAPI.resendOTP();
      setResendTimer(60);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to resend OTP. Please try again.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const accessToken = sessionStorage.getItem("accessToken");

  const isCheck = accessToken ? false : true;

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Have you received our email?
        </h2>

        {/* Instructions */}
        <div className="space-y-3 mb-8 text-gray-600">
          <p>
            We've sent a One-Time Password (OTP) to your email address:{" "}
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
          <p className="text-sm">
            Please enter the 6-digit code we sent to verify your email address.
            Don't forget to check your spam or junk folder if you don't see the
            email.
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <OTPInput length={6} onComplete={handleOTPComplete} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Resend Code */}
          <div className="flex items-center justify-center">
            <Button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || resendLoading}
              variant="ghost"
              className="text-gray-600 hover:text-[#FF6B00] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading
                ? "Sending..."
                : resendTimer > 0
                  ? `Resend code in ${formatTime(resendTimer)}`
                  : "Resend code"}
              {resendTimer === 0 && !resendLoading && (
                <ArrowRight className="ml-2" size={16} />
              )}
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 rounded-lg font-medium"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="text-[#FF6B00] hover:text-[#FF8A33] font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function OTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <OTPPageContent />
    </Suspense>
  );
}
