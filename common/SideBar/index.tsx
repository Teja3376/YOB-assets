"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Settings,
  Users2Icon,
  UserCogIcon,
  FileChartColumnIncreasing,
  Package,
  ClipboardList,
  Wallet,
  LogOut,
  ChevronRight,
  Layout,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isCollapsed?: boolean;
  asButton?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  href = "#",
  isCollapsed,
  asButton = false,
  onClick,
  disabled = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const disabledClasses =
    "opacity-50 bg-inherit cursor-not-allowed pointer-events-none";

  // -----------------------------
  // BUTTON MODE
  // -----------------------------
  if (asButton) {
    return (
      <button
        type="button"
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        title={isCollapsed ? label : undefined}
        className={clsx(
          "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          isCollapsed && "justify-center",
          disabled && disabledClasses
        )}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </button>
    );
  }

  // -----------------------------
  // LINK MODE
  // -----------------------------
  return (
    <Link
      href={disabled ? "#" : href}
      onClick={(e) => disabled && e.preventDefault()}
      title={isCollapsed ? label : undefined}
      className={clsx(
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
        isActive
          ? "bg-gray-200 text-gray-900"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        isCollapsed && "justify-center",
        disabled && disabledClasses
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default function index() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleLogoutConfirm = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLogoutDialogOpen(false);
      router.push("/sign-in");
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300 h-full",
        isCollapsed ? "w-16" : "w-52"
      )}
    >
      {/* MAIN NAV */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        <NavItem
          icon={<Building2 className="w-5 h-5" />}
          label="SPV's"
          href="/spv"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Package className="w-5 h-5" />}
          label="Assets"
          href="/assets-list"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<ClipboardList className="w-5 h-5" />}
          label="Orders"
          href="/orders"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Users2Icon className="w-5 h-5" />}
          label="Investors"
          href="/customers"
          isCollapsed={isCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-200 px-2 py-4 space-y-1">
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogTrigger asChild className="w-full">
            <div className="w-full">
              <NavItem
                asButton
                onClick={() => setLogoutDialogOpen(true)}
                icon={<LogOut className="w-5 h-5" />}
                label="Logout"
                isCollapsed={isCollapsed}
              />
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout? Your session will end and
                you’ll need to log in again.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleLogoutConfirm}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 w-full flex px-2"
          type="button"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 mx-auto" />
          ) : (
            <div className="flex gap-2 items-center">
              <Layout className="w-5 h-5" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
