import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { QueryProvider } from "@/components/providers/query-provider"
import "./globals.css"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YOB Assets | Asset Tokenization Platform",
  description:
    "Transform your real-world assets into digital tokens. Unlock liquidity from property, equity, collectibles, and more through secure blockchain tokenization.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/yob-assets-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/yob-assets-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/yob-assets-logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/yob-assets-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased text-gray-900 overflow-x-hidden overflow-y-hidden`}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
