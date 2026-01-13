import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProcessSection from "@/components/process-section"
import BenefitsSection from "@/components/benefits-section"
import AssetCategoriesSection from "@/components/asset-categories-section"
import CalculatorSection from "@/components/calculator-section"
import AboutSection from "@/components/about-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProcessSection />
      <AssetCategoriesSection />
      <BenefitsSection />
      <CalculatorSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  )
}
