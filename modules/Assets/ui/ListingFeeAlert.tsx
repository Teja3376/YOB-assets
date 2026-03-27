"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ListingFeeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fee: number;
  asset?: string;
  onProceed: () => void;
};

export function ListingFeeDialog({
  open,
  onOpenChange,
  fee,
  onProceed,
}: ListingFeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Listing Fee Required
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            To activate{" "}
            <span className="font-medium text-foreground">
              {"this asset"}
            </span>{" "}
            on the Tokera Marketplace, a listing fee of{" "}
            <span className="font-semibold text-foreground">
              ₹{fee.toLocaleString()}
            </span>{" "}
            is required.
          </p>

          <p>
            Please pay the listing fee to proceed and make this asset live.
          </p>

          <div className="flex gap-2 border rounded-lg p-3 bg-muted/40">
            <span className="text-orange-500 font-semibold">Note:</span>
            <p className="text-xs leading-relaxed">
              You will need to pay the required listing fee to proceed with the
              activation. The listing fee helps cover platform maintenance and
              verification costs.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={onProceed}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
          >
            Proceed to Pay ₹{fee.toLocaleString()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}