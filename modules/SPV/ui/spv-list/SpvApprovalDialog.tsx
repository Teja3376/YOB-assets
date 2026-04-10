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
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Loading from "@/components/ui/Loading";

// ✅ Schema
const sendSpvSchema = z.object({
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(500, "Message too long"),
});

type SendSpvFormValues = z.infer<typeof sendSpvSchema>;

interface SendSpvDialogProps {
  open: boolean;
  onClose: () => void;
  spvName?: string;
  spvId: string;
  isSending?: boolean;
  onSend: (spvId: string, message?: string) => void;
  title?: string;
  description?: string;
  note?: string;
}

const SendSpvDialog = ({
  open,
  onClose,
  spvName,
  spvId,
  isSending = false,
  onSend,
  title = "Send SPV to Super Admin",
  description = "This will notify the super admin to review this SPV",
  note = "Note: Once sent, Admin will be notified and can request changes before it goes live.",
}: SendSpvDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendSpvFormValues>({
    resolver: zodResolver(sendSpvSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: SendSpvFormValues) => {
    onSend(spvId, data.message);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && !isSending) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent>
        {/* 🔥 Overlay Loader */}
        {isSending && <Loading />}

        {/* 🧊 Content (dim when loading) */}
        {!isSending&&<div className={isSending ? "opacity-50 pointer-events-none" : ""}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
              {spvName ? ` (${spvName})` : ""} before it goes live.
            </DialogDescription>
          </DialogHeader>

          <p className="text-sm text-gray-600 my-1">{note}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Textarea
              placeholder="Enter the message"
              {...register("message")}
            />

            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isSending}
              >
                Close
              </Button>

              <Button type="submit" disabled={isSending}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </div>}
      </DialogContent>
    </Dialog>
  );
};

export default SendSpvDialog;
