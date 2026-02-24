"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import GetStartedLayout from "@/components/layout/get-started";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CountrySelect } from "../components/CountrySelect";
import { Card, CardContent } from "@/components/ui/card";
import { useKyb } from "../hooks/useKyb";
import { useFetchIssuer } from "@/connection/useFetchIssuer";
import KybSuccessCard from "../components/KybSuccessCard";
import { Info } from "lucide-react";
import { toast } from "sonner";

const kybSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  country: z.string().min(1, "Country is required"),
});

export default function KYBPage() {
  const router = useRouter();
  const { data: issuerData, isLoading: isIssuerLoading } = useFetchIssuer();

  const { mutate: createKyb } = useKyb();

  const form = useForm<z.infer<typeof kybSchema>>({
    resolver: zodResolver(kybSchema),
    defaultValues: {
      companyName: "",
      country: "IND",
    },
  });

  const onSubmit = (values: z.infer<typeof kybSchema>) => {
    console.log("KYB values:", values);
    createKyb(values, {
      onSuccess: (data) => {
        toast.success("KYB verification started successfully");
        window.location.href = data.data.kybLink;
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const isKybVerified = issuerData?.data?.user?.iskyb;

  if (isIssuerLoading && isKybVerified === null) {
    return (
      <GetStartedLayout>
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B00]"></div>
        </div>
      </GetStartedLayout>
    );
  }



  return (
    <GetStartedLayout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Company KYB Verification</h2>

        {isKybVerified ? (
          <KybSuccessCard onGoHome={() => router.push("/apply")} />
        ) : (
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Exactly as per government records"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Registration</FormLabel>
                        <FormControl>
                          <CountrySelect
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2 text-xs text-blue-700">
                    <Info className="w-4 h-4 shrink-0" />
                    Ensure all company details match official records.
                    Verification is a one-time process and cannot be modified or
                    restarted once initiated.
                  </p>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] text-white font-medium shadow-lg hover:shadow-orange-500/20 transition-all"
                    disabled={isIssuerLoading}
                  >
                    Start Verification
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </GetStartedLayout>
  );
}
