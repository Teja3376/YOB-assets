"use client"

import { useState, useEffect, Suspense } from "react"
import {  useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import OTPInput from "@/components/features/auth/otp-input"
import AuthLayout from "@/components/layout/auth-layout"
import { authAPI } from "@/lib/api-client"

function OTPPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [error, setError] = useState<string>("")
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleOTPComplete = (completedOtp: string) => {
    setOtp(completedOtp)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return

    setIsLoading(true)
    setError("")

    try {
      // Call verify OTP API
      
      const response = await authAPI.verifyOTP({ otp: otp, email: email })

      // Update tokens if new ones are provided
      if (response.data?.accessToken && response.data?.refreshToken) {
        sessionStorage.setItem("accessToken", response.data.accessToken)
        sessionStorage.setItem("refreshToken", response.data.refreshToken)
      }

      // Check if this is a new user - redirect to KYB (Know Your Business) form
      const isNewUser = sessionStorage.getItem("isNewUser") === "true"
      
      if (isNewUser) {
        // Clear the flag after using it
        sessionStorage.removeItem("isNewUser")
        // Redirect to KYB page for business verification
        router.push("/kyb")
      } else {
        // Existing user - go directly to dashboard
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "OTP verification failed. Please try again."
      )
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0 || resendLoading) return

    setResendLoading(true)
    setError("")

    try {
      // Call resend OTP API
      await authAPI.resendOTP()
      setResendTimer(60)
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      )
    } finally {
      setResendLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Link>

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Have you received our email?
        </h2>

        {/* Instructions */}
        <div className="space-y-4 mb-8 text-gray-600">
          <p>
            We've sent a One-Time Password (OTP) to your email address:{" "}
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
          <p>
            If this email is registered in our system, please enter the OTP we
            just sent. If not, you'll need to create a new account.
          </p>
          <p>
            Don't forget to check your spam or junk folder if you don't see
            the email.
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <OTPInput length={6} onComplete={handleOTPComplete} />

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
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
  )
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
  )
}
