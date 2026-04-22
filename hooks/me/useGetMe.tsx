import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/auth-issuer/me");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
