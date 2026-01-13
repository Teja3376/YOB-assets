"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Loader2,
} from "lucide-react"

import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import useKyc from "@/connection/useKyc"

type KYBStatus = "ready" | "loading" | "completed" | "error"

export default function KYBPage() {
  const router = useRouter()
  const [status, setStatus] = useState<KYBStatus>("ready")
  const { updateKycStatus, loading: kycLoading, error: kycError } = useKyc()

  /* Optional auto-redirect after completion */
  useEffect(() => {
    if (status === "completed") {
      const timer = setTimeout(() => {
        router.push("/apply")
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [status, router])

  /* ---------------- COMPLETED ---------------- */
  if (status === "completed") {
    return (
      <AuthLayout>
        <div className="max-w-md w-full mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  KYB Verification Completed
                </h2>
                <p className="text-gray-600 mt-2">
                  Your business details have been successfully verified.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Redirecting to application form…
              </p>
            </CardContent>
          </Card>
        </div>
      </AuthLayout>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (status === "error") {
    return (
      <AuthLayout>
        <div className="max-w-md w-full mx-auto">
          <Link
            href="/otp"
            className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Link>

          <Card>
            <CardContent className="p-8 space-y-4">
              <Alert variant="destructive">
                <AlertTitle>Verification Failed</AlertTitle>
                <AlertDescription>
                  {kycError || "An error occurred during KYB verification. Please try again."}
                </AlertDescription>
              </Alert>
              <Button
                className="w-full"
                onClick={() => {
                  setStatus("ready")
                }}
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </AuthLayout>
    )
  }

  /* ---------------- LOADING ---------------- */
  if (status === "loading") {
    return (
      <AuthLayout>
        <div className="max-w-md w-full mx-auto">
          <Link
            href="/otp"
            className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Link>

          <Card>
            <CardContent className="p-8 flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
              <p className="text-gray-600 text-sm">
                Initializing KYB verification…
              </p>
            </CardContent>
          </Card>
        </div>
      </AuthLayout>
    )
  }

  /* ---------------- READY ---------------- */
  return (
    <AuthLayout>
      <div className="max-w-xl w-full mx-auto">
        {/* Back */}
        <Link
          href="/otp"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Link>

        <Card className="shadow-lg">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-3">
                <Building2 className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Know Your Business (KYB)
                </h2>
                <p className="text-sm text-gray-600">
                  Business verification is required to continue
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="flex items-center justify-between text-sm">
              {["Register", "Verify", "Complete"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>

            {/* Info */}
            <Alert>
              <AlertTitle>Mock KYB</AlertTitle>
              <AlertDescription>
                This is a demo KYB flow. Click the button below to simulate
                successful verification.
              </AlertDescription>
            </Alert>

            {/* Error Alert */}
            {kycError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{kycError}</AlertDescription>
              </Alert>
            )}

            {/* Action */}
            <Button
              className="w-full"
              onClick={async () => {
                setStatus("loading")
                try {
                  await updateKycStatus("approved")
                  setStatus("completed")
                } catch (error) {
                  setStatus("error")
                  console.error("KYC update failed:", error)
                }
              }}
              disabled={kycLoading}
            >
              {kycLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Start KYB Verification"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
