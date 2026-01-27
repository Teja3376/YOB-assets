import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetAssetById(assetId: string) {
  return useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const response = await api.get(`/real-estate/${assetId}`);
      return response.data.data;
    },
    enabled: !!assetId,
    staleTime: 5 * 60 * 1000, 
  });
}
