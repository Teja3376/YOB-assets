"use client"

import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/yob-assets-logo.png"
                  alt="YOB Assets Logo"
                  width={64}
                  height={64}
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming real assets into digital opportunities through secure blockchain tokenization.
            </p>
            <div className="flex space-x-4">
                <a
                  href="https://instagram.com/yobassets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF8A33] transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/yobassets/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF8A33] transition-colors"
                >
                  <Linkedin size={20} />
                </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Assets */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tokenizable Assets</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/real-estate" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/equity" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Company Equity
                </Link>
              </li>
              <li>
                <Link href="/art" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Art & Collectibles
                </Link>
              </li>
              <li>
                <Link href="/commodities" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Commodities
                </Link>
              </li>
              <li>
                <Link href="/intellectual-property" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                  Vehicles & Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:info@yobassets.com" className="hover:text-[#FF8A33] transition-colors">
                  info@yobassets.com
                </a>
              </li>
              <li className="text-gray-400 mt-4">
                <p className="text-sm leading-relaxed">
                  Transforming illiquid assets into tradeable digital tokens through blockchain technology.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 YOB Assets. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#FF8A33] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
