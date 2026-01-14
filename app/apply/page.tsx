"use client"

import GetStartedLayout from "@/components/layout/get-started"
import ApplicationForm from "@/components/forms/application-form"

export default function ApplyPage() {
  return (
    <GetStartedLayout>
      <div className="w-full">
        
        <ApplicationForm />
      </div>
    </GetStartedLayout>
  )
}

