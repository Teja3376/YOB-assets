import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetPlaces({
  assetId,
  lat,
  lng,
}: {
  assetId: string;
  lat: string;
  lng: string;
}) {
  return useQuery({
    queryKey: ["nearby-places"],
    queryFn: async () => {
      const res = await api.get(
        `/nearByLocation/places?assetId=${assetId}&lat=${lat}&lng=${lng}`,
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!assetId && !!lat && !!lng, 
  });
}
