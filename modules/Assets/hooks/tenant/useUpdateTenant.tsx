import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateTenant() {
  return useMutation({
    mutationKey: ["update-tenant"],
    mutationFn: async ({
      tenantData,
      tenantId,
    }: {
      tenantData: any;
      tenantId: string;
    }) => {
      const cleanData = cleanUpdateData(tenantData);

      const response = await api.put(`/tenant/${tenantId}`, cleanData);
      return response.data.data;
    },
  });
}
