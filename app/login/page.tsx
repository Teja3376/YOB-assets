"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
import AuthLayout from "@/components/layout/auth-layout";
import { authAPI } from "@/lib/api-client";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    try {
      // Call login API
      const response = await authAPI.login({
        email: values.email,
      });

      // Store tokens in sessionStorage
      if (
        response.data?.accessToken &&
        response.data?.refreshToken &&
        response.data?.sessionId
      ) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        sessionStorage.setItem("sessionId", response.data.sessionId);
      }

      // Always redirect to OTP page - OTP is required for everyone
      router.push(`/loginotp?email=${encodeURIComponent(values.email)}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Link>

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Login to your account
        </h2>

        {/* Instructions */}
        <p className="text-gray-600 mb-8">
          Please enter your registered email address.
        </p>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#FF6B00] focus:ring-[#FF6B00] h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white h-12 rounded-lg font-medium"
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login →"}
            </Button>
          </form>
        </Form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="text-[#FF6B00] hover:text-[#FF8A33] font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
