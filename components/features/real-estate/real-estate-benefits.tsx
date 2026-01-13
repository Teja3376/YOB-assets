"use client"

import { Key, TrendingUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function RealEstateBenefits() {
  const ownerBenefits = [
    { title: "Unlock Liquidity", description: "Access capital without selling your entire property" },
    { title: "Retain Control", description: "Keep managing your property while raising funds" },
    { title: "Global Investor Pool", description: "Access investors worldwide through blockchain" },
    { title: "Reduced Costs", description: "Lower transaction fees compared to traditional methods" },
    { title: "Faster Transactions", description: "Complete funding in weeks instead of months" }
  ]

  const investorBenefits = [
    { title: "Low Entry Barrier", description: "Invest in premium properties from just $100" },
    { title: "Portfolio Diversification", description: "Spread investments across multiple properties" },
    { title: "Passive Income", description: "Earn rental income proportional to token holdings" },
    { title: "24/7 Liquidity", description: "Trade tokens anytime on secondary markets" },
    { title: "Transparency", description: "All transactions recorded on blockchain" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Benefits of Real Estate Tokenization
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advantages for property owners and investors
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Property Owners */}
          <Card className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border-0 shadow-lg">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Key className="text-[#FF6B00] mr-3" size={24} />
                For Property Owners
              </h3>
              <div className="space-y-4">
                {ownerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* For Investors */}
          <Card className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 border-0 shadow-lg">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="text-[#FF6B00] mr-3" size={24} />
                For Investors
              </h3>
              <div className="space-y-4">
                {investorBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
