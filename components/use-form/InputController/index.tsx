"use client";
import type React from "react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputControllerProps {
  name: string;
  disabled?: boolean;
  label: string;
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  control: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: any;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  placeholder?: string;
  defaultValue?: string | number;
  bottomText?: string;
}

const InputController: React.FC<InputControllerProps> = ({
  name,
  label,
  type = "text",
  control,
  rules,
  disabled = false,
  icon,
  iconPosition = "left",
  onChange,
  placeholder,
  defaultValue,
  bottomText,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onBlur, onChange: controllerOnChange, value },
        fieldState: { error },
      }) => {
        const isRequired = rules?.required;
        const handleViewFile = () => {
          if (value) {
            window.open(value, "_blank");
          }
        };

        return (
          <FormItem>
            <FormLabel htmlFor={name}>
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-center">
                {icon && iconPosition === "left" && (
                  <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
                    {icon}
                  </div>
                )}
                <Input
                  type={type}
                  disabled={disabled}
                  id={name}
                  placeholder={placeholder}
                  value={value !== null && value !== undefined ? value : ""}
                  onChange={(e) => {
                    let raw = e.target.value;

                    if (type === "number") {
                      raw = raw.replace(/\D/g, "");
                      raw = raw.slice(0, 12);
                    }
                    let finalValue: string | number = raw;
                    if (type === "number") {
                      finalValue = raw === "" ? "" : Number(raw);
                    }
                    controllerOnChange(finalValue);
                    onChange?.(e);
                  }}
                  onBlur={onBlur}
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  className={cn(
                    icon && iconPosition === "left" && "pl-10",
                    icon && iconPosition === "right" && "pr-10",
                    type === "url" && value && "rounded-r-none",

                    type == "number" &&
                      "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0",
                  )}
                />
                {icon && iconPosition === "right" && type !== "url" && (
                  <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
                    {icon}
                  </div>
                )}
                {type === "url" && value && (
                  <Button
                    onClick={handleViewFile}
                    variant="outline"
                    type="button"
                    className="h-10 right-0 rounded-l-none"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </FormControl>
            {bottomText && (
              <p className="text-sm text-muted-foreground mt-1.5">
                {bottomText}
              </p>
            )}
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default InputController;
