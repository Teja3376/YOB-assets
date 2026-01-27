import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteDocument() {
  return useMutation({
    mutationKey: ["delete-document"],
    mutationFn: async (documentId: string) => {
      const response = await api.delete(`/assetDocument/${documentId}`);
      return response.data.data;
    },
  });
}
