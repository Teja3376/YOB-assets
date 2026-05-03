import { cleanUpdateData } from "@/helpers/global";
import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-vehicle"],
    mutationFn: async (vehicleData: any) => {
      const cleaned = cleanUpdateData(vehicleData);
      const response = await api.post("/vehicle/create", cleaned);
      return response.data.data;
    },
    onSuccess: async (data) => {
      const vehicleId = data?._id;
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      if (vehicleId) {
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      }
    },
  });
}
