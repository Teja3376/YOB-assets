import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateExpense() {
  return useMutation({
    mutationKey: ["update-expense"],
    mutationFn: async ({
      expenseData,
      expenseId,
      rentalInformation,
    }: {
      expenseData: any;
      expenseId: string;
      rentalInformation:any;
    }) => {
      const cleanData = cleanUpdateData({
  ...expenseData,  
  rentalInformation,
});

      const response = await api.put(`/expense/${expenseId}`, cleanData);
      return response.data.data;
    },
  });
}
