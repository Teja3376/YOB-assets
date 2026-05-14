"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  open: boolean;
  onClose: () => void;
  proposal: any;
  reviewAction: boolean;
  setReviewAction: (value: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
};

export default function ReviewProposalModal({
  open,
  onClose,
  proposal,
  reviewAction,
  setReviewAction,
  onSubmit,isPending
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="border-b px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Review Proposal
            </DialogTitle>
          </DialogHeader>
        </div>

        {proposal && (
          <div className="px-6 py-5 space-y-6">
            
            {/* Proposal Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {proposal.title}
              </h2>

              <p className="text-sm text-gray-500 mt-3 leading-7">
                {proposal.description}
              </p>
            </div>

            {/* Toggle Card */}
            <div
              className={`rounded-2xl border p-5 transition ${
                reviewAction
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center justify-between">
                
                <div>
                  <Label className="text-base font-semibold text-gray-900">
                    {reviewAction
                      ? "Proposal Approved"
                      : "Proposal Rejected"}
                  </Label>

                  <p className="text-sm text-gray-500 mt-1">
                    Toggle to change review status
                  </p>
                </div>

                <Switch
                  checked={reviewAction}
                  onCheckedChange={setReviewAction}
                />
              </div>
            </div>

            {/* Status Preview */}
            <div className="rounded-xl bg-gray-50 border p-4">
              <p className="text-sm text-gray-500">
                Selected Action
              </p>

              <div className="mt-2">
                {reviewAction ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Approve Proposal
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Reject Proposal
                  </span>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl px-5"
              >
                Cancel
              </Button>

              <Button
                onClick={onSubmit}
                disabled={isPending}
                className="rounded-xl bg-yob-primary hover:bg-yob-primary/90 text-white px-5"
              >
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}