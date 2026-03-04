import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetInvestors = (assetId: string) => {
  return useQuery({
    queryKey: ["Investors",assetId],
    queryFn: async () => {
      const response = await api.get(`/assetDashboard/investors?assetId=${assetId}`);
      console.log("InvestorsDetails", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
