import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface RiskDisclosurePayload {
    name: string;
    description: string;
}


const useRiskDisclosure = () => {
    const queryClient = useQueryClient();
    const createRiskDisclosure = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: RiskDisclosurePayload }) => {
            const res = await api.post(`/riskDisclosure?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateRiskDisclosure = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: RiskDisclosurePayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/riskDisclosure/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteRiskDisclosure = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/riskDisclosure/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createRiskDisclosure, updateRiskDisclosure, deleteRiskDisclosure };
};

export default useRiskDisclosure;
