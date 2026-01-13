"use client"

import { FileText, Search, Coins, TrendingUp } from "lucide-react"

export default function ProcessSection() {
  const features = [
    {
      icon: FileText,
      title: "No-code Whitelabel platform",
      description: "Your own investment platform is only a couple of clicks away. No development team needed. Customize all the content, your compliance rules and deploy your assets for sale on-chain, all in one place."
    },
    {
      icon: Search,
      title: "Any Issuance Structure",
      description: "YOB Assets allows any structures from assets, funds, SPVs where you can distribute dividend automatically with discounts or vesting schedules"
    },
    {
      icon: Coins,
      title: "Embedded Compliance",
      description: "Setup your own rules for KYC, KYB, KYT and AML checks and monitor users activity all in one place."
    },
    {
      icon: TrendingUp,
      title: "Custom integration via API & SDK",
      description: "Your development team can integrate YOB Assets features within your own workflows and interfaces."
    }
  ]

  return (
    <section className="process-section">
      <div className="process-container">
        <div className="process-header">
          <div className="process-subtitle">Why Choose YOB Assets?</div>
          <h2 className="process-title">
            One Platform. <br />Endless Possibilities.
          </h2>
          <p className="process-description">
            From compliant issuance to orchestration and asset lifecycle management, YOB Assets just makes tokenization simple.
          </p>
        </div>
        <div className="process-grid">
          <div className="process-grid-column">
            {features.slice(0, 2).map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="process-card">
                  <IconComponent size={48} className="process-icon" />
                  <div className="process-card-content">
                    <div className="process-card-title">{feature.title}</div>
                    <p className="process-card-description">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="process-grid-column">
            {features.slice(2, 4).map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="process-card">
                  <IconComponent size={48} className="process-icon" />
                  <div className="process-card-content">
                    <div className="process-card-title">{feature.title}</div>
                    <p className="process-card-description">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
