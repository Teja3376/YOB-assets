import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetProposals = (daoAssetId: string) => {
  return useQuery({
    queryKey: ["proposals", daoAssetId],
    queryFn: async () => {
      const res = await api.get(`/dao/proposals/${daoAssetId}`);
      console.log(res.data.data);
      console.log("res is here why you are fear::",res);
      return res.data.data; 
    },
    enabled: !!daoAssetId, 
  });
};
