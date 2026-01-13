"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
            <span className="text-lg font-bold text-gray-900">YOB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 transition">
              About
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                Assets
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 first:rounded-t-lg">
                  Real Estate
                </Link>
                <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  Company Equity
                </Link>
                <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
                  Art & Collectibles
                </Link>
                <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 last:rounded-b-lg">
                  Commodities
                </Link>
              </div>
            </div>
            <Link href="#" className="text-gray-700 hover:text-gray-900 transition">
              Contact Us
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="/apply"
            className="hidden md:block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors"
          >
            Start Tokenizing
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Home
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              About
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Assets
            </Link>
            <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50">
              Contact Us
            </Link>
            <Link 
              href="/apply"
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 mx-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-full transition text-center block"
            >
              Start Tokenizing
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
