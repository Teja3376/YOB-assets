"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+358", country: "FI", flag: "🇫🇮" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+351", country: "PT", flag: "🇵🇹" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+30", country: "GR", flag: "🇬🇷" },
  { code: "+420", country: "CZ", flag: "🇨🇿" },
  { code: "+40", country: "RO", flag: "🇷🇴" },
  { code: "+36", country: "HU", flag: "🇭🇺" },
  { code: "+359", country: "BG", flag: "🇧🇬" },
  { code: "+385", country: "HR", flag: "🇭🇷" },
  { code: "+421", country: "SK", flag: "🇸🇰" },
  { code: "+386", country: "SI", flag: "🇸🇮" },
  { code: "+370", country: "LT", flag: "🇱🇹" },
  { code: "+371", country: "LV", flag: "🇱🇻" },
  { code: "+372", country: "EE", flag: "🇪🇪" },
  { code: "+352", country: "LU", flag: "🇱🇺" },
  { code: "+356", country: "MT", flag: "🇲🇹" },
  { code: "+357", country: "CY", flag: "🇨🇾" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+852", country: "HK", flag: "🇭🇰" },
  { code: "+60", country: "MY", flag: "🇲🇾" },
  { code: "+66", country: "TH", flag: "🇹🇭" },
  { code: "+62", country: "ID", flag: "🇮🇩" },
  { code: "+63", country: "PH", flag: "🇵🇭" },
  { code: "+84", country: "VN", flag: "🇻🇳" },
  { code: "+886", country: "TW", flag: "🇹🇼" },
  { code: "+64", country: "NZ", flag: "🇳🇿" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+972", country: "IL", flag: "🇮🇱" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+380", country: "UA", flag: "🇺🇦" },
  { code: "+20", country: "EG", flag: "🇪🇬" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
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
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Generate a mock application ID
      const mockApplicationId = `APP-${Date.now().toString().slice(-8)}`
      setApplicationId(mockApplicationId)
      
      // Store application ID in localStorage for status checking
      if (typeof window !== "undefined") {
        const applications = JSON.parse(localStorage.getItem("applications") || "[]")
        applications.push({
          id: mockApplicationId,
          ...data,
          submittedAt: new Date().toISOString(),
          status: "pending",
        })
        localStorage.setItem("applications", JSON.stringify(applications))
      }
      
      setStatus("submitted")
      form.reset()
    } catch (error) {
      setStatus("error")
      console.error("Error submitting application:", error)
    }
  }

  const handleNewApplication = () => {
    setStatus("idle")
    setApplicationId(null)
    form.reset()
  }

  if (status === "submitted") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600">
              Your issuer application has been received and is now under review.
            </p>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <div>
            <h4 className="font-semibold text-orange-900 mb-2">
              Application Status: Awaiting Review
            </h4>
            <p className="text-sm text-orange-800 mb-3">
              Your application is pending review. You will be notified of the status in the portal once it has been approved or rejected.
              if approved, you will be able to login to the portal and start tokenizing your assets. If rejected, you will be able to submit another application.
            </p>
            {applicationId && (
              <div className="bg-white rounded-md p-3 border border-orange-200">
                <p className="text-xs text-orange-600 mb-1">Application ID</p>
                <p className="text-sm font-mono text-orange-900">{applicationId}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Next Steps:</strong> Please check your email for confirmation and login to the portal at{" "}
            <a 
              href="https://www.yobassets.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              www.yobassets.com
            </a>{" "}
            to track your application status. You can also check the status using the "Check Status" tab above.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={handleNewApplication} variant="outline">
            Submit Another Application
          </Button>
          <Button onClick={() => router.push("/")}>
            Back to Home
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
                An error occurred while submitting your application. Please try again.
              </p>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full h-12 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {status === "submitting" ? (
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
