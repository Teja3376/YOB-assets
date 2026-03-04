import {api} from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useInvestorCount() {
  return useQuery({
    queryKey: ["investorCount"],
    queryFn: async () => {
      try {
      const response = await api.get("/issuerorders/investment-stats");
        return response.data.data;
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch investor count");
        return null;
      }
    },
  });
}