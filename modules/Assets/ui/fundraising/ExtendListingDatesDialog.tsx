"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateAsset from "@/modules/Assets/hooks/useUpdateAsset";
import { toast } from "sonner";

type AssetShape = Record<string, unknown> & {
  investorRequirementsAndTimeline?: Record<string, unknown>;
};

function toInputDateString(d: Date | undefined): string {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromInputDateString(s: string): Date | undefined {
  if (!s) return undefined;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId: string;
  asset: AssetShape | undefined;
  initialStart: Date | undefined;
  initialEnd: Date | undefined;
  onSuccess: () => void;
};

export default function ExtendListingDatesDialog({
  open,
  onOpenChange,
  assetId,
  asset,
  initialStart,
  initialEnd,
  onSuccess,
}: Props) {
  const { mutate, isPending } = useUpdateAsset();
  const [startStr, setStartStr] = useState("");
  const [endStr, setEndStr] = useState("");

  useEffect(() => {
    if (!open) return;
    setStartStr(toInputDateString(initialStart));
    setEndStr(toInputDateString(initialEnd));
  }, [open, initialStart, initialEnd]);

  const handleSave = () => {
    if (!asset) {
      toast.error("Asset data is still loading. Try again in a moment.");
      return;
    }
    const start = fromInputDateString(startStr);
    const end = fromInputDateString(endStr);
    if (!start || !end) {
      toast.error("Please choose both a listing start and listing end date.");
      return;
    }
    if (end.getTime() < start.getTime()) {
      toast.error("Listing end must be on or after listing start.");
      return;
    }

    const prevTimeline = asset.investorRequirementsAndTimeline || {};
    const assetData = {
      ...asset,
      investorRequirementsAndTimeline: {
        ...prevTimeline,
        distributionStartDate: start,
        distributionEndDate: end,
      },
    };

    mutate(
      { assetId, assetData },
      {
        onSuccess: () => {
          toast.success("Listing dates updated.");
          onSuccess();
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { message?: unknown } } };
          const msg = err?.response?.data?.message;
          toast.error(
            typeof msg === "string"
              ? msg
              : Array.isArray(msg)
                ? msg.join(", ")
                : "Could not update listing dates.",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Extend listing window</DialogTitle>
          <DialogDescription>
            Update listing start and end. Both are saved on the asset using the same
            update endpoint as the asset editor.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="listing-start">Listing start date</Label>
            <Input
              id="listing-start"
              type="date"
              value={startStr}
              onChange={(e) => setStartStr(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="listing-end">Listing end date</Label>
            <Input
              id="listing-end"
              type="date"
              value={endStr}
              min={startStr || undefined}
              onChange={(e) => setEndStr(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" disabled={isPending} onClick={handleSave}>
            {isPending ? "Saving…" : "Save dates"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
