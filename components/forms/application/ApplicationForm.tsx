"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import useIssuerRequestApi from "@/connection/useIssuerRequestApi";
import { useFetchIssuer } from "@/connection/useFetchIssuer";

import * as z from "zod";
import {
  assetCategories,
  countryCodeToName,
  countryCodes,
  getDialCodeFromIso3,
  phoneRegex,
} from "./constants";
import PendingStatus from "./components/PendingStatus";
import RejectedStatus from "./components/RejectedStatus";
import ApprovedStatus from "./components/ApprovedStatus";

export const formSchema = z.object({
  legalEntityName: z
    .string()
    .min(2, "Legal entity name must be at least 2 characters"),
  countryOfIncorporation: z
    .string()
    .min(1, "Country of incorporation is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(phoneRegex, "Phone number must contain only digits"),
  // assetCategory: z.string().min(1, "Asset category is required"),
  shortAssetDescription: z
    .string()
    .min(10, "Short asset description must be at least 10 characters"),
});

export type FormValues = z.infer<typeof formSchema>;

export type ApplicationStatus = "idle" | "submitting" | "submitted" | "error";

export default function ApplicationForm() {
  const [status, setStatus] = useState<ApplicationStatus>("idle");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const {
    data: issuerData,
    isLoading: isIssuerLoading,
    refetch: refetchIssuer,
  } = useFetchIssuer();

  const [successAnimation, setSuccessAnimation] = useState<any>(null);
  const [pendingAnimation, setPendingAnimation] = useState<any>(null);
  const [rejectAnimation, setRejectAnimation] = useState<any>(null);
  const [localIssuerStatus, setLocalIssuerStatus] = useState<string | null>(
    null,
  );

  const {
    submitApplication,
    loading: apiLoading,
    error: apiError,
  } = useIssuerRequestApi();

  const router = useRouter();

  const issuerStatus = localIssuerStatus || issuerData?.data?.issuerStatus;

  useEffect(() => {
    if (issuerStatus === "approved") {
      const hasSeenApproved = localStorage.getItem("issuer_approved_seen");
      if (hasSeenApproved) {
        router.push("/dashboard");
      }
    }
  }, [issuerStatus, router]);

  // Load Lottie animations
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const [success, pending, reject] = await Promise.all([
          fetch("/lottie/success.json").then((res) => res.json()),
          fetch("/lottie/pending.json").then((res) => res.json()),
          fetch("/lottie/reject.json").then((res) => res.json()),
        ]);
        setSuccessAnimation(success);
        setPendingAnimation(pending);
        setRejectAnimation(reject);
      } catch (error) {
        console.error("Failed to load Lottie animations:", error);
      }
    };
    loadAnimations();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalEntityName: "",
      countryOfIncorporation: "",
      email: "",
      phoneCountryCode: "",
      phoneNumber: "",
      // assetCategory: "",
      shortAssetDescription: "",
    },
  });

  useEffect(() => {
    const user = issuerData?.data?.user;
    if (!user) return;
    const dialCode = getDialCodeFromIso3(issuerData?.data?.user?.companyCountry ?? "");
    form.reset({
      ...form.getValues(),
      legalEntityName: user.companyName ?? "",
      countryOfIncorporation: user.companyCountry ?? "",
      email: user.email ?? "",
      phoneCountryCode: dialCode,
      phoneNumber: user.phoneNumber ?? "",
    });
  }, [issuerData, form]);

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting");

    try {
      const payload = {
        legalEntityName: data.legalEntityName,
        countryOfIncorporation: data.countryOfIncorporation,
        email: data.email,
        // assetCategory: data.assetCategory,
        shortAssetDescription: data.shortAssetDescription,
        phoneCountryCode: data.phoneCountryCode,
        phoneNumber: data.phoneNumber,
      };

      await submitApplication(payload);

      setLocalIssuerStatus("pending");
      setStatus("submitted");

      await refetchIssuer();
    } catch (error) {
      setStatus("error");
      console.error("Error submitting application:", error);
    } finally {
      const user = issuerData?.data?.user;
      form.reset({
        legalEntityName: user?.companyName ?? "",
        countryOfIncorporation: user?.companyCountry ?? "",
        email: user?.email ?? "",
        phoneCountryCode: getDialCodeFromIso3(user?.companyCountry ?? ""),
        phoneNumber: user?.phoneNumber ?? "",
        // assetCategory: "",
        shortAssetDescription: "",
      });
    }
  };

  const handleNewApplication = () => {
    setStatus("idle");
    setApplicationId(null);
    form.reset();
  };

  if (isIssuerLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00] mx-auto mb-4" />
            <p className="text-gray-600">Loading application status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (issuerStatus === "pending") {
    return (
      <PendingStatus
        pendingAnimation={pendingAnimation}
        applicationId={applicationId}
      />
    );
  }

  if (issuerStatus === "rejected") {
    return (
      <RejectedStatus
        rejectAnimation={rejectAnimation}
        applicationId={applicationId}
        onNewApplication={handleNewApplication}
      />
    );
  }

  if (issuerStatus === "approved") {
    return (
      <ApprovedStatus
        successAnimation={successAnimation}
        applicationId={applicationId}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Issuer Application
        </h2>
        <p className="text-gray-600">
          Complete the form below to apply as an Issuer. All fields are
          required.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="legalEntityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Legal Entity Name *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="countryOfIncorporation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Incorporation *</FormLabel>
                  <Select
                    key={field.value}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {field.value
                            ? countryCodeToName[field.value]
                            : "Select country"}
                        </SelectValue>{" "}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(countryCodeToName).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="assetCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Category *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select asset category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assetCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="phoneCountryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} key={field.value} >
                      <FormControl>
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {countryCodes.map((item, index) => (
                          <SelectItem
                            key={`${item.code}-${item.country}-${index}`}
                            value={item.code}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.flag}</span>
                              <span>{item.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your mobile number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        className="w-56"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="shortAssetDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Asset Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description of the asset you wish to tokenize"
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                {apiError ||
                  "An error occurred while submitting your application. Please try again."}
              </p>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={status === "submitting" || apiLoading}
              className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {status === "submitting" || apiLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
