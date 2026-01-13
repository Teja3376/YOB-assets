"use client"

import { Home, Building2, Palette, Lightbulb, Gem, Truck } from "lucide-react"
import Link from "next/link"

export default function AssetCategoriesSection() {
  const categories = [
    { icon: Home, title: "Real Estate", description: "Properties & Land", link: "/real-estate" },
    { icon: Building2, title: "Company Equity", description: "Shares & Ownership", link: "/equity" },
    { icon: Palette, title: "Art & Collectibles", description: "Artworks & Antiques", link: "/art" },
    { icon: Gem, title: "Commodities", description: "Gold, Silver & More", link: "/commodities" },
    { icon: Lightbulb, title: "Intellectual Property", description: "Patents & Copyrights", link: "/intellectual-property" },
    { icon: Truck, title: "Vehicles", description: "Cars & Equipment", link: "/vehicles" },
  ]

  return (
    <section id="tokenization" className="py-32 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="text-[#FF6B00] font-medium text-sm">Asset Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Can You Tokenize?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From traditional securities to unique collectibles, we support a wide range of real-world assets
          </p>
        </div>

        {/* Hexagon Asset Cards */}
        <div className="hexagon-container">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={index} href={category.link} className="hexagon-card assets-hexagon">
                <div className="hexagon-content flex flex-col items-center justify-center">
                  <IconComponent size={48} className="asset-icon" />
                  <h3 className="hexagon-title">{category.title}</h3>
                  <p className="hexagon-description">{category.description}</p>
                  <span className="hexagon-cta">Learn More</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
