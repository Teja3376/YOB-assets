import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateFee() {
  return useMutation({
    mutationKey: ["update-fee"],
    mutationFn: async ({ feeData, feeId }: { feeData: any; feeId: string }) => {
      const cleanData = cleanUpdateData(feeData);
      const data = { ...cleanData, type: feeData.type };
      const response = await api.put(`/fee/${feeId}`, data);
      return response.data.data;
    },
  });
}
