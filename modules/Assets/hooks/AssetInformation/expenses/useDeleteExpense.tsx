import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteExpense() {
  return useMutation({
    mutationKey: ["delete-expense"],
    mutationFn: async (expenseId: string) => {
      const response = await api.delete(`/expense/${expenseId}`);
      return response.data.data;
    },
  });
}
