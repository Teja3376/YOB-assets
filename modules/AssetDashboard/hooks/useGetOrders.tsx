import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (assetId: string,page: number = 1,
  pageSize: number = 10,
  searchQuery: string = "",
  fromDate?: Date,
  toDate?: Date,) => {
  return useQuery({
    queryKey: ["Orders",assetId,page,pageSize,searchQuery,fromDate,toDate],
    queryFn: async () => {
      const response = await api.get("/assetDashboard/orders", {
        params: {
          assetId,
          page,
          search: searchQuery,
          status,
          startDate: fromDate ? fromDate.toISOString() : undefined,
          endDate: toDate ? toDate.toISOString() : undefined,
        },
      });
      console.log("OrdersDetails", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
