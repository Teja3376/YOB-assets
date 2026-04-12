import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** Matches Nest `SoftcapDecisionDto`: close at soft cap vs continue toward base property value. */
export type SoftcapDecisionPayload = {
  closeInvestment: boolean;
};

/**
 * `closeInvestment: true` — close investment at soft cap (no further investors).
 * `closeInvestment: false` — continue fundraising toward base property value.
 */
export function useIssuerSoftcapDecision(assetId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["issuer-softcap-decision", assetId],
    mutationFn: async (closeInvestment: boolean) => {
      if (!assetId) throw new Error("Missing asset id");
      const body: SoftcapDecisionPayload = { closeInvestment };
      const response = await api.patch(
        `/real-estate/${assetId}/softcap-decision`,
        body,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["overview", assetId] });
      queryClient.invalidateQueries({ queryKey: ["asset", assetId] });
    },
  });
}
