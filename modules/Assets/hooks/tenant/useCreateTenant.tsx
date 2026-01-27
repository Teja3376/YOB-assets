import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateTenant() {
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
  });
}
