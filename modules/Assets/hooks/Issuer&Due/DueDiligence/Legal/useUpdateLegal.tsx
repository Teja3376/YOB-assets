import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export function useUpdateLegal() {
  return useMutation({
    mutationKey: ["update-due-diligence-legal"],
    mutationFn: async ({
      legalData,
      legalId,
    }: {
      legalData: any;
      legalId: string;
    }) => {
      const cleanData = cleanUpdateData(legalData);

      const response = await api.put(
        `/dueDiligenceLegal/${legalId}`,
        cleanData,
      );
      return response.data.data;
    },
  });
}
