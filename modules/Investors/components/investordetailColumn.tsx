import { Button } from "@/components/ui/button";
import { handleCopy } from "@/helpers/global";
import { formatDate } from "@/lib/format.utils";
import StatusBadge from "@/modules/Orders/ui/StatusBadge";
import { Coins, Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const investordetailColumn = () => {
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
                            <Copy className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => handleCopy(id)} />
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Spv",
            accessorKey: "spvName",
            cell: (info: any) => {
                const spvName = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <span className="truncate">{spvName}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Asset",
            accessorKey: "assetName",
            cell: (info: any) => {
                const assetName = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <span className="truncate">{assetName}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Invested Amount",
            accessorKey: "investorAmount",
            cell: (info: any) => {
                const investorAmount = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <span className="">{investorAmount?.toFixed(2)}</span>
                        </div>
                    </div>

                );
            },
        },
        {
            header: "Tokens",
            accessorKey: "numberOfTokens",
            cell: (info: any) => {
                const numberOfTokens = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <Coins size={14} className="text-primary" />
                            <span className="">{numberOfTokens}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Invested Date",
            accessorKey: "createdAt",
            cell: (info: any) => {
                const createdAt = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <span className="">{formatDate(createdAt)}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Order Status",
            accessorKey: "status",
            cell: (info: any) => {
                const status = info.getValue();
                return (
                    <div className="flex flex-col py-1">
                        <div className="flex items-center gap-2 px-2">
                            <StatusBadge status={status} />
                        </div>
                    </div>
                );
            },
        }
    ];
};
export default investordetailColumn;
