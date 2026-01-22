"use client";

import Header from "@/common/Header";
import SideBar from "@/common/SideBar";
import Footer from "@/common/Footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Top Header */}
            <Header />

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Scrollable Content Area */}
                    <main className="flex-1 overflow-y-auto bg-white">
                        {children}
                    </main>

                    {/* Bottom Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
