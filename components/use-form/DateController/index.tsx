"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/style.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { fi } from "date-fns/locale";

interface DateControllerProps {
  name: string;
  label: string;
  control?: any;
  disabled?: boolean;
  rules?: any;
  dateFormat?: string;
  allowFutureDates?: boolean;
  autoClose?: boolean;
  dayDisabled?: (date: Date) => boolean;
}

const DateController: React.FC<DateControllerProps> = ({
  name,
  label,
  control,
  disabled = false,
  rules,
  dateFormat = "yyyy-MM-dd",
  allowFutureDates = true,
  autoClose = false,
  dayDisabled,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const today = new Date();
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      rules={rules}
      render={({ field }) => {
        console.log("Rendering DateController for:", name, field.value);

        return (
          <FormItem>
            <FormLabel>
              {label}
              {rules?.required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 px-3 py-1 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), dateFormat) // format only for UI
                    ) : (
                      <span>{label}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  disabled={(date) => {
                    const blockedByFutureFlag = allowFutureDates
                      ? false
                      : date > today;

                    const blockedByCustom =
                      typeof dayDisabled === "function"
                        ? dayDisabled(date)
                        : false;

                    return blockedByFutureFlag || blockedByCustom;
                  }}
                  fromDate={allowFutureDates ? undefined : new Date(1900, 0, 1)}
                  toDate={allowFutureDates ? new Date(2100, 11, 31) : today}
                  fromYear={allowFutureDates ? 1900 : 1900}
                  toYear={allowFutureDates ? 2100 : new Date().getFullYear()}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(date);
                      field.onBlur();
                      // toast.success(`${autoClose}`)
                      if (autoClose) {
                        setOpen(false);
                      }
                    }
                  }}
                /> */}

                <Calendar
                  mode="single"
                  selected={
                    field.value instanceof Date
                      ? field.value
                      : field.value
                        ? new Date(field.value)
                        : undefined
                  }
                  captionLayout="dropdown" // ✅ enables month + year dropdown
                  startMonth={new Date(1900, 0)} // replaces fromYear/fromDate
                  endMonth={allowFutureDates ? new Date(2100, 11) : today} // replaces toYear/toDate
                  hidden={{
                    before: allowFutureDates ? undefined : new Date(1900, 0, 1),
                    after: allowFutureDates ? new Date(2100, 11, 31) : today,
                  }}
                  month={
                    field.value
                      ? field.value instanceof Date
                        ? field.value
                        : new Date(field.value)
                      : today
                  }
                  disabled={(date) => {
                    const blockedByFutureFlag = allowFutureDates
                      ? false
                      : date > today;

                    const blockedByCustom =
                      typeof dayDisabled === "function"
                        ? dayDisabled(date)
                        : false;

                    return blockedByFutureFlag || blockedByCustom;
                  }}
                  onSelect={(date) => {
                    if (date) {
                      console.log("Selected date:", date);
                      field.onChange(date);
                      field.onBlur();
                      if (autoClose) {
                        setOpen(false);
                      }
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default DateController;
