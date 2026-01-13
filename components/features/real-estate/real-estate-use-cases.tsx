"use client"

export default function RealEstateUseCases() {
  const useCases = [
    {
      title: "Commercial Building Refinancing",
      description: "Office building owner tokenizes 30% of property to raise capital for renovations while maintaining management control.",
      outcome: "Faster capital raising"
    },
    {
      title: "Hotel Portfolio Expansion",
      description: "Hotel chain tokenizes existing properties to fund acquisition of new locations without traditional debt.",
      outcome: "Portfolio expansion"
    },
    {
      title: "Residential Development Funding",
      description: "Developer tokenizes future apartment complex to secure construction financing from global investors.",
      outcome: "Pre-construction funding"
    },
    {
      title: "Industrial REIT Creation",
      description: "Warehouse portfolio tokenized to create decentralized REIT with automated dividend distribution.",
      outcome: "Global investor access"
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Potential Applications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how tokenization could transform various real estate scenarios
          </p>
        </div>
        
        {/* Hexagon Applications Cards */}
        <div className="hexagon-container">
          {useCases.map((useCase, index) => (
            <div key={index} className="hexagon-card applications-hexagon">
              <div className="hexagon-content">
                <h3 className="hexagon-title">{useCase.title}</h3>
                <p className="hexagon-description">{useCase.description}</p>
                <span className="hexagon-outcome">{useCase.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
