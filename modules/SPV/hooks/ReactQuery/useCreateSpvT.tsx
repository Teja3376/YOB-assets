import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useCreateSpv = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/spv", data);
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Company created successfully!");
      router.push(`/spv/edit-spv/${data.data.id}`);
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },

    onError: (err: any) => {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: ["spv"] });
    },
  });

  return {
    createSpv: mutation.mutate,
    createSpvAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    responseData: mutation.data,
    error: mutation.error,
  };
};

export default useCreateSpv;
