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
import { useDebounce } from "@/hooks/useDebounce";
import { SelectViewport } from "@radix-ui/react-select";
import { Copy, Eye, Send } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import StatCard from "./StateCard";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { INVESTOR_TYPE, ORDER_TRACKING_STATUS } from "../types/global";
import InvestorTable from "./InvestorsTable";
import InvestorDialog from "./InvestorsDialog";

const ActiveInvestors = ({ assetOverview }: { assetOverview: any }) => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [investor, setInvestor] = useState<any>(null);
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?tab=investers&page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    router.push(`?tab=investers&page=${page}&limit=${pageSize}`);
  };

  const columns = [
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
        <span className="text-gray-500 text-sm">
          {investor?.email}
        </span>
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
    const value = Number(info.getValue() || 0).toFixed(2);
    return (
      <Badge className="bg-blue-50 text-blue-600 border border-blue-300 rounded-full">
        {value}%
      </Badge>
    );
  },
},

    {
  header: "Order Status",
  accessorKey: "orderStatus",
  cell: (info: any) => {
    const status = info.getValue();
    return <div>{status}</div>;
  },
},
  ];

  const totalRaised = assetOverview?.stats?.totalRevenue;
  const numberOfInvestors = assetOverview?.stats?.totalInvestors;
  const averageInvestment = assetOverview?.stats?.avgOrderValue;
  const currency = assetOverview?.currency ?? "USD";
  const isDialogOpen = Boolean(investor);

  const handleDialogClose = () => {
    setInvestor(null);
  };

  const handleOnSend = (id: string) => {
    if (id) {
      handleSendDocument(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Investors" value={numberOfInvestors} />
        <StatCard
          title="Total Revenue"
          value={formatCurrencyFlexible(totalRaised, currency)}
        />
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
      <InvestorTable
        columns={columns}
        data={assetOverview?.investors || []}
        // pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
      <InvestorDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        documents={assetOverview}
        handleSend={handleOnSend}
      />
    </div>
  );
};

export default ActiveInvestors;
