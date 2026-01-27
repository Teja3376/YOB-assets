import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteStructure() {
  return useMutation({
    mutationKey: ["delete-structure"],
    mutationFn: async (structureId: string) => {
      const response = await api.delete(
        `/dueDiligenceStructure/${structureId}`,
      );
      return response.data.data;
    },
  });
}
