import { formatCurrencyFlexible } from "@/lib/format.utils";
import StatusBadge from "@/modules/Orders/ui/StatusBadge";
import { Eye } from "lucide-react";

export const columns = (router: any) => {
  return [
    {
      header: "Order Id",
      accessorKey: "_id",
      maxWidth: 100,
    },
    {
      header: "Investor",
      accessorKey: "investor",
      cell: ({
        getValue,
      }: {
        getValue: () => {
          fullName: string;
          email: string;
        };
      }) => {
        const investor = getValue();
        return (
          <div className="flex flex-col ">
            <span className="truncate">{investor?.fullName}</span>
            <span className="text-gray-500 text-sm truncate">
              {investor?.email}
            </span>
          </div>
        );
      },
    },
    {
      header: "Tokens",
      accessorKey: "tokens",
      cell: ({ row }: { row: any }) => {
        const tokens = row.original.orderValue?.tokens;
        return <div>{tokens}</div>;
      },
    },
    {
      header: "Order Value",
      accessorKey: "OrderValue",
      cell: ({ row }: { row: any }) => {
        const tokenValue = row.original.orderValue?.tokenValue || 0;
        const currency = row.original.orderValue?.userCurrency;

        return (
          <span className="font-semibold">
            {formatCurrencyFlexible(tokenValue, currency)}
          </span>
        );
      },
    },

    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();

        return <StatusBadge status={status} />;
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ getValue }: { getValue: () => string }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      header: "View",
      accessorKey: "action",
      cell: ({ row }: { row: { original: { _id: string } } }) => (
        <Eye
          onClick={() => {
            router.push(`/orders/${row.original._id}`);
          }}
          className="cursor-pointer"
          size={15}
        />
      ),
    },
  ];
};
