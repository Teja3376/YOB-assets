"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

type FailedDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PaymentFailedDialog({
  open,
  onOpenChange,
}: FailedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl text-center p-6">
        
        <div className="flex flex-col items-center gap-4">
          <XCircle className="text-red-500" size={60} />

          <h2 className="text-lg font-semibold">
            Payment Failed
          </h2>

          <p className="text-sm text-muted-foreground">
            The payment was not completed. Please try again.
          </p>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}