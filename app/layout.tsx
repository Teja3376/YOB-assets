import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";
import { Toaster } from "sonner";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-sans ${poppins.variable} antialiased text-gray-900 overflow-x-hidden overflow-y-hidden`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors theme="light" />
        <Analytics />
      </body>
    </html>
  );
}
