import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateDocument() {
  return useMutation({
    mutationKey: ["create-document"],
    mutationFn: async ({
      documentData,
      assetId,
    }: {
      documentData: any;
      assetId: string;
    }) => {
      const response = await api.post(`/assetDocument?assetId=${assetId}`, documentData);
      return response.data.data;
    },
  });
}
