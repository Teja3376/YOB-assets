import { Button } from "@/components/ui/button";
import { Coins, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const investorColumn = () => {
  const router = useRouter();
  return [
    {
      header: "Investor Id",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex flex-col py-1">
            <div className="flex items-center gap-2 px-2">
              <span className="uppercase font-semibold">{`INV-${id.slice(-3)}`}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Investor",
      accessorKey: "name",
      cell: (info: any) => {
        const name = info.getValue();
        return (
          <div className="flex flex-col py-1">
            <div className="flex items-center gap-2 px-2">
              <span className="">{name}</span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Total Tokens",
      accessorKey: "totalTokens",
      cell: (info: any) => {
        const totalTokens = info.getValue();
        return (
          <div className="flex items-center gap-2 px-2">
            <Coins size={14} className="text-primary" />
            <span className="text-sm uppercase">{totalTokens}</span>
          </div>
        );
      },
    },
    {
      header: "Invested Assets Count",
      accessorKey: "assetsCount",
      cell: (info: any) => {
        const assetsCount = info.getValue();
        return (
          <div className="flex flex-col">
            <span className="text-sm uppercase">{assetsCount}</span>
          </div>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info: any) => {
        const email = info.getValue();
        return (
          <div className="flex flex-col">
            <span className="text-sm">{email}</span>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (info: any) => {
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.push(`/investors/${info.row.original._id}`)}>
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        );
      },
    }
  ];
};
export default investorColumn;
