import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useInvestorById(investorId: string) {
  return useQuery({
    queryKey: ["investorById", investorId],
    queryFn: async () => {
      const response = await api.get(`/issuerorders/investor/${investorId}`);
      return response.data;
    },
  });
}