import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateValuation() {
  return useMutation({
    mutationKey: ["update-due-diligence-valuation"],
    mutationFn: async ({
      valuationData,
      valuationId,
    }: {
      valuationData: any;
      valuationId: string;
    }) => {
      const cleanData = cleanUpdateData(valuationData);

      const response = await api.put(
        `/dueDiligenceValuation/${valuationId}`,
        cleanData,
      );
      return response.data.data;
    },
  });
}
