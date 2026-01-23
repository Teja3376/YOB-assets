import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { TENANT_TYPE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

export const tenantConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();

  return [
    {
      type: "switch2",
      name: `tenants.${index}.status`,
      control,
      label: "Status",
      placeholder: "Status",
    },

    {
      type: "text",
      name: `tenants.${index}.name`,
      control,
      label: "Tenant Name",
      placeholder: "Enter Tenant Name",
      rules: {
        required: "Tenant name is required",
      },
    },
    {
      type: "select",
      name: `tenants.${index}.type`,
      control,
      label: "Tenant Type",
      options: TENANT_TYPE,
      rules: {
        required: "Tenant type is required",
      },
    },
  ];
};
