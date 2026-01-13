"use client"

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-subtitle">About</div>
          <h3 className="about-title">
            YOB Assets makes asset tokenization easy and compliant. From issuance, to orchestration and asset lifecycle management. It is the plug-and-play infrastructure needed.
          </h3>

          <div className="about-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="about-card">
                <div className="about-card-gradient"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
