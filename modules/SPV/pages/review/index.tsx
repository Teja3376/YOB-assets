"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Send } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SpvAssetReview from "@/modules/SPV/ui/overview/SpvAssetReview";
import useGetSpvWithId from "@/modules/SPV/hooks/ReactQuery/useGetSpvWithId";
import normalizedSpv from "@/modules/SPV/utils/normalizedspv";
import useSendStatus from "@/modules/SPV/hooks/useSendStatus";
import { fireSuccessConfetti } from "@/lib/confetti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

const SpvReviewPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { spvId } = useParams<{ spvId: string }>();
  const [approvalOpen, setApprovalOpen] = useState(false);

  const { data, isFetching, isError } = useGetSpvWithId(spvId as string);
  const { mutate: sendStatus, isPending: isSendingStatus } = useSendStatus();

  const normalized = normalizedSpv(data);
  const spvName =
    typeof normalized.name === "string" ? normalized.name : undefined;
  const isDraft = data?.status === "Draft";

  const handleSendForApproval = () => {
    if (!spvId) return;
    sendStatus(
      { spvId: spvId as string, status: "Pending" },
      {
        onSuccess: () => {
          fireSuccessConfetti();
          setApprovalOpen(false);
          queryClient.invalidateQueries({ queryKey: ["spv", spvId] });
          queryClient.invalidateQueries({ queryKey: ["spv"] });
        },
      },
    );
  };

  if (!spvId) {
    return <p className="p-6 text-gray-600">Missing SPV id.</p>;
  }

  if (isFetching) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return (
      <div className="mt-5">
        <p className="text-sm text-red-600">Could not load this SPV.</p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/spv")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to SPV list
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground max-w-2xl">
          Same tabs as the rest of this SPV — switch to Overview, Investors, or
          Documents anytime. Edit onboarding fields from the wizard when you
          need changes.
        </p>
        <div className="flex flex-wrap gap-2">
          {isDraft && (
            <Button
              type="button"
              size="sm"
              onClick={() => setApprovalOpen(true)}
            >
              <Send className="mr-2 h-4 w-4" />
              Send for approval
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(`/spv/edit-spv/${spvId}?step=basic-information`)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit SPV
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <SpvAssetReview
          values={normalized as Record<string, unknown>}
          embedded
        />
      </div>

      <Dialog open={approvalOpen} onOpenChange={setApprovalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SPV to Super Admin</DialogTitle>
            <DialogDescription>
              This will notify the super admin to review this SPV
              {spvName ? ` (${spvName})` : ""} before it goes live.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Note: Once sent, Admin will be notifed and will be able to review
            the SPV before it goes live and if any changes required admin send u
            request for changes you need to make changes and submit again .
          </p>
          <Textarea placeholder="Enter the message" />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setApprovalOpen(false)}>
              Close
            </Button>
            <Button
              onClick={handleSendForApproval}
              disabled={isSendingStatus}
            >
              {isSendingStatus ? <Spinner /> : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpvReviewPage;
