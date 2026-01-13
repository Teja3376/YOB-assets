"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Create your account and get started with YOB Assets. Fill in your basic information to begin your tokenization journey.",
  },
  {
    id: 2,
    title: "KYB",
    description: "Verify your business identity and compliance. Complete the Know Your Business process to ensure regulatory compliance.",
  },
  {
    id: 3,
    title: "Issuer Submission",
    description: "Submit your asset tokenization request. Provide details about the assets you want to tokenize and complete the submission process.",
  },
  {
    id: 4,
    title: "Admin Verification",
    description: "Our team reviews and approves your submission. Once verified, you'll be able to proceed with tokenizing your assets.",
  },
]

export default function GetStartedPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    router.push("/register")
  }

  const handleGoToRegister = () => {
    router.push("/register")
  }

  const allStepsCompleted = currentStep >= steps.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSkip}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] transition-colors text-sm"
          >
            <span>Skip</span>
            <X size={16} />
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Welcome to YOB Assets
            </h1>
            <p className="text-gray-600">
              Here's what to expect in your onboarding journey
            </p>
          </div>

          {/* Horizontal Stepper */}
          <div className="relative py-4">
            <div className="flex items-center relative">
              {steps.map((step, index) => {
                const isActive = currentStep === index
                const isCompleted = completedSteps.includes(index)

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    {/* Step Circle */}
                    <div className="relative flex flex-col items-center flex-1 z-10">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all mb-2 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-[#FF6B00] text-white shadow-lg"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {isCompleted ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.4, type: "spring" }}
                            >
                              <Check size={20} />
                            </motion.div>
                          ) : (
                            <motion.span
                              key="number"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {step.id}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Step Title */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive || isCompleted ? 1 : 0.5,
                        }}
                        className="text-center"
                      >
                        <p
                          className={`text-xs md:text-sm font-medium ${
                            isActive
                              ? "text-[#FF6B00]"
                              : isCompleted
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                      </motion.div>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative -mt-6">
                        <motion.div
                          className="h-full bg-[#FF6B00]"
                          initial={{ width: "0%" }}
                          animate={{
                            width: isCompleted ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step Description */}
          <AnimatePresence mode="wait">
            {!allStepsCompleted && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                  {steps[currentStep]?.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {!allStepsCompleted ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white font-medium rounded-full transition-all flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-block"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={24} className="text-white" />
                  </div>
                </motion.div>
                <p className="text-base font-semibold text-gray-900 mb-2">
                  All set! Ready to get started?
                </p>
                <button
                  onClick={handleGoToRegister}
                  className="px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF8A33] hover:shadow-lg text-white font-medium rounded-full transition-all flex items-center gap-2"
                >
                  <span>Go to Registration</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
