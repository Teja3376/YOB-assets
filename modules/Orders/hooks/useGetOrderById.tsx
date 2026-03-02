import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderById(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await api.get(`/issuerorders/details/${orderId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!orderId,
  });
}
