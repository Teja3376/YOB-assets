"use client";

import { useState } from "react";
import { Copy, Download, Upload, Check } from "lucide-react";
import { toast } from "sonner";
import WithdrawDialogBox from "./WithdrawDialogBox";
import DepositDialogBox from "./DepositDialogBox";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatWalletAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BalanceCard({ walletData, isLoading, userId }: any) {
  const [copied, setCopied] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  console.log("walletData?.userId", userId);

  const walletAddress = walletData?.yob_pay_wallet_address;
  const balance = walletData?.yob_pay_wallet_balance;
  const tokenName = walletData?.yob_pay_token_id;
  const portfolioValue = walletData?.totalPortfolioValue;

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success("Wallet address copied!");

    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-orange-100 p-6 md:p-8 text-white border-primary/40 border-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-black">
              Available Balance
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                {balance?.toFixed(2)}
              </span>

              <span className="text-lg md:text-xl font-medium text-primary">
                {tokenName || "USD"}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 rounded-full border-primary border px-2 py-1 bg-white/80">
              <span className="font-mono text-xs text-black font">
                Wallet Address:{" "}
                <span className="font-medium ml-1">
                  {formatWalletAddress(walletAddress || "")}
                </span>
              </span>

              <button
                onClick={handleCopy}
                className="rounded  transition-colors bg-transparent hover:bg-white/10 cursor-pointer"
              >
                {copied ? (
                  <Check size={15} className=" text-primary" />
                ) : (
                  <Copy size={15} className=" text-primary" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setDepositOpen(true)}
              className="flex items-center gap-2 rounded-lg  px-5 py-2.5 text-sm font-semibold  shadow-sm transition-colors "
            >
              <Download className="h-4 w-4" />
              Deposit
            </Button>

            <Button
              onClick={() => setWithdrawOpen(true)}
              className="flex items-center gap-2 rounded-lg  px-5 py-2.5 text-sm font-semibold  shadow-sm transition-colors "
            >
              <Upload className="h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <DepositDialogBox
        open={depositOpen}
        onOpenChange={setDepositOpen}
        walletAddress={walletAddress || ""}
      />
      <WithdrawDialogBox open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </>
  );
}
