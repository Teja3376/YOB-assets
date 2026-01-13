"use client"

import { useRef, useState, KeyboardEvent, ChangeEvent, forwardRef } from "react"
import { Input } from "@/components/ui/input"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
}

const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 6, onComplete }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
      // Only allow digits
      if (!/^\d*$/.test(value) || value.length > 1) return

      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // Call onComplete when all fields are filled
      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""))
      }
    }

    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").slice(0, length)
      const newOtp = [...otp]

      for (let i = 0; i < pastedData.length && i < length; i++) {
        if (/^\d$/.test(pastedData[i])) {
          newOtp[i] = pastedData[i]
        }
      }

      setOtp(newOtp)
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()

      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""))
      }
    }

    return (
      <div ref={ref} className="flex gap-3 justify-center">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el
              return undefined
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 bg-white text-gray-900 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 rounded-lg"
          />
        ))}
      </div>
    )
  }
)

OTPInput.displayName = "OTPInput"

export default OTPInput
