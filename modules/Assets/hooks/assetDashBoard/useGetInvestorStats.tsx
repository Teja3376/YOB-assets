import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetInvestorsStats = (assetId: string) => {
  return useQuery({
    queryKey: ["investors-stats",assetId],
    queryFn: async () => {
      const response = await api.get(`/assetDashboard/investors/stats?assetId=${assetId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!assetId,
  });
};
