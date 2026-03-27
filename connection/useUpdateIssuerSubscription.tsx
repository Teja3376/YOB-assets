import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface UpdateIssuerSubscriptionBody {
  subscription: boolean;
  paidAmount: number;
}

/** Shape returned in `data` from PUT /auth-issuer/subscription */
export interface IssuerSubscriptionData {
  iskyb: boolean;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  kycStatus: string;
  createdAt: string;
  updatedAt: string;
  paidAmount: number;
  subscription: boolean;
  id: string;
}

export interface UpdateIssuerSubscriptionResponse {
  success: boolean;
  message: string;
  data: IssuerSubscriptionData;
}

async function updateIssuerSubscription(
  body: UpdateIssuerSubscriptionBody,
): Promise<UpdateIssuerSubscriptionResponse> {
  const response = await api.put<UpdateIssuerSubscriptionResponse>(
    "/auth-issuer/subscription",
    body,
  );
  return response.data;
}

export function useUpdateIssuerSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth-issuer", "subscription"],
    mutationFn: updateIssuerSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issuer-me"] });
    },
  });
}
