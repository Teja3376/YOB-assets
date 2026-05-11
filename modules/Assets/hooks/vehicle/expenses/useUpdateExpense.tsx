import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateExpense() {
  return useMutation({
    mutationKey: ["update-expense-vehicle"],
    mutationFn: async ({
      expenseData,
      expenseId,
    }: {
      expenseData: any;
      expenseId: string;
    }) => {
      const cleanData = cleanUpdateData(expenseData);

      const response = await api.put(`/expense/vehicle/${expenseId}`, cleanData);
      return response.data.data;
    },
  });
}
