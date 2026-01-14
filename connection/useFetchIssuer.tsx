import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface IssuerUser {
  kycStatus: "approved" | "rejected" | "pending";
  _id: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  issuerApplication?: {
    status: "approved" | "rejected" | "pending";
  };
}

export interface IssuerMeResponse {
  success: boolean;
  data: {
    user: IssuerUser;
    issuerStatus?: "approved" | "rejected" | "pending";
    issuerApplication?: {
      status: "approved" | "rejected" | "pending";
    };
  };
}

const fetchIssuerMe = async (): Promise<IssuerMeResponse> => {
  const response = await api.get<IssuerMeResponse>("/auth-issuer/me");
  return response.data;
};

export const useFetchIssuer = () => {
  return useQuery({
    queryKey: ["issuer-me"],
    queryFn: fetchIssuerMe,
    retry: 1,
  });
};