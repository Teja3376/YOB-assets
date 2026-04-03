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
  ChevronRight,
  Sidebar,
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
  { name: "Services", href: "/payment-requests", icon: Banknote },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-200 ease-out ${
        collapsed ? "w-11" : "w-56"
      }`}
    >
      {!collapsed && (
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menu.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={isDisabled ? "#" : item.href}
                onClick={(e) => handleLinkClick(e, isDisabled)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition
                  ${isDisabled
                    ? "pointer-events-none cursor-not-allowed opacity-50"
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
      )}
      {collapsed && <div className="min-h-0 flex-1" aria-hidden />}

      <div className="mt-auto border-t border-gray-200">
        <div className={collapsed ? "p-2" : "p-4"}>
          {!collapsed && (
            <>
              <button
                type="button"
                onClick={handleLogoutClick}
                disabled={isDisabled}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-sm transition
                  ${isDisabled
                    ? "cursor-not-allowed text-gray-400 opacity-50"
                    : "text-red-600 hover:bg-red-50"
                  }`}
                aria-disabled={isDisabled}
              >
                <LogOut size={18} />
                Logout
              </button>

              <button
                type="button"
                onClick={() => setCollapsed(true)}
                disabled={isDisabled}
                className={`mt-2 flex w-full cursor-pointer  gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
                  ${
                    isDisabled
                      ? "cursor-not-allowed text-gray-400 opacity-50"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <Sidebar size={18} strokeWidth={2} />
                Collapse
              </button>
            </>
          )}
          {collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="flex w-full cursor-pointer items-center justify-center rounded-lg py-2 text-gray-800 transition hover:bg-gray-100"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
