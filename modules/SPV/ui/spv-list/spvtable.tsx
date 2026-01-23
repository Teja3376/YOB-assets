"use client";

import React from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { handleCopy, maskId } from "@/helpers/global";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrencyFlexible, formatCompactNumber } from "@/lib/format.utils";
import { SPV_TYPES } from "@/modules/SPV/utils/global";
import TableComponent from "@/common/TableComponent";


interface SPVTableProps {
  data: any[];
  setSpv: (spv: any) => void;
}

const SPVTable: React.FC<SPVTableProps> = ({ data, setSpv }) => {
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
          <>
            {SPV_TYPES.find((opt: any) => opt.value === type)?.label ?? "-"}
          </>
        );
      },
    },
    {
      header: "Total Investors",
      accessorKey: "totalInvestors",
      size: 100,
      cell: (info: any) =>
        formatCompactNumber(info.getValue() || 0),
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

        const explorerUrl = `https://testnet.xdcscan.com/address/${address}`;

        return (
          <div className="flex gap-2 items-center">
            <Copy
              onClick={() => handleCopy(address)}
              size={14}
              className="text-gray-500 cursor-pointer"
            />
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm truncate text-blue-500 underline"
            >
              {address.slice(0, 6)}...{address.slice(-4)}
            </a>
          </div>
        );
      },
    },
    {
      header: "Active",
      accessorKey: "status",
      size: 80,
      cell: (info: any) => {
        const isActive = info.getValue() === "active";
        return (
          <Switch
            checked={isActive}
            onCheckedChange={() => setSpv(info.row.original)}
            disabled={isActive && info.row.original.assets.length > 0}
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
            <Link href={`/spv/${id}/overview`}>
              <Button variant="outline" size="icon">
                <Eye className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={data} model="spv" />;
};

export default SPVTable;
