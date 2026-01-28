'use client';
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PhoneNumberControllerProps {
  name?: string;
  disabled?: boolean;
  label: string;
  control: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: any;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  placeholder?: string;
  defaultValue?: string | number;
  badge?: string;
  countryCode : string
}

const PhoneNumberController: React.FC<PhoneNumberControllerProps> = ({
  name,
  label,
  control,
  rules,
  disabled = false,
  icon,
  iconPosition = "left",
  onChange,
  placeholder,
  defaultValue,
  badge,
  countryCode
}) => {
  console.log("countryCode in phoneNumberController", countryCode)
  return (
    <FormField
      name={name || ""}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ""}
      render={({
        field: { onBlur, onChange: controllerOnChange, value },
        fieldState: { error },
      }) => {
        const isRequired = rules?.required;

        const [inputValue, setInputValue] = useState<string>(
          value === null || value === undefined || value === 0
            ? ""
            : String(value)
        );

        useEffect(() => {
          setInputValue(
            value === null || value === undefined || value === 0
              ? ""
              : String(value)
          );
        }, [value]);

        return (
          <FormItem>
            <FormLabel htmlFor={name || ""}>
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-center gap-2">
                {/* Static +254 Prefix */}
                <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground z-10">
                  {countryCode}
                </div>
                
                <div className="relative flex-1">
                  <Input
                    type="text"
                    inputMode="decimal"
                    disabled={disabled}
                    id={name || ""}
                    placeholder={placeholder}
                    value={inputValue}
                    onKeyDown={(e) => {
                      // Prevent negative sign, e, E, +, and decimal point
                      const invalidKeys = ["e", "E", "+", "-", "."];
                      if (invalidKeys.includes(e.key)) {
                        e.preventDefault();
                        return;
                      }
                      
                      // Allow: backspace, delete, tab, escape, enter, and numbers
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "Tab",
                          "Escape",
                          "Enter",
                          "ArrowLeft",
                          "ArrowRight",
                          "ArrowUp",
                          "ArrowDown",
                        ].includes(e.key) &&
                        !(e.ctrlKey || e.metaKey) // Allow Ctrl/Cmd + A, C, V, X
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const raw = e.target.value;

                      // Allow only digits
                      const sanitized = raw.replace(/[^\d]/g, "");

                      // Keep as string locally
                      setInputValue(sanitized);
                      onChange?.(e);
                      controllerOnChange(sanitized); // Update parent state immediately
                    }}
                    onBlur={(e) => {
                      onBlur();
                      const raw = e.target.value;
                      const sanitized = raw.replace(/[^\d]/g, "");
                      
                      setInputValue(sanitized);
                      controllerOnChange(sanitized); // Ensure final value is string
                    }}
                    className={cn(
                      "pl-14", // Added padding for +254
                      icon && iconPosition === "right" && "pr-10",
                      badge && "pr-24",
                      "placeholder:text-xs"
                    )}
                  />
                  {icon && iconPosition === "right" && !badge && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-muted-foreground">
                      {icon}
                    </div>
                  )}
                  {badge && (
                    <Badge className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white rounded-full h-7 px-3 flex items-center whitespace-nowrap text-xs">
                      {badge}
                    </Badge>
                  )}
                </div>
              </div>
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default PhoneNumberController;