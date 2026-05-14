"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateProposal } from "../../hooks/DoaHooks/useCreateProposal";
import { useParams } from "next/navigation";
import { toast } from "sonner";




interface ProposalFormData {
  name: string;
  description: string;
  quorum: string;
  startDays: string;
  startHours: string;
  endDays: string;
  endHours: string;
  decisionType: string;
  governanceModel: string;
}

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ProposalFormData) => void;
}

const DECISION_TYPES = [
  "Major",
  "All Decision"
];

const GOVERNANCE_MODELS = [
  "Token Weighted",
  "Equal Weighted"
];

export default function CreateProposalModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateProposalModalProps) {
  const params = useParams();
    const daoAssetId = params.assetid as string;
  const [form, setForm] = useState<ProposalFormData>({
    name: "",
    description: "",
    quorum: "",
    startDays: "0",
    startHours: "0",
    endDays: "0",
    endHours: "0",
    decisionType: "",
    governanceModel: "",
  });


  const { mutate, isPending } = useCreateProposal(daoAssetId);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
  const payload = {
    proposalName: form.name,
    description: form.description,
    quorum: Number(form.quorum),
    endTime: {
      days: Number(form.endDays),
      hours: Number(form.endHours),
    },
    decisionType: form.decisionType,
    governanceModel: form.governanceModel,
  };

  mutate(payload, {
    onSuccess: (res) => {
      toast.success(res.message);
      onClose();
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    },
  });
};


  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create Proposal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[75vh] space-y-5">
          {/* Section Label */}
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Proposal Details
          </p>

          {/* Proposal Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Proposal Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter proposal name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter proposal description"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Quorum */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-600">
              Quorum
            </label>
            <div className="relative">
              <input
                type="number"
                name="quorum"
                value={form.quorum}
                onChange={handleChange}
                min={0}
                max={100}
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                %
              </span>
            </div>
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Start time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs text-gray-500">Days</span>
                <input
                  type="number"
                  name="startDays"
                  value={form.startDays}
                  onChange={handleChange}
                  min={0}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-500">Hours</span>
                <input
                  type="number"
                  name="startHours"
                  value={form.startHours}
                  onChange={handleChange}
                  min={0}
                  max={23}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              End time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs text-gray-500">Days</span>
                <input
                  type="number"
                  name="endDays"
                  value={form.endDays}
                  onChange={handleChange}
                  min={0}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-500">Hours</span>
                <input
                  type="number"
                  name="endHours"
                  value={form.endHours}
                  onChange={handleChange}
                  min={0}
                  max={23}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Decision Type + Governance Model */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-600">
                Decision Type
              </label>
              <select
                name="decisionType"
                value={form.decisionType}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select decision type
                </option>
                {DECISION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-600">
                Governance Model
              </label>
              <select
                name="governanceModel"
                value={form.governanceModel}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select Governance type
                </option>
                {GOVERNANCE_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-yob-primary text-white py-4 rounded-xl"
          >
            {isPending ? "Creating..." : "Create Proposal"}
          </button>


        </div>
      </div>
    </div>
  );
}