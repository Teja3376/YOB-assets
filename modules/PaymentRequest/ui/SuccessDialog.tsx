"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onDone?: () => void;
};

export function PaymentSuccessDialog({
  open,
  onOpenChange,
  amount,
  onDone,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl text-center p-6">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="text-green-500" size={60} />

          <h2 className="text-lg font-semibold">Payment Successful</h2>

          <p className="text-sm text-muted-foreground">
            ₹{amount.toLocaleString("en-IN")} has been successfully paid.
          </p>

          <Button
            className="mt-2 bg-green-500 hover:bg-green-600 text-white"
            onClick={onDone}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
