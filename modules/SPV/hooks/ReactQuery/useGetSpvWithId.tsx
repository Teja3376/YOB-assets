import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const useGetSpvWithId = (id: string) => {
  const query = useQuery({
    queryKey: ["spv", id],
    queryFn: async () => {
      const res = await api.get(`/spv/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  return {
    status: query.status,
    loading: query.isLoading,
    error: query.error,
    responseData: query.data,
    refetch: query.refetch,
  };
};

export default useGetSpvWithId;
