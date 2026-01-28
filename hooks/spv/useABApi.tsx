import { api } from "@/lib/api-client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success" | "error";

interface BoardMemberPayload {
  fullName: string;
  email: string;
  countryCode?: string;
  phoneNumber: string;
  idNumber: string;
  idProof?: any;
  role: string;
}

const useABApi = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const { id, spvId } = useParams();

  const createAB = async (data: BoardMemberPayload) => {
    setStatus("loading");
    setError(null);
    setResponseData(null);
    try {
      const effectiveSpvId = spvId ?? id;
      if (!effectiveSpvId) {
        throw new Error("SPV ID is required");
      }
      const res = await api.post(`/spv/${effectiveSpvId}/board-members`, data);
      setStatus("success");
      toast.success("Board member created successfully");
      setResponseData(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setStatus("error");
      const message =
        err.response?.data?.message || "Failed to create board member";
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const updateAB = async (index: number, data: Partial<BoardMemberPayload>) => {
    setStatus("loading");
    setError(null);
    setResponseData(null);
    try {
      const effectiveSpvId = spvId ?? id;
      if (!effectiveSpvId) {
        throw new Error("SPV ID is required");
      }
      const res = await api.put(`/spv/${effectiveSpvId}/board-members/${index}`, data);
      setStatus("success");
      toast.success("Board member updated successfully");
      setResponseData(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setStatus("error");
      const message =
        err.response?.data?.message || "Failed to update board member";
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  const deleteAB = async (id: string) => {
    setStatus("loading");
    setError(null);
    setResponseData(null);
    try {
      const res = await api.delete(`/spv/board-member/${id}`);
      setStatus("success");
      toast.success("Board member deleted successfully");
      setResponseData(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setStatus("error");
      const message =
        err.response?.data?.message || "Failed to delete board member";
      setError(message);
      toast.error(message);
      throw err;
    }
  };

  return { createAB, updateAB, deleteAB, status, error, responseData };
};

export { useABApi };
