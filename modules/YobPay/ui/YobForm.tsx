"use client";

import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { countryOptions, getCountryFromCallingCode } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import flags from "react-phone-number-input/flags";
// import useRegisterYobPay from "../hooks/useRegisterYobPay";

import TermsDialog from "./TermAndConditions";
import useGetCompanyMe from "@/hooks/me/useGetCompanyMe";
import useRegisterYobPay from "../hooks/useRegisterYobPay";
import { getCountryCallingCode } from "libphonenumber-js";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone must contain only digits (10–15 numbers)"),
  countryCode: z.string().min(1, "Select country"),
  company: z.string().min(1, "Company name required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function YobPayForm() {
  const { data: userData, isFetching: isLoading } = useGetCompanyMe();
  console.log("User Data:", userData, "Loading:", isLoading);
    const {
      mutate: registerYobPay,
      isPending: isRegistering,
      isError,
      error,
    } = useRegisterYobPay();
  // console.log("User Data:", userData, "Loading:", isLoading);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryCode: "IN",
      terms: false,
      company: "",
    },
    mode: "onTouched",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (!userData?.data) return;

    const matchedCountry = getCountryFromCallingCode(userData.countryCode);
    form.reset({
      firstName: userData?.data?.user?.firstName ?? "",
      lastName: userData?.data?.user?.lastName ?? "",
      email: userData?.data?.user?.email ?? "",
      phoneNumber: userData?.data?.user?.phoneNumber ?? "",
      countryCode: matchedCountry?.iso2 || "IN",
      terms: false,
      company: userData?.data?.company?.legalEntityName || "",
    });
  }, [userData, form]);

  const onSubmit = (data: FormValues) => {
    console.log("Submit:", data);
    const payload = {
      ...data,
      countryCode: `+${getCountryCallingCode(data.countryCode as any)}`,
    };
    registerYobPay(payload, {
      onSuccess: (res) => {
        console.log("YOB Pay Registered:", res);
      },
      onError: (err) => {
        console.error("Registration Error:", err);
        toast.error("Failed to register YOB Pay account");
      },
    });
  };

  return (
    <div className="max-w-md w-full space-y-8 text-black">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">Create Your YOB PAY Account</h2>
        {/* <p>Start your journey to financial freedom</p> */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="grid grid-cols-2 gap-5 gap-y-7">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10"
                      placeholder="First Name"
                      {...field}
                      //   disabled={isRegistering || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10"
                      placeholder="Last Name"
                      {...field}
                      //   disabled={isRegistering || isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10"
                    placeholder="Enter your email"
                    {...field}
                    // disabled={isRegistering || isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <div className="flex flex-col gap-1.5 ">
            <FormLabel>Mobile Number</FormLabel>

            <div className="flex items-start">
              {/* Country Code */}
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        // disabled={isRegistering || isLoading}
                      >
                        <SelectTrigger className="w-35 rounded-r-none border-r-0 cursor-pointer bg-white focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((country) => {
                            const Flag = flags[country.iso2];
                            return (
                              <SelectItem
                                key={`${country.iso2}-${country.value}-${country.label}`}
                                value={country.iso2}
                                className="text-black"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 flex items-center">
                                    {Flag && <Flag title="" />}
                                  </div>
                                  {country.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="tel"
                        // disabled={
                        //   !form.watch("countryCode") ||
                        //   isRegistering ||
                        //   isLoading
                        // }
                        placeholder="Enter your mobile number"
                        {...field}
                        className="bg-white text-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10 rounded-l-none"
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-black/10"
                    placeholder="Enter your company name"
                    {...field}
                    // disabled={isRegistering || isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                    <TermsDialog
                      onAccept={() => field.onChange(true)}
                      triggerText={
                        <p>
                          I agree to the
                          <span className="underline ml-2 hover:text-primary cursor-pointer">
                            Terms & Conditions
                          </span>
                        </p>
                      }
                    >
                      <p>
                        Welcome to our platform. By accessing or using our
                        services, you agree to comply with and be bound by the
                        following terms and conditions. Please read them
                        carefully before proceeding.
                      </p>

                      <p>
                        We may update or modify these terms at any time without
                        prior notice. Continued use of the service after changes
                        are made constitutes your acceptance of the revised
                        terms.
                      </p>

                      <p>
                        You agree to provide accurate, current, and complete
                        information during registration and to update such
                        information as necessary to maintain its accuracy.
                      </p>

                      <p>
                        You are responsible for maintaining the confidentiality
                        of your account credentials and for all activities that
                        occur under your account.
                      </p>

                      <p>
                        Unauthorized use of the platform, including attempting
                        to gain access to restricted areas or interfering with
                        system performance, is strictly prohibited.
                      </p>

                      <p>
                        We reserve the right to suspend or terminate your
                        account if any violation of these terms is detected,
                        without prior notice.
                      </p>

                      <p>
                        The content provided on this platform is for
                        informational purposes only and should not be considered
                        as professional or financial advice.
                      </p>

                      <p>
                        We are not liable for any direct, indirect, incidental,
                        or consequential damages resulting from the use or
                        inability to use our services.
                      </p>

                      <p>
                        All intellectual property rights, including trademarks,
                        logos, and content, are owned by us or our licensors and
                        are protected by applicable laws.
                      </p>

                      <p>
                        You may not copy, distribute, or reproduce any part of
                        the platform without prior written consent.
                      </p>

                      <p>
                        Your use of the service is also governed by our privacy
                        policy, which explains how we collect, use, and protect
                        your personal information.
                      </p>

                      <p>
                        In case of any disputes, you agree that they will be
                        governed by the applicable laws and resolved through
                        appropriate legal channels.
                      </p>

                      <p>
                        If any provision of these terms is found to be invalid
                        or unenforceable, the remaining provisions will continue
                        to remain in full force.
                      </p>

                      <p>
                        By clicking "Accept", you acknowledge that you have
                        read, understood, and agreed to these terms and
                        conditions.
                      </p>
                    </TermsDialog>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            // disabled={isRegistering || isLoading||!form.formState.isValid}
            disabled={!form.formState.isValid}
            type="submit"
            className="w-full cursor-pointer"
          >
            {/* {isRegistering ? "Creating Account..." : "Create Account"} */}
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
