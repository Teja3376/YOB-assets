import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Asset {
  _id: string;
  status: string;
  name: string;
  country: string;
  state: string;
  city: string;
  landmark: string;
  createdAt: string;
  updatedAt: string;
  completedSteps: string[];
  completedStepsCount: number;
  totalSteps: number;
  totalTokens: number;
  availableTokensToBuy: number;
  blockchainProjectAddress: string | null;
  percentageOfTokensSold: number;
  orderCount: number;
  uniqueInvestorCount: number;
}

export interface AssetResponse {
  data: Asset[];
  pagination: {
    page: number;
    limit: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
    totalPages: number;
  };
  message: string;
}

const fetchAdminAssets = async (status: string, page: number, limit: number): Promise<AssetResponse> => {
  const res = await api.get(
    `/real-estate/asset-list?status=${status}&page=${page}&limit=${limit}`
  );
  return res.data;
};

export const useAssetList = ({ status, page, limit }: { status: string; page: number; limit: number }) => {
  return useQuery({
    queryKey: ["assetList", status, page, limit],
    queryFn: () => fetchAdminAssets(status, page, limit),
  });
};
