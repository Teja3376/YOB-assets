import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useAddFee() {
  return useMutation({
    mutationKey: ["add-fee-vehicle"],
    mutationFn: async ({
      feeData,
      assetId,
    }: {
      feeData: any;
      assetId: string;
    }) => {
      const data = { ...feeData, type: "fee" };
      const response = await api.post(
        `/vehicle/fee?vehicleId=${assetId}`,
        data,
      );
      return response.data.data;
    },
  });
}
