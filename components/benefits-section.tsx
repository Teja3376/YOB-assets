"use client"

import { Waves, Puzzle, Globe, Zap } from "lucide-react"

const BenefitItem = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100">
        <Icon size={24} className="text-orange-500" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Waves,
      title: "Instant Liquidity",
      description: "Convert illiquid assets into tradeable tokens that can be bought and sold 24/7 on global markets",
    },
    {
      icon: Puzzle,
      title: "Fractional Ownership",
      description:
        "Enable multiple investors to own portions of high-value assets, democratizing investment opportunities",
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description: "Reach investors worldwide without geographical limitations or traditional market barriers",
    },
    {
      icon: Zap,
      title: "Reduced Costs",
      description: "Eliminate intermediaries and reduce transaction costs through automated smart contracts",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Benefits of Tokenization
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock new possibilities with blockchain-powered asset tokenization
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* Right Hexagon Image */}
          <div className="relative h-96 hidden lg:block">
            <div className="hexagon w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src="/blockchain-technology-network-nodes-glowing.jpg"
                alt="Blockchain benefits visualization"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 hexagon border-4 border-orange-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
