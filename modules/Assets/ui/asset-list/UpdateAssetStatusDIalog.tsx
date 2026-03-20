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
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface UpdateAssetStatusDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  assetId: string | null;
  setAssetId: (assetId: string | null) => void;
  updateStatus: (assetId: string, newStatus: string) => void;
  isLoading: boolean;
  isError?: boolean;
  error?: string;
}

const UpdateAssetStatusDialog: React.FC<UpdateAssetStatusDialogProps> = ({
  open,
  setOpen,
  assetId,
  setAssetId,
  updateStatus,
  isLoading,
  isError,
  error,
}) => {
  const handleOnClose = () => {
    setAssetId(null);
    setOpen(false);
  };
  const handleUpdateStatus = () => {
    if (!assetId) return;
    updateStatus(assetId!, "active");
  };

  return (
    <Dialog open={open} onOpenChange={handleOnClose}>
      <DialogContent>
        {/* 🧊 IDLE (CONFIRMATION) */}
        {!isLoading && !isError && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Are you sure you want to activate this asset?
              </DialogTitle>
              <DialogDescription>
                This will change status to Asset to{" "}
                <span className="font-semibold">Active</span>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleUpdateStatus}>Confirm</Button>
              <Button variant="outline" onClick={handleOnClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}

        {isLoading && (
          <>
            <LoadingSpinner />
          </>
        )}

        {/* 💥 ERROR */}
        {!isLoading && isError && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-red-600">
                Activation Failed
              </DialogTitle>
              <DialogDescription className="text-red-500">
                Something broke. Try again.
                <span className="font-normal">{error}</span>.
              </DialogDescription>
            </DialogHeader>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssetStatusDialog;
