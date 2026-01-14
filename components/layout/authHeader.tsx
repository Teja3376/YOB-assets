"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  hideNavigation?: boolean
}

export default function AuthHeader({ hideNavigation = false }: HeaderProps) {
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

        </div>
      </div>

      {/* Mobile Menu */}
    
    </nav>
  )
}
