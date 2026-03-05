"use client";

import Pagination from "@/common/Pagination";
import TableComponent from "@/common/TableComponent";
import DashboardCard from "@/components/DashboardCard";
import DateRangePicker from "@/components/DateRangePicker";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetOrders } from "@/modules/Assets/hooks/assetDashBoard/useGetOrders";
import { useGetOrdersCount } from "@/modules/Assets/hooks/assetDashBoard/useGetOrdersCount";
import { CheckCheck, Clock, Search, ShoppingCart, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { columns } from "../../schema/ordersCols";

const OrdersPage = () => {
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchQuery = useDebounce(search, 500);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const fromDate = dateRange?.from;
  const toDate = dateRange?.to;
  const assetId = params.assetid as string;

  const { data: assetorders, isFetching: isOrdersLoading } = useGetOrders(
    assetId as string,
    page,
    limit,
    searchQuery,
    fromDate,
    toDate,
  );

  const { data: ordersCount, isFetching: isOrdersCountLoading } =
    useGetOrdersCount(assetId);

  const pagination = assetorders?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  };
  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (isOrdersCountLoading && isOrdersLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4 mt-5">
      <div className="grid gap-3 grid-cols-4">
        <DashboardCard
          title="Total Orders"
          value={ordersCount?.totalorders || 0}
          leftIcon={<ShoppingCart size={25} className="text-blue-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Completed Orders"
          value={ordersCount?.completed || 0}
          leftIcon={<CheckCheck size={25} className="text-emerald-600" />}
          titleIconClassName="bg-emerald-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Pending Orders"
          value={ordersCount?.inProgress || "0"}
          leftIcon={<Clock size={25} className="text-yellow-500" />}
          titleIconClassName="bg-slate-100 rounded-full p-2"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Failed Orders"
          value={ordersCount?.failed || 0}
          leftIcon={<XCircle size={25} className="text-red-700" />}
          titleIconClassName="bg-red-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
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
        <DateRangePicker range={dateRange} onSelect={setDateRange} />
      </div>
      <div>
        {!isOrdersLoading && assetorders && (
          <TableComponent
            columns={columns(router)}
            data={assetorders?.data || []}
            model="order"
          />
        )}
        {isOrdersLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
      {assetorders?.pagination && (
        <Pagination
          {...pagination}
           currentPage={pagination?.page || page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default OrdersPage;
