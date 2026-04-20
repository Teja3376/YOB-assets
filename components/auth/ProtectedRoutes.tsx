"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const LANDING_PATH = "/";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const accessToken = sessionStorage.getItem("accessToken");
    const hasToken = !!accessToken;

    if (!hasToken) {
      router.replace(LANDING_PATH);
      setIsAllowed(false);
      return;
    }

    setIsAllowed(true);
  }, [router, pathname]);

  // Listen for token removal (e.g. logout in another tab or clear)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        router.replace(LANDING_PATH);
        setIsAllowed(false);
      }
    };

    window.addEventListener("auth:token-changed", checkAuth);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") checkAuth();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth:token-changed", checkAuth);
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  // Show nothing (or null) while checking / redirecting to avoid flash of protected content
  if (isAllowed === null || isAllowed === false) {
    return null;
  }

  return <>{children}</>;
}
