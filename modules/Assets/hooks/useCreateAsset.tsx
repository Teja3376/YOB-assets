import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-asset"],

    mutationFn: async (assetData) => {
      const response = await api.post("/real-estate", assetData);
      return response.data.data;
    },

    onSuccess: async (data) => {
      const assetId = data?._id;

      // Refresh asset list
      queryClient.invalidateQueries({ queryKey: ["asset"] });

      // Cache the created asset detail
      if (assetId) {
        queryClient.setQueryData(["asset", assetId], data);
      }
    },
  });
}
