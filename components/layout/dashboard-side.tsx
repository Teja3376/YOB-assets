"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Home,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "SPV List", href: "/spv", icon: Building2, },
  { name: "Assets", href: "/assets", icon: Package, },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Investors", href: "/investors", icon: Users },
  { name: "Payment Requests", href: "/payment-requests", icon: Banknote },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, disabled: boolean) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleLogoutClick = () => {
      router.push("/");
    // Add your logout logic here
  };

  return (
    <aside className="w-56 bg-white border-r flex flex-col">
      {/* Header */}
    

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={isDisabled ? "#" : item.href}
              onClick={(e) => handleLinkClick(e, isDisabled)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : active
                    ? "bg-gray-100 text-black"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              aria-disabled={isDisabled}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <button
          onClick={handleLogoutClick}
          disabled={isDisabled}
          className={`flex w-full items-center gap-3 px-4 cursor-pointer py-2 rounded-lg text-sm transition
            ${
              isDisabled
                ? "opacity-50 cursor-not-allowed text-gray-400"
                : "text-red-600 hover:bg-red-50"
            }`}
          aria-disabled={isDisabled}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
