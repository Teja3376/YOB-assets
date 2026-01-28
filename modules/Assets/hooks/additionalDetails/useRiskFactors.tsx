import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface RiskFactorsPayload {
    name: string;
    description: string;
}


const useRiskFactors = () => {
    const queryClient = useQueryClient();
    const createRiskFactors = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: RiskFactorsPayload }) => {
            const res = await api.post(`/riskFactor?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateRiskFactors = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: RiskFactorsPayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/riskFactor/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteRiskFactors = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/riskFactor/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createRiskFactors, updateRiskFactors, deleteRiskFactors };
};

export default useRiskFactors;
