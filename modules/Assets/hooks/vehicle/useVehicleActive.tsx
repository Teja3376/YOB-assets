import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useVehicleActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["activate-vehicle"],
    mutationFn: async ({
      assetId,
      status,
    }: {
      assetId: string;
      status: string;
    }) => {
      const response = await api.post(`vehicle/active/${assetId}`, {
        status,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assetList"] });
    },
  });
}
