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

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

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
  const [message, setMessage] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {assetName ? ` (${assetName})` : ""}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-gray-600">{note}</p>

        <Textarea
          placeholder="Enter the message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          <Button onClick={() => onSend(assetId, message)} disabled={isSending}>
            {isSending ? <Spinner /> : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendAssetApprovalDialog;
