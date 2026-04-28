import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useWithdrawYob() {
  return useMutation({
    mutationKey: ["withdraw-yob"],
    mutationFn: async ({
      amount,
      destinationAddress,
      paymentReason,
    }: {
      amount: string;
      destinationAddress: string;
      paymentReason: string;
    }) => {
      const response = await api.post("/yob-pay/issuer/send-crypto", {
        amount,
        destinationAddress,
        paymentReason,
      });
      return response.data;
    },
    throwOnError: false,
  });
}
