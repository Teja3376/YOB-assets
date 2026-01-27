import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SinglePresignedUrlPayload {
  fileName: string;
  mimeType: string;
  fileSize: number;
  refId: string;
  belongsTo: string;
  isPubilc: boolean;
}

export default function useSinglePresignedUrl() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.post(
        "/S3-files/upload-single",
        payload
      );    
      return response.data;
    },
  });
};
