import { api } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const useCreateSpv = () => {
    const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  const createSpv = async (data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    try {
      const res = await api.post('/spv', data);
      if (res) {
        setResponseData(res.data);
        toast.success('Company created successfully!');
         router.push(`/spv/edit-spv/${res.data.data.id}`);
        return res.data; // Return the response data
      } else {
        toast.error('Something went wrong');
        throw new Error('Something went wrong');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
      throw err; // Re-throw the error so the caller can handle it
    } finally {
      console.log('finally is called');
      console.log(loading)
      setLoading(false);
    }
  };

  return { createSpv, loading, responseData, error };
};

export default useCreateSpv;