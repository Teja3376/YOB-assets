import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetSingleFileUrl(id: string) {
  return useQuery({
    queryKey: ["single-file-url", id],
    queryFn: async () => {
      const response = await api.get(`/S3-files/${id}/url`);
      return response.data;
    },
    enabled: !!id,
  });
};
