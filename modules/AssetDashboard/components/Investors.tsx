
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectViewport } from "@radix-ui/react-select";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import StatCard from "./StateCard";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { INVESTOR_TYPE } from "../types/global";
import InvestorTable from "./InvestorsTable";
import { Investorcolumns } from "../schema/investorsCols";
import { Search } from "lucide-react";

const ActiveInvestors = ({ assetOverview }: { assetOverview: any }) => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  

  const [investor, setInvestor] = useState<any>(null);
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`?tab=investers&page=${page}&limit=${limit}`);
  };

  const onPageSizeChange = (pageSize: number) => {
    router.push(`?tab=investers&page=${page}&limit=${pageSize}`);
  };


  const totalRaised = assetOverview?.stats?.totalRevenue;
  const numberOfInvestors = assetOverview?.stats?.totalInvestors;
  const averageInvestment = assetOverview?.stats?.avgOrderValue;
  const currency = assetOverview?.currency ?? "USD";


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
      <div className="flex items-center  mb-2 relative py-4">
        <Search
          size={15}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
        />
        <Input
          className="w-full pl-10 h-10  focus-visible:outline-0 focus-visible:border-primary py-4 focus-visible:ring-0 mr-5"
          placeholder="Search orders..."
          onChange={(e) => setSearch(e.target.value)}
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
        columns={Investorcolumns(router)}
        data={assetOverview?.investors || []}
        pagination={assetOverview?.page}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
     
    </div>
  );
};

export default ActiveInvestors;
