import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api-client";

// Create axios instance for issuer applications API

export interface IssuerApplicationData {
  legalEntityName: string;
  countryOfIncorporation: string;
  email: string;
  assetCategory: string;
  shortAssetDescription: string;
  phoneCountryCode: string;
  phoneNumber: string;
}

export interface IssuerApplicationResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    applicationId: string;
    userId: string;
    email: string;
    legalEntityName: string;
    countryOfIncorporation: string;
    assetCategory: string;
    shortAssetDescription: string;
    status: string;
    submittedAt: string;
  };
}

const useIssuerRequestApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = async (
    data: IssuerApplicationData,
  ): Promise<IssuerApplicationResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<IssuerApplicationResponse>(
        "/issuer-applications",
        data,
      );
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit application";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitApplication,
    loading,
    error,
  };
};

export default useIssuerRequestApi;
