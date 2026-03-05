import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface InvestorListResponse {
  data: {
    _id: string;
    name: string;
    email: string;
    totalTokens: number;
    totalInvested: number;
    assetsInvested: string[];
    assetsCount: number;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const useInvesterList = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["investorList", page, limit, search],
      queryFn: async () => {
        try {
        const response = await api.get<InvestorListResponse>(
          `/issuerorders/investors?page=${page}&limit=${limit}&search=${search}`,
        );
          return response.data;
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Failed to fetch investor list");
          return null;
        }
      },
    staleTime: 1000 * 60 * 1,
  });
};

export default useInvesterList;
