"use client";

import { useMemo, type ReactNode } from "react";
import {
  Building2,
  FileSignature,
  Banknote,
  ClipboardCheck,
  Users,
  Wallet2,
  ListChecks,
} from "lucide-react";
import { COUNTRIES } from "@/constants/global";
import { SPV_TYPES } from "@/modules/SPV/utils/global";
import { cn } from "@/lib/utils";

const MEMO_LABELS: Record<string, string> = {
  investmentMemorandum: "Investment Memorandum",
  termsAndConditions: "Terms & Conditions",
  riskFactor: "Risk Factor",
  investmentStrategy: "Investment Strategy",
};

const LEGAL_LABELS: Record<string, string> = {
  llcOperatingAgreement: "LLC Operating Agreement",
  articlesOfAssociation: "Articles of Association",
  memorandumOfAssociation: "Memorandum of Association (MOA)",
  otherDocuments: "Other Documents",
};

function truncate(text: string, max = 280) {
  const t = text?.trim() ?? "";
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

function labelForSpvType(value: string | undefined) {
  if (!value) return "—";
  const found = SPV_TYPES.find(
    (t) =>
      t.value === value ||
      t.label === value ||
      t.value.toLowerCase() === value.toLowerCase(),
  );
  return found?.label ?? value;
}

function labelForCountry(value: string | undefined) {
  if (!value) return "—";
  const found = COUNTRIES.find(
    (c: { value: string; label: string }) =>
      c.value === value || c.label === value,
  );
  return found?.label ?? value;
}

function formatFileField(val: unknown): string {
  if (val == null || val === "") return "—";
  if (typeof val === "string") {
    try {
      const last = val.split("/").pop();
      return last || val;
    } catch {
      return val;
    }
  }
  if (typeof val === "object") {
    const o = val as Record<string, unknown>;
    const name =
      (typeof o.originalName === "string" && o.originalName) ||
      (typeof o.name === "string" && o.name) ||
      (typeof o.fileName === "string" && o.fileName);
    if (name) return name;
  }
  return "Uploaded";
}

function maskAccountNumber(raw: string | undefined): string {
  if (!raw) return "—";
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length <= 4) return "••••";
  return `••••${digits.slice(-4)}`;
}

function ReviewSection({
  icon,
  title,
  children,
  className,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-gray-100 bg-gray-50/50 p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-gray-900">
        <span className="text-gray-600">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-2 text-sm">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[minmax(0,200px)_1fr] sm:gap-4">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="wrap-break-word text-gray-900">{value}</span>
    </div>
  );
}

export type SpvAssetReviewProps = {
  values: Record<string, unknown>;
  /** Hides the large hero when shown inside SPV layout (tabs). */
  embedded?: boolean;
};

