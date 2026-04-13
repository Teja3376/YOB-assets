import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useWaitlistRegistrations(
  assetId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["waitlist-registrations", assetId],
    queryFn: async () => {
      const response = await api.get(
        `/real-estate/waitlist/registrations?assetId=${encodeURIComponent(assetId)}`,
      );
      return response.data;
    },
    enabled: Boolean(assetId) && enabled,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
