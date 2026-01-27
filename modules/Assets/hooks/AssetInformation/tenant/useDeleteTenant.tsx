import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteTenant() {
  return useMutation({
    mutationKey: ["delete-tenant"],
    mutationFn: async (tenantId: string) => {
      const response = await api.delete(`/tenant/${tenantId}`);
      return response.data.data;
    },
  });
}
