import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UploadFilePayload {
  url: string;
  file: File;
}
export default function useSingleFileUpload() {
  return useMutation({
    mutationFn: async ({ url, file }: UploadFilePayload) => {
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      return response.data;
    },
  });
}
