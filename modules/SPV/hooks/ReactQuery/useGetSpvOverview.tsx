import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpvOverview(spvId: string) {
  return useQuery({
    queryKey: ["spv-overview", spvId],
    queryFn: async () => {
      const response = await api.get(`/spvDashboard/details?spvId=${spvId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!spvId,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
