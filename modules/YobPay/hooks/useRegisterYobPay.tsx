import api from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export default function useRegisterYobPay() {
  return useMutation({
    mutationKey: ["registerYobPay"],
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      countryCode: string;
      email: string;
      company: string;
    }) => {
      const res = await api.post("/yob-pay/issuer/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        countryCode: data.countryCode,
        email: data.email,
        type: "CORPORATE",
        company: data.company,
      });
      return res.data;
    },
  });
}
