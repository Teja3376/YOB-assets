import {api} from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useInvestorCount() {
  return useQuery({
    queryKey: ["investorCount"],
    queryFn: async () => {
      const response = await api.get("/issuerorders/investment-stats");
      return response.data.data;
    },
  });
}