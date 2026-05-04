import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import {  VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";


export const engineSpec = (): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control } = useFormContext();



  return [
    {
      type: "text",
      name: "engineDisplacment",
      control,
      label: "Engine Displacement",
      rules: { required: "Brand is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "cylinders",
      control,
      label: "Cylinders",
      rules: { required: "Model is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "Horsepower",
      control,
      label: "Horse Power",
      rules: { required: "Trim/Version is required" },
      disabled: disable,
    },


  ];
};
