"use client";
import DashboardCard from "@/components/DashboardCard";
import {
  AlertTriangle,
  ArrowRightLeft,
  BadgeCheck,
  CheckCheck,
  CircleCheck,
  CircleDot,
  CircleX,
  Clock,
  LoaderCircle,
  PenLine,
  Search,
  ShoppingBagIcon,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import OrdersTable from "../ui/OrdersTable";
import { orderCols } from "../schema/orderCols";
import useGetOrderList from "../hooks/useGetOrderList";
import Pagination from "@/common/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { useGetOrdersStats } from "../hooks/useGetOrdersStats";
import DateRangePicker from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const OrderListPage = () => {
  const router=useRouter()
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = useDebounce(searchTerm, 500);
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const fromDate = dateRange?.from;
  const toDate = dateRange?.to;
  const {
    data: orders,
    isPending: isOrdersLoading,
    isError,
  } = useGetOrderList(page, pageSize, searchQuery, status, fromDate, toDate);

  const { data: orderStats, isPending: isOrderStatsLoading } =
    useGetOrdersStats();
  console.log(orders);
  console.log(orderStats);
  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const ORDER_STATUSES = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Failed", value: "failed" },
  ];
  return (
    <main className="p-2 space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="grid gap-3 grid-cols-4">
        <DashboardCard
          title="Total Orders"
          value={orderStats?.totalOrders || 0}
          leftIcon={<ShoppingCart size={25} className="text-blue-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Pending Orders"
          value={orderStats?.inProgress || "0"}
          leftIcon={<Clock size={25} className="text-yellow-500" />}
          titleIconClassName="bg-slate-100 rounded-full p-2"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Completed Orders"
          value={orderStats?.completed || 0}
          leftIcon={<CheckCheck size={25} className="text-emerald-600" />}
          titleIconClassName="bg-emerald-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Failed Orders"
          value={orderStats?.failed || 0}
          leftIcon={<XCircle size={25} className="text-red-700" />}
          titleIconClassName="bg-red-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
      </div>
      <div>
        <div className="flex items-center  mb-2 relative py-4">
          <Search
            size={15}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
          />
          <Input
            className="w-full pl-10 h-10  focus-visible:outline-0 focus-visible:border-primary py-4 focus-visible:ring-0"
            placeholder="Search orders..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {ORDER_STATUSES.map((item) => {
            const isActive = status === item.value;
            return (
              <Button
                key={item.value}
                onClick={() => {
                  setStatus(item.value);
                  setPage(1);
                }}
                className={clsx(
                  "px-4 py-0! text-xs font-medium rounded-full border transition-all",
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm hover:bg-primary"
                    : "bg-white text-muted-foreground border-gray-200 hover:border-primary! hover:text-white!",
                )}
              >
                {item.label}
              </Button>
            );
          })}

          <DateRangePicker range={dateRange} onSelect={setDateRange} />
          <Button
            onClick={() => {
              setStatus("");
              setSearchTerm("");
              setDateRange(undefined);
            }}
            variant="outline"
            className="border-0 shadow-none hover:underline rounded-full "
          >
            Clear all
          </Button>
        </div>
      </div>
      <div>
        {!isOrdersLoading && orders && (
          <OrdersTable cols={orderCols(router)} data={orders?.data || []} />
        )}
        {isOrdersLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
      {orders?.pagination && (
        <Pagination
          {...orders?.pagination}
          currentPage={orders?.pagination?.page || page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </main>
  );
};

export default OrderListPage;
