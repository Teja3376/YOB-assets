"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import queryString from "query-string";
// import { useAssetOrder } from "@/hooks/asset/useAssetOrder";
// import { useDebounce } from "@/hooks/useDebounce";
// import Pagination from "@/layout/Pagination";
import TableComponent from "@/common/TableComponent";
import SearchFilter from "../components/Orders/SearchFilter";
import { CheckCircle, Clock, Eye, ShoppingCart, XCircle } from "lucide-react";
import { ORDER_TRACKING_STATUS, PAYMENT_TYPE } from "../types/global";
import OrderStatusCard from "../components/Orders/OrderStatusCard";
import { formatCompactNumber } from "@/helpers/global";

import usdt from "../../../public/USDTlogo.png";
import usdc from "../../../public/USDClogo.png"
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { Assetdata } from "../types/assetdata";

const Orders = ({ assetOverview }: { assetOverview: any }) => {
  const {
    totalOrders,
    completedOrders,
    cancelledOrders,
    pendingOrders,
    refundedOrders,
    failedOrders,
  } = assetOverview?.orderStats || {};
   const searchParams = useSearchParams()
  const queryParams = Object.fromEntries(searchParams.entries())
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const router = useRouter();
//   const { orders, getOrders, pagination } = useAssetOrder();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
//   const debouncedSearch = useDebounce(search, 500);

  function loadImage(currency?: string) {
    const key = currency?.trim().toLowerCase() || "";

    const chainLogos: Record<string, any> = {
      usdt: usdt,
      usdc: usdc,
    };

    return chainLogos[key] || usdt; // fallback
  }

  const columns = [
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
    { header: "Tokens", accessorKey: "tokensBooked" },
    {
      header: "Order Value",
      accessorKey: "totalOrderValue",
      cell: ({ row }: { row: any }) => {
        const { currency, totalOrderValue } = row.original;
        return (
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1 font-semibold">
              {["USDC", "USDT"].includes(currency?.toUpperCase()) ? (
                <>
                  <img
                    src={loadImage(currency)}
                    alt={currency}
                    className="w-4 h-4"
                  />
                  {formatCompactNumber(totalOrderValue)}
                </>
              ) : (
                formatCurrencyFlexible(
                  totalOrderValue,
                  currency
                )
              )}
            </span>
          </div>
        );
      },
    },
    {
      header: "Payment Type",
      accessorKey: "paymentType",
      cell: ({ getValue }: { getValue: () => string }) => {
        const paymentType = getValue();
        const value = PAYMENT_TYPE.find(
          (payment) => payment.value === paymentType
        )?.label;
        return value || paymentType;
      },
    },
    {
      header: "Current Status",
      accessorKey: "currentStatus",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();
        const statusLabel = ORDER_TRACKING_STATUS.find(
          (statusObj) => statusObj.value === status
        )?.label;
        return statusLabel || status;
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
        <div className="flex items-center gap-2">
          <Eye
            onClick={() => {
              router.push(`/orders/order-details/${row.original._id}`);
            }}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const onPageSizeChange = (pageSize: number) => {
    router.push(
      `/dashborad-asset/${id}?search=${search}&page=1&limit=${pageSize}`
    );
  };

  const onPageChange = (page: number) => {
    router.push(`/dashborad-asset/${id}?page=${page}&limit=${limit}`);
  };

//   useEffect(() => {
//     if (id) {
//       getOrders({ page, limit, search: debouncedSearch, id, status: filter });
//     }
//   }, [page, limit, debouncedSearch, id, filter]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <OrderStatusCard
          icon={
            <div className="bg-blue-100 p-2 rounded-full">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </div>
          }
          count={totalOrders}
          label="All Orders"
          description="Total orders in the system"
        />
        <OrderStatusCard
          icon={
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          }
          count={completedOrders}
          label="Approved Orders"
          description="Completed and approved orders"
        />
        <OrderStatusCard
          icon={
            <div className="bg-amber-100 p-2 rounded-full">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          }
          count={pendingOrders}
          label="Pending Approvals"
          description="Orders awaiting approval"
        />
        <OrderStatusCard
          icon={
            <div className="bg-red-100 p-2 rounded-full">
              <XCircle className="h-5 w-5 " />
            </div>
          }
          count={cancelledOrders}
          label="Cancelled Orders"
          description="Orders that were cancelled"
        />
        <OrderStatusCard
          icon={
            <div className="bg-purple-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-purple-500" />
            </div>
          }
          count={refundedOrders}
          label="Refunded Orders"
          description="Orders that were refunded"
        />
        <OrderStatusCard
          icon={
            <div className="bg-gray-100 p-2 rounded-full">
              <XCircle className="h-5 w-5 text-gray-500" />
            </div>
          }
          count={failedOrders}
          label="Failed Orders"
          description="Orders that failed"
        />
      </div>
      {/*  */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Orders</h1>
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <TableComponent columns={columns} data={Assetdata || []} model="order" />
      {/* <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      /> */}
    </div>
  );
};

export default Orders;
