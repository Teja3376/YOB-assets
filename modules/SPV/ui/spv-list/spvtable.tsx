"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { handleCopy, handleViewOnBlockchain, maskId } from "@/helpers/global";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, Copy, Edit, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatCurrencyFlexible,
  formatCompactNumber,
} from "@/lib/format.utils";
import { SPV_TYPES } from "@/modules/SPV/utils/global";
import TableComponent from "@/common/TableComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useSendStatus from "@/modules/SPV/hooks/useSendStatus";
import { Spinner } from "@/components/ui/spinner";

interface SPVTableProps {
  data?: any[];
  hideDraftFields?: boolean;
}

const SPVTable: React.FC<SPVTableProps> = ({
  data,
  hideDraftFields = false,
}) => {
  const [selectedDraft, setSelectedDraft] = useState<any | null>(null);

  const { mutate: sendStatus, isPending: isSendingStatus } = useSendStatus();
  const handleSendStatus = (spvId: string) => {
    sendStatus({ spvId, status: "Pending" });
    setSelectedDraft(null);
  };
  const columns: ColumnDef<any, any>[] = [
    {
      header: "Spv Id",
      accessorKey: "_id",
      size: 100,
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2 items-center">
            <Copy
              onClick={() => handleCopy(id)}
              size={14}
              className="text-gray-500 cursor-pointer"
            />
            <span className="text-sm truncate uppercase">
              {maskId(id, "SPV")}
            </span>
          </div>
        );
      },
    },
    {
      header: "SPV Name",
      accessorKey: "name",
      size: 150,
      cell: (info: any) => {
        const fullName = String(info.getValue() ?? "SPV Name");
        return (
          <span className="truncate text-sm" title={fullName}>
            {fullName}
          </span>
        );
      },
    },
    {
      header: "SPV Type",
      accessorKey: "type",
      size: 100,
      cell: (info: any) => {
        const type = info.getValue();
        return (
          <>{SPV_TYPES.find((opt: any) => opt.value === type)?.label ?? "-"}</>
        );
      },
    },
    {
      header: "Total Investors",
      accessorKey: "totalInvestors",
      size: 100,
      cell: (info: any) => formatCompactNumber(info.getValue() || 0),
    },

    {
      header: "AUM",
      accessorKey: "aum",
      size: 100,
      cell: (info: any) => {
        const aum = info.getValue();
        const currency = info.row.original.currency;
        return formatCurrencyFlexible(aum, currency);
      },
    },

    {
      header: "Last Activity",
      accessorKey: "updatedAt",
      size: 100,
      cell: (info: any) =>
        new Date(info.getValue()).toLocaleDateString("en-US"),
    },
    {
      header: "Blockchain Address",
      accessorKey: "OnchainAddress",
      size: 150,
      cell: (info: any) => {
        const address = info.getValue();
        if (!address)
          return <span className="text-gray-400">Not deployed</span>;

        const formattedAddress = address
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : "-";

        return (
          <div
            onClick={() => handleViewOnBlockchain(address || "-", "asset")}
            className="group flex items-center gap-2"
          >
            <span className="group-hover:underline cursor-pointer font-medium text-gray-900">
              {formattedAddress}
            </span>

            {address && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
              >
                <ArrowUpRight size={14} />
              </Button>
            )}
          </div>
        );
      },
    },

    {
      header: "Active",
      accessorKey: "status",
      size: 80,
      cell: (info: any) => {
        const isActive = info.getValue() === "Approval";
        console.log(data);
        return (
          <Switch
            checked={isActive}
            onCheckedChange={() =>
              data?.map((item: any) =>
                item._id === info.row.original._id
                  ? { ...item, status: isActive ? "Approval" : "inactive" }
                  : item,
              )
            }
            disabled={isActive}
          />
        );
      },
    },
    {
      header: "Actions",
      size: 80,
      cell: (info: any) => {
        const id = info.row.original._id;
        return (
          <div className="flex gap-2">
            <Link href={`/spv/edit-spv/${id}`}>
              <Button variant="outline" size="icon">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
            {info.row.original.status !== "Draft" && (
              <Link href={`/spv/${id}/overview`}>
                <Button variant="outline" size="icon">
                  <Eye className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {info.row.original.status === "Draft" && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedDraft(info.row.original)}
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const visibleColumns = hideDraftFields
    ? columns.filter(
        (col: any) =>
          !["totalInvestors", "aum", "OnchainAddress", "status"].includes(
            (col as any).accessorKey,
          ),
      )
    : columns;

  return (
    <>
      <TableComponent columns={visibleColumns} data={data || []} model="spv" />

      <Dialog
        open={!!selectedDraft}
        onOpenChange={() => setSelectedDraft(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send SPV to Super Admin</DialogTitle>
            <DialogDescription>
              This will notify the super admin to review this SPV
              {selectedDraft?.name ? ` (${selectedDraft.name})` : ""} before it
              goes live.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Note: Once sent, Admin will be notifed and will be able to review
            the SPV before it goes live and if any changes required admin send u
            request for changes you need to make changes and submit again .
          </p>
          <Textarea placeholder="Enter the message" />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedDraft(null)}>
              Close
            </Button>
            <Button
              onClick={() => handleSendStatus(selectedDraft?._id)}
              disabled={isSendingStatus}
            >
              {isSendingStatus ? <Spinner /> : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SPVTable;
