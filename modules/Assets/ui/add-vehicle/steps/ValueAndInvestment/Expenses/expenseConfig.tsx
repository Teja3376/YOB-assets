import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";

export const expenseFormConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: "text",
      name: `expenses.${index}.name`,
      control,
      label: "Expense Name",
      placeholder: "Enter Expense Name",
      rules: {
        required: "Expense name is required",
      },
    },
    {
      type: "number",
      name: `expenses.${index}.value`,
      control,
      label: "value",
      placeholder: "Enter value",
      rules: {
        required: "Value is required",
        validate: (value: number) => {
          if (value < 0) {
            return "Value cannot be negative";
          }
          return true;
        },
      },
    },
    {
      type: "switch",
      name: `expenses.${index}.isPercentage`,
      control,
      label: "Is Percentage",
      placeholder: "Is Percentage",
    },
    {
      type: "switch",
      name: `expenses.${index}.status`,
      control,
      label: "Status",
      placeholder: "Status",
    },
  ];
};