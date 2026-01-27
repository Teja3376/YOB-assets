import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-asset"],
    mutationFn: async ({
      assetData,
      assetId,
    }: {
      assetData: any;
      assetId: string;
    }) => {
      const cleanedData = cleanUpdateData(assetData);
      const response = await api.put(`/real-estate/${assetId}`, cleanedData);
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
