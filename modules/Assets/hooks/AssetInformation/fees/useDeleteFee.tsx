import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFee(){
    return useMutation({
        mutationKey: ["delete-fee"],
        mutationFn: async (feeId: string) => {
            const response = await api.delete(`/fee/${feeId}`);
            return response.data.data;
        },
    })
}