"use client"
import { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";

const index = () =>{
    const [walletAddress, setWalletAddress] = useState("");
  
    // Load wallet address from localStorage on component mount
    useEffect(() => {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletAddress(storedAddress);
      }
    }, []);
  
    // Logout Handler: Clear Storage and Redirect
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/sign-in"; // Redirect to login page
    };
   const router = useRouter();
    return (
      <header className="flex items-center w-full justify-between p-4  bg-gray-100">
        <div className="cursor-pointer" onClick={() => router.push("/spv")}>
          <Image src="/yob-assets-logo.png" alt="Logo" width={80} height={80} />
        </div>
        <div />
        <div className="flex items-center gap-4">
          {/* <ConnectWallet />/ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <CircleUserRound className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 bg-white shadow-md rounded-md"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }

export default index