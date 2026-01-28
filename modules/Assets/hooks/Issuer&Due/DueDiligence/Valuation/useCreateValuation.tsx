import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateValuation() {
  return useMutation({
    mutationKey: ["create-due-diligence-valuation"],
    mutationFn: async ({
      valuationData,
      assetId,
    }: {
      valuationData: any;
      assetId: string;
    }) => {
      const response = await api.post(
        `/dueDiligenceValuation?assetId=${assetId}`,
        valuationData,
      );
      return response.data.data;
    },
  });
}
