import { Badge } from "@/components/ui/badge";
import { handleCopy, maskId } from "@/helpers/global";
import { formatCompactNumber } from "@/lib/format.utils";
import {  Copy } from "lucide-react";
export const Investorcolumns = (router: any) => {
  return [
    {
      header: "Investor Id",
      accessorKey: "investorId",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <span className="truncate uppercase font-semibold">
              {maskId(id, "INV")}
            </span>
            <Copy
              onClick={() => handleCopy(id)}
              size={14}
              className="text-gray-500 cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      header: "Investor",
      accessorKey: "investor",
      cell: ({ getValue }: any) => {
        const investor = getValue();
        return (
          <div className="flex flex-col">
            <span>{investor?.name}</span>
            <span className="text-gray-500 text-sm">{investor?.email}</span>
          </div>
        );
      },
    },
    {
      header: "Investment",
      accessorKey: "investment",
      cell: (info: any) => {
        const value = formatCompactNumber(info.getValue() || 0);
        return <span>{value}</span>;
      },
    },
    {
      header: "Tokens",
      accessorKey: "tokens",
      cell: (info: any) => {
        const value = formatCompactNumber(info.getValue() || 0);
        return <span>{value}</span>;
      },
    },
    {
      header: "Ownership %",
      accessorKey: "ownership",
      cell: (info: any) => {
        const value = Number(info?.getValue() || 0).toFixed(2);
        console.log("ownership", value);
        return (
          <Badge className="bg-blue-50 text-blue-600 border border-blue-300 rounded-full px-2 w-20 text-center cursor-pointer">
            {value}%
          </Badge>
        );
      },
    },
  ];
};
