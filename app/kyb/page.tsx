"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  CheckCircle2,
  Loader2,
} from "lucide-react"

import GetStartedLayout from "@/components/layout/get-started"
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import useKyc from "@/connection/useKyc"
import { useFetchIssuer } from "@/connection/useFetchIssuer"

type KYBStatus = "ready" | "loading" | "completed" | "error"

export default function KYBPage() {
  const router = useRouter()
  const [status, setStatus] = useState<KYBStatus>("ready")
  const { updateKycStatus, loading: kycLoading, error: kycError } = useKyc()
  const { data: issuerData, isLoading: isIssuerLoading, error: issuerError } = useFetchIssuer();
  console.log(issuerData, "issuerData")
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
      <GetStartedLayout>
        <div className="w-full text-center space-y-6 py-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              KYB Verification Completed
            </h2>
            <p className="text-gray-600">
              Your business details have been successfully verified.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Redirecting to application form…
          </p>
        </div>
      </GetStartedLayout>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (status === "error") {
    return (
      <GetStartedLayout>
        <div className="w-full space-y-6 max-w-2xl mx-auto">
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
        </div>
      </GetStartedLayout>
    )
  }

  /* ---------------- LOADING ---------------- */
  if (status === "loading") {
    return (
      <GetStartedLayout>
        <div className="w-full flex flex-col items-center gap-4 py-12">
          <Loader2 className="h-10 w-10 animate-spin text-[#FF6B00]" />
          <p className="text-gray-600">
            Initializing KYB verification…
          </p>
        </div>
      </GetStartedLayout>
    )
  }

  /* ---------------- READY ---------------- */
  return (
    <GetStartedLayout>
      <div className="w-full space-y-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="rounded-lg bg-orange-100 p-3">
            <Building2 className="h-7 w-7 text-[#FF6B00]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Know Your Business (KYB)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Business verification is required to continue
            </p>
          </div>
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
          className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 rounded-lg font-medium"
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
      </div>
    </GetStartedLayout>
  )
}
