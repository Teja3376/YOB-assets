

import api from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

const useGetMultipleFileUrl = () => {
  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const response = await api.get(
        // `https://staging-backend.ryzer.app/api/s3-file/${id}/s3Url`
        `/S3-files/${id}/url`
      );
      return response.data;
    },
  });
};

export default useGetMultipleFileUrl;

