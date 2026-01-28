import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { FieldValues, useFormContext } from "react-hook-form";

export const formConfig = (): FormFieldConfig[] => {
  const { control, watch } = useFormContext();
  const totalPropertyValue = watch("totalPropertyValueAfterFees");
  return [
    {
      type: "number",
      name: "investmentPerformance.targetCapitalAppreciation",
      control,
      label: "Annual Target Capital Appreciation",
      placeholder: "Enter Target Capital Appreciation",
      rules: { required: "Target Capital Appreciation is required" },
    },
    {
      type: "number",
      name: "investmentPerformance.estimatedReturnsAsPerLockInPeriod",
      control,
      label: "Future Cashflow (years)",
      placeholder: "Enter Number of Years",
      rules: { required: "Future Cashflow is required" },
    },
    {
      type: "number",
      name: "investmentPerformance.interestRateonReserves",
      control,
      label: "Interest Rate on Reserves (%)",
      placeholder: "Enter the intersest rate",
      rules: {
        required: "Interest Rate on Reserves is required",
        min: {
          value: 0,
          message: "Interest Rate on Reserves must be greater than 0",
        },
        validate: (value: number) => {
          if (value > 100) {
            return "Interest Rate on Reserves must be less than or equal to 100";
          }

          return true;
        },
      },
    },
  ];
};
