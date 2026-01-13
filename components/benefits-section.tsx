"use client"

import { Waves, Puzzle, Globe, PiggyBank } from "lucide-react"
import Image from "next/image"

const BenefitItem = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex space-x-6 group">
      <div className="flex-shrink-0">
        <div className="hexagon-icon flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon size={24} className="text-[#FF6B00]" />
        </div>
      </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
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
      icon: PiggyBank,
      title: "Reduced Costs",
      description: "Eliminate intermediaries and reduce transaction costs through automated smart contracts",
    },
  ]

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="text-[#FF6B00] font-medium text-sm">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Benefits of Tokenization
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock new possibilities with blockchain-powered asset tokenization
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Main Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} {...benefit} />
            ))}
          </div>

          {/* Right Column - Visual Stats */}
          <div className="relative">
            <div className="hexagon-image-large-wrapper">
              <Image
                src="/blockchain-technology-network-nodes-glowing.jpg"
                alt="Blockchain Technology Network - Interconnected Digital Nodes"
                width={480}
                height={400}
                className="hexagon-image-large"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
