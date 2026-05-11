import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";

export const rentalConfig = (currency: string): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control } = useFormContext();

  return [
    {
      type: "number",
      name: "rentalInformation.estRentalPricePerDay",
      control,
      label: `Estimated Rental Price Per Day (${currency})`,
      rules: { required: "Estimated Rental Price Per Day is required" },
      disabled: disable,
    },
    {
      type: "number",
      name: "rentalInformation.estRentalPeriodInDays",
      control,
      label: `Estimated Rental Period (Days)`,
      rules: { required: "Estimated Rental Period is required" },
      disabled: disable,
    },
    
  ];
};


export const rental2Config = (currency: string): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control } = useFormContext();

  return [

    {
      type: "number",
      name: "rentalInformation.estTotalRentalIncome",
      control,
      label: "Estimated Total Rental Income",
      rules: { required: "Estimated Total Rental Income is required" },
      disabled: true,
    },
    {
      type: "number",
      name: "rentalInformation.totalOperatingCosts",
      control,
      label: "Total Operating Costs",
      rules: { required: "Total Operating Costs is required" },
      disabled: true,
    },
    {
      type: "number",
      name: "rentalInformation.netRentalIncome",
      control,
      label: "Net Rental Income",
      rules: { required: "Net Rental Income is required" },
      disabled: true,
    },
    {
      type: "text",
      name: "rentalInformation.totalYield",
      control,
      label: "Total Yield (%)",
      rules: { required: "Total Yield is required" },
      disabled: true,
    },

  ];
};
