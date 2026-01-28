import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useCheckTokenSymbol() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post("/real-estate/check-token-symbol", payload);
      return res.data;
    },
  });
};
