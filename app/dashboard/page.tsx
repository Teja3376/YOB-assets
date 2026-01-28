"use client";

import { useRouter } from "next/navigation";
import IssuerLayout from "@/components/layout/issuer-layout";
import { useFetchMyApplication } from "@/connection/useFetchMyApplication";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calendar,
  FileText,
  Globe,
  Mail,
  Phone,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Stepper, StepperStep } from "@/components/ui/stepper";

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    approved: {
      icon: CheckCircle2,
      label: "Approved",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      className: "bg-red-100 text-red-800 border-red-200",
    },
    in_review: {
      icon: Loader2,
      label: "In Review",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1.5 ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </Badge>
  );
};

const getStepperSteps = (status: string): StepperStep[] => {
  const steps: StepperStep[] = [
    { label: "Submitted", status: "completed" },
    { label: "Approved", status: "pending" },
  ];

  if (status === "approved") {
    steps[0].status = "completed";
    steps[1].status = "completed";
  } else if (status === "pending" || status === "in_review") {
    steps[0].status = "completed";
    steps[1].status = "current";
  } else if (status === "rejected") {
    steps[0].status = "completed";
    steps[1].status = "pending";
  }

  return steps;
};

export default function IssuerDashboard() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchMyApplication();

  return (
    <IssuerLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your asset tokenization applications
            </p>
          </div>
        </div>

        {/* User Info Card */}
        {data?.data?.user && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(() => {
                  // Handle nested user structure: data.data.user.user or data.data.user
                  const userData = data.data.user;
                  // Type guard: check if userData has a 'user' property (nested structure)
                  const user = (userData && typeof userData === 'object' && 'user' in userData)
                    ? (userData as { user: any }).user
                    : userData;
                  const kycStatus = user?.kycStatus;

                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user?.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">KYB Status</p>
                          <Badge
                            variant="outline"
                            className={
                              kycStatus === "approved"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {kycStatus || "N/A"}
                          </Badge>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applications Section */}
        <div>


          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00] mx-auto mb-4" />
                <p className="text-gray-600">Loading applications...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Failed to load applications</p>
                    <p className="text-sm text-red-600 mt-1">
                      {error instanceof Error
                        ? error.message
                        : "An error occurred"}
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="mt-3 text-sm text-red-700 hover:text-red-900 underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Applications List */}
          {!isLoading && !error && (
            <>
              {data?.data?.data && data.data.data.length > 0 ? (
                <div className="grid gap-4">
                  {data.data.data.map((application) => (
                    <Card key={application._id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">
                                {application.legalEntityName}
                              </CardTitle>
                              {getStatusBadge(application.status)}
                            </div>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <FileText className="h-4 w-4" />
                              {application.applicationId}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Status Stepper */}
                          <div className="py-4 border-b">
                            <Stepper steps={getStepperSteps(application.status)} />
                          </div>

                          {/* Asset Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  Asset Category
                                </p>
                                <p className="text-sm text-gray-600">
                                  {application.assetCategory}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  Country of Incorporation
                                </p>
                                <p className="text-sm text-gray-600">
                                  {application.countryOfIncorporation}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          {application.shortAssetDescription && (
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                Description
                              </p>
                              <p className="text-sm text-gray-600">
                                {application.shortAssetDescription}
                              </p>
                            </div>
                          )}

                          {/* Contact Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {application.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {application.phoneCountryCode}{" "}
                                {application.phoneNumber}
                              </span>
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="flex items-center gap-4 pt-2 border-t text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Created:{" "}
                                {format(
                                  new Date(application.createdAt),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Updated:{" "}
                                {format(
                                  new Date(application.updatedAt),
                                  "MMM dd, yyyy"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-900 font-medium mb-1">
                        No applications found
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        You haven't submitted any applications yet.
                      </p>
                      <button
                        onClick={() => router.push("/apply")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90 transition-colors"
                      >
                        Create New Application
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </IssuerLayout>
  );
}