const SpvAssetReview = ({ values, embedded }: SpvAssetReviewProps) => {
  const memo = (values.memoAndTerms as Record<string, unknown>) ?? {};
  const escrow = (values.escrowBankDetails as Record<string, unknown>) ?? {};
  const legal = (values.legalDocuments as Record<string, unknown>) ?? {};
  const dao = (values.daoConfiguration as Record<string, unknown>) ?? {};
  const boardMembers = Array.isArray(values.boardMembers)
    ? values.boardMembers
    : [];

  const memoEntries = useMemo(() => {
    return Object.entries(MEMO_LABELS).map(([key, label]) => ({
      key,
      label,
      text: typeof memo[key] === "string" ? (memo[key] as string) : "",
    }));
  }, [memo]);

  const legalEntries = useMemo(() => {
    return Object.entries(LEGAL_LABELS).map(([key, label]) => ({
      key,
      label,
      value: legal[key],
    }));
  }, [legal]);

  const daoSkipped = !!dao.skipped;
  const governanceRights = dao.governanceRights as
    | { votingRights?: boolean; proposalCreation?: boolean }
    | undefined;
  const votingPeriod = dao.votingPeriod as
    | { days?: number; hours?: number }
    | undefined;

  return (
    <div className={cn("space-y-6", embedded ? "p-0" : "p-2")}>
      {embedded ? (
        <p className="text-sm text-muted-foreground border-b border-gray-100 pb-4">
          Read-only snapshot of onboarding data: company profile, memos, escrow,
          documents, board, and DAO settings.
        </p>
      ) : (
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <ListChecks className="h-8 w-8 text-gray-800" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Review SPV asset
            </h1>
            <p className="text-sm text-gray-600">
              Read-only summary of this SPV.
            </p>
          </div>
        </div>
      )}

      <ReviewSection icon={<Building2 className="h-5 w-5" />} title="Basic information">
        <Row label="SPV / LLC name" value={String(values.name ?? "—")} />
        <Row label="Type" value={labelForSpvType(values.type as string)} />
        <Row
          label="Jurisdiction"
          value={labelForCountry(values.jurisdiction as string)}
        />
        <Row label="Currency" value={String(values.currency ?? "—")} />
        <Row label="Formation date" value={String(values.formationDate ?? "—")} />
        <Row
          label="Business purpose"
          value={truncate(String(values.businessPurpose ?? ""), 400) || "—"}
        />
      </ReviewSection>

      <ReviewSection
        icon={<FileSignature className="h-5 w-5" />}
        title="Memo & terms"
      >
        {memoEntries.map(({ key, label, text }) => (
          <Row
            key={key}
            label={label}
            value={
              text ? (
                <span className="whitespace-pre-wrap">{truncate(text, 400)}</span>
              ) : (
                "—"
              )
            }
          />
        ))}
      </ReviewSection>

      <ReviewSection icon={<Banknote className="h-5 w-5" />} title="Escrow bank details">
        <Row label="Bank name" value={String(escrow.bankName ?? "—")} />
        <Row label="Account type" value={String(escrow.accountType ?? "—")} />
        <Row
          label="Account number"
          value={maskAccountNumber(escrow.accountNumber as string | undefined)}
        />
        <Row
          label={
            escrow.ifscCode != null && escrow.ifscCode !== ""
              ? "IFSC"
              : "Routing number"
          }
          value={String(escrow.ifscCode || escrow.routingNumber || "—")}
        />
      </ReviewSection>

      <ReviewSection
        icon={<ClipboardCheck className="h-5 w-5" />}
        title="Legal documents"
      >
        {legalEntries.map(({ key, label, value: v }) => (
          <Row key={key} label={label} value={formatFileField(v)} />
        ))}
      </ReviewSection>

      <ReviewSection icon={<Users className="h-5 w-5" />} title="Board members">
        {boardMembers.length === 0 ? (
          <p className="text-gray-600">No board members listed.</p>
        ) : (
          <ul className="divide-y divide-gray-100 rounded-md border border-gray-100 bg-white">
            {boardMembers.map((m: Record<string, unknown>, i: number) => (
              <li key={i} className="px-3 py-2">
                <span className="font-medium text-gray-900">
                  {(m.fullName as string) || "—"}
                </span>
                <span className="text-gray-600">
                  {" "}
                  · {(m.email as string) || "—"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </ReviewSection>

      <ReviewSection icon={<Wallet2 className="h-5 w-5" />} title="DAO integration">
        {daoSkipped ? (
          <p className="rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-amber-900">
            DAO setup was skipped. You can configure it from the SPV edit flow.
          </p>
        ) : (
          <>
            <Row label="DAO name" value={String(dao.daoName ?? "—")} />
            <Row label="Token symbol" value={String(dao.tokenSymbol ?? "—")} />
            <Row label="Blockchain" value={String(dao.blockchain ?? "—")} />
            <Row label="Governance model" value={String(dao.governanceModel ?? "—")} />
            <Row
              label="Proposal threshold"
              value={
                dao.proposalThresholdPercent != null &&
                dao.proposalThresholdPercent !== ""
                  ? `${dao.proposalThresholdPercent}%`
                  : "—"
              }
            />
            <Row
              label="Quorum"
              value={
                dao.quorumPercent != null && dao.quorumPercent !== ""
                  ? `${dao.quorumPercent}%`
                  : "—"
              }
            />
            <Row
              label="Voting period"
              value={
                votingPeriod
                  ? `${votingPeriod.days ?? 0}d ${votingPeriod.hours ?? 0}h`
                  : "—"
              }
            />
            <Row label="Decision type" value={String(dao.decisionType ?? "—")} />
            <Row
              label="Voting rights"
              value={governanceRights?.votingRights ? "On" : "Off"}
            />
            <Row
              label="Proposal creation"
              value={governanceRights?.proposalCreation ? "On" : "Off"}
            />
            <Row
              label="Authorized representative confirmed"
              value={dao.issuerRepSignature ? "Yes" : "No"}
            />
          </>
        )}
      </ReviewSection>
    </div>
  );
};

export default SpvAssetReview;
