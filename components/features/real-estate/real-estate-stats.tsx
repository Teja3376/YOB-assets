"use client"

export default function RealEstateStats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hexagon Stats Cards */}
        <div className="hexagon-container stats-hexagons">
          {/* Stat 1 */}
          <div className="hexagon-process stats-hex">
            <div className="stats-number">85%</div>
            <h3 className="stats-title">Cost Reduction</h3>
            <p className="stats-desc">vs Traditional Methods</p>
          </div>

          {/* Stat 2 */}
          <div className="hexagon-process stats-hex">
            <div className="stats-number">24/7</div>
            <h3 className="stats-title">Market Access</h3>
            <p className="stats-desc">Global Trading</p>
          </div>
        </div>
      </div>
    </section>
  )
}
