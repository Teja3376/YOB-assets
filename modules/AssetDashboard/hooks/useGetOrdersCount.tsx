import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersCount = (assetId: string) => {
  return useQuery({
    queryKey: ["OrdersCount",assetId],
    queryFn: async () => {
      const response = await api.get(`/assetDashboard/orders/status-count??assetId=${assetId}`);
      console.log("Orders Count", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
