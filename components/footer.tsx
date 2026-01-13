"use client"

import Link from "next/link"
import { Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
              <span className="text-lg font-bold">YOB Assets</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming real assets into digital opportunities through secure blockchain tokenization.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-orange-500 transition">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-orange-500 transition">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Tokenizable Assets */}
          <div>
            <h3 className="font-bold text-lg mb-6">Tokenizable Assets</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Company Equity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Art & Collectibles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Commodities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Vehicles & Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <a
              href="mailto:info@yobassets.com"
              className="text-gray-400 hover:text-white transition flex items-center gap-2 mb-4"
            >
              <span>📧</span> info@yobassets.com
            </a>
            <p className="text-gray-400">
              Transforming illiquid assets into tradeable digital tokens through blockchain technology.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 YOB Assets. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
