import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateFee() {
  return useMutation({
    mutationKey: ["update-fee-vehicle"],
    mutationFn: async ({ feeData, feeId }: { feeData: any; feeId: string }) => {
      const cleanData = cleanUpdateData(feeData);
      const data = { ...cleanData, type: "fee" };
      const response = await api.put(`/vehicle/fee/${feeId}`, data);
      return response.data.data;
    },
  });
}
