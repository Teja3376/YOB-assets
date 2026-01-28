import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
export default function useUpdateTokenSymbol() {
    return useMutation({
        mutationFn: async (payload: any) => {
            const { assetId, symbol } = payload;
            const res = await api.put(`/real-estate/${assetId}/token-symbol`, { symbol });
            return res.data;
        },
    });
};
