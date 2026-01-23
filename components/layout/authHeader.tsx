"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { useRouter } from "next/navigation"

interface HeaderProps {
  hideNavigation?: boolean
}

const ProfilePopover = () => {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    router.push("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} className=" z-10 w-50 mr-2 px-4 py-2 rounded-lg shadow-lg border border-gray-200  bg-white">
        <h1 className="font-semibold mb-2">My Account</h1>
        <hr className="my-1" />
        <div
          className="border-0 shadow-none w-full text-left text-sm cursor-pointer  hover:bg-gray-100 flex items-center gap-2 py-2 px-2"
          onClick={handleLogout}
        >
          <LogOut size={15} />
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
};  

export default function AuthHeader({ hideNavigation = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/yob-assets-logo.png"
              alt="YOB Assets Logo"
              width={80}
              height={80}
              priority
            />
            <span className="hidden sm:block text-lg font-semibold text-gray-900">
              YOB Assets
            </span>
          </Link>

          {/* Center Title */}
          <div className="flex items-center gap-2">

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold">
            Issuer Panel
          </div>
          <ProfilePopover />

          </div>
          

      

          {/* Mobile Menu Button */}
          {!hideNavigation && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!hideNavigation && isOpen && (
        <div className="border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase">
              Issuer Panel
            </div>

          </div>
          <ProfilePopover />
        </div>

      )}
    </nav>
  )
}
