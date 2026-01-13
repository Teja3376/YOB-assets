"use client";

import AuthHeader from "./authHeader";
import DashboardSidebar from "./dashboard-side";

export default function IssuerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AuthHeader />

      {/* Body */}
      <div className="flex pt-20" style={{ height: 'calc(100vh - 10px)' }}>
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
