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

interface IndexProps {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  control: any;
  disabled?: boolean;
  rules?: any;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const Index: React.FC<IndexProps> = ({
  name,
  label,
  options = [],
  control,
  disabled = false,
  rules,
  onChange,
  onBlur,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const isRequired = rules?.required;

        return (
          <FormItem>
            <FormLabel>
              {label}
              {isRequired && <span className="text-red-500"> *</span>}
            </FormLabel>

            <Select
              value={field.value ?? ""}
              disabled={disabled}
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              onOpenChange={(open) => {
                if (!open) {
                  field.onBlur();
                }
                onBlur?.();
              }}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="max-h-[300px] overflow-y-auto">
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default Index;
