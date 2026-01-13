"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, Clock, XCircle, Search } from "lucide-react"

type ApplicationStatus = "pending" | "approved" | "rejected" | "under_review"

interface Application {
  id: string
  legalEntityName: string
  countryOfIncorporation: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  assetCategory: string
  shortAssetDescription: string
  submittedAt: string
  status: ApplicationStatus
  // Legacy support for old format
  contactDetails?: string
}

const statusConfig: Record<ApplicationStatus, { label: string; icon: typeof CheckCircle2; color: string; bgColor: string }> = {
  pending: {
    label: "Pending Review",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
  },
  under_review: {
    label: "Under Review",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
  },
}

export default function StatusCheck() {
  const [applicationId, setApplicationId] = useState("")
  const [loading, setLoading] = useState(false)
  const [application, setApplication] = useState<Application | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [allApplications, setAllApplications] = useState<Application[]>([])

  useEffect(() => {
    // Load all applications from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("applications")
      if (stored) {
        try {
          const apps = JSON.parse(stored)
          setAllApplications(apps)
        } catch (e) {
          console.error("Error parsing applications:", e)
        }
      }
    }
  }, [])

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError("Please enter an application ID")
      return
    }

    setLoading(true)
    setError(null)
    setApplication(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Search in localStorage
      const stored = localStorage.getItem("applications")
      if (stored) {
        const apps: Application[] = JSON.parse(stored)
        const found = apps.find((app) => app.id === applicationId.trim().toUpperCase())
        
        if (found) {
          setApplication(found)
        } else {
          setError("Application not found. Please check your application ID.")
        }
      } else {
        setError("Application not found. Please check your application ID.")
      }
    } catch (err) {
      setError("An error occurred while checking the status. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Application Status</h2>
        <p className="text-gray-600">
          Enter your application ID to check the current status of your issuer application.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter Application ID (e.g., APP-12345678)"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Status
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {application && (
          <div className="space-y-4">
            <div className={`border rounded-lg p-6 ${statusConfig[application.status].bgColor}`}>
              <div className="flex items-start gap-4">
                {(() => {
                  const StatusIcon = statusConfig[application.status].icon
                  return <StatusIcon className={`h-6 w-6 ${statusConfig[application.status].color} mt-0.5`} />
                })()}
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-1 ${statusConfig[application.status].color}`}>
                    {statusConfig[application.status].label}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {application.status === "pending" && "Your application is pending review. We will notify you once it has been processed."}
                    {application.status === "under_review" && "Your application is currently being reviewed by our team."}
                    {application.status === "approved" && "Congratulations! Your application has been approved. You will receive further instructions via email."}
                    {application.status === "rejected" && "Your application has been rejected. Please contact support for more information."}
                  </p>
                  <div className="bg-white rounded-md p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Application ID</p>
                    <p className="text-sm font-mono text-gray-900">{application.id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Application Details</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Legal Entity Name</p>
                  <p className="text-sm font-medium text-gray-900">{application.legalEntityName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Country of Incorporation</p>
                  <p className="text-sm font-medium text-gray-900">{application.countryOfIncorporation}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {application.email || application.contactDetails || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900">
                    {application.phoneCountryCode && application.phoneNumber
                      ? `${application.phoneCountryCode} ${application.phoneNumber}`
                      : application.contactDetails || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Asset Category</p>
                  <p className="text-sm font-medium text-gray-900">{application.assetCategory}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(application.submittedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Asset Description</p>
                  <p className="text-sm text-gray-900">{application.shortAssetDescription}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {allApplications.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Recent Applications</h3>
            <div className="space-y-2">
              {allApplications.slice(-5).reverse().map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => {
                    setApplicationId(app.id)
                    setApplication(app)
                    setError(null)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      app.status === "approved" ? "bg-green-500" :
                      app.status === "rejected" ? "bg-red-500" :
                      "bg-orange-500"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{app.id}</p>
                      <p className="text-xs text-gray-500">{app.legalEntityName}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    statusConfig[app.status].bgColor
                  } ${statusConfig[app.status].color}`}>
                    {statusConfig[app.status].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
