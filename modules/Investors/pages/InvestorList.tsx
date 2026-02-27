"use client";
import TableComponent from "@/common/TableComponent";
import React, { useState } from "react";
import investorColumn from "../components/investorListColumn";
import InvestorCard from "../components/InvestorCard";
import useInvesterList from "../hooks/useInvesterList";
import Pagination from "@/common/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Users, DollarSign, X } from "lucide-react";
import useInvestorCount from "../hooks/useInvestorCount";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatCurrencyWithLocale } from "@/lib/format.utils";

const InvestorList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const handleFromDateSelect = (date: Date | undefined) => {
    setFromDate(date);
    if (date && toDate && date > toDate) setToDate(date);
  };
  const handleToDateSelect = (date: Date | undefined) => {
    setToDate(date);
    if (date && fromDate && date < fromDate) setFromDate(date);
  };


  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = useInvesterList(page, limit, debouncedSearch);
  const { data: investorCount, isLoading: isInvestorCountLoading } = useInvestorCount();
  console.log(investorCount);
  const investors = data?.data || [];
  const pagination = data?.pagination;
  const onsearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onPageChange = (page: number) => {
    router.push(`${pathname}?page=${page}&limit=${limit}`);
  };
  const onPageSizeChange = (pageSize: number) => {
    router.push(`${pathname}?page=1&limit=${pageSize}`);
  };
  if (isInvestorCountLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold">Investors Summary</h1>
      </div>
      {/* Cards */}
      <div className="flex gap-4">
        <InvestorCard
          title="Total Investor"
          value={investorCount?.totalInvestors}
          icon={<Users className="w-6 h-6 text-blue-500" />}
          color={"blue"}
        />
        <InvestorCard
          title="Total Invested"
          value={formatCurrencyWithLocale(investorCount?.totalInvested, "USD")}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          color={"green"}
        />
      </div>
      {/* Filters & Search */}
      <h1 className="text-xl font-semibold">Investors List</h1>
      {/* <div className="w-full">
        <Input
          type="text"
          placeholder="Search investors..."
          className="border border-gray-300 rounded-md p-2 w-full"
          onChange={onsearch}
          value={search}
        />
      </div> */}


      {/* Table */}
      <TableComponent columns={investorColumn()} data={investors} model="investor" />

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          hasPreviousPage={pagination.page > 1}
          hasNextPage={pagination.page < pagination.totalPages}
          limit={pagination.limit}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default InvestorList;
