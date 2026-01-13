"use client"

import { Shield, Users, Lock, DollarSign, TrendingUp, Share2 } from "lucide-react"

export default function AuthPromoSidebar() {
  const features = [
    {
      icon: Shield,
      text: "Blockchain backed",
      bgColor: "bg-gradient-to-br from-[#FF6B00] to-[#FF8A33]"
    },
    {
      icon: Users,
      text: "Buy and sell tokens",
      bgColor: "bg-gradient-to-br from-[#FF8A33] to-[#FFB366]"
    },
    {
      icon: Lock,
      text: "Full transparency",
      bgColor: "bg-gray-800"
    },
    {
      icon: DollarSign,
      text: "Starting from AED 2,000",
      bgColor: "bg-gradient-to-br from-[#FF8A33] to-[#FFB366]"
    },
    {
      icon: TrendingUp,
      text: "8-12% net annual ROI*",
      bgColor: "bg-gradient-to-br from-[#FF6B00] to-[#FF8A33]"
    },
    {
      icon: Share2,
      text: "Fractional ownership",
      bgColor: "bg-gray-800"
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-8">
      {/* Animated Background - Same as Hero Section */}
      <div className="absolute inset-0 z-0">
     
      </div>

      <div className="relative z-10 max-w-md">
        {/* Main Heading */}
        <h1 className="text-5xl font-bold mb-12 leading-tight text-gray-900">
          World's real estate,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A33]">tokenised</span>
        </h1>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`${feature.bgColor} rounded-2xl p-4 flex flex-col items-center justify-center min-h-[100px] transform hover:scale-105 transition-transform`}
              >
                <Icon className="text-white mb-2" size={24} />
                <p className="text-white text-xs font-medium text-center">
                  {feature.text}
                </p>
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-gray-600 text-xs leading-relaxed">
          *Net annual ROI = The returns are projections and not indicative of any future, past, or guaranteed performance.
        </p>
      </div>
    </div>
  )
}
