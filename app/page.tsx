import Header from "@/components/layout/header"
import HeroSection from "@/components/sections/hero-section"
import PerformanceSection from "@/components/sections/performance-section"
import ProcessSection from "@/components/sections/process-section"
import BenefitsSection from "@/components/sections/benefits-section"
import AssetCategoriesSection from "@/components/sections/asset-categories-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import AboutSection from "@/components/sections/about-section"
import FAQSection from "@/components/sections/faq-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <PerformanceSection /> */}
      <ProcessSection />
      <AssetCategoriesSection />
      <BenefitsSection />
      {/* <TestimonialsSection /> */}
      <AboutSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
