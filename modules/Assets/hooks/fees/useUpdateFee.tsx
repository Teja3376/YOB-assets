import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateFee() {
  return useMutation({
    mutationKey: ["update-fee"],
    mutationFn: async ({ feeData, feeId }: { feeData: any; feeId: string }) => {
      const response = await api.put(`/fee/${feeId}`, feeData);
    },
  });
}
