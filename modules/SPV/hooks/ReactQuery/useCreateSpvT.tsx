import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateSpv = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/spv", data);
      return res.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },

    onError: (err: any) => {
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },
  });
};

export default useCreateSpv;
