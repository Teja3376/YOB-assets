import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateFee() {
  return useMutation({
    mutationKey: ["create-fee"],
    mutationFn: async ({
      feeData,
      assetId,
    }: {
      feeData: any;
      assetId: string;
    }) => {
      const response = await api.post(`/fee?assetId=${assetId}`, feeData);
      return response.data.data;
    },
  });
}
