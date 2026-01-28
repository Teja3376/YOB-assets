import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface ExitOpportunityPayload {
    name: string;
    description: string;
}


const useExitOpportunity = () => {
    const queryClient = useQueryClient();
    const createExitOpportunity = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: ExitOpportunityPayload }) => {
            const res = await api.post(`/exitOpportunity?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateExitOpportunity = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: ExitOpportunityPayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/exitOpportunity/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteExitOpportunity = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/exitOpportunity/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createExitOpportunity, updateExitOpportunity, deleteExitOpportunity };
};

export default useExitOpportunity;
