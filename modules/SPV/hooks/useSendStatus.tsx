import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { toast } from "sonner";

interface SendStatusPayload {
  spvId: string;
  status?: string; // default "Pending"
}

const useSendStatus = () => {
  return useMutation({
    mutationKey: ["send-spv-status"],
    mutationFn: async ({ spvId, status = "Pending" }: SendStatusPayload) => {
      const res = await api.post(
        `/spv-status`,
        { status },
        { params: { spvId } }
      );
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success(data?.message || "SPV status sent successfully");
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send SPV status";
      toast.error(message);
    },
  });
};

export default useSendStatus;

