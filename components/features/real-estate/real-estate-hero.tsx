"use client"

import { Building2, TrendingUp } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RealEstateHero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 opacity-60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="inline-flex items-center px-4 py-2 bg-orange-100 text-[#FF6B00] font-medium text-sm rounded-full mb-6 border-0">
              <Building2 className="mr-2" size={16} />
              Real Estate Tokenization
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A33]">Property</span> into Digital Assets
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Unlock liquidity from commercial buildings, residential properties, land parcels, and development projects through blockchain tokenization. Enable fractional ownership and global investment opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="px-8 py-6 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Tokenize Your Property
              </Button>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <div className="hexagon-image-wrapper">
                <Image
                  src="/3d-digital-tokenization-blockchain-assets.jpg"
                  alt="Modern Real Estate"
                  width={600}
                  height={450}
                  className="hexagon-image"
                  quality={90}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF8A33] to-[#FF6B00] rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">$2.5T</div>
                    <div className="text-sm text-gray-600">Market Opportunity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
