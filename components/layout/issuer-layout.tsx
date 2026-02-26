"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthHeader from "./authHeader";
import DashboardSidebar from "./dashboard-side";
import { useFetchIssuer } from "@/connection/useFetchIssuer";
import { useFetchMyApplication } from "@/connection/useFetchMyApplication";

export default function IssuerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const {
    data: issuerData,
    isLoading: isIssuerLoading,
    error: issuerError,
  } = useFetchIssuer();
  const {
    data: appData,
    isLoading: isAppLoading,
    error: appError,
  } = useFetchMyApplication();

  // 1. Token check – redirect to login if missing
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") return;

      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      if ((!accessToken && !refreshToken) || !refreshToken) {
        // router.push("/login");
        console.log("No tokens found, redirecting to login...");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // 2. Issuer status check – redirect to /apply if not approved
  useEffect(() => {
    if (isChecking || isIssuerLoading || issuerError || !issuerData) return;

    const issuerApplicationStatus = issuerData.data?.issuerStatus;

    if (issuerApplicationStatus !== "approved") {
      router.push("/apply");
    }
  }, [issuerData, isIssuerLoading, issuerError, isChecking, router]);


  const isAuthPending = isChecking || isIssuerLoading;

  if (isAuthPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00] mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthHeader />

      <div className="flex pt-20" style={{ height: "calc(100vh - 10px)" }}>
        <DashboardSidebar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
