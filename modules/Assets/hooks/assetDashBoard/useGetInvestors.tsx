import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetInvestors = (
  assetId: string,
  page: number = 1,
  limit: number = 10,
  searchTerm: string,
) => {
  return useQuery({
    queryKey: ["asset-investors", assetId, page, limit, searchTerm],
    queryFn: async () => {
      const response = await api.get(
        `/assetDashboard/investors?assetId=${assetId}&page=${page}&limit=${limit}&search=${searchTerm}`,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!assetId,
  });
};
