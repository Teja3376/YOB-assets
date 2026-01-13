"use client"

import Header from "@/components/layout/header"
import AuthPromoSidebar from "@/components/features/auth/auth-promo-sidebar"

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header hideNavigation={true} />
            <div className="flex flex-1 pt-20">
                {/* Left Side - Form Content (50% width) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-16 bg-gray-50">
                    {children}
                </div>
                {/* Right Side - Promotional Content (50% width) */}
                <div className="hidden lg:flex w-1/2">
                    <AuthPromoSidebar />
                </div>
            </div>
        </div>
    )
}
