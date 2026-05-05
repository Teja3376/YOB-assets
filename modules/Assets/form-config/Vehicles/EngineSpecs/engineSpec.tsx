import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";

export const engineSpec = (): FormFieldConfig[] => {
  const param = useParams();
  const disable = !!param.id;

  const { control } = useFormContext();

  return [
    {
      type: "text",
      name: "engineDisplacement",
      control,
      label: "Engine Displacement(CC)",
      rules: { required: "Engine Displacement is required" },
      disabled: disable,
    },
    {
      type: "select",
      name: "cylinders",
      control,
      options: [
        { label: "3", value: "3"},
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "8", value: "8" },
        { label: "10", value: "10" },
        { label: "12", value: "12" },
        { label: "16", value: "16" },
        { label: "20", value: "20" },
        { label: "24", value: "24" },
      ],
      label: "Cylinders",
      rules: { required: "Cylinders is required" },
      disabled: disable,
    },
    {
      type: "text",
      name: "horsePower",
      control,
      label: "Horse Power(HP)",
      rules: { required: "Horse Power is required" },
      disabled: disable,
    },
  ];
};
