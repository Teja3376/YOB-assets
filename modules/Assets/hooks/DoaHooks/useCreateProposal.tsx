import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateProposalPayload = {
  proposalName: string;
  description: string;
  endTime: {
    days: number;
    hours: number;
  };
  quorum: number;
  decisionType: string;
  governanceModel: string;
};

export const useCreateProposal = (daoAssetId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProposalPayload) => {
      const res = await api.post(
        `/dao/issuer/proposals/${daoAssetId}`,
        payload
      );

      return res.data; // ✅ FULL response
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["proposals", daoAssetId],
      });
    },
  });
};
