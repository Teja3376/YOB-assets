import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateExpense() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-expense"],
    mutationFn: async ({
      expenseData,
      assetId,
    }: {
      expenseData: any;
      assetId: string;
    }) => {
      const response = await api.post(`/expense?assetId=${assetId}`, expenseData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset"] });
    },
  });
}
