"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  const features = [
    {
      title: "Democratizing Investment",
      description: "Making high-value assets accessible to all investors",
    },
    {
      title: "Regulatory Compliance",
      description: "Full compliance with global financial regulations",
    },
    {
      title: "Innovation First",
      description: "Leading with technology and innovation",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-6">
              <span className="text-[#FF6B00] font-medium text-sm">About YOB Assets</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A33]">Asset Ownership</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-6">
              YOB Assets is at the forefront of the tokenization revolution, bridging the gap between traditional assets and the digital economy.
            </p>
            
            <p className="text-gray-600 mb-8">
              Our platform combines cutting-edge blockchain technology with regulatory compliance and user-friendly interfaces to make asset tokenization accessible to everyone. Whether you're a property owner, business, or investor, we provide the tools and expertise to unlock new opportunities in the digital asset space.
            </p>

            {/* Mission Points */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="text-[#FF6B00] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all">
              Learn More About Us
            </Link>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="relative">
              <div className="hexagon-image-large-wrapper">
                <Image
                  src="/digital-assets-blockchain-economy-technology.jpg"
                  alt="Digital Assets and Blockchain Economy Technology"
                  width={480}
                  height={400}
                  className="hexagon-image-large"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
