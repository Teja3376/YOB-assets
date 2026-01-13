// import Header from "@/components/layout/header"
// import Footer from "@/components/layout/footer"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import ApplicationForm from "@/components/forms/application-form"
// import StatusCheck from "@/components/features/auth/status-check"
// import { FileText, Search } from "lucide-react"

// export default function ApplyPage() {
//   return (
//     <main className="min-h-screen bg-white">
//       <Header />
//       <div className="pt-20 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-8 text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-3">
//               Issuer Application
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Apply to become an Issuer on our platform.
//             </p>
//           </div>

//           <Tabs defaultValue="apply" className="w-full">
//             <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
//               <TabsTrigger value="apply" className="flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 Apply
//               </TabsTrigger>
            
//             </TabsList>

//             <TabsContent value="apply" className="mt-8">
//               <ApplicationForm />
//             </TabsContent>

           
//           </Tabs>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   )
// }


"use client"

import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AuthLayout from "@/components/layout/auth-layout"
import ApplicationForm from "@/components/forms/application-form"


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



  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        {/* Back Link */}
    

  
                          <ApplicationForm />


       
      </div>
    </AuthLayout>
  )
}

