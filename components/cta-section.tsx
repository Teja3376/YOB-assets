import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Tokenize Your Assets?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of asset owners who have already unlocked liquidity through tokenization
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all">
            Start Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
