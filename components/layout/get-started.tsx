"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Header from "@/components/layout/header";

const steps = [
  { id: 1, title: "Registration", route: "/register" },
  { id: 2, title: "OTP", route: "/otp" },
  { id: 3, title: "KYB", route: "/kyb" },
  { id: 4, title: "Issuer Submission", route: "/apply" },
];

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => step.route === pathname);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
      setCompletedSteps(Array.from({ length: stepIndex }, (_, i) => i));
  const handleStepClick = (index: number) => {
    if (completedSteps.includes(index) || index === currentStep) {
      router.push(steps[index].route);
    }
  };

    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideNavigation />

      {/* PAGE SCROLL — DO NOT TOUCH */}
      <div className="pt-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* LEFT — normal flow (scrolls with page) */}
          <div className="lg:col-span-5">
            {/* Stepper */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isActive = currentStep === index;
                  const isCompleted = completedSteps.includes(index);

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{ scale: isActive ? 1.1 : 1 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                            ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isActive
                                  ? "bg-[#FF6B00] text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                        >
                          {isCompleted ? <Check size={18} /> : step.id}
                        </motion.div>

                        <p
                          className={`text-xs mt-2 font-medium whitespace-nowrap
                            ${
                              isActive
                                ? "text-[#FF6B00]"
                                : isCompleted
                                  ? "text-green-600"
                                  : "text-gray-500"
                            }`}
                        >
                          {step.title}
                        </p>
                      </div>

                      {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 bg-gray-200 -mt-6">
                          <motion.div
                            className="h-full bg-[#FF6B00]"
                            animate={{ width: isCompleted ? "100%" : "0%" }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div className="p-6">{children}</div>
          </div>

          {/* RIGHT — sticky */}
          <div className="lg:col-span-5 flex pt-20 justify-center items-center">
            <div className="sticky top-24">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                <iframe
                  className="w-[560px] h-[315px]"
                  src="https://www.youtube-nocookie.com/embed/Y7I4IDojhJk"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
