"use client"

import { ArrowRight } from "lucide-react"

export default function RealEstateTypes() {
    const types = [
        {
            title: "Commercial Properties",
            items: [
                "Office Buildings",
                "Shopping Centers",
                "Hotels & Resorts",
                "Warehouses",
                "Industrial Facilities"
            ]
        },
        {
            title: "Residential Properties",
            items: [
                "Apartment Buildings",
                "Single-Family Homes",
                "Condominiums",
                "Vacation Rentals",
                "Student Housing"
            ]
        },
        {
            title: "Development & Land",
            items: [
                "Raw Land",
                "Development Projects",
                "Agricultural Land",
                "Mixed-Use Developments",
                "Infrastructure Projects"
            ]
        }
    ]

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Types of Real Estate We Tokenize
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From commercial buildings to residential properties, we support all types of real estate assets
                    </p>
                </div>

                {/* Types Hexagons */}
                <div className="types-hexagons-container">
                    {types.map((type, index) => (
                        <div key={index} className="types-hexagon flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">{type.title}</h3>
                            <ul className="flex flex-col gap-1 text-sm justify-left items-start">
                                {type.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <ArrowRight className="inline text-[#FF8A33] mr-2" size={12} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
