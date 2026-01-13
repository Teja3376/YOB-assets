"use client"

import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "YOB Assets took great care of understanding our various use cases and then assist us in the deployment of our marketplace with now over $500m of tokenized commodities and equity.",
      author: "Naeem Ahmed",
      role: "CTO at Vanar"
    },
    {
      quote: "YOB Assets is the default tech partner we recommend and use to manage the financial tokenization of Real Estate. Brilliant UX.",
      author: "Matthieu Merchadou",
      role: "CEO at Magma Real Estate"
    },
    {
      quote: "We tokenized a $210m renovation plan in Chicago. A first-of-a-kind collaboration handled perfectly by YOB Assets.",
      author: "Mohammed Marikar",
      role: "CEO at Neem Capital"
    },
    {
      quote: "We use YOB Assets' infrastructure for our art tokenization platform. Their API is well thought, documented and easy to integrate.",
      author: "Nick van Dijk",
      role: "CEO at Arkefi"
    }
  ]

  // Create blocks of testimonials (4 per block) and duplicate for infinite scroll
  const testimonialBlocks = [
    testimonials,
    testimonials,
    testimonials
  ]

  return (
    <section className="testimonial-section">
      <div className="testimonial-wrapper">
        <div className="testimonial-container">
          <div className="testimonial-top">
            <div className="testimonial-subtitle-block">
              <div className="testimonial-typography-title">Testimonial</div>
            </div>
            <h2 className="testimonial-heading-h2">Loved by Teams Worldwide</h2>
            <p className="testimonial-center-align testimonial-para">
              Hear about YOB Assets from the ones who use it.
            </p>
          </div>
        </div>
        <div className="testimonial-items-wrap">
          <div className="testimonial-items-top">
            {testimonialBlocks.map((block, blockIndex) => (
              <div key={blockIndex} className="testimonial-items-block testimonial-top-block">
                {block.map((testimonial, index) => (
                  <div key={index} className="testimonial-item-card">
                    <div className="testimonial-item-detail">
                      <Image
                        src="/quotes.png"
                        alt="Quote Icon"
                        width={32}
                        height={32}
                        className="testimonial-quote-icon"
                      />
                      <p className="testimonial-large-paragraph testimonial-desp">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                    <div className="testimonial-author-detail">
                      <div className="testimonial-author-flex">
                        <div className="testimonial-author-name">{testimonial.author}</div>
                        <div className="testimonial-author-designation">{testimonial.role}</div>
                      </div>
                      <div className="testimonial-author-icon">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
