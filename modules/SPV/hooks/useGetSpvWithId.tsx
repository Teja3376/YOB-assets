import { api } from "@/lib/api-client";
import { SpvPayload } from "../utils/global";
import { useState } from "react";
import { toast } from "sonner";
import { SPVType } from "../utils/global";
type Status = 'idle' | 'loading' | 'success' | 'error';



const useGetSpvWithId = () => {
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<any>(null);

    const getSpvWithId = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/spv/${id}`);
      setStatus('success');
      setResponseData(res.data.data);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch Spv'
      );
      throw err;
    } 
  }
  return { getSpvWithId, status, error, responseData };
};

export default useGetSpvWithId;