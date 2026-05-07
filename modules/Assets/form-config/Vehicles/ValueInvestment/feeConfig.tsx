import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";

export const feeConfig = ({
  index,
  
}: {
  index: number;
}): FormFieldConfig[] => {
  const { control, watch } = useFormContext();
  const isPercentage = watch(`fees.${index}.isPercentage`);

  return [
    {
      name: `fees.${index}.name`,
      label: "Name",
      control,
      type: "text",
      rules: {
        required: "Name is required",
      },
    },
    {
      name: `fees.${index}.value`,
      label: "Value",
      control,
      type: "number",
      rules: {
        required: "Value is required",
        min: {
          value: 0,
          message: "Value must be greater than 0",
        },
        validate: (value: number) => {
          if (isPercentage) {
            if (value > 100) {
              return "Value must be less than or equal to 100";
            }
          }
          return true;
        },
      },
    },
    {
      name: `fees.${index}.isPercentage`,
      label: "Is Percentage",
      control,
      type: "switch",
    },
    {
      name: `fees.${index}.status`,
      label: "Status",
      control,
      type: "switch",
    },
  ];
};