"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RealEstateCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Tokenize Your Property?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join the future of real estate investment with YOB Assets
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="px-8 py-8 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Start Tokenization Process
          </Button>
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-8 bg-transparent text-gray-700 border-2 border-gray-300 rounded-full font-semibold text-lg hover:bg-gray-100 hover:text-[#FF6B00] transition-all"
          >
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
