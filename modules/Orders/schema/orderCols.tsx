import { Button } from "@/components/ui/button";
import { formatCurrencyWithLocale } from "@/lib/format.utils";
import { formatDate } from "date-fns";
import { Coins, Eye, Send } from "lucide-react";
import { Cell } from "recharts";
import StatusBadge from "../ui/StatusBadge";

export const orderCols = (router: any) => {
  return [
    {
      header: "Order Id",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();

        return <div className="flex gap-2">{id}</div>;
      },
      enableResizing: true,
      size: 100,
      maxSize: 200,
    },
    {
      header: "Investor",
      accessorKey: "investor",
      cell: (info: any) => {
        const investor = info.getValue();
        return (
          <div className="space-y-1">
            <h1>
              {investor?.firstName} {investor?.lastName}
            </h1>
            <p className="text-xs">{investor?.email}</p>
          </div>
        );
      },
    },
    {
      header: "SPV",
      accessorKey: "spv",
      cell: (info: any) => {
        const spv = info.getValue();
        return <div>{spv?.name}</div>;
      },
    },
    {
      header: "Tokens Purchased",
      accessorKey: "numberOfTokens",
      cell: (info: any) => {
        const tokens = info.getValue();
        return (
          <div className="flex items-center gap-2">
            <Coins className="text-yellow-500" size={15} />
            {tokens}
          </div>
        );
      },
    },
    {
      header: "Order Value",
      accessorKey: "investorAmount",
      cell: (info: any) => {
        const orderValue = info.getValue();
        const assetCurrency = info.row.original.asset.currency;

        return <div>{formatCurrencyWithLocale(orderValue, assetCurrency)}</div>;
      },
    },
    {
      header: "Investor Paid",
      accessorKey: "investorPaidAmount",
      cell: (info: any) => {
        const investorPaid = info.getValue();
        const investorCurrency = info.row.original.investorCurrency;
        return (
          <div>{formatCurrencyWithLocale(investorPaid, investorCurrency)}</div>
        );
      },
    },
    {
      header: "FX Rate",
      accessorKey: "fxRate",
      cell: (info: any) => {
        const fxRate = info.getValue();

        return <div>{fxRate?.toFixed(5) || "-"}</div>;
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        return (
          <div>
            <StatusBadge status={status} />
          </div>
        );
      },
    },
    {
      header: "Last Activity",
      accessorKey: "createdAt",
      cell: (info: any) => {
        const tokens = info.getValue();
        return <div>{formatDate(tokens, "dd/MM/yyyy")}</div>;
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (info: any) => {
        const orderId = info.row.original._id;
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.push(`/orders/${orderId}`)}>
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        );
      },
      enableResizing: false,
      size: 60,
      maxSize: 80,
    },
  ];
};
