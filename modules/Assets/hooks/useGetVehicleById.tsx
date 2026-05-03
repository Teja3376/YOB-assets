import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetVehicleById(vehicleId: string) {
  return useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      const response = await api.get(`/vehicle/${vehicleId}`);
      return response.data.data;
    },
    refetchOnMount: "always",
    enabled: !!vehicleId,
  });
}
