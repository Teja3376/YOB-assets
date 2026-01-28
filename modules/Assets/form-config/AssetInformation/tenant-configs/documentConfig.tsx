import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { TENANT_TYPE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";
import {useParams} from "next/navigation";

export const documentConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
    const { assetId } = useParams<{ assetId?: string }>();


  return [
    {
      type: "file",
      name: `tenants.${index}.agreement`,
      control,
      label: "Upload Agreement ",
      fullWidth: true,  
      accept: ["PDF", "DOC", "DOCX"],
      meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      rules:{
        required:"Agreement document is required"
      }
    },
    {
      type: "image",
      name: `tenants.${index}.logo`,
      control,
      label: "Upload Logo",
      accept: ["jpg", "jpeg", "png", "webp", "svg"],
      fullWidth: true,
         meta: {
        refId: assetId || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      
    },
  ];
};
