import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateStructure() {
  return useMutation({
    mutationKey: ["update-due-diligence-structure"],
    mutationFn: async ({
      structureData,
      structureId,
    }: {
      structureData: any;
      structureId: string;
    }) => {
      const cleanData = cleanUpdateData(structureData);

      const response = await api.put(
        `/dueDiligenceStructure/${structureId}`,
        cleanData,
      );
      return response.data.data;
    },
  });
}
