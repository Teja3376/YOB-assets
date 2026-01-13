"use client"

import { CheckCircle2 } from "lucide-react"

export default function AboutSection() {
  const features = ["Democratizing Investment", "Regulatory Compliance", "Innovation First"]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Hexagon Image */}
          <div className="relative h-96 hidden lg:block order-2 lg:order-1">
            <div className="hexagon w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src="/digital-assets-blockchain-economy-technology.jpg"
                alt="YOB Assets technology"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 hexagon border-4 border-orange-500" />
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
              About YOB Assets
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Pioneering the Future of <span className="text-orange-500">Asset Ownership</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              YOB Assets is at the forefront of the tokenization revolution, bridging the gap between traditional assets
              and the digital economy.
            </p>
            <p className="text-gray-600 mb-8">
              Our platform combines cutting-edge blockchain technology with regulatory compliance and user-friendly
              interfaces to make asset tokenization accessible to everyone. Whether you're a property owner, business,
              or investor, we provide the tools and expertise to unlock new opportunities in the digital asset space.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-orange-500 flex-shrink-0" />
                  <span className="text-lg font-semibold text-gray-900">{feature}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
