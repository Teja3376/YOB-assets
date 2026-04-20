"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
import IssuerLayout from "@/components/layout/issuer-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
        <div className="flex flex-col h-screen overflow-hidden bg-white">
          <IssuerLayout>{children}</IssuerLayout>
        </div>
      </ProtectedRoute>
    </>
  );
}
