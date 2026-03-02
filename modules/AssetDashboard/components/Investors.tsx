import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formatCompactNumber, handleCopy, maskId } from "@/helpers/global";
// import useAssetInvestor from "@/hooks/asset/useAssetInvestor";
import { useDebounce } from "@/hooks/useDebounce";
import { SelectViewport } from "@radix-ui/react-select";
import { Copy, Eye, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import StatCard from "./StateCard";
// import InvestorTable from "../InvestorTable";
// import InvestorDialog from "../InvestorDialog";
import { formatCurrencyFlexible } from "@/lib/format.utils";
// import { StatusBadge } from "@/pages/orders";
import { INVESTOR_TYPE, ORDER_TRACKING_STATUS } from "../types/global";

const ActiveInvestors = ({ assetOverview }: { assetOverview: any }) => {
  const searchParams = useSearchParams()
const queryParams = Object.fromEntries(searchParams.entries())
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
//   const { investors, getInvestors, pagination, getDocuments, documents,handleSendDocument } =
//     useAssetInvestor();
  const [investor, setInvestor] = useState<any>(null);
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?tab=investers&page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    router.push(`?tab=investers&page=${page}&limit=${pageSize}`);
  };
//   console.log(investors)
//   const handleInvestorClick = async (investor: any) => {
//     if (id) {
//       await getDocuments({
//         investorId: investor.investor._id,
//         assetId: id,
//       });
//     }
//     setInvestor(investor);
//   };

  const columns = [
    {
      header: "Investor Id",
      accessorKey: "investor._id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <span className="truncate uppercase font-semibold">{maskId(id, "INV")}</span>
            <Copy
              onClick={() => handleCopy(id)}
              size={4}
              className="text-gray-500 cursor-pointer min-h-4 min-w-4"
            />
          </div>
        );
      },
      enableSorting: true,
    },
    {
      header: "Investor",
      accessorKey: "investor",
      type: "object" as "object",
      keysToMap: ["firstName", "lastName", "email", "type"],
      cell: ({
        getValue,
      }: {
        getValue: () => {
          firstName: string;
          lastName: string;
          email: string;
          type: string;
        };
      }) => {
        const investor = getValue();
        return (
          <div className="flex flex-col ">
            <span className="truncate">{investor?.firstName + " " + investor?.lastName}</span>
            <span className="text-gray-500 text-sm truncate">
              {investor?.email}
            </span>
            <span className="text-gray-500 text-sm truncate">
              {investor?.type}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      header: "Investment",
      accessorKey: "totalOrderValue",
      cell: (info: any) => {
        const value = formatCompactNumber(info.getValue() || 0);
        return <span>{value}</span>;
      },
      enableSorting: true,
    },
    {
      header: "Tokens",
      accessorKey: "tokensBooked",
      cell: (info: any) => {
        const value = formatCompactNumber(info.getValue() || 0);
        return <span>{value}</span>;
      },
    },
    {
      header: "Ownership % ",
      accessorKey: "ownershipPercentage",
      cell: (info: any) => {
        const value = Number(info.getValue() || 0).toFixed(2);
        return (
          <Badge className="bg-blue-50 rounded-full text-blue-600 hover:bg-gray-200 border border-blue-300">
            {value} 
          </Badge>
        );
      },
    },

    {
      header: "Order Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        const statusLabel = ORDER_TRACKING_STATUS.find(
          (statusObj) => statusObj.value === status
        )?.label;
        return (
        //   <StatusBadge status={status} />
        <div>hii</div>
        );
      },
    },
  ];

//   useEffect(() => {
//     getInvestors({
//       page,
//       limit,
//       id: id || "",
//       search: debouncedSearch,
//       type,
//     });
//   }, [page, limit, debouncedSearch, id, type]);

  const { totalRaised, numberOfInvestors, averageInvestment } =
    assetOverview?.investmentStats || {};
  const currency = assetOverview?.currency ?? "USD";
  const isDialogOpen = Boolean(investor);

  const handleDialogClose = () => {
    setInvestor(null);
  };

//   const handleOnSend = (id:string) => {
//     if (id) {
//       handleSendDocument(id);
//     }
//   };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Investors" value={numberOfInvestors} />
        <StatCard title="Total Revenue" value={formatCurrencyFlexible(totalRaised, currency)}  />
        <StatCard
          title="Average Order Value"
          value={formatCurrencyFlexible(averageInvestment, currency)}
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold">Investors</h1>
        <p className="text-sm text-muted-foreground">
          Manage investors and their investments in this asset
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Search Documents"
          className="w-full max-w-sm"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Select
          onValueChange={(value) => {
            setType(value);
          }}
          defaultValue={type}
        >
          <SelectTrigger className="max-w-45">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectViewport>
              {INVESTOR_TYPE.map((ele) => (
                <SelectItem
                  key={ele.value}
                  value={ele.value}
                  className="flex items-center gap-2 text-ellipsis"
                >
                  {ele.label}
                </SelectItem>
              ))}
            </SelectViewport>
          </SelectContent>
        </Select>
      </div>
      {/* <InvestorTable
        columns={columns}
        data={investors}
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      <InvestorDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        documents={documents}
        handleSend={handleOnSend}
      /> */}
    </div>
  );
};

export default ActiveInvestors;
