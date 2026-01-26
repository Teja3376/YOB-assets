import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export interface AssetPayload {
  class: string;
  category: string;
  stage: string;
  style: string;
  name: string;
  about: string;
  currency: string;
  instrumentType: string;
  companyId: string;
  companyName?: string; // Add company name for IPFS metadata
  location?: {
    country: string;
    state: string;
    city: string;
    landmark: string;
  };
  [key: string]: any; // Allow any additional properties
}

export default function useCreateAsset() {
  return useMutation({
    mutationKey: ["create-asset"],
    mutationFn: async (assetData: AssetPayload) => {
      const response = await api.post("/real-estate", assetData);
      return response.data.data;
    },
  });
}
