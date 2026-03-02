"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

const DATE_FORMAT = "dd-MM-yyyy";

interface DatePickerProps {
  label?: string;
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  placeHolder?: string;
  disabled?: boolean;
  popoverClassName?: string;
  range?: DateRange;
  onRangeSelect?: (range: DateRange | undefined) => void;
}

const todayEnd = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};

/** Returns true for dates after today (calendar day). Makes future dates non-selectable. */
const isFutureDate = (date: Date): boolean => {
  const d = new Date(date);
  const t = new Date();
  d.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return d.getTime() > t.getTime();
};

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  onSelect,
  className,
  minDate,
  maxDate,
  placeHolder,
  popoverClassName,
  disabled = false,
}) => {
  const effectiveMaxDate =
    maxDate && maxDate <= todayEnd() ? maxDate : todayEnd();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <p className="text-sm font-medium text-gray-600">{label}</p>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[200px] justify-start text-left font-normal border-gray-300",
              !date && "text-muted-foreground",
              popoverClassName,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {date ? (
              format(date, DATE_FORMAT)
            ) : (
              <span>{placeHolder || "Pick a date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onSelect}
            initialFocus
            captionLayout="dropdown"
            defaultMonth={date || new Date()}
            startMonth={new Date(1900, 0)}
            endMonth={new Date(2100, 11)}
            fromDate={minDate}
            toDate={effectiveMaxDate}
            disabled={isFutureDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
