"use client"

import { FileText, Search, Coins, TrendingUp } from "lucide-react"

const ProcessCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative w-32 h-32 hexagon border-3 border-orange-400 flex items-center justify-center mb-6 bg-orange-50">
      <Icon size={48} className="text-orange-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

export default function ProcessSection() {
  const steps = [
    {
      icon: FileText,
      title: "Submit Asset",
      description: "Upload your asset details and documentation",
    },
    {
      icon: Search,
      title: "Verification",
      description: "We verify and evaluate your asset",
    },
    {
      icon: Coins,
      title: "Tokenization",
      description: "Create digital tokens on blockchain",
    },
    {
      icon: TrendingUp,
      title: "Trading",
      description: "Sell your tokens to the market",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">How Tokenization Works</h2>
          <p className="text-xl text-gray-600">Transform your assets into digital tokens in four simple steps</p>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
