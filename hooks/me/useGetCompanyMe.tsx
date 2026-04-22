import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetCompanyMe() {
  return useQuery({
    queryKey: ["company-me"],
    queryFn: async () => {
      const response = await api.get("/auth-issuer/me/company");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
