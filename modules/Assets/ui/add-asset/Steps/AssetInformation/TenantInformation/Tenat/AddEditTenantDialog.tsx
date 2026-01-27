import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/use-form/FormGenerator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { tenantConfig } from "../../../../../../form-config/AssetInformation/tenant-configs/tenantConfig";
import { leaseDetailsConfig } from "../../../../../../form-config/AssetInformation/tenant-configs/leaseDetailsConfig";
import { securityDetailsConfig } from "../../../../../../form-config/AssetInformation/tenant-configs/securityDetailsConfig";
import { documentConfig } from "../../../../../../form-config/AssetInformation/tenant-configs/documentConfig";

interface AddEditTenantDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index?: number | null;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddEditTenantDialog: React.FC<AddEditTenantDialogProps> = ({
  isOpen,
  isEdit,
  onSubmit,
  onCancel,
  index,
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="w-250 max-w-3xl max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEdit ? "Edit" : "Add"} Tenant
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-xl font-semibold">Tenant Information</h1>
            {FormGenerator(tenantConfig(index ?? -1))}
            <div className="border-b h-2 col-span-2 mt-5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-xl font-semibold col-span-2">Lease Details</h1>
            {FormGenerator(leaseDetailsConfig(index ?? -1))}
            <div className="border-b h-2 col-span-2 mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-xl font-semibold col-span-2">
              Security & Financial
            </h1>
            {FormGenerator(securityDetailsConfig(index ?? -1))}
            <div className="border-b h-2 col-span-2 mt-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h1 className="text-xl font-semibold col-span-2">
              Security & Financial
            </h1>
            {FormGenerator(documentConfig(index ?? -1))}
            <div className="border-b h-2 col-span-2 mt-2" />
          </div>

          <DialogFooter className="flex justify-end w-full mt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={onSubmit} disabled={isLoading}>
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Submitting..."
                : isEdit
                  ? "Update"
                  : "Submit"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTenantDialog;
