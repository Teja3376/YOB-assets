"use client"

import { Waves, Puzzle, Globe, PiggyBank, Sparkles } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Waves,
      title: "Instant Liquidity",
      description: "Convert illiquid assets into tradeable tokens that can be bought and sold 24/7 on global markets"
    },
    {
      icon: Puzzle,
      title: "Fractional Ownership",
      description: "Enable multiple investors to own portions of high-value assets, democratizing investment opportunities"
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description: "Reach investors worldwide without geographical limitations or traditional market barriers"
    },
    {
      icon: PiggyBank,
      title: "Reduced Costs",
      description: "Eliminate intermediaries and reduce transaction costs through automated smart contracts"
    },
  ]

  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-container">
        {/* Section Header */}
        <div className="benefits-header">
          <div className="benefits-subtitle">
            <Sparkles size={16} className="benefits-sparkle-icon" />
            Benefits
          </div>
          <h2 className="benefits-title">
            Benefits of Tokenization
          </h2>
          <p className="benefits-description">
            Unlock new possibilities with blockchain-powered asset tokenization
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div key={index} className="benefits-card">
                <div className="benefits-card-content">
                  <div className="benefits-icon-container">
                    <div className="benefits-icon-background">
                      <IconComponent size={32} className="benefits-icon" />
                    </div>
                    <div className="benefits-glow-effect"></div>
                  </div>
                  <h3 className="benefits-card-title">{benefit.title}</h3>
                  <p className="benefits-card-description">{benefit.description}</p>
                  <div className="benefits-accent-line"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
