import { formatCurrencyFlexible } from "@/lib/format.utils";
import StatusBadge from "@/modules/Orders/ui/StatusBadge";
import { Eye } from "lucide-react";

export const columns = (router: any) => {
  return [
    {
      header: "Date",
      accessorKey: "createdAt",
      maxWidth: 100,
    },
    {
      header: "Asset",
      accessorKey: "assetName",
      cell: ({ getValue }: { getValue: () => string }) => {
        const assetName = getValue();
        return (
          <div className="flex flex-col ">
            <span className="truncate">{assetName}</span>
          </div>
        );
      },
    },
    {
      header: "Service",
      accessorKey: "serviceType",
      cell: ({ getValue }: { getValue: () => string }) => {
        const serviceType = getValue();
        return <div>{serviceType}</div>;
      },
    },
    {
      header: "Fee Amount",
      accessorKey: "feeAmount",
      cell: ({ row }: { row: any }) => {
        const feeAmount = row.original.feeAmount || 0;
        const currency = "USD";

        return (
          <span className="font-semibold">
            {formatCurrencyFlexible(feeAmount, currency)}
          </span>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();

        return <StatusBadge status={status} />;
      },
    },
    
    {
      header: "View",
      accessorKey: "action",
      cell: ({ row }: { row: { original: { _id: string } } }) => (
        <Eye
          onClick={() => {
            router.push(`/payment-requests/${row.original._id}`);
          }}
          className="cursor-pointer"
          size={15}
        />
      ),
    },
  ];
};
