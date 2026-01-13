"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/yob-assets-logo.png" 
                alt="YOB Assets Logo" 
                width={48} 
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="nav-link text-gray-700 hover:text-[#FF6B00] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="nav-link text-gray-700 hover:text-[#FF6B00] font-medium transition-colors">
              About
            </Link>
            <div className="relative group">
              <button className="nav-link text-gray-700 hover:text-[#FF6B00] font-medium transition-colors flex items-center">
                Assets <ChevronDown className="ml-1 text-xs" size={12} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/real-estate" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors">
                  Real Estate
                </Link>
                <Link href="/equity" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors">
                  Company Equity
                </Link>
                <Link href="/art" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors">
                  Art & Collectibles
                </Link>
                <Link href="/commodities" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors">
                  Commodities
                </Link>
                <Link href="/intellectual-property" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors">
                  Intellectual Property
                </Link>
                <Link href="/vehicles" className="block px-4 py-3 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors rounded-b-xl">
                  Vehicles & Equipment
                </Link>
              </div>
            </div>
            <Link href="/contact" className="nav-link text-gray-700 hover:text-[#FF6B00] font-medium transition-colors">
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
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 hover:text-[#FF6B00] font-medium">
              Home
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-[#FF6B00] font-medium">
              About
            </Link>
            <div className="border-t border-gray-200 pt-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">Assets</p>
              <Link href="/real-estate" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Real Estate
              </Link>
              <Link href="/equity" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Company Equity
              </Link>
              <Link href="/art" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Art & Collectibles
              </Link>
              <Link href="/commodities" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Commodities
              </Link>
              <Link href="/intellectual-property" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Intellectual Property
              </Link>
              <Link href="/vehicles" className="block py-2 pl-4 text-gray-700 hover:text-[#FF6B00] font-medium">
                Vehicles & Equipment
              </Link>
            </div>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-[#FF6B00] font-medium">
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
        </div>
      )}
    </nav>
  )
}
