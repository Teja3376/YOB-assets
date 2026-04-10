"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import GetStartedLayout from "@/components/layout/get-started";
import { authAPI } from "@/lib/api-client";
import { useState } from "react";
import flags from "react-phone-number-input/flags";
import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { countryOptions } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    countryCode: z.string().min(1, "Country code is required"),
    phone: z.string().min(1, "Phone number is required"),
  })
  .refine(
    (data) => {
      const fullNumber = `+${getCountryCallingCode(data.countryCode as any)}${data.phone}`;

      const phoneNumber = parsePhoneNumberFromString(fullNumber);

      return phoneNumber?.isValid() ?? false;
    },
    {
      message: "Invalid phone number for selected country",
      path: ["phone"],
    },
  );

export default function RegisterPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "IN",
      phone: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formState = form.formState;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      // Call signup API
      const dialCode = `+${getCountryCallingCode(values.countryCode as any)}`;
      console.log("Dial code:", dialCode);
      const response = await authAPI.signup({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: String(values.phone),
        countryCode: dialCode,
      });

      // Store isNewUser flag in sessionStorage for OTP page
      const isNewUser = response.data?.isNewUser || false;
      sessionStorage.setItem("isNewUser", String(isNewUser));

      // Redirect to OTP page with email
      router.push(
        `/otp?email=${encodeURIComponent(values.email)}&flow=register`,
      );
    } catch (err: any) {
      form.setError("root", {
        type: "server",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <GetStartedLayout>
      <div className="max-w-3xl w-full mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Let's get to know each other!
        </h2>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      What is your first name?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First name"
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-[#FF6B00] h-12"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("root"); // 🔥 clear API error
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Your last name?
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last name"
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-[#FF6B00] h-12"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.clearErrors("root"); // 🔥 clear API error
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
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
                  <FormLabel className="text-gray-700">
                    What is your email?
                  </FormLabel>
                  {/* <FormDescription className="text-sm text-gray-600">
                    This will be your registered email for important
                    communications.
                  </FormDescription> */}
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-[#FF6B00] h-12"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.clearErrors("root"); // 🔥 clear API error
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Password */}

            {/* Phone Number */}
            <div className="space-y-2">
              <FormLabel className="text-gray-700">
                What is your phone number?
              </FormLabel>
              <div className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => {
                    const selected = countryOptions.find(
                      (c) => c.iso2 === field.value,
                    );

                    return (
                      <FormItem>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <button
                                type="button"
                                className="w-32 h-12 border rounded-md flex items-center justify-between px-2 bg-white"
                              >
                                {selected ? (
                                  <div className="flex items-center gap-1 text-xs">
                                    <div className="h-7 w-7 flex items-center">
                                      {flags[selected.iso2] &&
                                        (() => {
                                          const Flag = flags[selected.iso2];
                                          return Flag && <Flag title="" />;
                                        })()}
                                    </div>
                                    {selected.label}
                                  </div>
                                ) : (
                                  "Code"
                                )}

                                <ChevronsUpDown className="h-4 w-4 opacity-50" />
                              </button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-64 px-5 py-2">
                            <Command className="scrollbar-hide">
                              <CommandInput
                                // className="border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0 shadow-none focus-visible:ring-offset-0"
                                className=" border-none!  outline-none!  ring-0!  shadow-none!  focus:ring-0!  focus-visible:ring-0!  focus-visible:ring-offset-0! "
                                placeholder="Search country..."
                              />

                              <CommandList className="scrollbar-hide">
                                <CommandEmpty>No country found.</CommandEmpty>

                                {countryOptions.map((country) => {
                                  const Flag = flags[country.iso2];

                                  return (
                                    <CommandItem
                                      key={country.iso2}
                                      value={`${country.label} ${country.value}`}
                                      onSelect={() => {
                                        field.onChange(country.iso2);
                                        form.clearErrors("root");
                                        setOpen(false);
                                      }}
                                    >
                                      <div className="flex items-center gap-2 text-xs">
                                        <div className="h-6 w-6 flex items-center">
                                          {Flag && <Flag title="" />}
                                        </div>
                                        <p className="inline">
                                          {country.label}
                                        </p>
                                      </div>

                                      {field.value === country.iso2 && (
                                        <Check className="ml-auto h-4 w-4" />
                                      )}
                                    </CommandItem>
                                  );
                                })}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="text-red-500" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          className="h-12 bg-white border-gray-300 text-gray-900"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("root"); // 🔥 clear API error
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Error Message */}
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm text-center">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 rounded-lg font-medium"
            >
              {form.formState.isSubmitting
                ? "Creating account..."
                : "Send email verification code →"}
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#FF6B00] hover:text-[#FF8A33] font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </GetStartedLayout>
  );
}
