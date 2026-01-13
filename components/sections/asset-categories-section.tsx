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

  // Create blocks of categories (6 per block) and duplicate for infinite scroll
  const categoryBlocks = [
    categories,
    categories,
    categories
  ]

  return (
    <section id="tokenization" className="asset-categories-section">
      <div className="asset-categories-wrapper">
        <div className="asset-categories-container">
          {/* Section Header */}
          <div className="asset-categories-header">
            <div className="asset-categories-subtitle-block">
              <div className="asset-categories-typography-title">Asset Categories</div>
            </div>
            <h2 className="asset-categories-heading-h2">
              What Can You Tokenize?
            </h2>
            <p className="asset-categories-center-align">
              From traditional securities to unique collectibles, we support a wide range of real-world assets
            </p>
          </div>
        </div>

        {/* Auto-scrollable Cards with Blocks */}
        <div className="asset-categories-items-wrap">
          <div className="asset-categories-items-top">
            {categoryBlocks.map((block, blockIndex) => (
              <div key={blockIndex} className="asset-categories-items-block asset-categories-top-block">
                {block.map((category, index) => {
                  const IconComponent = category.icon
                  return (
                    <Link key={index} href={category.link} className="asset-categories-item-card">
                      <div className="asset-categories-icon-wrapper">
                        <IconComponent size={40} className="asset-categories-icon" />
                      </div>
                      <h3 className="asset-categories-card-title">{category.title}</h3>
                      <p className="asset-categories-card-description">{category.description}</p>
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
