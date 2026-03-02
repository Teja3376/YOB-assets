import { Input } from "@/components/ui/input";
import { formatCurrencyWithLocale } from "@/lib/format.utils";
import InvestorCard from "@/modules/Investors/components/InvestorCard";
import { DollarSign, Users } from "lucide-react";
import { useState } from "react";

const InvestorsPage = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InvestorCard
          title="Total Investor"
          value={"0"}
          icon={<Users className="w-6 h-6 text-blue-500" />}
          color={"blue"}
        />
        <InvestorCard
          title="Total Invested"
          value={formatCurrencyWithLocale(0, "USD")}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          color={"green"}
        />
      </div>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search by name or email..."
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {/* Table */}
      {/* {isInvestorsLoading && !investors ? (
        <LoadingSpinner />
      ) : (
        <TableComponent
          columns={investorColumn()}
          data={investors}
          model="investor"
        />
      )} */}

      {/* Pagination */}
      {/* {pagination && (
        <Pagination
          currentPage={pagination?.page}
          totalPages={pagination?.totalPages}
          hasPreviousPage={pagination?.page > 1}
          hasNextPage={pagination?.page < pagination.totalPages}
          limit={pagination?.limit}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )} */}
    </div>
  );
};

export default InvestorsPage;
