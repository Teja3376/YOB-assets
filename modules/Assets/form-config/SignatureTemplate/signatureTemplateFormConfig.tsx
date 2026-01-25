import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { useFormContext } from "react-hook-form";

export const signatureTemplateFormConfig = (defaults?: any): FormFieldConfig[] => {
  const { control } = useFormContext();

  return [
  {
  type: "text", // instead of number
  name: "signatureDocuments.providerTemplateId",
  control,
  label: "Template ID (from DocuSeal)",
  rules: {
    required: "Template ID is required",
  },
},
    {
      type: "text",
      name: "signatureDocuments.templateName",
      control,
      label: "Template Name",
      rules: { required: "Template name is required" },
      defaultValue: defaults?.templateName || "",
    },
  ];
};
