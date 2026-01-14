"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

export interface StepperStep {
  label: string;
  status: "completed" | "current" | "pending";
}

interface StepperProps {
  steps: StepperStep[];
  className?: string;
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-[#FF6B00] border-[#FF6B00] text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCompleted || isCurrent
                        ? "text-gray-900"
                        : "text-gray-500"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 -mt-5",
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
