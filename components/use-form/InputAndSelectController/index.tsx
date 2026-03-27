import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import React, { useEffect, useState } from "react";
  import { cn } from "@/lib/utils";
  
  
    interface InputAndSelectControllerProps {
    name: string;
    label: string;
    options: { value: string; label: string }[] | [];
    control: any;
    disabled?: boolean;
    rules?: any;
    onChange?: (value: string) => void;
    defaultValue?: string;
    onBlur?: () => void;
    isLoading?: boolean;
    allowCreate?: boolean; // ✅ new prop
    className?: string;
  }
  
  
  const InputAndSelectController: React.FC<InputAndSelectControllerProps> = ({
    name,
    label,
    options = [],
    control,
    disabled = false,
    rules,
    defaultValue = "",
    onChange,
    onBlur,
    isLoading = false,
    allowCreate = false,
    className,
  }) => {
    const [localOptions, setLocalOptions] = useState(options);
    const [isAdding, setIsAdding] = useState(false);
    const [newValue, setNewValue] = useState("");
  
  
    useEffect(() => {
      setLocalOptions(options);
    }, [options]);
  
  
    const handleAddNew = () => {
      if (!newValue.trim()) return;
      const normalized = newValue.trim().toLowerCase();
      const newOption = { label: newValue.trim(), value: normalized };
      setLocalOptions((prev) => [...prev, newOption]);
      control.setValue(name, normalized, { shouldDirty: true, shouldValidate: true });
      if (onChange) onChange(normalized);
      setNewValue("");
      setIsAdding(false);
    };
  
  
    return (
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => {
          const isRequired = rules?.required;
  
  
          // ✅ Fallback to defaultValue if form hasn’t initialized yet
          const selectedValue =
            field.value && field.value.trim() !== ""
              ? field.value
              : defaultValue || undefined;
  
  
          return (
            <FormItem className={cn("w-full", className)}>
              <FormLabel>
                {label}
                {isRequired && <span className="text-destructive"> *</span>}
              </FormLabel>
  
  
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onChange) onChange(value);
                }}
                disabled={disabled}
                value={selectedValue} // ✅ no empty string here
                onOpenChange={() => {
                  if (onBlur) onBlur();
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue placeholder={`Select ${label}`} />
                  </SelectTrigger>
                </FormControl>
  
  
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : localOptions.length > 0 ? (
                    localOptions.map((option) =>
                      option.value ? (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ) : null
                    )
                  ) : (
                    <SelectItem value="no-options" disabled>
                      No options available
                    </SelectItem>
                  )}
  
  
                  {/* 🆕 Add City Section */}
                  {allowCreate && !isAdding && (
                    <div className="border-t mt-1 pt-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setIsAdding(true)}
                      >
                        + Add new {label}
                      </Button>
                    </div>
                  )}
  
  
                  {/* Inline Input for adding new */}
                  {allowCreate && isAdding && (
                    <div className="p-2 border-t space-y-2">
                      <Input
                        placeholder={`Enter new ${label}`}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleAddNew}>
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsAdding(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </SelectContent>
              </Select>
  
  
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  };
  
  
  export default InputAndSelectController;
  
  
  
  