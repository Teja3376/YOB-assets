import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (assetId: string) => {
  return useQuery({
    queryKey: ["Orders",assetId],
    queryFn: async () => {
      const response = await api.get(`/assetDashboard/orders?assetId=${assetId}&status=completed`);
      console.log("OrdersDetails", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
