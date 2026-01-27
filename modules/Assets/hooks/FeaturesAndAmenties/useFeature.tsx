import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface FeaturePayload {
    name: string;
    description: string;
    image: string;
    status: boolean;
}


const useFeature = () => {
    const queryClient = useQueryClient();
    const createFeature = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: FeaturePayload }) => {
            const res = await api.post(`/feature?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateFeature = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: FeaturePayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/feature/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteFeature = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/feature/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createFeature, updateFeature, deleteFeature };
};

export default useFeature;
