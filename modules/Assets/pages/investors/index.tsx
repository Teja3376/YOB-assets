"use client";
import Pagination from "@/common/Pagination";
import TableComponent from "@/common/TableComponent";
import DashboardCard from "@/components/DashboardCard";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { useGetInvestors } from "@/modules/Assets/hooks/assetDashBoard/useGetInvestors";
import { useGetInvestorsStats } from "@/modules/Assets/hooks/assetDashBoard/useGetInvestorStats";
import { Search, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Investorcolumns } from "../../schema/investorsCols";

const InvestorsPage = () => {
  const router = useRouter();
  const { assetid: assetId } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const searchTerm = useDebounce(search, 500);
  const [type, setType] = useState("");
  const { data: investors, isFetching: isInvestorsLoading } = useGetInvestors(
    assetId as string,
    page,
    limit,
    searchTerm,
  );
  const { data: stats, isFetching: isStatsLoading } = useGetInvestorsStats(
    assetId as string,
  );
  const totalRaised = stats?.totalRevenue;
  const numberOfInvestors = stats?.totalInvestors;
  const averageInvestment = stats?.avgOrderValue;
  const currency = investors?.currency ?? "USD";

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
  };
  if (isStatsLoading && isInvestorsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Investors"
          value={numberOfInvestors || 0}
          leftIcon={<Users size={25} className="text-blue-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Total Revenue"
          value={formatCurrencyFlexible(totalRaised, currency)}
          leftIcon={<TrendingUp size={25} className="text-green-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Average Order Value"
          value={formatCurrencyFlexible(averageInvestment, currency)}
          leftIcon={<ShoppingCart size={25} className="text-orange-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isInvestorsLoading ? (
        <LoadingSpinner />
      ) : (
        <TableComponent
          columns={Investorcolumns(router)}
          data={investors?.investors || []}
          model="investor"
        />
      )}
      <Pagination
        {...investors?.pagination}
        currentPage={investors?.pagination?.page || page}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        totalPages={investors?.pagination?.pages}
      />
    </div>
  );
};

export default InvestorsPage;
