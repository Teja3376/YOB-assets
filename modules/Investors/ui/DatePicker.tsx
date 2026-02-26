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

interface DatePickerProps {
  label: string;
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  onSelect,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal border-gray-300",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {date ? format(date, "yyyy/MM/dd") : <span>Pick a date</span>}
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
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
