"use client";
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
import { Loader2 } from "lucide-react";

interface SPVStatusDialogProps {
  isOpen: boolean;
  spv: any;
  onClose: () => void;
  onConfirm: () => void;
  status: string;
}

const SPVStatusDialog: React.FC<SPVStatusDialogProps> = ({
  isOpen,
  spv,
  onClose,
  onConfirm,
  status,
}) => {
  const isIncomplete =
    spv && spv?.completedStepsCount !== 6 && spv?.status !== "active";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {isIncomplete && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Incomplete SPV Setup
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                This SPV (<strong>{spv?.name}</strong>) has only completed{" "}
                <strong>{spv?.completedStepsCount || 0}</strong> of 6 setup
                steps. <br />
                Please complete all required steps before activating it.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}

        
        {status === "loading" && !isIncomplete && (
          <>
            <DialogHeader>
              <Loader2 className="w-6 h-6 mx-auto text-gray-500 animate-spin" />
              <DialogTitle className="text-lg font-bold">
                {spv.status === "active" ? "Deactivating" : "Activating"} SPV in
                Progress
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Please wait while we{" "}
                {spv.status === "active" ? "deactivate" : "activate"}
                the SPV. This process may take a few moments.
              </DialogDescription>
            </DialogHeader>
          </>
        )}
        {status === "success" && !isIncomplete && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                SPV Created Successfully
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                The SPV has been created successfully on the XDC blockchain
                network.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}

        {status === "error" && !isIncomplete && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-red-600">
                Error Creating SPV
              </DialogTitle>
              <DialogDescription className="text-sm text-red-500">
                There was an error creating the SPV on the XDC blockchain
                network. Please try again later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}

        {status === "idle" && !isIncomplete && (
          <>
            {spv?.status === "active" ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">
                    Confirm SPV De-Activation
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    Are you sure you want to deactivate this SPV on the XDC
                    blockchain network?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Confirm</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">
                    Confirm SPV Activation
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
                    Are you sure you want to activate this SPV?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Confirm</Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SPVStatusDialog;
