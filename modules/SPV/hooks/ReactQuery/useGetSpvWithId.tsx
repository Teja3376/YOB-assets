import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const useGetSpvWithId = (id: string) => {
  return useQuery({
    queryKey: ["spv", id],
    queryFn: async () => {
      const res = await api.get(`/spv/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });


};

export default useGetSpvWithId;
