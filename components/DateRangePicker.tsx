"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  range?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DATE_FORMAT = "dd-MM-yyyy";

const isFutureDate = (date: Date): boolean => {
  const d = new Date(date);
  const t = new Date();
  d.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return d.getTime() > t.getTime();
};

export default function DateRangePicker({
  range,
  onSelect,
  placeholder = "Select date range",
  className,
  disabled,
}: DateRangePickerProps) {
  const label = range?.from
    ? range.to
      ? `${format(range.from, DATE_FORMAT)} - ${format(range.to, DATE_FORMAT)}`
      : format(range.from, DATE_FORMAT)
    : placeholder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[240px] justify-start text-left font-normal rounded-full",
            !range && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={onSelect}
          numberOfMonths={2}
          captionLayout="dropdown"
          fromYear={1900}
          toYear={2100}
          disabled={(date) => {
            if (isFutureDate(date)) return true;
            if (range?.from && date < range.from) return true;
            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
