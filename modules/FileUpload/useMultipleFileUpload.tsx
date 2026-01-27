

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface UploadPayload {
  url: string;
  file: File;
}

const useMultipleFileUpload = () => {
  return useMutation<any, Error, UploadPayload>({
    mutationFn: async ({ url, file }: UploadPayload) => {
      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log(response, 'response');
      return response;
    },
  });
};

export default useMultipleFileUpload;
