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
import { set } from "lodash";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useGetOrdersStats } from "../hooks/useGetOrdersStats";

const OrderListPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = useDebounce(searchTerm, 500);
  const [status, setStatus] = useState("");
  const {
    data: orders,
    isPending: isOrdersLoading,
    isError,
  } = useGetOrderList(page, pageSize, searchQuery, status);

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
    { label: "Initiated", value: "initiated" },
    { label: "Payment Pending", value: "payment_pending" },
    { label: "Payment Success", value: "payment_success" },
    { label: "Payment Failed", value: "payment_failed" },
    { label: "Token Transfer Pending", value: "token_transfer_pending" },
    { label: "Token Transferred", value: "token_transferred" },
    { label: "Token Transfer Failed", value: "token_transfer_failed" },
    { label: "Signature Pending", value: "signature_pending" },
    { label: "Order Failed", value: "order_failed" },
    { label: "Completed", value: "completed" },
  ];
  return (
    <div className="p-2 space-y-2">
      <h1 className="text-2xl font-semibold">Orders</h1>

      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        <DashboardCard
          title="Total Orders"
          value={orderStats?.totalOrders || 0}
          leftIcon={<ShoppingCart size={25} className="text-blue-500" />}
          titleIconClassName="bg-blue-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        <DashboardCard
          title="Initiated Orders"
          value={orderStats?.statusCounts?.initiated || "0"}
          leftIcon={<CircleDot size={25} className="text-slate-500" />}
          titleIconClassName="bg-slate-100 rounded-full p-2"
          containerClassName="rounded-lg"
        />
        {orderStats?.statusCounts?.payment_pending > 0 && (
          <DashboardCard
            title="Payment Pending Orders"
            value={orderStats?.statusCounts?.payment_pending || 0}
            leftIcon={<Clock size={25} className="text-yellow-600" />}
            titleIconClassName="bg-yellow-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.payment_success > 0 && (
          <DashboardCard
            title="Payment Success Orders"
            value={orderStats?.statusCounts?.payment_success || 0}
            leftIcon={<BadgeCheck size={25} className="text-green-600" />}
            titleIconClassName="bg-green-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.payment_failed > 0 && (
          <DashboardCard
            title="Payment Failed Orders"
            value={orderStats?.statusCounts?.payment_failed || 0}
            leftIcon={<XCircle size={25} className="text-red-600" />}
            titleIconClassName="bg-red-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.token_transfer_pending > 0 && (
          <DashboardCard
            title="Token Transfer Pending Orders"
            value={orderStats?.statusCounts?.token_transfer_pending || 0}
            leftIcon={<LoaderCircle size={25} className="text-yellow-600" />}
            titleIconClassName="bg-yellow-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.token_transferred > 0 && (
          <DashboardCard
            title="Token Transferred Orders"
            value={orderStats?.statusCounts?.token_transferred || 0}
            leftIcon={<ArrowRightLeft size={25} className="text-green-600" />}
            titleIconClassName="bg-green-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.token_transfer_failed > 0 && (
          <DashboardCard
            title="Token Transfer Failed Orders"
            value={orderStats?.statusCounts?.token_transfer_failed || 0}
            leftIcon={<AlertTriangle size={25} className="text-red-600" />}
            titleIconClassName="bg-red-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        {orderStats?.statusCounts?.signature_pending > 0 && (
          <DashboardCard
            title="Signature Pending Orders"
            value={orderStats?.statusCounts?.signature_pending || 0}
            leftIcon={<PenLine size={25} className="text-orange-600" />}
            titleIconClassName="bg-orange-50 rounded-full p-2"
            containerClassName="rounded-lg"
          />
        )}
        <DashboardCard
          title="Completed Orders"
          value={orderStats?.statusCounts?.completed || 0}
          leftIcon={<CheckCheck size={25} className="text-emerald-600" />}
          titleIconClassName="bg-emerald-50 rounded-full p-2"
          containerClassName="rounded-lg"
        />

        <DashboardCard
          title="Failed Orders"
          value={orderStats?.statusCounts?.order_failed || 0}
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
        <div className="flex flex-wrap gap-2">
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
          <Button
            onClick={() => {
              setStatus("");
              setSearchTerm("");
            }}
            variant="outline"
            className="border-0 shadow-none hover:underline "
          >
            Clear all
          </Button>
        </div>
      </div>
      <div>
        {!isOrdersLoading && orders && (
          <OrdersTable cols={orderCols(undefined)} data={orders?.data || []} />
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
    </div>
  );
};

export default OrderListPage;
