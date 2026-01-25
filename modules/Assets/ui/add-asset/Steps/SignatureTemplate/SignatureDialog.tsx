import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormGenerator from "@/components/use-form/FormGenerator";
import { signatureTemplateFormConfig } from "@/modules/Assets/form-config/SignatureTemplate/signatureTemplateFormConfig";
interface SignatureDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  initialValues?: any; // Optional initial values for the form
}

const SignatureDialog: React.FC<SignatureDialogProps> = ({
  isOpen,
  isEdit,
  index,
  onClose,
  onSubmit,
  isLoading,
  initialValues = [], // Default to an empty object if no initial values are provided
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit" : "Add"} Document Template For Signature{" "}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {FormGenerator(signatureTemplateFormConfig(initialValues))}
          <DialogFooter className="flex justify-end w-full mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="button" onClick={onSubmit}>
              {!isLoading ? "Submit" : "Submitting..."}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureDialog;
