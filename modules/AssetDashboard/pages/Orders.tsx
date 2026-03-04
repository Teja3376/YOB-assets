"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import queryString from "query-string";
// import { useAssetOrder } from "@/hooks/asset/useAssetOrder";
// import { useDebounce } from "@/hooks/useDebounce";
// import Pagination from "@/layout/Pagination";
import TableComponent from "@/common/TableComponent";
import SearchFilter from "../components/Orders/SearchFilter";
import { CheckCheck, CheckCircle, Clock, Eye, ShoppingCart, XCircle } from "lucide-react";
import { ORDER_TRACKING_STATUS, PAYMENT_TYPE } from "../types/global";
import OrderStatusCard from "../components/Orders/OrderStatusCard";
import { formatCompactNumber } from "@/helpers/global";

import usdt from "../../../public/USDTlogo.png";
import usdc from "../../../public/USDClogo.png";
import { formatCurrencyFlexible } from "@/lib/format.utils";
import { Assetdata } from "../types/assetdata";
import Image from "next/image";
import Pagination from "@/common/Pagination";
import DashboardCard from "@/components/DashboardCard";
import { useGetOrdersCount } from "../hooks/useGetOrdersCount";

const Orders = ({ assetorders }: { assetorders: any }) => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { id } = useParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const router = useRouter();
  //   const { orders, getOrders, pagination } = useAssetOrder();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  //   const debouncedSearch = useDebounce(search, 500);
const params=useParams()
const assetId=params.assetid

  const {data:ordersCount}=useGetOrdersCount(assetId)

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
    {
      header: "Tokens",
      accessorKey: "tokens",
      cell: ({ row }: { row: any }) => {
        const tokens = row.original.orderValue?.tokens;
        return <div>{tokens}</div>;
      },
    },
    {
      header: "Order Value",
      accessorKey: "OrderValue",
      cell: ({ row }: { row: any }) => {
        const tokenValue = row.original.orderValue?.tokenValue || 0;
        const currency = row.original.orderValue?.userCurrency;

        return (
          <span className="font-semibold">
            {formatCurrencyFlexible(tokenValue, currency)}
          </span>
        );
      },
    },

    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ getValue }: { getValue: () => string }) => {
        const status = getValue();
        const statusLabel = ORDER_TRACKING_STATUS.find(
          (statusObj) => statusObj.value === status,
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
      `/dashborad-asset/${id}?search=${search}&page=1&limit=${pageSize}`,
    );
  };

  const onPageChange = (page: number) => {
    router.push(`/dashborad-asset/${id}?page=${page}&limit=${limit}`);
  };

  return (
    <div className="space-y-4">
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
      {/*  */}
      <div className="flex justify-between items-center my-5">
        {/* <h1 className="text-xl font-semibold">Orders</h1> */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <TableComponent
        columns={columns}
        data={assetorders?.data || []}
        model="order"
      />
      {/* <Pagination
        {...pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      /> */}
    </div>
  );
};

export default Orders;
