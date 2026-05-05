import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";

export const valueAndInvestmentConfig = (): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control } = useFormContext();

  return [
    {
      type: "number",
      name: "investmentStats.startingValue",
      control,
      label: "Starting Value",
      rules: { required: "Starting Value is required" },
      disabled: disable,
    },
    {
      type: "number",
      name: "investmentStats.targetFinalValue",
      control,
      label: "Target Final Value",
      rules: { required: "Target Final Value  is required" },
      disabled: disable,
    },
    {
      type: "number",
      name: "investmentStats.appreciationExpectedYearly",
      control,
      label: "Apprec. Expected Yearly (%)",
      rules: { required: "Apprec. Expected Yearly is required" },
      disabled: disable,
    },
    {
      type: "number",
      name: "investmentStats.minReturnToInvestors",
      control,
      label: "Min Return to Investors (%)",
      rules: { required: "Min Return to Investors is required" },
      disabled: disable,
    },
    {
      type: "number",
      name: "investmentStats.investmentPeriod",
      control,
      label: "Investment Period (months)",
      rules: { required: "Investment Period is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "investmentStats.linkToComparableListing",
      control,
      label: "Link to Comparable Listing",
    //   rules: { required: "Link to Comparable Listing is required" },
      disabled: disable,
    },

  ];
};
