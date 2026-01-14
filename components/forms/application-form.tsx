"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Lottie from "lottie-react"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import useIssuerRequestApi from "@/connection/useIssuerRequestApi"
import { useFetchIssuer } from "@/connection/useFetchIssuer"
import dynamic from "next/dynamic"

// Dynamically import Lottie to avoid SSR issues

const assetCategories = [
  "Real Estate",
  "Commodities",
  "Company Equity",
  "Art & Collectibles",
  "Intellectual Property",
  "Other",
]

// Comprehensive list of countries
const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Italy", "Spain", "Netherlands", "Belgium", "Switzerland", "Austria",
  "Sweden", "Norway", "Denmark", "Finland", "Poland", "Portugal",
  "Ireland", "Greece", "Czech Republic", "Romania", "Hungary", "Bulgaria",
  "Croatia", "Slovakia", "Slovenia", "Lithuania", "Latvia", "Estonia",
  "Luxembourg", "Malta", "Cyprus", "Japan", "China", "India", "South Korea",
  "Singapore", "Hong Kong", "Malaysia", "Thailand", "Indonesia", "Philippines",
  "Vietnam", "Taiwan", "New Zealand", "South Africa", "Brazil", "Mexico",
  "Argentina", "Chile", "Colombia", "Peru", "UAE", "Saudi Arabia", "Israel",
  "Turkey", "Russia", "Ukraine", "Egypt", "Nigeria", "Kenya", "Ghana",
  "Morocco", "Tunisia", "Algeria", "Other"
]

// Country codes with flags/names
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },

  { code: "+44", country: "UK", flag: "🇬🇧" },
  
  { code: "+212", country: "MA", flag: "🇲🇦" },
  { code: "+216", country: "TN", flag: "🇹🇳" },
  { code: "+213", country: "DZ", flag: "🇩🇿" },
]

// Phone number validation regex (supports international formats)
const phoneRegex = /^[0-9]{7,15}$/

