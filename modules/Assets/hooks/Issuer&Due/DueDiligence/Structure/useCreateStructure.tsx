import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateStructure() {
  return useMutation({
    mutationKey: ["create-due-diligence-structure"],
    mutationFn: async ({
      structureData,
      assetId,
    }: {
      structureData: any;
      assetId: string;
    }) => {
      const response = await api.post(
        `/dueDiligenceStructure?assetId=${assetId}`,
        structureData,
      );
      return response.data.data;
    },
  });
}
