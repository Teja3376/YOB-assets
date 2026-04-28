"use client"

import { useState } from "react"
import { Copy, Check, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import Image from "next/image"
import { toast } from "sonner"


function TokenIcon({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={20}
      height={20}
      className="inline-block mx-1 align-middle"
    />
  )
}



export default function DepositDialogBox({
   walletAddress,
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletAddress: string
}) {
  const [copied, setCopied] = useState(false)


  const handleCopy = async () => {
  await navigator.clipboard.writeText(walletAddress)

  setCopied(true)

  toast.success("Wallet address copied")

  setTimeout(() => setCopied(false), 2000)
}


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Deposit Funds</DialogTitle>
          <DialogDescription>
            Scan the QR code or copy the address below
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Warning alerts */}
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                Make sure to select the
                <TokenIcon src="/polygon.png" alt="Polygon" />

                Polygon Network in your external wallet (MetaMask, Trust Wallet, etc.) before sending funds.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                  Only deposit
                 <TokenIcon src="/polygon.png" alt="POL" />
                POL,
                <TokenIcon src="/usdt.png" alt="USDT" />
                USDT,
                <TokenIcon src="/usdc.png" alt="USDC" />
                USDC on the Polygon Network.
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 p-6">
            <QRCode
              value={walletAddress}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
            </div>
          </div>

          {/* Wallet Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground">Wallet Address</label>
            <div className="flex items-center gap-2 rounded-lg border bg-card p-3">
              <span className="flex-1 truncate font-mono text-sm text-foreground">
                {walletAddress}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Copy wallet address"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
