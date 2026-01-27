import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useSendApproval() {
  return useMutation({
    mutationKey: ["send-approval"],
    mutationFn: async ({
      assetId,
      sendApprovalData,
    }: {
      assetId: string;
      sendApprovalData: any;
    }) => {
      const response = await api.post(
        `/asset-approval?assetId=${assetId}`,
        sendApprovalData,
      );
      return response.data.data;
    },
  });
}
