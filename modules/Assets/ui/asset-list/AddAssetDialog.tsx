// Extracted AddAssetDialog component
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AssetClass from "@/modules/Assets/ui/add-asset/AssetClass";

interface AddAssetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddAssetDialog: React.FC<AddAssetDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-225 max-w-4xl scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            What type of asset class do you want to distribute?
          </DialogTitle>
          <DialogDescription>
            We'll help you get set up based on your requirements.
          </DialogDescription>
        </DialogHeader>
        <AssetClass setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetDialog;