"use client"

import { FileText, Search, Coins, TrendingUp } from "lucide-react"

export default function ProcessSection() {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Submit Asset",
      description: "Upload your asset details and documentation",
    },
    {
      icon: Search,
      number: "2",
      title: "Verification",
      description: "We verify and evaluate your asset",
    },
    {
      icon: Coins,
      number: "3",
      title: "Tokenization",
      description: "Create digital tokens on blockchain",
    },
    {
      icon: TrendingUp,
      number: "4",
      title: "Trading",
      description: "Sell your tokens to the market",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="text-[#FF6B00] font-medium text-sm">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Tokenization Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your assets into digital tokens in four simple steps
          </p>
        </div>

        {/* Hexagon Process Cards */}
        <div className="hexagon-container">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="hexagon-process">
                <div className="process-number">{step.number}</div>
                <IconComponent size={48} className="process-icon" />
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
