import Link from "next/link"

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-badge">Get Started</div>
          <h2 className="cta-title">
            Tokenize Your Assets Now
          </h2>
          <p className="cta-description">
            Start free today or book a demo to see how YOB Assets transforms your financial operations.
          </p>
          <div className="cta-button-group">
            <Link href="/apply" className="cta-primary-button">
              Get Started Now
            </Link>
          </div>
        </div>
        {/* <div className="cta-decorative-elements">
          <div className="cta-circle"></div>
          <div className="cta-circle"></div>
          <div className="cta-circle"></div>
        </div> */}
      </div>
    </section>
  )
}
