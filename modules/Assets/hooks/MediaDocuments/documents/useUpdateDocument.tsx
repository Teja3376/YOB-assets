import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateDocument() {
  return useMutation({
    mutationKey: ["update-document"],
    mutationFn: async ({
      documentData,
      documentId,
    }: {
      documentData: any;
      documentId: string;
    }) => {
      const cleanData = cleanUpdateData(documentData);

      const response = await api.put(`/assetDocument/${documentId}`, cleanData);
      return response.data.data;
    },
  });
}
