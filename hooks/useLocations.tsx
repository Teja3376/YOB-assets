import api from "@/lib/api-client";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface Location {
  label: string;
  value: string;
}

const handleError = (error: any, defaultMessage: string) => {
  console.error(defaultMessage, error);
  toast.error(
    `${error.response?.data?.message || error.message || defaultMessage}`
  );
};

const fetchCountries = async (): Promise<Location[]> => {
  try {
    const response = await api.get("/locations");
    return response.data.data;
  } catch (error) {
    handleError(error, "Failed to fetch countries");
    throw error;
  }
};

const fetchStates = async (countryCode: string): Promise<Location[]> => {
  try {
    const response = await api.get(`/locations?country=${countryCode}`);
    return response.data.data;
  } catch (error) {
    handleError(error, "Failed to fetch states");
    throw error;
  }
};

const fetchCities = async ({
  countryCode,
  stateCode,
}: {
  countryCode: string;
  stateCode: string;
}): Promise<Location[]> => {
  try {
    const response = await api.get(
      `/locations?country=${countryCode}&state=${stateCode}`
    );
    return response.data.data;
  } catch (error) {
    handleError(error, "Failed to fetch cities");
    throw error;
  }
};

const useLocations = () => {
  const countriesQuery = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: Infinity,
  });

  const useStates = (countryCode?: string) =>
    useQuery({
      queryKey: ["states", countryCode],
      queryFn: () => fetchStates(countryCode!),
      enabled: !!countryCode,
      staleTime: Infinity,
    });

  const useCities = (countryCode?: string, stateCode?: string) =>
    useQuery({
      queryKey: ["cities", countryCode, stateCode],
      queryFn: () => fetchCities({ countryCode: countryCode!, stateCode: stateCode! }),
      enabled: !!countryCode && !!stateCode,
      staleTime: Infinity,
    });

  return {
    countries: countriesQuery.data ?? [],
    countriesQuery,
    useStates,
    useCities,
  };
};

export default useLocations;
