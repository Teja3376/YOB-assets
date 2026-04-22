"use client";
import OTPInput from "@/components/features/auth/otp-input";
import GetStartedLayout from "@/components/layout/get-started";
import { Button } from "@/components/ui/button";
import { authAPI } from "@/lib/api-client";
import { setSession } from "@/lib/sessionStorage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyMobileOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const email = searchParams.get("email") || "";
  const mobileNumber = searchParams.get("mobile") || "";
  const countryCode = searchParams.get("countryCode") || "";
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 4) return;

    setIsLoading(true);
    setError("");
    try {
      console.log("Verifying mobile OTP with:", {
        otp,
        mobileNumber,
        countryCode,
      });
      const response = await authAPI.verifyMobileOTP({
        otp: otp,
        phoneNumber: mobileNumber,
        countryCode: countryCode,
      });
      if (response.data?.accessToken && response.data?.refreshToken) {
        setSession("accessToken", response.data.accessToken);
        setSession("refreshToken", response.data.refreshToken);
      }
      router.push("/kyb");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to verify mobile OTP. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpComplete = (completedOtp: string) => {
    setOtp(completedOtp);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    try {
      await authAPI.resendMobileOTP({
        phoneNumber: mobileNumber,
        countryCode: countryCode,
      });
      setResendTimer(60);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to resend mobile OTP. Please try again.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <GetStartedLayout>
      <div className="w-full">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          Have you received One Time Password to {mobileNumber}?
        </h2>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <OTPInput length={4} onComplete={handleOtpComplete} />
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
            disabled={isLoading || otp.length !== 4}
            className="w-full bg-linear-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 rounded-lg font-medium"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>

        {/* Sign Up Link */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="text-[#FF6B00] hover:text-[#FF8A33] font-medium"
            >
              Sign up
            </Link>
          </p>
        </div> */}
      </div>
    </GetStartedLayout>
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
      <VerifyMobileOTPContent />
    </Suspense>
  );
}
