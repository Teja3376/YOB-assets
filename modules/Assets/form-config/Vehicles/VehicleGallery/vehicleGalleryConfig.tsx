import { FormFieldConfig } from "@/components/use-form/ControllerMap";
import { VEHICLE_BODY_STYLE } from "@/modules/Assets/utils/global";
import { useFormContext } from "react-hook-form";

import { useParams } from "next/navigation";

export const vehicleGalleryConfig = (): FormFieldConfig[] => {
  const { assetId } = useParams();
  //   const disable = !!param.id;

  const { control } = useFormContext();

  return [
    {
      name: "media.imageURL",
      label: "Image",
      type: "image",
      accept: ["png", "jpg", "jpeg"],
      control: control,
      rules: {
        required: "Image is required",
      },
      meta: {
        refId: (assetId as string) ?? "",
        belongsTo: "vehicle",
        isPublic: true,
      },
    },

    {
      name: "media.videoURL",
      type: "url",
      label: "Asset Video Link",
      control: control,
      rules: {
        required: "Video URL is required",
        pattern: {
          value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
          message: "Invalid YouTube URL",
        },
      },
    },

    {
      name: "media.gallery",
      label: "Gallery",
      type: "multiImage",
      accept: ["png", "jpg", "jpeg"],
      control: control,
      rules: {
        required: "multi gallery is required",
      },
      meta: {
        refId: (assetId as string) ?? "",
        belongsTo: "vehicle",
        isPublic: true,
      },
    },
  ];
};
