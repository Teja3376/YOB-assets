import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export interface Application {
  _id: string;
  applicationId: string;
  userId: string;
  email: string;
  phoneNumber: string;
  phoneCountryCode: string;
  legalEntityName: string;
  countryOfIncorporation: string;
  assetCategory: string;
  shortAssetDescription: string;
  status: "pending" | "approved" | "rejected" | "in_review";
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  kycStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MyApplicationsResponse {
  success: boolean;
  data: {
    data: Application[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
    user: User | {
      user: User;
      issuerStatus?: string;
    };
  };
}

const fetchMyApplications = async (): Promise<MyApplicationsResponse> => {
  const response = await api.get<MyApplicationsResponse>(
    "/issuer-applications/my-applications"
  );
  return response.data;
};

export const useFetchMyApplication = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: fetchMyApplications,
    retry: 1,
  });
};
