"use client"

export default function PerformanceSection() {
    const stats = [
        {
            value: "$1.2B",
            label: "Tokenization Pipeline"
        },
        {
            value: "$206M",
            label: "Total Tokenized Value"
        },
        {
            value: "12K",
            label: "Verified KYC"
        }
    ]

    return (
        <section className="performance-section">
            <div className="performance-container">
                <div className="performance-stats-list">
                    {stats.map((stat, index) => (
                        <div key={index} className="performance-stat-card">
                            <h2 className="performance-stat-value">{stat.value}</h2>
                            <div className="performance-stat-detail">
                                <div className="performance-stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
