import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-vehicle"],
    mutationFn: async ({
      vehicleData,
      vehicleId,
    }: {
      vehicleData: any;
      vehicleId: string;
    }) => {
      const cleanedData = cleanUpdateData(vehicleData);
      const response = await api.put(`/vehicle/${vehicleId}`, cleanedData);
      return response.data.data;
    },
    onSuccess: async (data) => {
      const vehicleId = data?._id;
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      if (vehicleId) {
        queryClient.setQueryData(["vehicle", vehicleId], data);
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      }
    },
  });
}
