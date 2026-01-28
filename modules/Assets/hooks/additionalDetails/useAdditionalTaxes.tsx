import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api-client";
import { cleanUpdateData } from "@/helpers/global";

interface AdditionalTaxesPayload {
    name: string;
    value: number;
}


const useAdditionalTaxes = () => {
    const queryClient = useQueryClient();
    const createAdditionalTaxes = useMutation({
        mutationFn: async ({ assetId, payload }: { assetId: string; payload: AdditionalTaxesPayload }) => {
            const res = await api.post(`/additional-tax?assetId=${assetId}`, payload);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const updateAdditionalTaxes = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: AdditionalTaxesPayload

         }) => {
            const cleanedData = cleanUpdateData(payload);
            const res = await api.put(`/additional-tax/${id}`, cleanedData);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    const deleteAdditionalTaxes = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/additional-tax/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["asset"] });
        },
    });

    return { createAdditionalTaxes, updateAdditionalTaxes, deleteAdditionalTaxes };
};

export default useAdditionalTaxes;