const formSchema = z.object({
  legalEntityName: z.string().min(2, "Legal entity name must be at least 2 characters"),
  countryOfIncorporation: z.string().min(1, "Country of incorporation is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(phoneRegex, "Phone number must contain only digits"),
  assetCategory: z.string().min(1, "Asset category is required"),
  shortAssetDescription: z.string().min(10, "Short asset description must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

type ApplicationStatus = "idle" | "submitting" | "submitted" | "error"

export default function ApplicationForm() {
  const router = useRouter()
  const [status, setStatus] = useState<ApplicationStatus>("idle")
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const { data: issuerData, isLoading: isIssuerLoading, error: issuerError } = useFetchIssuer();
  const [successAnimation, setSuccessAnimation] = useState<any>(null)
  const [pendingAnimation, setPendingAnimation] = useState<any>(null)
  const [rejectAnimation, setRejectAnimation] = useState<any>(null)

  const { submitApplication, loading: apiLoading, error: apiError } = useIssuerRequestApi()

  // Load Lottie animations
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const [success, pending, reject] = await Promise.all([
          fetch("/lottie/success.json").then(res => res.json()),
          fetch("/lottie/pending.json").then(res => res.json()),
          fetch("/lottie/reject.json").then(res => res.json()),
        ])
        setSuccessAnimation(success)
        setPendingAnimation(pending)
        setRejectAnimation(reject)
      } catch (error) {
        console.error("Failed to load Lottie animations:", error)
      }
    }
    loadAnimations()
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      legalEntityName: "",
      countryOfIncorporation: "",
      email: "",
      phoneCountryCode: "",
      phoneNumber: "",
      assetCategory: "",
      shortAssetDescription: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting")
    
    try {
      // Prepare API payload (exclude phone fields as they're not in API spec)
      const payload = {
        legalEntityName: data.legalEntityName,
        countryOfIncorporation: data.countryOfIncorporation,
        email: data.email,
        assetCategory: data.assetCategory,
        shortAssetDescription: data.shortAssetDescription,
        phoneCountryCode: data.phoneCountryCode,
        phoneNumber: data.phoneNumber,
      }

      // Call the API
      await submitApplication(payload)

    } catch (error) {
      setStatus("error")
      console.error("Error submitting application:", error)
    } finally {
      form.reset()
    }
  }

  const handleNewApplication = () => {
    setStatus("idle")
    setApplicationId(null)
    form.reset()
  }

  // Show loading state while fetching issuer data
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
    )
  }

  // Get issuer status from the API response
  const issuerStatus = issuerData?.data?.issuerStatus

  // Pending Status UI
  if (issuerStatus === "pending") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              {pendingAnimation && (
                <Lottie 
                  animationData={pendingAnimation} 
                  loop={true}
                  style={{ width: 64, height: 64 }}
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-900">
                Application Pending Review
              </h3>
              <p className="text-sm text-orange-700 mt-1">
                Your issuer application is currently under review
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-orange-200">
            <p className="text-sm text-orange-800 leading-relaxed mb-4">
              Thank you for submitting your issuer application. Our team is currently reviewing your submission. 
              You will be notified via email once a decision has been made.
            </p>
            <p className="text-sm text-orange-800 leading-relaxed">
              If approved, you will be able to access the dashboard and start tokenizing your assets. 
              If rejected, you will receive feedback and can submit a new application.
            </p>
          </div>

          {applicationId && (
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <p className="text-xs font-medium text-orange-600 mb-1">Application ID</p>
              <p className="text-sm font-mono text-orange-900">{applicationId}</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-2">What's Next?</p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Please check your email regularly for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Rejected Status UI
  if (issuerStatus === "rejected") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              {rejectAnimation && (
                <Lottie 
                  animationData={rejectAnimation} 
                  loop={true}
                  style={{ width: 64, height: 64 }}
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-900">
                Application Rejected
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Your issuer application was not approved
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <p className="text-sm text-red-800 leading-relaxed mb-4">
              We're sorry, but your issuer application has been rejected. This could be due to incomplete information, 
              missing documentation, or not meeting our requirements.
            </p>
            <p className="text-sm text-red-800 leading-relaxed">
              Please review your application details and feel free to submit a new application with updated information. 
              If you have questions, please contact our support team.
            </p>
          </div>

          {applicationId && (
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-xs font-medium text-red-600 mb-1">Application ID</p>
              <p className="text-sm font-mono text-red-900">{applicationId}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-sm font-medium text-gray-900 mb-3">Would you like to submit a new application?</p>
          <Button
            onClick={handleNewApplication}
            className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
          >
            Submit New Application
          </Button>
        </div>
      </div>
    )
  }

  // Approved Status UI
  if (issuerStatus === "approved") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              {successAnimation && (
                <Lottie 
                  animationData={successAnimation} 
                  loop={false}
                  style={{ width: 64, height: 64 }}
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-900">
                Application Approved!
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Congratulations! Your issuer application has been approved
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <p className="text-sm text-green-800 leading-relaxed mb-4">
              Great news! Your issuer application has been approved. You now have access to the dashboard 
              where you can start tokenizing your assets and managing your applications.
            </p>
            <p className="text-sm text-green-800 leading-relaxed">
              Click the button below to continue to your dashboard and begin your journey with YOB Assets.
            </p>
          </div>

          {applicationId && (
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-xs font-medium text-green-600 mb-1">Application ID</p>
              <p className="text-sm font-mono text-green-900">{applicationId}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto px-8 h-12 text-base font-semibold bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Issuer Application</h2>
        <p className="text-gray-600">
          Complete the form below to apply as an Issuer. All fields are required.
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
                  <Input
                    placeholder="Enter your legal entity name"
                    {...field}
                  />
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
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country of incorporation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="assetCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Category *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
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
          />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
            <FormField
              control={form.control}
              name="phoneCountryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Code *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                      placeholder="1234567890"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                {apiError || "An error occurred while submitting your application. Please try again."}
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
  )
}
