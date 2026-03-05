import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetAssetBasic(assetId: string) {
  return useQuery({
    queryKey: ["asset-basic", assetId],
    queryFn: async () => {
      const response = await api.get(
        `/assetDashboard/basicdetails?assetId=${assetId}`,
      );
      return response.data;
    },
     staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!assetId,
  });
}
