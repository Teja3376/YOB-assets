import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteValuation() {
  return useMutation({
    mutationKey: ["delete-valuation"],
    mutationFn: async (valuationId: string) => {
      const response = await api.delete(
        `/dueDiligenceValuation/${valuationId}`,
      );
      return response.data.data;
    },
  });
}
