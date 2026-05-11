"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";

import CreateProposalModal from "./CreateProposalModal";
import { useGetProposals } from "../../hooks/DoaHooks/useGetProposals";
import ReviewProposalModal from "./ReviewProposalModal";
import { useProposalReview } from "../../hooks/DoaHooks/useProposalReview";



export default function VotingTab() {
  const params = useParams();
  const daoAssetId = params.assetid as string;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState<any | null>(null);
  const [reviewAction, setReviewAction] = useState(false);

  const { data, isLoading} = useGetProposals(daoAssetId);
  console.log(data,"hii hello how are you ");
  const { mutate: reviewProposal, isPending } =useProposalReview();

  const filters = ["all", "active", "pending", "passed"];

  const proposals = (data || []).map((p: any) => ({
  id: p._id,
  title: p.title,
  description: p.description,
  status: p.status,

  deadline: new Date(p.deadline).toLocaleDateString(),

  approve: p.votes?.approve || 0,
  oppose: p.votes?.oppose || 0,

  quorum: `${p.quorum}%`,
  fullDescription: p.description,

  createdBy: p.createdBy?.name || "Unknown",
  createdAt: new Date(p.createdAt).toLocaleDateString(),
}));

console.log("hii hi proposalis here:",proposals);

  const filteredProposals =
    activeFilter === "all"
      ? proposals
      : proposals.filter((item:any) => item.status === activeFilter);

      if (isLoading) {
    return <div className="p-6">Loading proposals...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Voting Proposals
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and participate in governance decisions
          </p>
        </div>

        <Button  onClick={() => setOpen(true)} className="h-11 px-5 rounded-xl bg-yob-primary text-white hover:bg-yob-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 border-b border-gray-200 pb-4">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className={`px-5 h-10 rounded-xl font-medium capitalize transition ${
              activeFilter === item
                ? "bg-yob-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-yob-primary/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {filteredProposals.map((proposal: any) => (
          <Card
            key={proposal.id}
            onClick={() => setSelectedProposal(proposal)}
            className="rounded-2xl border shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {proposal.title}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    proposal.status === "active"
                      ? "bg-green-100 text-green-700"
                      : proposal.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>

              <p className="text-gray-500 mt-2 text-sm">
                {proposal.description}
              </p>

             <div className="grid grid-cols-4 gap-8 mt-8 items-end">
                  <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{proposal.deadline}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Votes</p>
                  <p className="font-medium">
                    {proposal.approve} Approve / {proposal.oppose} Oppose
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Quorum</p>
                  <p className="font-medium">{proposal.quorum}</p>
                </div>

                {proposal.status === "pending" && (
  <div className="mt-5 flex justify-end">
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setReviewModal(proposal);
      }}
      className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
    >
      Review Proposal
    </Button>
  </div>
)}
                
              </div>


              

              <div className="mt-6 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yob-primary"
                  style={{ width: proposal.quorum }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedProposal}
        onOpenChange={() => setSelectedProposal(null)}
      >
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedProposal?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedProposal && (
            <div className="space-y-6 mt-4">
              <p className="text-gray-600 leading-7">
                {selectedProposal.fullDescription}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-sm text-green-600">
                    Votes Approve
                  </p>
                  <h2 className="text-3xl font-bold text-green-700 mt-2">
                    {selectedProposal.approve}
                  </h2>
                </div>

                <div className="p-5 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">
                    Votes Oppose
                  </p>
                  <h2 className="text-3xl font-bold text-red-700 mt-2">
                    {selectedProposal.oppose}
                  </h2>
                </div>

                <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-600">
                    Total Participation
                  </p>
                  <h2 className="text-3xl font-bold text-blue-700 mt-2">
                    {selectedProposal.approve +
                      selectedProposal.oppose}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-semibold">
                    {selectedProposal.deadline}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Quorum</p>
                  <p className="font-semibold">
                    {selectedProposal.quorum}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Created by {selectedProposal.createdBy} •{" "}
                {selectedProposal.createdAt}
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Voting Progress
                </p>

                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yob-primary"
                    style={{ width: selectedProposal.quorum }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CreateProposalModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => console.log(data)}
      />

      <ReviewProposalModal
       open={!!reviewModal}
      onClose={() => {
    setReviewModal(null);
    setReviewAction(false);
     }}
    proposal={reviewModal}
    reviewAction={reviewAction}
    setReviewAction={setReviewAction}
    isPending={isPending}
    onSubmit={() => {
    reviewProposal(
      {
        proposalId: reviewModal.id,
        action: reviewAction
          ? "approved"
          : "rejected",
      },
      {
        onSuccess: () => {
          setReviewModal(null);
          setReviewAction(false);
        },
      }
    );
  }}
/>

    
    </div>
  );
}
