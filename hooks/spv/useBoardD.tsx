import { api } from "@/lib/api-client";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BoardMemberPayload {
    fullName: string;
    email: string;
    countryCode?: string;
    phoneNumber: string;
    idNumber: string;
    idProof?: any;
    role: string;
}

const createABRequest = async ({
    spvId,
    data,
}: {
    spvId: string;
    data: BoardMemberPayload;
}) => {
    const res = await api.post(`/spv/${spvId}/board-members`, data);
    return res.data.data;
};

const updateABRequest = async ({
    id,
    data,
}: {
    id: string;
    data: Partial<BoardMemberPayload>;
}) => {
    const res = await api.put(`/spv/board-member/${id}`, data);
    return res.data.data;
};

const deleteABRequest = async (id: string) => {
    const res = await api.delete(`/spv/board-member/${id}`);
    return res.data.data;
};

const useABApi = () => {
    const { id, spvId } = useParams();
    const queryClient = useQueryClient();
    const effectiveSpvId = (spvId ?? id) as string;

    const createMutation = useMutation({
        mutationFn: async (data: BoardMemberPayload) => {
            const res = await createABRequest({ spvId: effectiveSpvId, data });
            return res.data.data;

        },

        onSuccess: () => {
            toast.success("Board member created successfully");
            queryClient.invalidateQueries({ queryKey: ["spv"] });
        },

        onError: (err: any) => {
            const message =
                err.response?.data?.message || "Failed to create board member";
            toast.error(message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const res = await updateABRequest({ id, data });
            return res.data.data;
        },

        onSuccess: () => {
            toast.success("Board member updated successfully");
            queryClient.invalidateQueries({ queryKey: ["spv"] });
        },

        onError: (err: any) => {
            const message =
                err.response?.data?.message || "Failed to update board member";
            queryClient.invalidateQueries({ queryKey: ["spv"] });
            toast.error(message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await deleteABRequest(id);
            return res.data.data;
        },

        onSuccess: () => {
            toast.success("Board member deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["spv"] });
        },

        onError: (err: any) => {
            const message =
                err.response?.data?.message || "Failed to delete board member";
            queryClient.invalidateQueries({ queryKey: ["spv"] });
            toast.error(message);
        },
    });

    return {
        createAB: createMutation.mutate,
        createABAsync: createMutation.mutateAsync,

        updateAB: updateMutation.mutate,
        updateABAsync: updateMutation.mutateAsync,

        deleteAB: deleteMutation.mutate,
        deleteABAsync: deleteMutation.mutateAsync,

        status:
            createMutation.status ||
            updateMutation.status ||
            deleteMutation.status,

        loading:
            createMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending,

        error:
            createMutation.error ||
            updateMutation.error ||
            deleteMutation.error,

        responseData:
            createMutation.data ||
            updateMutation.data ||
            deleteMutation.data,
    };
};

export { useABApi };
