import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const useGetAssetMembers = (assetId: string) =>{
    return useQuery({
        queryKey: ["assetMembers", assetId],
        queryFn: async () => {
            const res = await api.get(`/dao/issuer/members/${assetId}`);
            console.log(res,"hey how are you");
            return res.data;
        },
        enabled: !!assetId,
    });

}