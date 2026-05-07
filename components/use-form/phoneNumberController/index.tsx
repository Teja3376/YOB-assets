"use client";
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
import flags from "react-phone-number-input/flags";

import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { countryOptions } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  country: string;
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
  country,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(country || "IN");
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
            : String(value),
        );

        useEffect(() => {
          setInputValue(
            value === null || value === undefined || value === 0
              ? ""
              : String(value),
          );
        }, [value]);

        return (
          <FormItem>
            <FormLabel htmlFor={name || ""}>
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
            <FormControl>
              <div className="flex gap-2 items-start">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      className=" border rounded-md flex items-center justify-between px-2 text-black bg-white hover:bg-white"
                    >
                      {(() => {
                        const selected = countryOptions.find(
                          (c) => c.iso2 === selectedCountry,
                        );

                        const Flag =
                          selected &&
                          flags[selected.iso2 as keyof typeof flags];

                        return selected ? (
                          <div className="flex items-center gap-1 text-xs">
                            <div className="h-6 w-6 flex items-center">
                              {Flag && <Flag title="" />}
                            </div>
                            +{getCountryCallingCode(selected.iso2 as any)}
                          </div>
                        ) : (
                          "Code"
                        );
                      })()}

                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-64 px-2 py-2 ">
                    <Command>
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>

                        {countryOptions.map((country) => {
                          const Flag =
                            flags[country.iso2 as keyof typeof flags];

                          return (
                            <CommandItem
                              key={country.iso2}
                              value={`${country.label}`}
                              onSelect={() => {
                                setSelectedCountry(country.iso2);
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2 text-xs">
                                <div className="h-6 w-6 flex items-center">
                                  {Flag && <Flag title="" />}
                                </div>
                                {country.label}
                              </div>

                              {selectedCountry === country.iso2 && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </CommandItem>
                          );
                        })}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Input
                  type="number"
                  placeholder="Phone number"
                  value={value || ""}
                  onChange={(e) => {
                    const raw = e.target.value;

                    controllerOnChange(raw); 
                  }}
                  onBlur={onBlur}
                  className="h-9"
                />
              </div>
            </FormControl>
            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p>
            )}
          </FormItem>
        );
      }}
    />
  );
};

export default PhoneNumberController;
