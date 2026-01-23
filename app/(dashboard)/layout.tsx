"use client";
import IssuerLayout from "@/components/layout/issuer-layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
           <IssuerLayout>
            {children}
           </IssuerLayout>
        </div>
    );
}
