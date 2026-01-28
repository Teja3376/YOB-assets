import { api } from "@/lib/api-client";
import { SpvPayload } from "@/modules/SPV/utils/global";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cleanUpdateData } from "@/helpers/global";
const useUpdateSpv = (spvId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<SpvPayload>) => {
      const cleanData = cleanUpdateData(payload);
      const res = await api.put(`/spv/${spvId}`, cleanData);
      return res.data.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["spv", spvId] });
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },

    onError: (err: any) => {
      const message =
        err.response?.data?.message || err.message || "Failed to update Spv";
      toast.error(message);
    },
  });
};

export default useUpdateSpv;
