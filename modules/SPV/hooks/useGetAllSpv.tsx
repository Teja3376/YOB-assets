import { api } from "@/lib/api-client";
import { useState } from "react";
import { toast } from "sonner";
type Status = 'idle' | 'loading' | 'success' | 'error';

const useGetAllSpv = () => {
  const [getAllSpvStatus, setGetAllSpvStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  
  const getAllSpv = async ({
    page = 1,
    limit = 10,
    type,
    status,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string[];
    search?: string;
  } = {}) => {
    setGetAllSpvStatus('loading');
    setError(null);
    setResponseData(null);
    try {
      const params = new URLSearchParams();
      if (type) {
        type.forEach((t) => {
          params.append('type', t);
        });
      }
      if (status) {
        params.append('status', status);
      }
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (search) {
        params.append('search', search);
      }
      const queryString = params.toString();
      const res = await api.get(`/spv/spv-list?${queryString}`);
      
      setGetAllSpvStatus('success');
      // Handle both nested (res.data.data) and flat (res.data) response structures
      const responseData = res.data?.data || res.data || [];
      setResponseData(responseData);
      return responseData;
    } catch (err: any) {
      setGetAllSpvStatus('error');
      toast.error(
        err.response?.data?.message || err.message || 'Failed to fetch Spv list'
      );
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch Spv list'
      );
      throw err;
    } finally {
      setGetAllSpvStatus('idle');
    }
  };
  
  return { getAllSpv, getAllSpvStatus, error, responseData };
};

export default useGetAllSpv;