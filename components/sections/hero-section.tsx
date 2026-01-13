"use client"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <strong>
              Transform <span className="hero-highlight">Real Assets</span> into Digital Opportunities
            </strong>
          </h1>
          <p className="hero-description">
            Unlock liquidity from your real-world assets through secure blockchain tokenization. Whether you own property, equity, or valuable goods, YOB Assets makes it simple to digitize and monetize.
          </p>
          <div className="hero-reassurance-block">
            <div className="hero-reassurance-item">
              <Check className="hero-check-icon" size={20} />
              <p className="hero-reassurance-text">
                Fully compliant<br />
              </p>
            </div>
            <div className="hero-reassurance-item">
              <Check className="hero-check-icon" size={20} />
              <p className="hero-reassurance-text">
                KYC/KYB/AML<br />
              </p>
            </div>
            <div className="hero-reassurance-item">
              <Check className="hero-check-icon" size={20} />
              <p className="hero-reassurance-text">
                No-code or API/SDK<br />
              </p>
            </div>
            <div className="hero-reassurance-item">
              <Check className="hero-check-icon" size={20} />
              <p className="hero-reassurance-text">
                Easy onboarding<br />
              </p>
            </div>
          </div>
          <div className="hero-button-container">
            <button
              className="hero-primary-button"
              onClick={() => router.push('/get-started')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
