"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import AuthLayout from "@/components/layout/auth-layout"
import { authAPI } from "@/lib/api-client"
import { useState } from "react"

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(1, "Phone number is required"),
})

const countries = [
  { code: "+971", name: "UAE" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "India" },
  { code: "+966", name: "Saudi Arabia" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+971",
      phone: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError("")
    try {
      // Call signup API
      const response = await authAPI.signup({
        email: values.email,
        firstName : values.firstName,
        lastName: values.lastName,
        phoneNumber: String(values.phone),
        countryCode: values.countryCode,
      })

      // Store isNewUser flag in sessionStorage for OTP page
      const isNewUser = response.data?.isNewUser || false
      sessionStorage.setItem("isNewUser", String(isNewUser))

      // Redirect to OTP page with email
      router.push(`/otp?email=${encodeURIComponent(values.email)}&flow=register`)
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      )
    }
  }

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] mb-2 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Link>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Let's get to know each other!
        </h2>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name */}
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
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger
  className="w-32 min-h-12 h-12 py-0 flex items-center bg-white border-gray-300"
>
  <SelectValue placeholder="Code" />
</SelectTrigger>

                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.code} ({country.name})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
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
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
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
    </AuthLayout>
  )
}
