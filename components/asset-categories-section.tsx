"use client"

import { Home, Building2, Palette, Lightbulb, Gem, Truck } from "lucide-react"

const CategoryHexagon = ({
  icon: Icon,
  title,
  description,
  link,
}: { icon: any; title: string; description: string; link: string }) => (
  <div className="group">
    <div className="hexagon w-64 h-64 mx-auto border-3 border-orange-400 hover:border-orange-500 bg-white flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-105 cursor-pointer">
      <Icon size={56} className="text-orange-500 mb-4" />
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-sm text-center mb-4">{description}</p>
      <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors">
        {link}
      </button>
    </div>
  </div>
)

export default function AssetCategoriesSection() {
  const categories = [
    { icon: Home, title: "Real Estate", description: "Properties & Land", link: "Learn More" },
    { icon: Building2, title: "Company Equity", description: "Shares & Ownership", link: "Learn More" },
    { icon: Palette, title: "Art & Collectibles", description: "Artworks & Antiques", link: "Learn More" },
    { icon: Lightbulb, title: "Intellectual Property", description: "Patents & Copyrights", link: "Learn More" },
    { icon: Gem, title: "Commodities", description: "Gold, Silver & More", link: "Learn More" },
    { icon: Truck, title: "Vehicles", description: "Cars & Equipment", link: "Learn More" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
            Asset Categories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">What Can You Tokenize?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From traditional securities to unique collectibles, we support a wide range of real-world assets
          </p>
        </div>

        {/* Hexagon Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {categories.map((category, index) => (
            <CategoryHexagon key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}
