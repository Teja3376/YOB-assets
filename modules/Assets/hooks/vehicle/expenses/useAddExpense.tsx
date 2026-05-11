import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-expense-vehicle"],
    mutationFn: async ({
      expenseData,
      assetId,
    }: {
      expenseData: any;
      assetId: string;
    }) => {
      const response = await api.post(`/expense/vehicle?assetId=${assetId}`, expenseData);
      return response.data.data;
    },
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["asset"] });
    },
  });
}
