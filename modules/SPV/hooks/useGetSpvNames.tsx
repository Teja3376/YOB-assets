import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpvNames() {
  return useQuery({
    queryKey: ["get-spv-names"],

    queryFn: async () => {
      const response = await api.get("/spv/names");
      return response.data.data;
    },
    staleTime: 3000,
  });
}
