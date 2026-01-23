import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";

export const leaseDetailsConfig = (index: number): FormFieldConfig[] => {
  const { control, watch } = useFormContext();
  const startDate = watch(`tenants.${index}.startDate`);

  return [
    {
      type: "number",
      name: `tenants.${index}.sftsAllocated`,
      control,
      label: "SFTs Allocated",
      placeholder: "Enter SFTs Allocated",
      onChange: (value: any) => {
        console.log("SFTs Allocated", value.target.value);
      },
      rules: {
        required: "SFTs Allocated is required",
      },
    },
    {
      type: "number",
      name: `tenants.${index}.rentPerSft`,
      control,
      label: "Rent Per Sft",
      placeholder: "Enter Rent Per Sft",
      rules: {
        required: "Rent Per Sft is required",
      },
    },
    {
      type: "number",
      name: `tenants.${index}.annualRentEscalation`,
      control,
      label: "Annual Rent Escalation (%)",
      placeholder: "Annual Rent Escalation",
      rules: {
        required: "Annual Rent Escalation is required",
      },
    },
    {
      type: "date",
      name: `tenants.${index}.startDate`,
      control,
      label: "Start Date",
      allowFutureDates: true,
      autoClose: true,
    },
    {
      type: "date",
      name: `tenants.${index}.endDate`,
      control,
      label: "End Date",
      allowFutureDates: true,
      autoClose: true,
      dayDisabled: (date: Date): boolean => {
        if (!startDate) return false;

        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        const s = new Date(startDate);
        s.setHours(0, 0, 0, 0);

        return d < s;
      },
      rules: {
        required: "End Date is required",
        validate: (value: Date) => {
          if (!startDate || !value) return true;

          const s = new Date(startDate);
          s.setHours(0, 0, 0, 0);

          const e = new Date(value);
          e.setHours(0, 0, 0, 0);

          if (e < s) return "End date cannot be before start date";
          return true;
        },
      },
    },
    {
      type: "number",
      name: `tenants.${index}.leasePeriod`,
      control,
      label: "Lease Period (Months)",
      placeholder: "Enter Lease Period in Months",
      rules: {
        required: "Lease Period is required",
      },
    },
    {
      type: "number",
      name: `tenants.${index}.lockInPeriod`,
      control,
      label: "Lock In Period (Months)",
      placeholder: "Enter Lock In Period in Months",
      rules: {
        required: "Lock In Period is required",
      },
    },
  ];
};
