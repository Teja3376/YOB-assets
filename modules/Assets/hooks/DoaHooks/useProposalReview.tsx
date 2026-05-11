import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProposalReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      proposalId,
      action,
    }: {
      proposalId: string;
      action: "approved" | "rejected";
    }) => {
      const res = await api.patch(
        `/dao/proposals/${proposalId}/review`,
        {
          action,
        }
      );

      return res.data;
    },

    onSuccess: (data) => {
      console.log("Review response:", data);

      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["proposals"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    },
  });
};