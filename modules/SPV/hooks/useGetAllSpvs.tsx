import api from "@/lib/api-client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export interface SpvQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string | string[];
  status?: string;
}

export default function useGetAllSpvs(params: SpvQueryParams) {
  return useQuery({
    queryKey: ["get-all-spvs", params],

    queryFn: async () => {
      const response = await api.get("/spv/spv-list", {
        params,
      });

      return response.data.data;
    },

    placeholderData: keepPreviousData,
  });
}
