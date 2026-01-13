import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import RealEstateHero from "@/components/features/real-estate/real-estate-hero"
import RealEstateStats from "@/components/features/real-estate/real-estate-stats"
import RealEstateWhatIs from "@/components/features/real-estate/real-estate-what-is"
import RealEstateTypes from "@/components/features/real-estate/real-estate-types"
import RealEstateBenefits from "@/components/features/real-estate/real-estate-benefits"
import RealEstateUseCases from "@/components/features/real-estate/real-estate-use-cases"
import RealEstateCTA from "@/components/features/real-estate/real-estate-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Estate Tokenization - YOB Assets",
  description: "Transform your property into digital assets. Unlock liquidity from commercial buildings, residential properties, and land through blockchain tokenization.",
}

export default function RealEstatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <RealEstateHero />
      <RealEstateStats />
      <RealEstateWhatIs />
      <RealEstateTypes />
      <RealEstateBenefits />
      <RealEstateUseCases />
      <RealEstateCTA />
      <Footer />
    </main>
  )
}
