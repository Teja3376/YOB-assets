import api from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export interface FileInput {
  fileName: string;
  mimeType: string;
  fileSize: number;
  refId: string;
  belongsTo: string;
  isPublic: boolean;
  metadata?: Record<string, any>;
}

export interface PresignedResponse {
  uploadUrl: string;
  assetS3Object: {
    _id: string;
    [key: string]: any;
  };
}

const useMultiplePresignedUrl = () => {
  return useMutation<PresignedResponse[], Error, FileInput[]>({
    mutationFn: async (files: FileInput[]) => {
      const response = await api.post('/S3-files/bulk-upload', {
        files,
      });

      return response.data;
    },
  });
};

export default useMultiplePresignedUrl;
