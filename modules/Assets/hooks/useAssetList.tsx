import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api-client";

type GetAssetListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export const useAssetList = ({
  page = 1,
  limit = 10,
  search = "",
  status = "active",
}: GetAssetListParams) => {
  return useQuery({
    queryKey: ["assetList", page, limit, search, status],
    queryFn: async () => {
      const res = await api.get(
        `/real-estate?page=${page}&limit=${limit}&search=${search}&status=${status}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });
};
