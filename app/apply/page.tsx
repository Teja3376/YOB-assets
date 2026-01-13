import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationForm from "@/components/application-form"
import StatusCheck from "@/components/status-check"
import { FileText, Search } from "lucide-react"

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Issuer Application
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Apply to become an Issuer on our platform.
            </p>
          </div>

          <Tabs defaultValue="apply" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="apply" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Apply
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Check Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="apply" className="mt-8">
              <ApplicationForm />
            </TabsContent>

            <TabsContent value="status" className="mt-8">
              <StatusCheck />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  )
}
