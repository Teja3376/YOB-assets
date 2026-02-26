import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useGetOrdersStats() {
  return useQuery({
    queryKey: ["orders-stats"],
    queryFn: async () => {
      const response = await api.get("/issuerorders/status-count");
      return response.data.data;
    },
    staleTime: 1 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
