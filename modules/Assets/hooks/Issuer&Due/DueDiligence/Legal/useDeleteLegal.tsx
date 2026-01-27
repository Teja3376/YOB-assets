import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteLegal() {
  return useMutation({
    mutationKey: ["delete-legal"],
    mutationFn: async (legalId: string) => {
      const response = await api.delete(`/dueDiligenceLegal/${legalId}`);
      return response.data.data;
    },
  });
}
