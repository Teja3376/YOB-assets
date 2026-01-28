import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateLegal() {
  return useMutation({
    mutationKey: ["create-due-diligence-legal"],
    mutationFn: async ({
      legalData,
      assetId,
    }: {
      legalData: any;
      assetId: string;
    }) => {
      const response = await api.post(
        `/dueDiligenceLegal?assetId=${assetId}`,
        legalData,
      );
      return response.data.data;
    },
  });
}
