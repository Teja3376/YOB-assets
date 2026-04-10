import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "@/components/ui/Loading";

// ✅ Schema
const sendAssetSchema = z.object({
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(500, "Message too long"),
});

type SendAssetFormValues = z.infer<typeof sendAssetSchema>;

interface SendAssetDialogProps {
  open: boolean;
  onClose: () => void;
  assetName?: string;
  assetId?: string;
  isSending?: boolean;
  onSend: (assetId?: string, message?: string) => void;
  title?: string;
  description?: string;
  note?: string;
}

const SendAssetApprovalDialog = ({
  open,
  onClose,
  assetName,
  assetId,
  isSending = false,
  onSend,
  title = "Send Asset to Super Admin",
  description = "This will notify the super admin to review this Asset",
  note = "Note: Once sent, Admin will be notified and can request changes before the asset goes live.",
}: SendAssetDialogProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendAssetFormValues>({
    resolver: zodResolver(sendAssetSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: SendAssetFormValues) => {
    onSend(assetId, data.message);
    reset(); // clear after send
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          reset(); // reset when closing
          onClose();
        }
      }}
    >
      <DialogContent>
        {isSending&&<Loading/>}
       { !isSending&&<div>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {assetName ? ` (${assetName})` : ""}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-gray-600">{note}</p>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          
          <Textarea
            placeholder="Enter the message"
            {...register("message")}
          />

          {/* ❌ Error */}
          {errors.message && (
            <p className="text-sm text-red-500">
              {errors.message.message}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>

            <Button type="submit" disabled={isSending}>
              { "Send"}
            </Button>
          </DialogFooter>
        </form>
        </div>}
        {/* ✅ FORM END */}
      </DialogContent>
    </Dialog>
  );
};

export default SendAssetApprovalDialog;