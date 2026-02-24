import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { usePathname } from "next/navigation";

export interface IssuerUser {
  kycStatus: "approved" | "rejected" | "pending" | "no_application";
  _id: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  iskyb?: boolean;
  companyName?: string;
  companyCountry?: string;
  issuerApplication?: {
    status: "approved" | "rejected" | "pending";
  };
}

export interface IssuerMeResponse {
  success: boolean;
  data: {
    user: IssuerUser;
    issuerStatus?: "approved" | "rejected" | "pending" | "no_application";
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
  const pathname = usePathname();
  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;

  const publicPages = ["/login", "/register", "/otp", "/loginotp", "/"];
  const isPublicPage = publicPages.includes(pathname);

  return useQuery({
    queryKey: ["issuer-me"],
    queryFn: fetchIssuerMe,
    retry: 1,
    enabled: !!accessToken && !isPublicPage,
  });
};
