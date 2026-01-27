

import api from '@/lib/api-client';
import axios from 'axios';

const useSinglePresignedUrl = () => {
  const getSinglePresignedUrl = async ({
    fileName,
    mimeType,
    fileSize,
    refId,
    belongsTo,
    isPublic,
  }: {
    fileName: string;
    mimeType: string;
    fileSize: number;
    refId: string;
    belongsTo: string;
    isPublic: boolean;
  }) => {
    try {
      const response = await api.post(
        // 'https://staging-backend.ryzer.app/api/s3-file/upload-single',
        "/S3-files/upload-single",
        {
          fileName,
          mimeType,
          fileSize,
          refId,
          belongsTo,
          isPublic,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { getSinglePresignedUrl };
};
export default useSinglePresignedUrl;
