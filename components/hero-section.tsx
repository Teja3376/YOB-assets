"use client"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 to-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -left-20 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform <span className="text-orange-500">Real Assets</span> into{" "}
                <span className="text-gray-900">Digital Opportunities</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Unlock liquidity from your real-world assets through secure blockchain tokenization. Whether you own
                property, equity, or valuable goods, YOB Assets makes it simple to digitize and monetize.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-colors">
                Get Started Now
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-3.5 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold rounded-full transition-colors">
                Learn About Us
              </button>
            </div>
          </div>

          {/* Right Hexagon Image */}
          <div className="relative h-96 lg:h-full">
            <div className="hexagon w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src="/3d-digital-tokenization-blockchain-assets.jpg"
                alt="Digital asset tokenization"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Orange border effect */}
            <div className="absolute inset-0 hexagon border-4 border-orange-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
