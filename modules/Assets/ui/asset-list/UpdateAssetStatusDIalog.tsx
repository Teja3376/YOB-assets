// Extracted UpdateAssetStatusDialog component
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpdateAssetStatusDialogProps {
  asset: any;
  setAsset: (asset: any) => void;
  updateStatus: (newStatus: "active" | "waitlist" | "") => Promise<void>;
  status: string;
  setStatusUpdate: any;
  newStatus: "active" | "waitlist" | "";
}

const UpdateAssetStatusDialog: React.FC<UpdateAssetStatusDialogProps> = ({
  asset,
  setAsset,
  updateStatus,
  status,
  setStatusUpdate,
  newStatus,
}) => {
  const isStatusOpen = !!asset;

  const handleOnClose = () => {
    setAsset(null);
    setStatusUpdate("idle");
  };

  const isIncomplete = asset && asset?.completedStepsCount !== 9;


  return (
    <Dialog open={isStatusOpen} onOpenChange={handleOnClose}>
      <DialogContent>
        {isIncomplete && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Incomplete Asset Setup</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Please wait while we update the asset status. This may take a
                few moments.
              </DialogDescription>
            </DialogHeader>
          </>
        )}
        {status === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Asset Status Updated Successfully
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                The asset status has been updated successfully.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleOnClose}>Close</Button>
            </DialogFooter>
          </>
        )}
        {status === "error" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-red-600">
                Error Updating Asset Status
              </DialogTitle>
              <DialogDescription className="text-sm text-red-500">
                There was an error updating the asset status. Please try again.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleOnClose}>Close</Button>
            </DialogFooter>
          </>
        )}
        {status === "idle" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Do you want to update the Asset status?
              </DialogTitle>
              <DialogDescription>
                We will update the Asset status to{" "}
                {/* {asset?.status === "active" ? "Inactive" : "Active"}. */}
                {newStatus === "active"
                  ? "Active"
                  : newStatus === "waitlist"
                  ? "Waitlist"
                  : "Draft"}
                .
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={() => updateStatus(newStatus)}>
                Confirm
              </Button>
              <Button type="button" variant="outline" onClick={handleOnClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssetStatusDialog;
