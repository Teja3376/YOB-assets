import { api } from "@/lib/api-client";
import { SpvPayload } from "@/modules/SPV/utils/global";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cleanUpdateData } from "@/helpers/global";
;

const useUpdateSpv = (spvId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: SpvPayload) => {
      const cleanData = cleanUpdateData(data);
      const res = await api.put(`/spv/${spvId}`, cleanData);
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Spv updated successfully");
      queryClient.invalidateQueries({ queryKey: ["spv", spvId] });
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },

    onError: (err: any) => {
      const message =
        err.response?.data?.message || err.message || "Failed to update Spv";
      toast.error(message);
    },
  });

  return {
    updateSpv: mutation.mutate,
    updateSpvAsync: mutation.mutateAsync,
    status: mutation.status,
    loading: mutation.isPending,
    error: mutation.error,
    responseData: mutation.data,
  };
};

export default useUpdateSpv;
