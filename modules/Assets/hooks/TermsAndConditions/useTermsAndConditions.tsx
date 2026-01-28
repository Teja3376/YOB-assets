import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface TermsPayload {
    title: string;
    description: string;
}


const useTermsAndConditions = () => {
    const queryClient = useQueryClient();
    const createTermsAndConditions = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: TermsPayload }) => {
            const res = await api.post(`/termsAndConditions?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateTermsAndConditions = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: TermsPayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/termsAndConditions/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteTermsAndConditions = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/termsAndConditions/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createTermsAndConditions, updateTermsAndConditions, deleteTermsAndConditions };
};

export default useTermsAndConditions;
