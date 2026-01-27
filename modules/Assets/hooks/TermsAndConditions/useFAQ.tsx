import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface FAQPayload {
    question: string;
    answer: string;
}


const useFAQ = () => {
    const queryClient = useQueryClient();
    const createFAQ = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: FAQPayload }) => {
            const res = await api.post(`/faq?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateFAQ = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: FAQPayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/faq/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteFAQ = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/faq/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createFAQ, updateFAQ, deleteFAQ };
};

export default useFAQ;
