import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetOverview = (assetId: string) => {
  return useQuery({
    queryKey: ["overview",assetId],
    queryFn: async () => {
      const response = await api.get(`/assetDashboard/overview?assetId=${assetId}`);
      console.log("overviewDetails", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
