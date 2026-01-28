import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface AmenityPayload {
    name: string;
    description: string;
    image: string;
    status: boolean;
}


const useAmenties = () => {
    const queryClient = useQueryClient();
    const createAmenity = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: AmenityPayload }) => {
            const res = await api.post(`/amenity?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateAmenity = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: AmenityPayload }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/amenity/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteAmenity = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/amenity/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createAmenity, updateAmenity, deleteAmenity };
};

export default useAmenties;
