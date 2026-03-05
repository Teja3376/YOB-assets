import api from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderList(
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = "",
  status: string = "",
  fromDate?: Date,
  toDate?: Date,
) {
  return useQuery({
    queryKey: ["orders", page, pageSize, searchQuery, status, fromDate, toDate],
    queryFn: async () => {
      const res = await api.get(
        `/issuerorders/all?page=${page}&limit=${pageSize}&search=${searchQuery}&status=${status}${fromDate ? `&startDate=${fromDate.toISOString()}` : ""}${toDate ? `&endDate=${toDate.toISOString()}` : ""}`,
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
