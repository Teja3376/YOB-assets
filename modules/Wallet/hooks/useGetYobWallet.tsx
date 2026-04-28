import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetYobWallet() {
  return useQuery({
    queryKey: ["get-yob-wallet"],
    queryFn: async () => {
      const res = await api.get("/yob-pay/issuer/wallet");
      return res.data;
    },
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });
}
