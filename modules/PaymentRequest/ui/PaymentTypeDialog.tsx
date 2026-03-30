"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { CreditCard, Landmark } from "lucide-react";
import qrCode from "../../../public/png/assets/qr.png";

type PaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  price: number;
  onPay?: () => void;
  onCancel: () => void;
};

export function PaymentDialog({
  open,
  onOpenChange,
  id,
  price,
  onPay,
  onCancel,
}: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="text-orange-500 font-bold">YOB</span>
            Pay {formatCurrencyWithLocale(price)}
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="px-5 shadow-xs">
          <div className="p-3 space-y-5 border rounded-lg">
            {/* UPI Option */}
            <RadioGroup defaultValue="upi">
              <div className="flex items-center gap-2 ">
                <RadioGroupItem
                  className=" h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-300 data-[state=checked]:border-6 data-[state=checked]:border-orange-500 flex items-center justify-center data-[state=checked]:bg-white  [&>span]:hidden cursor-pointer"
                  value="upi"
                  id="upi"
                />
                <Label htmlFor="upi" className="text-md">
                  UPI (GPay, PhonePe, Paytm, etc.)
                </Label>
              </div>

              {/* QR */}
              <div className="mt-4  rounded-lg p-4 flex flex-col items-center">
                <Image src={qrCode??""} alt="QR Code" width={180} height={180} />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Scan this QR code with any UPI app to pay
                </p>
              </div>
              <hr />

              {/* Other Options */}
              <div className="space-y-5 my-2">
                <div className="flex items-center justify-between  rounded-md">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      className=" h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-300 data-[state=checked]:border-6 data-[state=checked]:border-orange-500 flex items-center justify-center data-[state=checked]:bg-white  [&>span]:hidden cursor-pointer"
                      value="netbanking"
                      id="netbanking"
                    />
                    <Label htmlFor="netbanking" className="text-md">
                      Net Banking
                    </Label>
                  </div>
                  <Landmark className="text-muted-foreground" />
                </div>
                <hr />

                <div className="flex items-center justify-between  rounded-md">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      className=" h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-300 data-[state=checked]:border-6 data-[state=checked]:border-orange-500 flex items-center justify-center data-[state=checked]:bg-white  [&>span]:hidden cursor-pointer"
                      value="card"
                      id="card"
                    />
                    <Label htmlFor="card" className="text-md">
                      Credit / Debit Card
                    </Label>
                  </div>
                  <CreditCard className="text-muted-foreground" />
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={onPay}
          >
            Proceed to Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
