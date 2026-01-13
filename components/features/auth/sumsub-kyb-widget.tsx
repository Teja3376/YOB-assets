"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SumsubKYBWidgetProps {
  accessToken: string
  email?: string
  phone?: string
  onComplete?: (payload: any) => void
  onError?: (error: any) => void
}

export default function SumsubKYBWidget({
  accessToken,
  email,
  phone,
  onComplete,
  onError,
}: SumsubKYBWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sdkInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!accessToken || !containerRef.current) return

    // Dynamically load Sumsub WebSDK
    const loadSumsubSDK = async () => {
      try {
        // Load Sumsub SDK script if not already loaded
        if (!(window as any).SNSWebSDK) {
          const script = document.createElement("script")
          script.src = "https://static.sumsub.com/idensic/static/sns-websdk-bundle.js"
          script.async = true
          
          await new Promise((resolve, reject) => {
            script.onload = () => resolve(true)
            script.onerror = () => reject(new Error("Failed to load Sumsub SDK"))
            document.head.appendChild(script)
          })
        }

        // Wait a bit for SDK to be fully available
        await new Promise((resolve) => setTimeout(resolve, 100))

        const WebSDK = (window as any).SNSWebSDK

        if (!WebSDK) {
          throw new Error("Sumsub WebSDK not available")
        }

        const snsWebSdkInstance = WebSDK.init(accessToken, () => {
          // Token refresh callback - fetch new token from your API
          return fetch("/api/sumsub/access-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => data.token || data.accessToken)
            .catch((err) => {
              console.error("Failed to refresh token:", err)
              throw err
            })
        })
          .withConf({
            lang: "en",
            email: email,
            phone: phone,
          })
          .withOptions({
            addViewportTag: false,
            adaptIframeHeight: true,
          })
          .on("idCheck.onStepCompleted", (payload: any) => {
            console.log("Sumsub step completed:", payload)
            setIsLoading(false)
            if (onComplete) {
              onComplete(payload)
            }
          })
          .on("idCheck.onError", (error: any) => {
            console.error("Sumsub error:", error)
            setIsLoading(false)
            setError(error?.message || "An error occurred during verification")
            if (onError) {
              onError(error)
            }
          })
          .on("idCheck.onApplicantSubmitted", (payload: any) => {
            console.log("Applicant submitted:", payload)
            setIsLoading(false)
            if (onComplete) {
              onComplete(payload)
            }
          })
          .build()

        sdkInstanceRef.current = snsWebSdkInstance
        snsWebSdkInstance.launch(containerRef.current!)
      } catch (err: any) {
        console.error("Error initializing Sumsub SDK:", err)
        setError(err?.message || "Failed to initialize verification")
        setIsLoading(false)
        if (onError) {
          onError(err)
        }
      }
    }

    loadSumsubSDK()

    // Cleanup
    return () => {
      if (sdkInstanceRef.current) {
        try {
          sdkInstanceRef.current?.destroy?.()
        } catch (err) {
          console.error("Error destroying SDK instance:", err)
        }
      }
    }
  }, [accessToken, email, phone, onComplete, onError])

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
          <span className="ml-3 text-gray-600">Loading verification...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        ref={containerRef}
        id="sumsub-websdk-container"
        className="w-full min-h-[600px]"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  )
}
