import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { KybBody } from "../types/interfaces";

export const useKyb = () => {
    return useMutation({
        mutationFn: async (data: KybBody) => {
            const response = await api.post("/kyb/create-applicant", data);
            console.log("response", response.data);
            return response.data;
        }
    });
};