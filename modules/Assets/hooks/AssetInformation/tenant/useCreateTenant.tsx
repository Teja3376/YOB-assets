import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTenant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-tenant"],
    mutationFn: async ({
      tenantData,
      assetId,
    }: {
      tenantData: any;
      assetId: string;
    }) => {
      const response = await api.post(`/tenant?assetId=${assetId}`, tenantData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset"] });
    },
  });
}
